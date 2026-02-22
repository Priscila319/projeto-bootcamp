"use client";

import CadastroPessoaForm from "../../../../components/pessoa/CadastroPessoaForm";
import { useParams } from "next/navigation";

export default function EditarPessoaPage() {
  const params = useParams();
  const pessoaId = params.id;

  return <CadastroPessoaForm pessoaId={pessoaId} />;
}
