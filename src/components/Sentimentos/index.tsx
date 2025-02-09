"use client";

import { useState } from "react";
import {
  createSentimento,
  updateSentimento,
  deleteSentimento,
  Sentimento,
  Usuario,
} from "@/actions/sentimentos";

type SentimentosProps = {
  sentimentos: Sentimento[];
  usuarios: Usuario[];
  id_noticia: number;
};

export default function Sentimentos({ sentimentos, usuarios, id_noticia }: SentimentosProps) {
  // State for creating a new sentimento.
  // Note: We omit the id_noticia since it's provided as a prop.
  const [newSentimento, setNewSentimento] = useState<Omit<Sentimento, "id_noticia">>({
    id_usuario: usuarios.length ? usuarios[0].id_usuario : 0,
    sentimento: "",
    score_sentimento: 0,
  });

  // State for editing an existing sentimento.
  const [editingSentimento, setEditingSentimento] = useState<Sentimento | null>(null);

  const handleCreate = async () => {
    // Combine the passed-in id_noticia with the rest of the newSentimento data.
    const res = await createSentimento(id_noticia, newSentimento);

    if (res.ok) {
      window.location.reload();
    } else {
      console.error("Error creating sentimento:", await res.text());
    }
  };

  const handleDelete = async (id_usuario: number) => {
    if (confirm("Are you sure you want to delete this sentimento?")) {
      const res = await deleteSentimento(id_noticia, id_usuario);

      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Error deleting sentimento:", await res.text());
      }
    }
  };

  const handleEdit = (s: Sentimento) => {
    setEditingSentimento(s);
  };

  const handleUpdate = async () => {
    if (!editingSentimento) return;
    const res = await updateSentimento(id_noticia, editingSentimento);

    if (res.ok) {
      window.location.reload();
    } else {
      console.error("Error updating sentimento:", await res.text());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Table of Sentimentos */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sentimento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sentimentos.map((s) => (
                  <tr key={`${id_noticia}-${s.id_usuario}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuarios.find((u) => u.id_usuario === s.id_usuario)?.nome || s.id_usuario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {s.sentimento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {s.score_sentimento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id_usuario)}
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

        {/* Form to Add a New Sentimento */}
        <div className="bg-white text-gray-900 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Add New Sentimento</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="id_usuario" className="block text-sm font-medium text-gray-700">
                Usuário
              </label>
              <select
                id="id_usuario"
                value={newSentimento.id_usuario}
                onChange={(e) =>
                  setNewSentimento({ ...newSentimento, id_usuario: parseInt(e.target.value) })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {usuarios.map((user) => (
                  <option key={user.id_usuario} value={user.id_usuario}>
                    {user.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sentimento" className="block text-sm font-medium text-gray-700">
                Sentimento
              </label>
              <input
                type="text"
                id="sentimento"
                value={newSentimento.sentimento}
                onChange={(e) =>
                  setNewSentimento({ ...newSentimento, sentimento: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="score_sentimento" className="block text-sm font-medium text-gray-700">
                Score
              </label>
              <input
                type="number"
                step="0.01"
                id="score_sentimento"
                value={newSentimento.score_sentimento}
                onChange={(e) =>
                  setNewSentimento({ ...newSentimento, score_sentimento: parseFloat(e.target.value) })
                }
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

        {/* Modal to Edit an Existing Sentimento */}
        {editingSentimento && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg text-gray-900 p-6 max-w-2xl w-full">
              <h2 className="text-xl font-semibold mb-6">Edit Sentimento</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="edit_id_usuario" className="block text-sm font-medium text-gray-700">
                    Usuário
                  </label>
                  <select
                    id="edit_id_usuario"
                    value={editingSentimento.id_usuario}
                    onChange={(e) =>
                      setEditingSentimento({
                        ...editingSentimento,
                        id_usuario: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {usuarios.map((user) => (
                      <option key={user.id_usuario} value={user.id_usuario}>
                        {user.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="edit_sentimento" className="block text-sm font-medium text-gray-700">
                    Sentimento
                  </label>
                  <input
                    type="text"
                    id="edit_sentimento"
                    value={editingSentimento.sentimento}
                    onChange={(e) =>
                      setEditingSentimento({
                        ...editingSentimento,
                        sentimento: e.target.value,
                      })
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="edit_score_sentimento" className="block text-sm font-medium text-gray-700">
                    Score
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="edit_score_sentimento"
                    value={editingSentimento.score_sentimento}
                    onChange={(e) =>
                      setEditingSentimento({
                        ...editingSentimento,
                        score_sentimento: parseFloat(e.target.value),
                      })
                    }
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
                    onClick={() => setEditingSentimento(null)}
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
