'use client';

import { useEffect, useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Loader2,
  Plus,
  Trash2,
  X,
} from 'lucide-react';

interface Nivel {
  id: number;
  name: string;
  description: string;
}

export default function NivelesPage() {
  const [nivel, setNivel] = useState<Nivel[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingNivel, setEditingNivel] = useState<Nivel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    void fetchNivel();
  }, []);

  async function fetchNivel() {
    try {
      setLoading(true);
      const res = await fetch('/api/super-admin/niveles');
      if (!res.ok) throw new Error('Error al cargar niveles');
      const data = (await res.json()) as Nivel[];
      setNivel(data);
    } catch {
      setError('Error al obtener niveles.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    try {
      await fetch('/api/super-admin/niveles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      setName('');
      setDescription('');
      void fetchNivel();
      setShowCreateForm(false);
    } catch {
      setError('Error al guardar nivel.');
    }
  }

  async function handleEdit() {
    if (!editingNivel) return;
    try {
      await fetch('/api/super-admin/niveles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingNivel.id, name, description }),
      });
      setEditingNivel(null);
      setName('');
      setDescription('');
      void fetchNivel();
      setShowEditForm(false);
    } catch {
      setError('Error al actualizar nivel.');
    }
  }

  async function handleDelete(id: number) {
    try {
      await fetch('/api/super-admin/niveles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      void fetchNivel();
      setShowConfirmDelete(null);
    } catch {
      setError('Error al eliminar nivel.');
    }
  }

  const totalPages = Math.ceil(nivel.length / itemsPerPage);
  const paginatedNiveles = nivel.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="p-6">
        <header className="flex items-center justify-between rounded-lg bg-[#00BDD8] p-6 text-3xl font-bold text-[#01142B] shadow-md">
          <h1>Gestión de Niveles de Niveles</h1>
          <button
            onClick={() => {
              setShowCreateForm(true);
              setName('');
              setDescription('');
            }}
            className="bg-background flex items-center rounded-md px-4 py-2 font-semibold text-white shadow-md hover:bg-[#00A5C0]"
          >
            <Plus className="mr-2 size-5" /> Crear
          </button>
        </header>

        {showCreateForm && (
          <ModalForm
            title="Nuevo Nivel"
            onClose={() => setShowCreateForm(false)}
            onSubmit={handleCreate}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />
        )}

        {showEditForm && editingNivel && (
          <ModalForm
            title="Editar Nivel"
            onClose={() => setShowEditForm(false)}
            onSubmit={handleEdit}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />
        )}

        {showConfirmDelete && (
          <ConfirmDeleteModal
            item={showConfirmDelete}
            onClose={() => setShowConfirmDelete(null)}
            onConfirm={() => handleDelete(showConfirmDelete.id)}
          />
        )}

        {loading ? (
          <LoaderComponent />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <TableComponent
              data={paginatedNiveles}
              onEdit={(item: Nivel) => {
                setEditingNivel(item);
                setName(item.name);
                setDescription(item.description);
                setShowEditForm(true);
              }}
              onDelete={setShowConfirmDelete}
            />
            {/* 🔹 Controles de paginación */}

            {/* 🔹 Controles de paginación */}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
}

interface ModalFormProps {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const ModalForm = ({
  title,
  onClose,
  onSubmit,
  name,
  setName,
  description,
  setDescription,
}: ModalFormProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-b from-[#01142B] to-[#01142B] opacity-80" />
    <div className="relative z-10 w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <button onClick={onClose}>
          <X className="size-6 text-gray-300 hover:text-white" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-4 w-full rounded-md bg-gray-700 px-3 py-2 text-white"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-2 w-full rounded-md bg-gray-700 px-3 py-2 text-white"
      />
      <button
        onClick={onSubmit}
        className="bg-primary hover:bg-secondary mt-4 w-full rounded-md px-4 py-2 font-bold text-white"
      >
        Guardar
      </button>
    </div>
  </div>
);
// ✅ Modal Confirmación de Eliminación
const ConfirmDeleteModal = ({
  item,
  onClose,
  onConfirm,
}: {
  item: { id: number; name: string };
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-80" />
    <div className="relative z-10 w-full max-w-sm rounded-lg bg-gray-800 p-6 shadow-lg">
      <h2 className="text-lg font-bold text-white">
        ¿Eliminar &quot;{item.name}&quot;?
      </h2>
      <p className="mt-2 text-gray-300">Esta acción no se puede deshacer.</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
);

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => (
  <div className="mt-4 flex justify-center space-x-4">
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="rounded-md bg-gray-700 px-4 py-2 text-white disabled:opacity-50"
    >
      <ChevronLeft size={20} />
    </button>
    <span className="text-white">
      {currentPage} de {totalPages}
    </span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="rounded-md bg-gray-700 px-4 py-2 text-white disabled:opacity-50"
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

const LoaderComponent = () => (
  <div className="mt-6 flex justify-center">
    <Loader2 className="text-primary size-6" />
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="mt-6 text-red-500">{message}</div>
);

const TableComponent = ({
  data,
  onEdit,
  onDelete,
}: {
  data: Nivel[];
  onEdit: (item: Nivel) => void;
  onDelete: (item: Nivel) => void;
}) => (
  <table className="mt-6 w-full border-collapse rounded-lg bg-gray-800 text-white shadow-lg">
    <thead className="bg-[#00BDD8] text-[#01142B]">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-semibold">Nombre</th>
        <th className="px-4 py-3 text-left text-xs font-semibold">
          Descripción
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold">Acciones</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-700">
      {data.map((item) => (
        <tr key={item.id} className="hover:bg-gray-700">
          <td className="px-4 py-3">{item.name}</td>
          <td className="px-4 py-3">{item.description}</td>
          <td className="flex space-x-2 px-4 py-3">
            <button onClick={() => onEdit(item)} className="text-yellow-500">
              <Edit size={14} />
            </button>
            <button onClick={() => onDelete(item)} className="text-red-500">
              <Trash2 size={14} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
