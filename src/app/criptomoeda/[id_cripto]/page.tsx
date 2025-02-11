// app/criptomoeda/[id_cripto]/page.tsx
import { notFound } from "next/navigation";

interface Params {
  id_cripto: string;
}

export default async function CriptomoedaPage({ params }: { params: Promise<Params> }) {
  const { id_cripto } = await params;

  // Replace the URL below with your actual backend API endpoint
  const res = await fetch(
    `http://localhost:8000/imagens/criptomoedas/${id_cripto}`
  );

  if (!res.ok) {
    // If the fetch fails, display a not found page
    return notFound();
  }

  // Assuming the API returns the Base64 string directly as plain text
  const imageBase64 = await res.json();

  return (
    <img
      src={`data:image/png;base64,${imageBase64["image"]}`}
      alt={`Criptomoeda ${id_cripto}`}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}
