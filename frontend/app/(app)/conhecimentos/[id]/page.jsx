"use client";

import CadastroConhecimentoForm from "../../../../components/conhecimento/CadastroConhecimentoForm";
import { useParams } from "next/navigation";

export default function EditarConhecimentoPage() {
  const params = useParams();
  const conhecimentoId = params.id;

  return <CadastroConhecimentoForm conhecimentoId={conhecimentoId} />;
}