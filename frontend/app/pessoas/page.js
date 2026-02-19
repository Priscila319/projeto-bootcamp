import Link from "next/link";

export default async function PagePessoas() {
    return (
        <>
        <h1>Página Pessoas</h1>
        <Link href={"./pessoas/cadastro"}>Cadastrar Pessoa</Link>
        </>
    )
}