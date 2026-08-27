import http from "node:http";

const profile = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "Mārcis Krēgers",
  role_en: "Fullstack Web Developer & AI Engineer",
  role_lv: "Pilna cikla web izstrādātājs un AI inženieris",
  tagline_en: "Building web apps, AI agents, and Linux systems.",
  tagline_lv: "Veidoju web lietotnes un AI aģentus, uzturu Linux sistēmas.",
  bio_en: "I build web apps with React, Next.js, and TypeScript.",
  bio_lv: "Veidoju web lietotnes ar React, Next.js un TypeScript.",
  photo_url: "/images/profile.jpg",
  email: "marcis.kregers@gmail.com",
  github_url: "https://github.com/degradaccija",
  linkedin_url: "https://lv.linkedin.com/in/marcis-kregers",
  resume_url: null,
};

const projects = [
  {
    id: "00000000-0000-4000-8000-000000000301",
    title: "Agent Logbook",
    description_en: "A local tool for running and inspecting AI agents.",
    description_lv: "Lokāls rīks AI aģentu palaišanai un pārbaudei.",
    image_url: "https://picsum.photos/seed/agent-logbook-terminal/1600/1000",
    repo_url: null,
    live_url: null,
    tags: ["TypeScript", "Node.js", "PostgreSQL", "AI agents"],
    featured: true,
    sort_order: 1,
  },
  {
    id: "00000000-0000-4000-8000-000000000302",
    title: "Homelab",
    description_en: "My home server lab: Proxmox and self-hosted services.",
    description_lv: "Mans homelab: Proxmox un pašmitināti pakalpojumi.",
    image_url: "https://picsum.photos/seed/homelab-server-rack/1600/1000",
    repo_url: null,
    live_url: null,
    tags: ["Linux", "Docker", "Proxmox", "Networking"],
    featured: true,
    sort_order: 2,
  },
  {
    id: "00000000-0000-4000-8000-000000000303",
    title: "This Website",
    description_en: "A bilingual business card built with Next.js 16.",
    description_lv: "Divvalodu vizītkarte, būvēta ar Next.js 16.",
    image_url: "https://picsum.photos/seed/dark-code-editor/1600/1000",
    repo_url: null,
    live_url: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    featured: false,
    sort_order: 3,
  },
  {
    id: "00000000-0000-4000-8000-000000000304",
    title: "Server Chef",
    description_en: "Bash automation for provisioning Debian servers.",
    description_lv: "Bash automatizācija Debian serveru sagatavošanai.",
    image_url: "https://picsum.photos/seed/server-chef-logs/1600/1000",
    repo_url: null,
    live_url: null,
    tags: ["Bash", "Debian"],
    featured: false,
    sort_order: 4,
  },
];

const skills = [
  { id: "s1", name: "React", category: "Frontend", level: 4, sort_order: 1 },
  { id: "s2", name: "Next.js", category: "Frontend", level: 4, sort_order: 2 },
  { id: "s3", name: "Linux", category: "DevOps & Linux", level: 5, sort_order: 1 },
  { id: "s4", name: "Docker", category: "DevOps & Linux", level: 3, sort_order: 2 },
];

const experience = [
  {
    id: "x1",
    type: "work",
    title_en: "Fullstack Developer",
    title_lv: "Pilna cikla izstrādātājs",
    organization_en: "Acme Studio",
    organization_lv: "Acme Studio",
    start_date: "2023-01-01",
    end_date: null,
    description_en: "Building web apps.",
    description_lv: "Veidoju web lietotnes.",
    sort_order: 1,
  },
];

const services = [
  {
    id: "v1",
    title_en: "Web development",
    title_lv: "Web izstrāde",
    description_en: "Websites and web apps with React and Next.js.",
    description_lv: "Mājaslapas un web lietotnes ar React un Next.js.",
    icon: "Code2",
    sort_order: 1,
  },
  {
    id: "v2",
    title_en: "AI agents",
    title_lv: "AI aģenti",
    description_en: "Automation with LLM-powered agents.",
    description_lv: "Automatizācija ar LLM aģentiem.",
    icon: "Bot",
    sort_order: 2,
  },
];

const tables = {
  site_profile: [profile],
  projects,
  skills,
  experience,
  services,
  contact_messages: [],
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1:54321");
  const match = url.pathname.match(/^\/rest\/v1\/([a-z_]+)/);
  const table = match ? match[1] : null;
  const rows = table && table in tables ? tables[table] : [];
  const wantsObject = req.headers.accept?.includes("application/vnd.pgrst.object+json");
  const body = wantsObject ? (rows[0] ?? null) : rows;
  res.writeHead(body === null && wantsObject ? 404 : 200, {
    "content-type": "application/json",
    "content-range": `0-${Math.max(rows.length - 1, 0)}/${rows.length}`,
  });
  res.end(body === null && wantsObject ? "" : JSON.stringify(body));
});

const port = Number(process.env.MOCK_PORT ?? 54321);
server.listen(port, "127.0.0.1", () => {
  console.log(`mock supabase on ${port}`);
});
