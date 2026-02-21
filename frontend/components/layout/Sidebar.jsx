"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LiaHomeSolid,
  LiaUserFriendsSolid,
  LiaBookSolid,
} from "react-icons/lia";

function NavItem({ href, icon: Icon, title, desc }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link className={`nav-item ${active ? "is-active" : ""}`} href={href}>
      <Icon className="nav-icon" />
      <span className="nav-text">
        <span className="nav-title">{title}</span>
        <span className="nav-desc">{desc}</span>
      </span>
    </Link>
  );
}

export default function Sidebar({ title, subtitle, open, onClose }) {
  return (
    <aside className={`sidebar ${open ? "is-open" : ""}`}>
      <div className="sidebar-brand">
        <div>
          <div className="sidebar-brand-title">{title}</div>
          <div className="sidebar-brand-sub">{subtitle}</div>
        </div>
      </div>

      <nav className="sidebar-nav" onClick={onClose}>
        <NavItem href="/dashboard" icon={LiaHomeSolid} title="Dashboard" desc="Visão geral" />
        <NavItem href="/pessoas" icon={LiaUserFriendsSolid} title="Pessoas" desc="Cadastros" />
        <NavItem href="/conhecimentos" icon={LiaBookSolid} title="Conhecimentos" desc="Base de saberes" />
      </nav>
    </aside>
  );
}