/* --------------------------------- Header -------------------------------- */
function Header({ t, lang, setLang }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo + Brand */}
        <a href="#/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.png"
            alt="MashBond Logo"
            loading="eager"
            decoding="async"
            className="object-contain"
          />
          <span className="text-lg font-bold tracking-wide text-gray-900 md:text-xl">
            MashBond
          </span>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#/about" className="hover:text-indigo-700">{t.nav_about}</a>
          <a href="#/services" className="hover:text-indigo-700">{t.nav_services}</a>
          <a href="#/member-upload" className="hover:text-indigo-700">{t.nav_member}</a>
          <a href="#/contact" className="hover:text-indigo-700">{t.nav_contact}</a>
        </nav>

        {/* Lang toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
          >
            {lang === "zh" ? "English" : "简体中文"}
          </button>
          <a
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            href="#/contact"
          >
            {t.contact_cta}
          </a>
        </div>
      </div>
    </header>
  );
}
