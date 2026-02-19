export async function postJSON(url, data) {
    const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    let body = null;

    try {
        body = await resposta.json();
    } catch {
        body = null;
    }

    if (!resposta.ok) {
        const mensagem = body?.mensagem || "Erro ao enviar a requisição.";
        throw new Error(mensagem);
    }

    return body;
}