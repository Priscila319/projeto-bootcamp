const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function postJSON(endpoint, data) {
    const url = `${API_BASE_URL}/${endpoint}`;
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

export async function getJSON(endpoint) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const resp = await fetch(url);

    let body = null;
    try { body = await resp.json(); } catch { }

    if (!resp.ok) {
        throw new Error(body?.mensagem || "Erro ao buscar dados.");
    }
    return body;
}

export async function putJSON(endpoint, data) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const resp = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    let body = null;
    try { body = await resp.json(); } catch { }

    if (!resp.ok) {
        throw new Error(body?.error || body?.mensagem || "Erro ao atualizar.");
    }
    return body;
}

export async function deleteJSON(endpoint) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`;
    const resp = await fetch(url, { method: "DELETE" });

    let body = null;
    try { body = await resp.json(); } catch { }

    if (!resp.ok) {
        throw new Error(body?.error || body?.mensagem || "Erro ao apagar.");
    }
    return body;
}