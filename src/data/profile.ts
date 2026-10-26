// 표지·연락처에 쓰는 내 정보. 이력서 PDF 는 public/resume.pdf 를 넣으면 버튼이 켜진다.
export const PROFILE = {
  name: "홍동국",
  role: "풀스택 개발자",
  focus: ["Java / Spring", "React"],
  lede: "기획부터 배포와 운영까지 직접 해 본 서비스를 모았습니다. 카드를 누르면 실제로 돌아가고 있는 사이트가 새 탭으로 열립니다.",
  github: "https://github.com/hodogu-021025",
  email: "tonytony1424@gmail.com",
  resume: undefined as string | undefined,
};

// 교육·경력. 비어 있으면 섹션을 그리지 않는다.
export const TIMELINE: { period: string; title: string; detail: string }[] = [];

export const SKILLS: { area: string; items: string }[] = [
  { area: "백엔드", items: "Java 21, Spring Boot 4 (Web MVC · Data JPA · Security · Cache · Scheduling), JWT" },
  { area: "프런트엔드", items: "React 19, TypeScript, Next.js, React Router, Vite, Tailwind CSS" },
  { area: "데이터베이스", items: "MySQL 8.4, PostgreSQL (Supabase), Redis, Flyway" },
  { area: "인프라 · 배포", items: "Docker, nginx, Caddy, Oracle Cloud, Vercel, Cloudflare Pages, GitHub Actions" },
  { area: "테스트", items: "JUnit 5, Spring Boot Test, Vitest, Testing Library" },
];
