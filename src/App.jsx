import React, { useEffect, useState } from "react";

/**
 * MashBond — Full App.jsx (updated)
 * - Pages: Home, About, Services, Member Upload, Contact
 * - Router: hash based (#/about, #/services, #/member-upload, #/contact)
 * - Theme: light (white + indigo)
 * - Logo path: /public/logo.png  ← update if your filename differs
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
  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo + Brand */}
        <a href="#/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.png"           // <- change if your file is named differently (e.g., /logo.svg)
            alt="MashBond Logo"
            className="h-9 w-auto md:h-12 object-contain"
            loading="eager"
            decoding="async"
            onError={(e) => (e.currentTarget.style.display = "none")}
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

function About({ t }) {
  return (
    <PageShell title={t.about_title}>
      <div className="mt-4 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        <p className="text-gray-700">{t.about_blurb_1}</p>
        <p className="text-gray-700">{t.about_blurb_2}</p>
      </div>
    </PageShell>
  );
}

function Services({ t }) {
  return (
    <PageShell title={t.services_title} padded>
      <p className="max-w-4xl text-gray-700">{t.services_intro}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {t.services_list.map((s) => (
          <Card key={s.title} title={s.title} desc={s.desc} />
        ))}
      </div>
    </PageShell>
  );
}

function MemberUpload({ t }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  function onSelect(e) {
    function onSelect(e) {
  const input = e.currentTarget || e.target;
  const list = input && input.files ? input.files : [];
  const fs = Array.from(list);

  setFiles(fs);

  const readers = fs.map((f) =>
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
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
        {t.member_title}
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
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {t.contact_title}
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

function Card({ title, desc }) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900">{title}</h3>
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
    hero_line1: "MashBond — Let Asia Shine",
    hero_line2: "Globally",
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
