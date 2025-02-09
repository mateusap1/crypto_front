export interface Noticia {
  id_noticia: number;
  id_cripto: number;
  data_publicacao: string; // ISO string from Python date
  tema: string;
  noticia: string;
  fonte: string;
}

export interface Criptomoeda {
  id_cripto: number;
  nome: string;
  simbolo: string;
}

export async function createNoticia(data: Omit<Noticia, "id_noticia">) {
  const res = await fetch("http://localhost:8000/noticias/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res

  // if (!res.ok) {
  //   throw new Error("Failed to create noticia"); // Handle errors
  // }

  // revalidatePath("/noticias"); // Revalidate the page cache
  // redirect("/noticias"); // Redirect to the noticias page
}

export async function updateNoticia(id: number, data: Noticia) {
  console.log(data)
  const res = await fetch(`http://localhost:8000/noticias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res

  // if (!res.ok) {
  //   throw new Error("Failed to update noticia");
  // }

  // revalidatePath("/noticias");
  // redirect("/noticias");
}

export async function deleteNoticia(id: number) {
  const res = await fetch(`http://localhost:8000/noticias/${id}`, {
    method: "DELETE",
  });

  return res;

  // if (!res.ok) {
  //   throw new Error("Failed to delete noticia");
  // }

  // revalidatePath("/noticias");
  // redirect("/noticias");
}
