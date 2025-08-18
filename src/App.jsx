import React, { useEffect, useState } from "react";

/**
 * MashBond — 4 pages with bilingual toggle (EN ⇄ ZH)
 * Pages: Home, About, Services, Contact
 * Hash routes: #/, #/about, #/services, #/contact
 * Light two-color theme (white + sky). Photos optional.
 *
 * Optional images you can add later to /public/images/:
 * - hero.jpg   (homepage visual)
 */

export default function App() {
  return <Router />;
}

/* ---------------------------- Router & Layout ---------------------------- */
function Router() {
  const [route, setRoute] = useState(getRoute());
  const [lang, setLang] = useState("en"); // default English (change to "zh" if you prefer)
  const t = getT(lang);

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header t={t} lang={lang} setLang={setLang} />
      {route === "home" && <Home t={t} />}
      {route === "about" && (
        <PageShell title={t.about_title}>
          <div className="mt-4 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <p className="text-gray-700">{t.about_blurb_1}</p>
            <p className="text-gray-700">{t.about_blurb_2}</p>
          </div>
        </PageShell>
      )}
      {route === "services" && (
        <PageShell title={t.services_title} padded>
          <p className="max-w-4xl text-gray-700">{t.services_intro}</p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.services_list.map((s) => (
              <Card key={s.title} title={s.title} desc={s.desc} />
            ))}
          </div>
        </PageShell>
      )}
      {route === "contact" && <Contact t={t} />}
      {!["home", "about", "services", "contact"].includes(route) && (
        <PageShell title="404">
          <p className="mt-4 text-gray-700">Page not found.</p>
        </PageShell>
      )}
      <Footer />
    </div>
  );
}

function getRoute() {
  // routes as #/about, #/services, default -> home
  const hash = (window.location.hash || "").replace(/^#\/?/, "");
  return hash || "home";
}

function Header({ t, lang, setLang }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-sky-600" aria-hidden />
          <a href="#/" className="font-semibold tracking-wide">
            MashBond
          </a>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#/about" className="hover:text-sky-700">{t.nav_about}</a>
          <a href="#/services" className="hover:text-sky-700">{t.nav_services}</a>
          <a href="#/contact" className="hover:text-sky-700">{t.nav_contact}</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
          >
            {lang === "zh" ? "English" : "简体中文"}
          </button>
          <a
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white"
            href="#/contact"
          >
            {t.contact_cta}
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} MashBond. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#/about" className="hover:text-sky-700">About</a>
          <a href="#/services" className="hover:text-sky-700">Services</a>
          <a href="#/contact" className="hover:text-sky-700">Contact</a>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Pages -------------------------------- */
function Home({ t }) {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sky-700">
              {t.tagline}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              {t.hero_title}
            </h1>
            <p className="mt-5 max-w-xl text-gray-600">{t.hero_sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="rounded-xl bg-sky-600 px-5 py-3 text-white" href="#/services">
                {t.primary_cta}
              </a>
              <a className="rounded-xl border border-sky-200 px-5 py-3 text-sky-700" href="#/about">
                {t.secondary_cta}
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            {/* Optional hero image if you add /public/images/hero.jpg */}
            <img
              src="/images/hero.jpg"
              alt=""
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="mb-4 w-full rounded-xl object-cover"
            />
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
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{t.value_title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.value_cards.map((c) => (
            <Card key={c.title} title={c.title} desc={c.desc} />
          ))}
        </div>
      </section>
    </>
  );
}

function Contact({ t }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {t.contact_title}
          </h2>
          <p className="mt-4 text-gray-700">{t.contact_blurb}</p>
          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>{t.contact_email}: hello@mashbond.com</li>
            <li>{t.contact_address}: Los Angeles · USA</li>
          </ul>
        </div>
        <form className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700">
            {t.form_name}
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:border-sky-600 focus:outline-none"
            placeholder={t.form_name_ph}
          />
          <label className="mt-4 block text-sm font-medium text-gray-700">
            {t.form_email}
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:border-sky-600 focus:outline-none"
            placeholder={t.form_email_ph}
          />
          <label className="mt-4 block text-sm font-medium text-gray-700">
            {t.form_need}
          </label>
          <textarea
            className="mt-1 h-28 w-full rounded-xl border border-gray-200 px-3 py-2 focus:border-sky-600 focus:outline-none"
            placeholder={t.form_need_ph}
          />
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-sky-600 px-4 py-3 font-medium text-white hover:bg-sky-700"
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
    <section className={bg ? "bg-sky-50/50" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
        <div className={padded ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

function Card({ title, desc }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-700">{desc}</p>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <li className="rounded-xl border border-gray-100 p-4">
      <p className="text-xs text-sky-700">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </li>
  );
}

/* ------------------------------ i18n & helpers --------------------------- */
const i18n = {
  zh: {
    // nav
    nav_about: "关于我们",
    nav_services: "业务板块",
    nav_contact: "联系我们",

    // hero / ctas
    contact_cta: "联系我们",
    primary_cta: "查看业务",
    secondary_cta: "了解我们",

    tagline: "咨询为先 · S2B2C 跨境生态圈",
    hero_title: "美销邦 MashBond — 让亚洲在此发光",
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
  },

  en: {
    // nav
    nav_about: "About",
    nav_services: "Services",
    nav_contact: "Contact",

    // hero / ctas
    contact_cta: "Contact Us",
    primary_cta: "View Services",
    secondary_cta: "About Us",

    tagline: "Consulting First · S2B2C Cross-Border Ecosystem",
    hero_title: "MashBond — Let Asia Shine Globally",
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
  },
};

function getT(lang) {
  const base = i18n[lang] || i18n.en;
  return { ...i18n.en, ...base, kv: { ...i18n.en.kv, ...(base.kv || {}) } };
}
