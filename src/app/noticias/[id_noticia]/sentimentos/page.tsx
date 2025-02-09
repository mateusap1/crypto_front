import Sentimentos from "@/components/Sentimentos";
import { Sentimento, Usuario } from "@/actions/sentimentos";

const SentimentosPage = async ({ params }: { params: { id_noticia: string } }) => {
  const id_noticia = Number(params.id_noticia);

  const sentimentosRes = await fetch(`http://localhost:8000/noticias/${id_noticia}/sentimentos`);
  const sentimentos: Sentimento[] = await sentimentosRes.json();

  const usuariosRes = await fetch("http://localhost:8000/usuarios/");
  const usuarios: Usuario[] = await usuariosRes.json();

  return (
    <div>
      <h1>Sentimentos</h1>
      <Sentimentos sentimentos={sentimentos} usuarios={usuarios} id_noticia={id_noticia} />
    </div>
  );
};

export default SentimentosPage;
