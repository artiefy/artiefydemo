/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

import Image from 'next/image';

import { useUser } from '@clerk/nextjs';
import { FiUploadCloud } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import Select, { type MultiValue } from 'react-select';
import { toast } from 'sonner';

import CategoryDropdown from '~/components/educators/layout/CategoryDropdown';
import { Button } from '~/components/educators/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/educators/ui/dialog';
import { Input } from '~/components/educators/ui/input';
import { Progress } from '~/components/educators/ui/progress';

interface SubjectOption {
  value: string;
  label: string;
}
interface ProgramFormProps {
  onSubmitAction: (
    id: string,
    title: string,
    description: string,
    file: File | null,
    categoryid: number,
    rating: number,
    coverImageKey: string,
    fileName: string,
    subjectIds: number[]
  ) => Promise<void>;
  uploading: boolean;
  editingProgramId: number | null;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  categoryid: number;
  setCategoryid: (categoryid: number) => void;
  coverImageKey: string;
  setCoverImageKey: (coverImageKey: string) => void;
  isOpen: boolean;
  onCloseAction: () => void;
  rating: number;
  setRating: (rating: number) => void;
  subjectIds: number[];
}

const ModalFormProgram: React.FC<ProgramFormProps> = ({
  onSubmitAction,
  uploading,
  editingProgramId,
  title,
  setTitle,
  description,
  setDescription,
  rating,
  setRating,
  categoryid,
  setCategoryid,
  coverImageKey,
  setCoverImageKey,
  isOpen,
  onCloseAction,
}) => {
  const { user } = useUser(); // Obtiene el usuario actual
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    categoryid: false,
    rating: false,
    file: false,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [allSubjects, setAllSubjects] = useState<SubjectOption[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectOption[]>([]);
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());
  const [currentCoverImageKey] = useState(coverImageKey);
  const [uploadController, setUploadController] =
    useState<AbortController | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  void modifiedFields;
  void coverImage;

  // Añade esta función helper después de las declaraciones de estado
  const getImageUrl = (coverImageKey: string) => {
    return `${process.env.NEXT_PUBLIC_AWS_S3_URL ?? ''}/${coverImageKey}`;
  };

  // Manejo de cambios en el archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setFile(files[0]);
      setFileName(files[0].name);
      setFileSize(files[0].size);
      setErrors((prev) => ({ ...prev, file: false }));
    } else {
      setFile(null);
      setFileName(null);
      setFileSize(null);
      setErrors((prev) => ({ ...prev, file: true }));
    }
  };

  // Manejo de arrastre de archivos
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files?.[0]) {
      setFile(files[0]);
      setFileName(files[0].name);
      setFileSize(files[0].size);
      setErrors((prev) => ({ ...prev, file: false }));
    } else {
      setFile(null);
      setFileName(null);
      setFileSize(null);
      setErrors((prev) => ({ ...prev, file: true }));
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async () => {
    const controller = new AbortController();
    setUploadController(controller);

    const subjectIds = selectedSubjects
      .map((subject) => Number(subject.value)) // Convertimos `value` a número
      .filter((id) => !isNaN(id)); // Filtramos valores inválidos
    console.log('📤 Enviando programa con subjectIds:', subjectIds); // ✅ LOG IMPORTANTE

    const newErrors = {
      title: !title,
      description: !description,
      categoryid: !categoryid,
      rating:
        rating === null ||
        rating === undefined ||
        isNaN(rating) ||
        rating < 0 ||
        rating > 500,
      file: !file && !currentCoverImageKey,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      console.log('Validation errors:', newErrors);
      return;
    }

    try {
      setIsEditing(true);
      setIsUploading(true);

      let coverImageKey = currentCoverImageKey ?? '';
      let uploadedFileName = fileName ?? '';

      if (file) {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentType: file.type,
            fileSize: file.size,
            fileName: file.name,
          }),
        });

        if (!uploadResponse.ok) {
          throw new Error(
            `Error during file upload: ${uploadResponse.statusText}`
          );
        }

        const uploadData = (await uploadResponse.json()) as {
          key: string;
          fileName: string;
          fields: Record<string, string>;
          url: string;
        };
        coverImageKey = uploadData.key;
        uploadedFileName = uploadData.fileName;

        const formData = new FormData();
        Object.entries(uploadData.fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append('file', file);

        await fetch(uploadData.url, {
          method: 'POST',
          body: formData,
        });
      }

      const formattedId = editingProgramId ? editingProgramId.toString() : '';

      // If editing, use PUT method
      if (editingProgramId) {
        const response = await fetch(
          `/api/super-admin/programs?programId=${formattedId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              description,
              categoryid,
              rating,
              coverImageKey,
              subjectIds,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error updating program: ${response.statusText}`);
        }
      }

      await onSubmitAction(
        formattedId,
        title,
        description,
        file,
        categoryid,
        rating,
        coverImageKey,
        uploadedFileName,
        subjectIds
      );

      onCloseAction();
    } catch (error) {
      console.error('Error during the submission process:', error);
      toast.error('Error en la operación', {
        description:
          error instanceof Error ? error.message : 'Error desconocido',
      });
    } finally {
      setIsUploading(false);
      setIsEditing(false);
    }
  };

  // Manejo de cancelación
  const handleCancel = () => {
    if (uploadController) {
      uploadController.abort();
    }
    onCloseAction();
  };

  // Manejo de cambios en los campos
  const handleFieldChange = (
    field: string,
    value: string | number | File | null
  ) => {
    if (value === null) return;

    switch (field) {
      case 'title':
        if (title !== value) setTitle(value as string);
        break;
      case 'description':
        if (description !== value) setDescription(value as string);
        break;
      case 'categoryid':
        if (categoryid !== value) setCategoryid(value as number);
        break;
      case 'rating':
        if (rating !== value) setRating(value as number);
        break;
      case 'file':
        setFile(value as File);
        break;
    }
    setModifiedFields((prev) => new Set(prev).add(field));
  };

  // Efectos para manejar el progreso de carga
  useEffect(() => {
    if (uploading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [uploading]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/super-admin/materias'); // Ajusta la URL según necesidad
        const data = (await response.json()) as { id: number; title: string }[];

        // Filtrar duplicados por el título (subject.title)
        const uniqueSubjects = Array.from(
          new Map(data.map((subject) => [subject.title, subject])).values()
        );

        setAllSubjects(
          uniqueSubjects.map((subject) => ({
            value: subject.id.toString(),
            label: subject.title,
          }))
        );
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    if (isOpen) {
      void fetchSubjects();
    }
  }, [isOpen]);
  const uniqueSelectedSubjects = Array.from(
    new Map(
      selectedSubjects.map((subject) => [subject.label, subject])
    ).values()
  );

  // Utilizamos este tipo en el estado para mantener las opciones seleccionadas

  const handleSelectSubjects = (newValue: MultiValue<SubjectOption>) => {
    console.log(
      '📌 Materias seleccionadas (antes de actualizar estado):',
      newValue
    );

    // Asegurar que `selectedSubjects` almacena correctamente los valores
    const updatedSubjects = newValue.map((subject) => ({
      value: subject.value, // 🔹 Guardamos el ID tal cual (string)
      label: subject.label, // 🔹 Guardamos el label
    }));

    console.log('✅ Materias guardadas en el estado:', updatedSubjects);

    setSelectedSubjects(updatedSubjects);
  };

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setProgress(0);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (!uploading && isEditing) {
      setIsEditing(false);
    }
  }, [uploading, isEditing]);

  useEffect(() => {
    if (isUploading) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isUploading]);

  // Modificar este useEffect para que solo limpie los campos cuando se abre el modal para crear
  useEffect(() => {
    if (isOpen && !editingProgramId) {
      setTitle('');
      setDescription('');
      setCategoryid(0);
      setRating(0);
      setCoverImage('');
      setSelectedSubjects([]);
    }
  }, [isOpen, editingProgramId]);

  // Modificar este useEffect para que solo cargue los datos una vez al abrir el modal para editar
  useEffect(() => {
    if (editingProgramId && isOpen) {
      const loadProgramData = async () => {
        try {
          const response = await fetch(
            `/api/super-admin/programs/${editingProgramId}`
          );
          if (response.ok) {
            interface ProgramData {
              title: string;
              description: string;
              categoryid: number;
              rating: number;
              coverImageKey: string;
              materias?: { id: number; title: string }[];
            }
            const programData = (await response.json()) as ProgramData;
            // Solo actualizar si los valores son diferentes
            if (title !== programData.title) setTitle(programData.title);
            if (description !== programData.description)
              setDescription(programData.description);
            if (categoryid !== programData.categoryid)
              setCategoryid(programData.categoryid);
            if (rating !== programData.rating) setRating(programData.rating);
            if (coverImageKey !== programData.coverImageKey) {
              setCoverImageKey(programData.coverImageKey);
              setCoverImage(programData.coverImageKey);
            }

            if (programData.materias) {
              const subjectOptions = programData.materias.map(
                (materia: { id: number; title: string }) => ({
                  value: materia.id.toString(),
                  label: materia.title,
                })
              );
              setSelectedSubjects(subjectOptions);
            }
          }
        } catch (error) {
          console.error('Error loading program data:', error);
          toast.error('Error al cargar los datos del programa');
        }
      };

      void loadProgramData();
    }
  }, [editingProgramId, isOpen]); // Solo depender de editingProgramId e isOpen

  // Renderizado del modal
  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="max-h-[90vh] max-w-full overflow-y-auto">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-4xl">
            {editingProgramId ? 'Editar Programa' : 'Crear Programa'}
          </DialogTitle>
          <DialogDescription className="text-xl text-white">
            {editingProgramId
              ? 'Edita los detalles del programa'
              : 'Llena los detalles para crear un nuevo programa'}
          </DialogDescription>
        </DialogHeader>
        <div className="bg-background rounded-lg px-6 text-black shadow-md">
          {/* Título */}
          <label htmlFor="title" className="text-primary text-lg font-medium">
            Título
          </label>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className={`mb-4 w-full rounded border p-2 text-white outline-none ${
              errors.title ? 'border-red-500' : 'border-primary'
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-500">Este campo es obligatorio.</p>
          )}

          {/* Descripción */}
          <label
            htmlFor="description"
            className="text-primary text-lg font-medium"
          >
            Descripción
          </label>
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            className={`mb-3 h-auto w-full rounded border p-2 text-white outline-none ${
              errors.description ? 'border-red-500' : 'border-primary'
            }`}
          />
          {errors.description && (
            <p className="text-sm text-red-500">Este campo es obligatorio.</p>
          )}

          {/* Categoría */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="categoryid"
                className="text-primary text-lg font-medium"
              >
                Categoría
              </label>
              <CategoryDropdown
                category={categoryid}
                setCategory={setCategoryid}
                errors={{ category: errors.categoryid }}
              />
              {errors.categoryid && (
                <p className="text-sm text-red-500">
                  Este campo es obligatorio.
                </p>
              )}
            </div>
            {isOpen && (
              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="subjects"
                  className="text-primary text-lg font-medium"
                >
                  Materias
                </label>
                <label
                  htmlFor="subjects"
                  className="text-primary text-lg font-medium"
                >
                  Asignar Materias
                </label>
                <Select
                  isMulti
                  options={allSubjects}
                  value={uniqueSelectedSubjects}
                  onChange={handleSelectSubjects}
                  classNamePrefix="react-select"
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="border-primary mb-4 hidden w-full rounded border p-2">
            <h3 className="text-primary text-lg font-medium">
              Instructor: {user?.fullName}
            </h3>
          </div>

          {/* Rating */}
          <div>
            <label
              htmlFor="rating"
              className="text-primary text-lg font-medium"
            >
              Rating
            </label>
            <Input
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="0-5"
              className="border-primary mt-1 w-full rounded border p-2 text-white outline-none focus:no-underline"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          {/* Imagen de portada */}
          <label htmlFor="file" className="text-primary text-lg font-medium">
            Imagen de portada
          </label>
          <div
            className={`border-primary mx-auto mt-5 w-80 rounded-lg border-2 border-dashed p-8 lg:w-1/2 ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : errors.file
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-gray-50'
            } transition-all duration-300 ease-in-out`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              {!file && coverImageKey ? (
                // Mostrar la imagen existente
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={getImageUrl(coverImageKey)}
                    alt="current cover"
                    width={500}
                    height={200}
                    className="h-48 w-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setCoverImageKey('');
                      setErrors((prev) => ({ ...prev, file: true }));
                    }}
                    className="absolute top-2 right-2 z-20 rounded-full bg-red-500 p-1 text-white hover:opacity-70"
                  >
                    <MdClose className="z-20 size-5" />
                  </button>
                </div>
              ) : !file ? (
                // Mostrar el área de drop cuando no hay imagen
                <>
                  <FiUploadCloud
                    className={`mx-auto size-12 ${
                      errors.file ? 'text-red-500' : 'text-primary'
                    }`}
                  />
                  <h2 className="mt-4 text-xl font-medium text-gray-700">
                    Arrastra y suelta tu imagen aquí
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    o haz clic para seleccionar un archivo desde tu computadora
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Supports: JPG, PNG, GIF (Max size: 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className={`hidden ${
                      errors.file ? 'bg-red-500' : 'bg-primary'
                    }`}
                    onChange={handleFileChange}
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`mt-4 inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-80 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                      errors.file ? 'bg-red-500' : 'bg-primary'
                    }`}
                  >
                    Seleccionar Archivo
                  </label>
                </>
              ) : (
                // Mostrar la vista previa de la nueva imagen
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    width={500}
                    height={200}
                    className="h-48 w-full object-cover"
                  />
                  <button
                    onClick={() => {
                      setFile(null);
                      setFileName(null);
                      setFileSize(null);
                      setErrors((prev) => ({ ...prev, file: true }));
                    }}
                    className="absolute top-2 right-2 z-20 rounded-full bg-red-500 p-1 text-white hover:opacity-70"
                  >
                    <MdClose className="z-20 size-5" />
                  </button>
                  <div className="flex justify-between p-2">
                    <p className="truncate text-sm text-gray-500">{fileName}</p>
                    <p className="text-sm text-gray-500">
                      {((fileSize ?? 0) / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              )}
              {errors.file && (
                <p className="text-sm text-red-500">
                  Este campo es obligatorio.
                </p>
              )}
            </div>
          </div>

          {/* Progreso de carga */}
          {(uploading || isUploading) && (
            <div className="mt-4">
              <Progress
                value={uploading ? progress : uploadProgress}
                className="w-full"
              />
              <p className="mt-2 text-center text-sm text-gray-500">
                {uploading ? progress : uploadProgress}% Completado
              </p>
            </div>
          )}
          {/* Botones de acción */}
          <DialogFooter className="mt-4 grid grid-cols-2 gap-4">
            <Button
              onClick={handleCancel}
              className="mr-2 w-full border-transparent bg-gray-600 p-3 text-white hover:bg-gray-700"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-green-400 text-white hover:bg-green-400/70"
              disabled={uploading}
            >
              {uploading
                ? 'Subiendo...'
                : editingProgramId
                  ? isEditing
                    ? 'Editando...'
                    : 'Editar'
                  : 'Crear Programa'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormProgram;
