import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Menu, X, LayoutDashboard, FileText, Key } from "lucide-react";
import logo from "../../assets/logo.png";
import { WalletConnect } from "../../components/WalletConnect";

/* ─── Code Block ─────────────────────────────────────────── */
const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-[#0d1117] border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-gray-500 hover:text-white border border-white/10 rounded px-2 py-1 transition-colors"
      >
        {copied ? <><Check size={10} className="text-green-400" /> Copied</> : <><Copy size={10} /> Copy</>}
      </button>
      <pre className="p-5 text-xs text-gray-300 overflow-x-auto leading-relaxed font-mono">{code}</pre>
    </div>
  );
};

/* ─── Section ────────────────────────────────────────────── */
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 space-y-4">
    <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">{title}</h2>
    {children}
  </section>
);

/* ─── Badge ──────────────────────────────────────────────── */
const Badge = ({ children, color = "cyan" }: { children: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    cyan:   "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    green:  "bg-green-500/10 text-green-400 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    amber:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
    red:    "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${colors[color]}`}>
      {children}
    </span>
  );
};

/* ─── Nav items ──────────────────────────────────────────── */
const docSections = [
  { id: "overview",     label: "Overview" },
  { id: "how-it-works", label: "How It Works" },
  { id: "endpoints",    label: "API Endpoints" },
  { id: "security",     label: "Security" },
  { id: "database",     label: "Database" },
  { id: "ai-agents",    label: "AI Agents" },
  { id: "tech-stack",   label: "Tech Stack" },
  { id: "scope",        label: "MVP Scope" },
];

/* ─── Docs Page ──────────────────────────────────────────── */
const Docs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  return (
    <div className="flex min-h-screen bg-[#0b0e11] text-white font-space-grotesk overflow-x-hidden">

      {/* ── Mobile overlay ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0b0e11] border-r border-white/5 flex flex-col p-6 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + close */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-8" alt="logo" />
            <h1 className="text-xl font-bold">
              <Link to="/" onClick={() => setIsSidebarOpen(false)}>PayAPI</Link>
            </h1>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* App nav links */}
        <nav className="space-y-1 mb-6 pb-6 border-b border-white/5">
          <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm">
              <LayoutDashboard size={16} /> Dashboard
            </div>
          </Link>
          <Link to="/api-keys" onClick={() => setIsSidebarOpen(false)}>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm">
              <Key size={16} /> API Keys
            </div>
          </Link>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm">
            <FileText size={16} /> Docs
          </div>
        </nav>

        {/* Doc section links */}
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-3">Contents</p>
        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {docSections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsSidebarOpen(false)}
              className="block text-xs text-gray-500 hover:text-cyan-400 py-1.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">

        {/* ── Header ── */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 py-5 lg:px-8 bg-[#0b0e11]/50 backdrop-blur sticky top-0 z-30">
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={toggleSidebar}>
            <Menu size={28} />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-400">
            <span className="font-bold text-white">PayAPI</span>
            <span className="text-gray-600">/</span>
            <span>Docs</span>
          </div>
          <div className="flex-1 lg:flex-none" />
          <WalletConnect />
        </header>

        {/* ── Content ── */}
        <div className="p-4 lg:p-10 max-w-4xl w-full mx-auto space-y-16">

          {/* Hero */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge color="cyan">v1.0 MVP</Badge>
              <Badge color="purple">Stellar Testnet</Badge>
            </div>
            <h1 className="text-4xl font-bold">
              PayAPI <span className="text-cyan-400">Documentation</span>
            </h1>
            <p className="text-gray-400 leading-relaxed max-w-2xl">
              A crypto-powered API payment gateway. Pay with Stellar, get an API key, start making requests — no subscriptions, no credit cards.
            </p>
            <div className="p-4 bg-[#111418] border border-white/5 rounded-xl">
              <span className="text-cyan-400 font-mono text-xs">Payment → Verification → API Key → Access</span>
            </div>
          </div>

          {/* Overview */}
          <Section id="overview" title="What is PayAPI?">
            <p className="text-gray-400 leading-relaxed">
              PayAPI is a crypto-powered API payment gateway inspired by x402 systems. It allows humans and AI agents to pay for API services using Stellar and gain access through scoped API keys.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Instead of traditional subscriptions, PayAPI enables pay-to-access API usage using blockchain transactions — making it compatible with both human developers and autonomous AI agents.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { title: "No Credit Cards", desc: "Pay with XLM on Stellar" },
                { title: "No Subscriptions", desc: "Pay once, get access" },
                { title: "AI Compatible", desc: "Autonomous agent payments" },
                { title: "Scoped Keys", desc: "One key per service" },
              ].map((f) => (
                <div key={f.title} className="bg-[#111418] border border-white/5 rounded-xl p-4">
                  <p className="text-white font-bold text-sm">{f.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* How it works */}
          <Section id="how-it-works" title="How PayAPI Works">
            <div className="space-y-4">
              {[
                { step: "1", title: "Select a Service", desc: "Choose the API service you want access to: Crypto Price API, News API, or AI Search API." },
                { step: "2", title: "Pay with Stellar", desc: "Send XLM to the PayAPI wallet. The blockchain generates a transaction hash (txHash)." },
                { step: "3", title: "Verify Payment", desc: "Submit your wallet address, txHash, and service to POST /verify-payment." },
                { step: "4", title: "Backend Verifies", desc: "PayAPI checks the hash format, uniqueness, payment validity, and requested service." },
                { step: "5", title: "API Key Issued", desc: "A service-scoped API key is generated and returned. Save it — it's shown only once." },
                { step: "6", title: "Access the API", desc: "Include your key in the x-api-key header on every request to the protected endpoints." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 p-4 bg-[#111418] border border-white/5 rounded-xl">
                  <span className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm">{s.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Endpoints */}
          <Section id="endpoints" title="API Endpoints">
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge color="green">POST</Badge>
                  <span className="font-mono text-sm text-white">/api/v1/auth/verify-payment</span>
                </div>
                <p className="text-gray-400 text-sm">Verify a Stellar payment and receive an API key.</p>
                <CodeBlock code={`// Request Body\n{\n  "walletAddress": "GXXXX...",\n  "txHash": "abcd1234...",\n  "service": "Crypto API"\n}\n\n// Response\n{\n  "success": true,\n  "apiKey": "bed537696bd33c...",\n  "message": "API key generated. Save it now."\n}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge color="cyan">GET</Badge>
                  <span className="font-mono text-sm text-white">/api/v1/payapi/crypto-price</span>
                </div>
                <p className="text-gray-400 text-sm">Get the current USD price of any coin. Requires a <strong className="text-white">Crypto API</strong> key.</p>
                <CodeBlock code={`GET /api/v1/payapi/crypto-price?coin=bitcoin\nx-api-key: your_api_key_here\n\n// Response\n{\n  "success": true,\n  "service": "Crypto API",\n  "data": { "name": "bitcoin", "price_usd": 80612 }\n}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge color="cyan">GET</Badge>
                  <span className="font-mono text-sm text-white">/api/v1/payapi/news</span>
                </div>
                <p className="text-gray-400 text-sm">Search for news articles. Requires a <strong className="text-white">News API</strong> key.</p>
                <CodeBlock code={`GET /api/v1/payapi/news?q=bitcoin\nx-api-key: your_api_key_here\n\n// Response\n{\n  "success": true,\n  "service": "News API",\n  "count": 5,\n  "data": [{ "title": "...", "source": "CoinDesk" }]\n}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge color="cyan">GET</Badge>
                  <span className="font-mono text-sm text-white">/api/v1/payapi/ai-search</span>
                </div>
                <p className="text-gray-400 text-sm">Get an AI-summarized answer. Requires an <strong className="text-white">AI Search API</strong> key.</p>
                <CodeBlock code={`GET /api/v1/payapi/ai-search?q=what+is+bitcoin\nx-api-key: your_api_key_here\n\n// Response\n{\n  "success": true,\n  "service": "AI Search API",\n  "data": { "query": "what is bitcoin", "answer": "..." }\n}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge color="cyan">GET</Badge>
                  <span className="font-mono text-sm text-white">/api/v1/auth/keys</span>
                </div>
                <p className="text-gray-400 text-sm">Get all active API keys for a wallet address.</p>
                <CodeBlock code={`GET /api/v1/auth/keys\nx-wallet-address: GXXXX...\n\n// Response\n{\n  "success": true,\n  "data": [{ "service": "Crypto API", "status": "active" }]\n}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge color="red">POST</Badge>
                  <span className="font-mono text-sm text-white">/api/v1/auth/keys/revoke</span>
                </div>
                <p className="text-gray-400 text-sm">Revoke an active API key for a service.</p>
                <CodeBlock code={`// Request Body\n{\n  "walletAddress": "GXXXX...",\n  "service": "Crypto API"\n}\n\n// Response\n{\n  "success": true,\n  "message": "Access to Crypto API has been revoked successfully."\n}`} />
              </div>
            </div>
          </Section>

          {/* Security */}
          <Section id="security" title="Security Principles">
            <div className="space-y-3">
              {[
                { title: "Transaction Hash Uniqueness", desc: "A txHash can only be used once. Replaying a hash is rejected." },
                { title: "API Keys Are the Trust Layer", desc: "The gateway trusts only the API key — not the wallet address or txHash after verification." },
                { title: "Service-Scoped Keys", desc: "Each API key only works for the service it was created for." },
                { title: "Rate Limiting", desc: "100 requests/day and 10,000 requests/month per key." },
              ].map((p) => (
                <div key={p.title} className="p-4 bg-[#111418] border border-white/5 rounded-xl">
                  <p className="text-white font-bold text-sm">{p.title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Database */}
          <Section id="database" title="Database Structure">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Users", fields: ["walletAddress", "createdAt"] },
                { name: "ApiKeys", fields: ["userId", "service", "keyHash", "status", "limits", "usage", "createdAt"] },
                { name: "Transactions", fields: ["txHash", "userId", "service", "status", "createdAt"] },
                { name: "UsageLogs", fields: ["apiKeyId", "endpoint", "timestamp"] },
              ].map((col) => (
                <div key={col.name} className="bg-[#111418] border border-white/5 rounded-xl p-4">
                  <p className="text-cyan-400 font-bold text-sm mb-3">{col.name}</p>
                  <ul className="space-y-1">
                    {col.fields.map((f) => (
                      <li key={f} className="text-gray-500 text-xs font-mono">— {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* AI Agents */}
          <Section id="ai-agents" title="AI Agent Use Case">
            <p className="text-gray-400 leading-relaxed">
              PayAPI is designed to support autonomous AI systems. An AI agent can detect it needs a service, pay using Stellar, verify the payment automatically, receive API access, and continue execution — all without human involvement.
            </p>
            <div className="p-4 bg-[#111418] border border-cyan-500/10 rounded-xl">
              <p className="text-xs text-gray-500 font-mono leading-relaxed">
                AI Agent → Detects need for service<br />
                → Pays with Stellar<br />
                → Submits txHash to /verify-payment<br />
                → Receives API key<br />
                → Makes API requests autonomously
              </p>
            </div>
          </Section>

          {/* Tech Stack */}
          <Section id="tech-stack" title="Tech Stack">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Node.js", cat: "Backend" }, { label: "Express", cat: "Backend" },
                { label: "TypeScript", cat: "Backend" }, { label: "MongoDB", cat: "Database" },
                { label: "Mongoose", cat: "Database" }, { label: "Stellar", cat: "Blockchain" },
                { label: "CoinGecko", cat: "Data" }, { label: "NewsAPI", cat: "Data" },
                { label: "DuckDuckGo", cat: "Data" }, { label: "React", cat: "Frontend" },
                { label: "Vite", cat: "Frontend" }, { label: "Tailwind CSS", cat: "Frontend" },
              ].map((t) => (
                <div key={t.label} className="bg-[#111418] border border-white/5 rounded-xl p-3">
                  <p className="text-white text-sm font-bold">{t.label}</p>
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider mt-0.5">{t.cat}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* MVP Scope */}
          <Section id="scope" title="MVP Scope">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#111418] border border-green-500/10 rounded-xl p-4">
                <p className="text-green-400 font-bold text-sm mb-3">Included</p>
                <ul className="space-y-1.5">
                  {["Payment verification", "API key generation", "Service access control", "Rate limiting", "CoinGecko endpoints", "NewsAPI endpoints", "DuckDuckGo endpoints"].map((i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-center gap-2"><span className="text-green-400">✓</span> {i}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#111418] border border-gray-500/10 rounded-xl p-4">
                <p className="text-gray-400 font-bold text-sm mb-3">Not Yet</p>
                <ul className="space-y-1.5">
                  {["Real-time blockchain listeners", "Subscription plans", "Advanced billing", "Usage-based invoicing", "Per-request payments", "Multi-chain support"].map((i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-center gap-2"><span className="text-gray-600">—</span> {i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Goal */}
          <div className="p-6 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/10 rounded-2xl">
            <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-2">Project Goal</p>
            <p className="text-gray-300 leading-relaxed text-sm">
              Make APIs programmable, crypto-native, and accessible to both humans and autonomous AI agents — without relying on traditional subscription systems.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Docs;
