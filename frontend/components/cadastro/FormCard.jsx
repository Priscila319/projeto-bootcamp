"use client";
import Link from "next/link";

export function FormCard({ title, backHref, backLabel = "Voltar", children }) {
    return (
        <div className="page">
            <div className="container">
                <div className="card">
                    <div className="form-header">
                        <div>
                            <h1 className="form-title">{title}</h1>
                        </div>
                        {backHref ? (
                            <Link className="btn btn-ghost" href={backHref}>
                                {backLabel}
                            </Link>
                        ) : null}
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}