import { NavLink, Link, useLocation } from "react-router-dom";
import { topics } from "../data/topics";
import { Menu, X } from "lucide-react";
import * as Icons from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <button className="mobile-toggle" onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`sidebar-overlay ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <h1>
              Algo<span>Rhythm</span> JS
            </h1>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {topics.map((group) => (
            <div key={group.category}>
              <div className="sidebar-category">{group.category}</div>
              {group.items.map((item) => {
                const Icon = Icons[item.icon];
                return (
                  <NavLink
                    key={item.slug}
                    to={`/${item.slug}`}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? "active" : ""}`
                    }
                  >
                    {Icon && <Icon size={16} />}
                    {item.title}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
