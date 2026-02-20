export function FormCard({ title, children }) {
    return (
        <div className="page">
            <div className="container">
                <div className="card">
                    <h1 className="form-title">{title}</h1>
                    {children}
                </div>
            </div>
        </div>
    );
}