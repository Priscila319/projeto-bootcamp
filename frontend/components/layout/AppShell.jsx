"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ title, subtitle, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      {open ? <div className="overlay" onClick={() => setOpen(false)} /> : null}

      <Sidebar title={title}
        subtitle={subtitle} open={open} onClose={() => setOpen(false)} />

      <div className="main">
        <Topbar />

        <main className="content">{children}</main>
      </div>
    </div>
  );
}