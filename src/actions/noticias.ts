export interface Noticia {
  id_noticia: number;
  id_cripto: number;
  data_publicacao: string; // ISO string from Python date
  tema: string;
  noticia: string;
  fonte: string;
  score_medio: number;
}

export interface Criptomoeda {
  id_cripto: number;
  nome: string;
  simbolo: string;
}

export async function createNoticia(data: Omit<Noticia, "id_noticia">) {
  return await fetch("http://localhost:8000/noticias/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateNoticia(id: number, data: Noticia) {
  return await fetch(`http://localhost:8000/noticias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteNoticia(id: number) {
  return await fetch(`http://localhost:8000/noticias/${id}`, {
    method: "DELETE",
  });
}
