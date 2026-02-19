import React from "react";

export function FormField({ label, error, ...inputProps }) {
    const temError = Boolean(error);

    return (
        <div style={{ display: "grid", gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>

            <input
                {...inputProps}
                style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1px solid ${temError ? "#d33" : "#ccc"}`,
                    outline: "none",
                    fontSize: 14,
                }}
            />

            {temError && <div style={{ color: "#d33", fontSize: 12 }}>{error}</div>}

        </div>
    );
}