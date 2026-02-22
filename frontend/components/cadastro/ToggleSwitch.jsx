"use client";

export function ToggleSwitch({ id, label, checked, onChange, disabled = false }) {
  return (
    <label className={`toggle ${disabled ? "is-disabled" : ""}`} htmlFor={id}>
      {label ? <span className="toggle-label">{label}</span> : null}

      <input
        id={id}
        className="toggle-input"
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />

      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
    </label>
  );
}