const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function postJSON(endpoint, data) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    let body = null;

    try {
        body = await resp.json();
    } catch {
        body = null;
    }

    if (!resp.ok) {
        throw new Error(body?.error || "Erro ao enviar a requisição.");
    }

    return body;
}

export async function getJSON(endpoint) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const resp = await fetch(url, {
        method: "GET",
        credentials: "include",
    });

    let body = null;
    try { body = await resp.json(); } catch { }

    if (!resp.ok) {
        throw new Error(body?.error || "Erro ao buscar dados.");
    }
    return body;
}

export async function putJSON(endpoint, data) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const resp = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    let body = null;
    try { body = await resp.json(); } catch { }

    if (!resp.ok) {
        throw new Error(body?.error || "Erro ao atualizar.");
    }
    return body;
}

export async function deleteJSON(endpoint) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const resp = await fetch(url, { method: "DELETE", credentials: "include" });

    let body = null;
    try { body = await resp.json(); } catch { }

    if (!resp.ok) {
        throw new Error(body?.error || "Erro ao apagar.");
    }
    return body;
}