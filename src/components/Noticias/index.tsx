"use client";

import {
  createNoticia,
  Criptomoeda,
  deleteNoticia,
  Noticia,
  updateNoticia,
} from "@/actions/noticias";
import { useRouter } from "next/navigation";
import { useState } from "react";

type NProps = {
  noticias: Noticia[];
  criptomoedas: Criptomoeda[];
};

export default function Noticias({ noticias, criptomoedas }: NProps) {
  const [newNoticia, setNewNoticia] = useState<Omit<Noticia, "id_noticia">>({
    id_cripto: 1,
    data_publicacao: new Date().toISOString().split("T")[0],
    tema: "",
    noticia: "",
    fonte: "",
  });
  const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null);

  const router = useRouter();

  const handleCreate = async () => {
    const res = await createNoticia(newNoticia);

    if (res.ok) {
      window.location.reload();
    } else {
      console.error("Error creating noticia:", await res.text());
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this news?")) {
      const res = await deleteNoticia(id);

      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Error deleting noticia:", await res.text());
      }
    }
  };

  const handleEdit = (noticia: Noticia) => {
    setEditingNoticia(noticia);
  };

  const handleUpdate = async () => {
    if (!editingNoticia) return;

    const res = await updateNoticia(editingNoticia.id_noticia, editingNoticia)

    if (res.ok) {
      window.location.reload();
    } else {
      console.error('Error updating noticia:', await res.text());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* News Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criptomoeda</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tema</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notícia</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fonte</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {noticias && noticias.map((noticia) => (
                  <tr key={`noticia_${noticia.id_noticia}`} onClick={() => router.push(`/noticias/${noticia.id_noticia}/sentimentos`)} className="hover:bg-gray-50 hover:cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{noticia.id_noticia}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {criptomoedas.find((c) => c.id_cripto === noticia.id_cripto)?.simbolo || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{noticia.data_publicacao}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{noticia.tema}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{noticia.noticia}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{noticia.fonte}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(noticia)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(noticia.id_noticia)}
                        className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Form */}
        <div className="bg-white text-gray-900 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Add New Notícia</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="id_cripto" className="block text-sm font-medium text-gray-700">
                Criptomoeda
              </label>
              <select
                id="id_cripto"
                value={newNoticia.id_cripto}
                onChange={(e) => setNewNoticia({ ...newNoticia, id_cripto: parseInt(e.target.value) })}
                className="mt-1 block w-full p-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {criptomoedas && criptomoedas.map((crypto) => (
                  <option key={`crypto_${crypto.id_cripto}`} value={crypto.id_cripto}>
                    {crypto.simbolo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="data_publicacao" className="block text-sm font-medium text-gray-700">
                Data
              </label>
              <input
                type="date"
                id="data_publicacao"
                value={newNoticia.data_publicacao}
                onChange={(e) => setNewNoticia({ ...newNoticia, data_publicacao: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="tema" className="block text-sm font-medium text-gray-700">
                Tema
              </label>
              <input
                type="text"
                id="tema"
                value={newNoticia.tema}
                onChange={(e) => setNewNoticia({ ...newNoticia, tema: e.target.value })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="noticia" className="block text-sm font-medium text-gray-700">
                Notícia
              </label>
              <textarea
                id="noticia"
                value={newNoticia.noticia}
                onChange={(e) => setNewNoticia({ ...newNoticia, noticia: e.target.value })}
                rows={4}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="fonte" className="block text-sm font-medium text-gray-700">
                Fonte
              </label>
              <input
                type="text"
                id="fonte"
                value={newNoticia.fonte}
                onChange={(e) => setNewNoticia({ ...newNoticia, fonte: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </form>
        </div>

        {/* Edit Form */}
        {editingNoticia && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg text-gray-900 p-6 max-w-2xl w-full">
              <h2 className="text-xl font-semibold mb-6">Edit Notícia</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="edit_id_cripto" className="block text-sm font-medium text-gray-700">
                    Criptomoeda
                  </label>
                  <select
                    id="edit_id_cripto"
                    value={editingNoticia.id_cripto}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, id_cripto: parseInt(e.target.value) })}
                    className="mt-1 block w-full p-2 border border-gray-300 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {criptomoedas.map((crypto) => (
                      <option key={crypto.id_cripto} value={crypto.id_cripto}>
                        {crypto.simbolo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="edit_data_publicacao" className="block text-sm font-medium text-gray-700">
                    Data
                  </label>
                  <input
                    type="date"
                    id="edit_data_publicacao"
                    value={editingNoticia.data_publicacao}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, data_publicacao: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="edit_tema" className="block text-sm font-medium text-gray-700">
                    Tema
                  </label>
                  <input
                    type="text"
                    id="edit_tema"
                    value={editingNoticia.tema}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, tema: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="edit_noticia" className="block text-sm font-medium text-gray-700">
                    Notícia
                  </label>
                  <textarea
                    id="edit_noticia"
                    value={editingNoticia.noticia}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, noticia: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="edit_fonte" className="block text-sm font-medium text-gray-700">
                    Fonte
                  </label>
                  <input
                    type="text"
                    id="edit_fonte"
                    value={editingNoticia.fonte}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, fonte: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingNoticia(null)}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
