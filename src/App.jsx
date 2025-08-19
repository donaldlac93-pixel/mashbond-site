import React, { useEffect, useState } from "react";

/**
 * MashBond — App.jsx
 * - Centered masthead: logo centered (clickable → Home), categories under logo
 * - Top-right: Language toggle + Contact button
 * - Masthead fades/hides on scroll
 * - Nav sits ABOVE a subtle divider line
 * - Small inline SVG icons (no extra dependencies)
 * - Logo cap: 140px (adjust in Header style if needed)
 * - Logo path: /public/logo.png
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
    <header className="fixed inset-x-0 top-0 z-30 bg-white/95 backdrop-blur">
      {/* Utility bar (top-right actions) */}
      <div className="mx-auto max-w-6xl px-4 pt-1">
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
          hidden ? "opacity-0 -translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
        ].join(" ")}
      >
        <div className="pt-0 text-center">
          {/* Logo → Home; larger cap */}
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

          {/* NAV ABOVE the line */}
          <nav className="mt-3 flex items-center justify-center gap-8 text-sm font-medium text-gray-700">
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

          {/* Divider line BELOW the nav */}
          <div className="mt-3 h-px bg-gray-100" />
          <div className="pb-3" />
        </div>
      </div>
    </header>
  );
}

/* Reserve space so content doesn't slide under the fixed header */
function HeaderSpacer() {
  return <div className="h-[160px] md:h-[180px]" />;
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
          <a href="#/about" className="hover:text-indigo-700">{t.nav_about}</a>
          <a href="#/services" className="hover:text-indigo-700">{t.nav_services}</a>
          <a href="#/member-upload" className="hover:text-indigo-700">{t.nav_member}</a>
          <a href="#/contact" className="hover:text-indigo-700">{t.nav_contact}</a>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Pages -------------------------------- */
function Home({ t }) {
  // Icons for value cards to add visual interest
  const valueIcons = [IconTarget, IconRocket, IconChart];
  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-indigo-50 to-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-700">
              {t.tagline}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              <span>{t.hero_line1}</span>
              <span className="block">{t.hero_line2}</span>
            </h1>
            <p className="mt-5 max-w-xl text-gray-600">{t.hero_sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="rounded-xl bg-indigo-600 px-5 py-3 text-white" href="#/services">
                {t.primary_cta}
              </a>
              <a className="rounded-xl border border-indigo-200 px-5 py-3 text-indigo-700" href="#/about">
                {t.secondary_cta}
              </a>
            </div>
          </div>

          {/* Quick info cards */}
          <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <InfoCard label={t.kv.positioning_label} value={t.kv.positioning} />
              <InfoCard label={t.kv.mission_label} value={t.kv.mission} />
              <InfoCard label={t.kv.vision_label} value={t.kv.vision} />
              <InfoCard label={t.kv.keywords_label} value={t.kv.keywords} />
            </ul>
          </div>
        </div>
      </section>

      {/* Value */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 md:text-3xl">
          <IconStar className="w-6 h-6 text-indigo-600" /> {t.value_title}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.value_cards.map((c, idx) => {
            const Icon = valueIcons[idx % valueIcons.length];
            return <Card key={c.title} title={c.title} desc={c.desc} Icon={Icon} />;
          })}
        </div>
      </section>
    </>
  );
}

function About({ t }) {
  return (
    <PageShell
      title={
        <span className="flex items-center gap-2">
          <IconInfo className="w-6 h-6 text-indigo-600" /> {t.about_title}
        </span>
      }
    >
      <div className="mt-4 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        <p className="text-gray-700">{t.about_blurb_1}</p>
        <p className="text-gray-700">{t.about_blurb_2}</p>
      </div>
    </PageShell>
  );
}

function Services({ t }) {
  const serviceIcons = [
    IconBriefcase,
    IconBuilding,
    IconTruck,
    IconBoxes,
    IconMegaphone,
    IconLink,
  ];
  return (
    <PageShell
      title={
        <span className="flex items-center gap-2">
          <IconBriefcase className="w-6 h-6 text-indigo-600" /> {t.services_title}
        </span>
      }
      padded
    >
      <p className="max-w-4xl text-gray-700">{t.services_intro}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {t.services_list.map((s, idx) => {
          const Icon = serviceIcons[idx % serviceIcons.length];
          return <Card key={s.title} title={s.title} desc={s.desc} Icon={Icon} />;
        })}
      </div>
    </PageShell>
  );
}

function MemberUpload({ t }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  function onSelect(e) {
    const input = e.currentTarget || e.target;
    const list = input && input.files ? input.files : [];
    const fs = Array.from(list);
    setFiles(fs);

    const readers = fs.map(
      (f) =>
        new Promise((res) => {
          const reader = new FileReader();
          reader.onload = (ev) => res({ name: f.name, src: ev.target.result });
          reader.readAsDataURL(f);
        })
    );
    Promise.all(readers).then(setPreviews);
  }

  function clearAll() {
    setFiles([]);
    setPreviews([]);
    const input = document.getElementById("member-files");
    if (input) input.value = "";
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 md:text-3xl">
        <IconUpload className="w-6 h-6 text-indigo-600" /> {t.member_title}
      </h2>
      <p className="mt-4 max-w-3xl text-gray-700">{t.member_blurb}</p>

      <div className="mt-8 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700">
          {t.upload_select}
        </label>
        <input
          id="member-files"
          type="file"
          accept="image/*"
          multiple
          onChange={onSelect}
          className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 focus:border-indigo-600 focus:outline-none"
        />
        <p className="mt-2 text-xs text-gray-500">{t.upload_hint}</p>

        {previews.length > 0 && (
          <>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {previews.map((p) => (
                <div
                  key={p.name}
                  className="overflow-hidden rounded-xl border border-gray-100"
                >
                  <img
                    src={p.src}
                    alt={p.name}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="truncate px-2 py-1 text-xs text-gray-600">
                    {p.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 hover:bg-indigo-50"
              >
                {t.upload_clear}
              </button>
              <button
                type="button"
                className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
                title="Demo only — files are not uploaded yet."
                onClick={() => alert(t.upload_demo_alert)}
              >
                {t.upload_submit}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Contact({ t }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 md:text-3xl">
            <IconMail className="w-6 h-6 text-indigo-600" /> {t.contact_title}
          </h2>
          <p className="mt-4 text-gray-700">{t.contact_blurb}</p>
          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>{t.contact_email}: hello@mashbond.com</li>
            <li>{t.contact_address}: Los Angeles · USA</li>
          </ul>
        </div>
        <form className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700">
            {t.form_name}
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:border-indigo-600 focus:outline-none"
            placeholder={t.form_name_ph}
          />
          <label className="mt-4 block text-sm font-medium text-gray-700">
            {t.form_email}
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:border-indigo-600 focus:outline-none"
            placeholder={t.form_email_ph}
          />
          <label className="mt-4 block text-sm font-medium text-gray-700">
            {t.form_need}
          </label>
          <textarea
            className="mt-1 h-28 w-full rounded-xl border border-gray-200 px-3 py-2 focus:border-indigo-600 focus:outline-none"
            placeholder={t.form_need_ph}
          />
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700"
          >
            {t.form_submit}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------- UI Helpers ------------------------------ */
function PageShell({ title, children, bg, padded }) {
  return (
    <section className={bg ? "bg-indigo-50/50" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
        <div className={padded ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

function Card({ title, desc, Icon }) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="w-5 h-5 text-indigo-600" /> : null}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-gray-700">{desc}</p>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <li className="rounded-xl border border-gray-100 p-4">
      <p className="text-xs text-indigo-700">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </li>
  );
}

/* ------------------------------ Tiny SVG Icons --------------------------- */
/* (inline to avoid extra dependencies) */
function IconInfo({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
function IconBriefcase({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 13h20" />
    </svg>
  );
}
function IconUpload({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 5 17 10" />
      <line x1="12" y1="5" x2="12" y2="15" />
    </svg>
  );
}
function IconMail({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function IconStar({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.77 5.82 22 7 14.15l-5-4.88 6.91-1.01L12 2z" />
    </svg>
  );
}
function IconTarget({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  );
}
function IconRocket({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4" />
      <path d="M6 6h3l7 7 2-2a7 7 0 0 0-9.9-9.9l-2 2z" />
      <path d="M4 14l-1 5 5-1 9-9" />
      <circle cx="15" cy="9" r="1" />
    </svg>
  );
}
function IconChart({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="8" />
      <rect x="10" y="8" width="4" height="12" />
      <rect x="17" y="4" width="4" height="16" />
    </svg>
  );
}
function IconBuilding({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
  );
}
function IconTruck({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <path d="M16 8h4l3 3v5h-7z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
function IconBoxes({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 17l9 4 9-4" />
      <path d="M3 12l9 4 9-4" />
    </svg>
  );
}
function IconMegaphone({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11v2a1 1 0 0 0 1 1h2l5 5V5L6 10H4a1 1 0 0 0-1 1z" />
      <path d="M14 7a4 4 0 0 1 0 10" />
    </svg>
  );
}
function IconLink({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 1 1-7-7l1-1" />
    </svg>
  );
}

/* ------------------------------ i18n & helpers --------------------------- */
const i18n = {
  zh: {
    nav_about: "关于我们",
    nav_services: "业务板块",
    nav_member: "会员上传",
    nav_contact: "联系我们",
    contact_cta: "联系我们",
    primary_cta: "查看业务",
    secondary_cta: "了解我们",
    tagline: "咨询为先 · S2B2C 跨境生态圈",
    hero_line1: "美销邦 MashBond —",
    hero_line2: "让亚洲在此发光",
    hero_sub: "使命：赋能 · 连接 · 增长 ｜ 核心理念：先赋能，共成长。",
    kv: {
      positioning_label: "定位",
      positioning: "S2B2C 跨境生态圈",
      mission_label: "使命",
      mission: "赋能 · 连接 · 增长",
      vision_label: "核心理念",
      vision: "先赋能，共成长",
      keywords_label: "关键词",
      keywords: "品牌 · 创作者 · 物流 · 媒体 · AI",
    },
    value_title: "核心价值（咨询为先）",
    value_cards: [
      { title: "咨询先行", desc: "以市场研究、品牌诊断与策略为起点，明确切入与渠道优先级。" },
      { title: "一站式落地", desc: "从本地化包装、营销投放到跨境物流与售后。" },
      { title: "数据驱动", desc: "用可量化指标与复盘机制持续优化投入产出。" },
    ],
    about_title: "关于我们",
    about_blurb_1:
      "MashBond（美销邦）以“咨询为先”连接品牌、创作者、媒体与供应链，帮助亚洲品牌高效出海并实现长期增长。",
    about_blurb_2:
      "我们通过市场研究、渠道优先级与执行方法论，结合线下展示与跨境履约，确保策略落地与持续增长。",
    services_title: "业务板块",
    services_intro:
      "从诊断与策略到落地执行：为品牌提供市场进入、内容营销与跨境物流的一体化方案。",
    services_list: [
      { title: "顾问对接", desc: "品牌诊断、市场进入与渠道优先级规划。" },
      { title: "LA 展示厅租赁", desc: "线下场景展示与商务接待，提高转化。" },
      { title: "物流与海外仓", desc: "美国/加拿大/墨西哥多仓，退换修与尾程派送。" },
      { title: "BBS 供销平台", desc: "批发与一件代发，分销邀请码与社交裂变。" },
      { title: "MASHLAB 营销案例", desc: "网红推广、UGC 方案与复盘数据。" },
      { title: "合作入口", desc: "提交意向表或 API 对接，快速启动合作。" },
    ],
    contact_title: "联系 MashBond",
    contact_blurb: "留下您的需求，我们将为您制定跨境增长方案。",
    contact_email: "邮箱",
    contact_address: "地址",
    form_name: "姓名",
    form_email: "邮箱",
    form_need: "需求",
    form_name_ph: "您的名字",
    form_email_ph: "you@example.com",
    form_need_ph: "请告诉我们您的品牌与目标",
    form_submit: "提交",
    member_title: "会员上传",
    member_blurb:
      "选择图片进行预览（演示版，不会保存到服务器）。后续可接入云存储或邮箱投递。",
    upload_select: "选择图片文件（可多选）",
    upload_hint: "仅本地预览，不会上传到服务器。",
    upload_clear: "清空",
    upload_submit: "发送（演示）",
    upload_demo_alert:
      "演示模式：目前不会上传。可后续接入 Cloudinary、S3 或邮件投递。",
  },

  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_member: "Member Upload",
    nav_contact: "Contact",
    contact_cta: "Contact Us",
    primary_cta: "View Services",
    secondary_cta: "About Us",
    tagline: "Consulting First · S2B2C Cross-Border Ecosystem",
    hero_line1: "MashBond — Let Asia Shine Globally",
    hero_line2: "",
    hero_sub:
      "Mission: Empower · Connect · Grow | Core Principle: Enable first, grow together.",
    kv: {
      positioning_label: "Positioning",
      positioning: "S2B2C Cross-Border Ecosystem",
      mission_label: "Mission",
      mission: "Empower · Connect · Grow",
      vision_label: "Core Principle",
      vision: "Enable first, grow together",
      keywords_label: "Keywords",
      keywords: "Brand · Creators · Logistics · Media · AI",
    },
    value_title: "Our Core Value (Consulting First)",
    value_cards: [
      {
        title: "Consulting-led",
        desc: "Start with research, diagnosis, and strategy to define market entry and channel priorities.",
      },
      {
        title: "End-to-end Execution",
        desc: "From localization and marketing to cross-border logistics and after-sales.",
      },
      {
        title: "Data-Driven",
        desc: "Continuous optimization with measurable metrics and retrospectives.",
      },
    ],
    about_title: "Who We Are",
    about_blurb_1:
      "MashBond connects brands, creators, media and supply chain with a consulting-first approach to help Asian brands scale globally.",
    about_blurb_2:
      "We combine market research, channel prioritization and execution methodology with offline showrooming and cross-border fulfillment.",
    services_title: "What We Do",
    services_intro:
      "From diagnosis & strategy to execution: market entry, creator marketing and cross-border logistics in one plan.",
    services_list: [
      { title: "Consulting Desk", desc: "Brand diagnosis, entry strategy and channel prioritization." },
      { title: "LA Showroom Rental", desc: "Physical showcase & meetings to boost conversion." },
      { title: "Logistics & Overseas Warehouses", desc: "US/CA/MX multi-warehouse, reverse logistics & last-mile." },
      { title: "B2B/BBS Supply Platform", desc: "Wholesale & dropship with referral/invite mechanics." },
      { title: "MASHLAB Marketing", desc: "Influencer/UGC campaigns with measurable results." },
      { title: "Cooperation Entry", desc: "Submit intent form or connect via API to start quickly." },
    ],
    contact_title: "Contact MashBond",
    contact_blurb:
      "Tell us your needs and we will propose a cross-border growth plan.",
    contact_email: "Email",
    contact_address: "Address",
    form_name: "Name",
    form_email: "Email",
    form_need: "Your Needs",
    form_name_ph: "Your name",
    form_email_ph: "you@example.com",
    form_need_ph: "Tell us about your brand & goals",
    form_submit: "Send",
    member_title: "Member Upload",
    member_blurb:
      "Select images to preview. This demo does not store files yet. We can connect cloud storage or email submission next.",
    upload_select: "Choose image files (multi-select)",
    upload_hint: "Local preview only — nothing is uploaded.",
    upload_clear: "Clear",
    upload_submit: "Send (Demo)",
    upload_demo_alert:
      "Demo mode: nothing will be uploaded. We can wire Cloudinary, S3, or email delivery later.",
  },
};

function getT(lang) {
  const base = i18n[lang] || i18n.en;
  return { ...i18n.en, ...base, kv: { ...i18n.en.kv, ...(base.kv || {}) } };
}
