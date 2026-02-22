import React from "react";

export function Alert({type = "info", children}) {
    if (!children) return null;

    const style = {
        padding: 10,
        borderRadius: 10,
        fontSize: 13,
        border: "1px solid #ddd",
        background: type === "error" ? "#fdecec" : "#eaf8ef",
    }

    return <div style={style}>{children}</div>
}