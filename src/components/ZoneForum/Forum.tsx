'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useUser } from '@clerk/nextjs';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/educators/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/educators/ui/dialog';
import { Input } from '~/components/educators/ui/input';
import { Progress } from '~/components/educators/ui/progress';
import { Zone } from '~/components/ZoneForum/Zone';

interface CoursesModels {
  id: number;
  title: string;
  description: string;
  coverImageKey: string;
}

const uploadResponseSchema = z.object({
  fileKey: z.string(),
});

const ForumHome = () => {
  const { user } = useUser();
  const [courseId, setCourseId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courses, setCourses] = useState<CoursesModels[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const uploadFileToServer = async (
    file: File,
    type: 'image' | 'document'
  ): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const json: unknown = await res.json();
    const data = uploadResponseSchema.parse(json);
    return data.fileKey;
  };

  const handleCreateForum = async () => {
    if (!user) return;

    setIsUploading(true);
    setUploadProgress(25);

    const userId = user.id;
    let coverImageKey = '';
    let documentKey = '';

    try {
      if (coverImage) {
        coverImageKey = await uploadFileToServer(coverImage, 'image');
      }
      if (documentFile) {
        documentKey = await uploadFileToServer(documentFile, 'document');
      }

      setUploadProgress(60);

      const formData = new FormData();
      formData.append('courseId', String(courseId));
      formData.append('title', title);
      formData.append('description', description);
      formData.append('userId', userId);
      formData.append('coverImageKey', coverImageKey);
      formData.append('documentKey', documentKey);

      const response = await fetch('/api/forums', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(100);
      const json: unknown = await response.json();
      const responseSchema = z.object({
        success: z.boolean(),
        message: z.string().optional(),
      });
      const result = responseSchema.parse(json);

      if (result.success) {
        toast.success('Foro creado exitosamente!');
        setIsDialogOpen(false);
        window.location.reload();
      } else {
        toast.error(result.message ?? 'Error al crear el foro');
      }
    } catch (error) {
      console.error('Error al crear el foro:', error);
      toast.error('Error al crear el foro');
    } finally {
      setIsUploading(false);
      setCourseId(null);
      setTitle('');
      setDescription('');
      setCoverImage(null);
      setDocumentFile(null);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      try {
        setLoadingCourses(true);
        const response = await fetch(
          `/api/educadores/courses?userId=${user.id}`
        );
        const json: unknown = await response.json();
        const coursesSchema = z.array(
          z.object({
            id: z.number(),
            title: z.string(),
            description: z.string(),
            coverImageKey: z.string(),
          })
        );
        const data = coursesSchema.parse(json);
        setCourses(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar los cursos');
      } finally {
        setLoadingCourses(false);
      }
    };

    void fetchCourses();
  }, [user]);

  return (
    <div className="bg-background min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="mb-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-primary text-center text-3xl font-extrabold tracking-tight sm:text-left sm:text-4xl">
            Zona de Foros Artiefy
          </h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 flex w-full max-w-xs items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-black shadow-md transition-all duration-200 sm:w-auto sm:max-w-none sm:text-base">
                + Nuevo Foro
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-md rounded-lg bg-[#111] text-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-white">
                  Crear Nuevo Foro
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-400">
                  Completa los campos para iniciar una nueva discusión.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {/* Curso asociado */}
                <div className="space-y-2">
                  <label className="text-primary text-sm font-medium">
                    Curso asociado
                  </label>
                  {loadingCourses ? (
                    <p className="text-sm text-gray-400">Cargando cursos...</p>
                  ) : courses.length > 0 ? (
                    <>
                      <input
                        type="text"
                        list="courses-list"
                        placeholder="Selecciona o escribe un curso"
                        onChange={(e) => {
                          const selected = courses.find(
                            (c) => c.title === e.target.value
                          );
                          setCourseId(selected ? selected.id : null);
                        }}
                        className="bg-background focus:ring-primary w-full rounded-md border border-white/20 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:ring-2 focus:outline-none"
                      />
                      <datalist id="courses-list">
                        {courses.map((c) => (
                          <option key={c.id} value={c.title} />
                        ))}
                      </datalist>
                    </>
                  ) : (
                    <p className="text-sm text-red-500">
                      No tienes cursos disponibles.
                    </p>
                  )}
                </div>

                {/* Título */}
                <div className="space-y-1">
                  <label className="text-primary text-sm">
                    Título del foro
                  </label>
                  <Input
                    type="text"
                    placeholder="Ej. Debate sobre técnica"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-white"
                  />
                </div>

                {/* Descripción */}
                <div className="space-y-1">
                  <label className="text-primary text-sm">Descripción</label>
                  <Input
                    type="text"
                    placeholder="Breve descripción del foro"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-white"
                  />
                </div>

                {/* Instructor info */}
                <div className="border-primary text-primary rounded-md border bg-black/10 p-2 text-sm">
                  Instructor: {user?.fullName}
                </div>
                <div className="space-y-3">
                  {/* Imagen de portada */}
                  <div>
                    <label className="text-primary text-sm font-medium">
                      Imagen de portada (opcional)
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <label className="cursor-pointer rounded-md bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20">
                        Seleccionar imagen
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setCoverImage(e.target.files?.[0] ?? null)
                          }
                          className="hidden"
                        />
                      </label>

                      {coverImage && (
                        <div className="relative">
                          <Image
                            src={URL.createObjectURL(coverImage)}
                            alt="Vista previa"
                            width={96}
                            height={96}
                            className="h-24 w-24 rounded-md border border-white/20 object-cover"
                          />
                          <button
                            onClick={() => setCoverImage(null)}
                            className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Documento adjunto */}
                  <div>
                    <label className="text-primary text-sm font-medium">
                      Documento adjunto (opcional)
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <label className="cursor-pointer rounded-md bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20">
                        Seleccionar documento
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) =>
                            setDocumentFile(e.target.files?.[0] ?? null)
                          }
                          className="hidden"
                        />
                      </label>

                      {documentFile && (
                        <div className="flex items-center gap-2 rounded-md border border-white/20 bg-black/10 px-3 py-1 text-sm text-white">
                          📄 {documentFile.name}
                          <button
                            onClick={() => setDocumentFile(null)}
                            className="ml-2 text-red-400 transition hover:text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="mt-2 text-center text-xs text-gray-400">
                    {uploadProgress}% completado
                  </p>
                </div>
              )}

              <DialogFooter className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  className="w-full border border-white/20 text-white hover:bg-white/10 sm:w-auto"
                  onClick={() => {
                    setCourseId(null);
                    setTitle('');
                    setDescription('');
                    setIsDialogOpen(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateForum}
                  className="w-full bg-green-500 text-white hover:bg-green-600 sm:w-auto"
                >
                  Crear Foro
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar foros o temas..."
            className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-700 bg-[#111827] px-4 py-2 pl-10 text-base text-gray-100 shadow-sm transition placeholder:text-gray-400 focus:ring-1"
          />
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        </div>

        <Zone />
      </div>
    </div>
  );
};

export default ForumHome;
