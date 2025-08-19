import React, { useEffect, useState } from "react";
import {
  Info as IconInfo,
  Briefcase as IconBriefcase,
  Upload as IconUpload,
  Mail as IconMail,
} from "lucide-react";

/**
 * MashBond — App.jsx
 * - Logo centered, clickable → Home
 * - Bigger logo (140px)
 * - Nav icons + text
 * - Top-right buttons (Lang + Contact)
 * - Masthead fades/hides on scroll
 * - **Removed divider line** under nav
 */

export default function App() {
  return <Router />;
}

/* ---------------------------- Router & Layout ---------------------------- */
function Router() {
  const [route, setRoute] = useState(getRoute());
  const [lang, setLang] = useState("en");
  const t = getT(lang);

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header t={t} lang={lang} setLang={setLang} />
      <HeaderSpacer />
      {route === "home" && <Home t={t} />}
      {route === "about" && <About t={t} />}
      {route === "services" && <Services t={t} />}
      {route === "member-upload" && <MemberUpload t={t} />}
      {route === "contact" && <Contact t={t} />}
      {!["home", "about", "services", "member-upload", "contact"].includes(route) && (
        <PageShell title="404">
          <p className="mt-4 text-gray-700">Page not found.</p>
        </PageShell>
      )}
      <Footer t={t} />
    </div>
  );
}

function getRoute() {
  const hash = (window.location.hash || "").replace(/^#\/?/, "");
  return hash || "home";
}

/* --------------------------------- Header -------------------------------- */
function Header({ t, lang, setLang }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setHidden(y > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-white">
      {/* Utility bar (top-right actions) */}
      <div className="mx-auto max-w-6xl px-4 pt-3">
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="pointer-events-auto rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
          >
            {lang === "zh" ? "English" : "简体中文"}
          </button>
          <a
            className="pointer-events-auto rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            href="#/contact"
          >
            {t.contact_cta}
          </a>
        </div>
      </div>

      {/* Centered masthead */}
      <div
        className={[
          "transition-all duration-300 ease-out",
          "mx-auto max-w-6xl px-4",
          hidden ? "opacity-0 -translate-y-3 pointer-events-none" : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        <div className="pt-2 text-center">
          {/* Logo */}
          <a href="#/">
            <img
              src="/logo.png"
              alt="MashBond Logo"
              className="mx-auto object-contain hover:opacity-90 transition"
              style={{ maxHeight: "140px" }}
              loading="eager"
              decoding="async"
            />
          </a>

          {/* Nav (no divider line, just spacing below) */}
          <nav className="mt-3 flex items-center justify-center gap-10 text-sm font-medium text-gray-700">
            <a href="#/about" className="flex items-center gap-2 hover:text-indigo-700">
              <IconInfo className="w-4 h-4 text-indigo-600" /> {t.nav_about}
            </a>
            <a href="#/services" className="flex items-center gap-2 hover:text-indigo-700">
              <IconBriefcase className="w-4 h-4 text-indigo-600" /> {t.nav_services}
            </a>
            <a href="#/member-upload" className="flex items-center gap-2 hover:text-indigo-700">
              <IconUpload className="w-4 h-4 text-indigo-600" /> {t.nav_member}
            </a>
            <a href="#/contact" className="flex items-center gap-2 hover:text-indigo-700">
              <IconMail className="w-4 h-4 text-indigo-600" /> {t.nav_contact}
            </a>
          </nav>
          <div className="pb-3" /> {/* spacing only */}
        </div>
      </div>
    </header>
  );
}

function HeaderSpacer() {
  return <div className="h-[200px] md:h-[220px]" />;
}

/* --------------------------------- Footer -------------------------------- */
function Footer({ t }) {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} MashBond. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#/about" className="hover:text-indigo-700">
            {t.nav_about}
          </a>
          <a href="#/services" className="hover:text-indigo-700">
            {t.nav_services}
          </a>
          <a href="#/member-upload" className="hover:text-indigo-700">
            {t.nav_member}
          </a>
          <a href="#/contact" className="hover:text-indigo-700">
            {t.nav_contact}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- Pages (shortened here for clarity) ------------------------------- */
/* keep your Home, About, Services, MemberUpload, Contact, PageShell, Card, InfoCard code as before */

... (your existing Home, About, Services, MemberUpload, Contact components stay the same) ...

/* ------------------------------ i18n & helpers --------------------------- */
const i18n = {
  zh: { /* ...same as before... */ },
  en: { /* ...same as before... */ },
};

function getT(lang) {
  const base = i18n[lang] || i18n.en;
  return { ...i18n.en, ...base, kv: { ...i18n.en.kv, ...(base.kv || {}) } };
}
