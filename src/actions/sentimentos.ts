export interface Sentimento {
  id_sentimento: number;
  id_usuario: number;
  sentimento: string;
  score_sentimento: number;
}

export type Usuario = {
  id_usuario: number;
  nome: string;
  email: string;
};

export async function createSentimento(
  id_noticia: number,
  data: Omit<Sentimento, "id_sentimento">
) {
  return await fetch("http://localhost:8000/sentimentos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_noticia, ...data }),
  });
}

export async function updateSentimento(
  id_noticia: number,
  data: Omit<Sentimento, "id_sentimento">
) {
  return await fetch("http://localhost:8000/sentimentos/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_noticia,
      id_usuario: data.id_usuario,
      novo_sentimento: data.sentimento,
      novo_score: data.score_sentimento,
    }),
  });
}

export async function deleteSentimento(id_noticia: number, id_sentimento: number) {
  return await fetch(
    `http://localhost:8000/sentimentos/${id_noticia}/${id_sentimento}`,
    {
      method: "DELETE",
    }
  );
}
