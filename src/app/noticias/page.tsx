import { Noticia, Criptomoeda } from "@/actions/noticias";

import Noticias from "@/components/Noticias";

const NoticiasPage = async () => {
  const noticiasRes = await fetch("http://localhost:8000/noticias/");
  const noticias: Noticia[] = await noticiasRes.json();

  const criptomoedasRes = await fetch("http://localhost:8000/criptomoedas/");
  const criptomoedas: Criptomoeda[] = await criptomoedasRes.json();

  return (
    <div>
      <h1>Notícias</h1>

      <Noticias noticias={noticias} criptomoedas={criptomoedas} />
    </div>
  );
};

export default NoticiasPage;
