import starShot from "../assets/projects/star.webp";
import wytableShot from "../assets/projects/wytable.webp";
import ootdShot from "../assets/projects/ootd.webp";

// 포트폴리오에 올리는 프로젝트. 순서 = 화면에 보이는 순서(가장 자신 있는 것부터).
// 숫자와 설명은 각 저장소의 README·커밋 기록에서 확인한 값만 적는다.

export interface ProjectLink {
  url: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  // 한 줄 요약 (카드 제목 아래)
  summary: string;
  // 두세 문장 설명
  description: string;
  kind: "개인 프로젝트" | "팀 프로젝트" | "해커톤";
  period: string;
  // 팀 프로젝트에서 맡은 부분
  role?: string;
  stack: string[];
  facts: { label: string; value: string }[];
  highlights: string[];
  // 카드 전체를 눌렀을 때 가는 곳. 사이트가 없으면 저장소로, 둘 다 없으면 누를 수 없는 카드
  site?: ProjectLink;
  repo?: ProjectLink & { private?: boolean };
  // 로그인해야 보이는 화면을 둘러볼 방법
  demo?: string;
  // 운영 중인 사이트면 true (초록 점 표시)
  live: boolean;
  shot?: string;
  // 스크린샷이 없을 때 미리보기 자리의 배경색과 글자색
  placeholder?: { bg: string; fg: string };
}

export const PROJECTS: Project[] = [
  {
    id: "star",
    name: "STAR",
    summary: "AI 데이터 분석 구독 서비스의 대외 홈페이지 + 사내 인트라넷",
    description:
      "가상의 SaaS 회사 STAR 를 정해 두고, 고객이 쓰는 홈페이지(가입·구독 결제·문의·채용 지원)와 직원이 쓰는 인트라넷(근태·휴가·전자결재·사내 채팅)을 한 서비스로 만들었습니다. Oracle Cloud 에 직접 배포해 운영하면서 보안·성능 문제를 점검하고 고쳐 왔습니다.",
    kind: "개인 프로젝트",
    period: "2026.09 – 현재",
    stack: ["Java 21", "Spring Boot 4", "JPA", "Spring Security · JWT", "MySQL 8.4", "Flyway", "React 19", "TypeScript", "SSE", "Docker", "Oracle Cloud", "GitHub Actions"],
    facts: [
      { label: "자동 테스트", value: "940+" },
      { label: "DB 마이그레이션", value: "60" },
      { label: "도메인", value: "18" },
    ],
    highlights: [
      "SSE 실시간 알림: 1회용 티켓으로 인증하고, DB 커밋이 끝난 뒤에만 신호를 보냄",
      "리프레시 토큰 회전·재사용 탐지, 로그인 시도 제한, 프록시 헤더 위조 차단",
      "모의 결제와 일할 환불, 매일 자동 갱신 배치, 비관적·낙관적 잠금으로 동시 처리",
    ],
    site: { url: "https://star.hdg3383.com", label: "star.hdg3383.com" },
    repo: { url: "https://github.com/hodogu-021025/company-cms", label: "GitHub", private: true },
    live: true,
    shot: starShot,
  },
  {
    id: "wytable",
    name: "우연한 식탁",
    summary: "처음 만나는 4~6명을 한 테이블로 매칭하는 소셜다이닝 앱",
    description:
      "2026 우연한식탁 MVP 개발 해커톤 제출작입니다. 참가자 앱(PWA)과 운영자 대시보드를 열흘 동안 혼자 만들었습니다. 매칭 엔진은 DB 와 분리된 순수 함수로 짜서 테스트하고, 마감된 회차는 1분마다 자동으로 매칭합니다.",
    kind: "해커톤",
    period: "2026.10.12 – 10.21",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Supabase", "PostgreSQL", "PWA · 웹 푸시", "Vercel"],
    facts: [
      { label: "개발 기간", value: "10일" },
      { label: "커밋", value: "285" },
      { label: "자동 매칭 주기", value: "1분" },
    ],
    highlights: [
      "나이 차·차단 관계를 지키면서 성비·MBTI·관심사 점수가 오르지 않을 때까지 테이블을 교환하는 매칭 엔진",
      "pg_cron 으로 마감 매칭과 안내 메시지 예약 발송, 앱 알림함과 웹 푸시",
      "가입 없이 둘러보는 체험 계정과 매일 데모 데이터 보충",
    ],
    site: { url: "https://wytable.vercel.app", label: "wytable.vercel.app" },
    repo: { url: "https://github.com/hodogu-021025/table_hackathon", label: "GitHub", private: true },
    demo: "로그인 화면의 체험 계정으로 바로 둘러볼 수 있습니다",
    live: true,
    shot: wytableShot,
  },
  {
    id: "ballpark",
    name: "볼파크 티켓",
    summary: "KBO 경기 일정 조회부터 좌석 선택·결제·취소까지 이어지는 야구 티켓 예매",
    description:
      "6명이 함께한 팀 프로젝트입니다. 프로젝트 초기 세팅을 맡았고, 좌석 선택, 커뮤니티, 신고 관리, QR 입장 확인을 개발했습니다. 같은 좌석이 두 번 팔리지 않도록 Redis 선점과 DB 유니크 제약으로 이중 방어했습니다.",
    kind: "팀 프로젝트",
    period: "2026.09.15 – 10.08",
    role: "초기 세팅 · 좌석 선택 · 커뮤니티 · 신고 관리 · QR 입장 확인",
    stack: ["Spring Boot 4", "JPA", "Spring Security · JWT", "Flyway", "MySQL 8.4", "Redis 7.4", "React 19", "Vite", "Docker"],
    facts: [
      { label: "팀원", value: "6명" },
      { label: "내 커밋", value: "100" },
      { label: "구장 배치도", value: "9개" },
    ],
    highlights: [
      "Redis Lua 스크립트로 여러 좌석을 한 번에 선점하고, MySQL 유니크 제약을 최종 방어선으로",
      "서버가 서명한 입장 QR 과 관리자 카메라 검증, 양도 중인 티켓 입장 거부",
      "가짜 PG 결제창으로 결제 인증 → 승인 → 환불 흐름 구현",
    ],
    repo: { url: "https://github.com/Kwonoyoon/Baseball-Ticket-Reservation", label: "GitHub" },
    live: false,
    placeholder: { bg: "#0f3d2e", fg: "#e9f5ee" },
  },
  {
    id: "ootd",
    name: "OOTD",
    summary: "의류 탐색부터 장바구니·모의 주문까지 동작하는 쇼핑몰",
    description:
      "React 수업 내용을 바탕으로 만든 의류 쇼핑몰입니다. 서버 없이 브라우저 저장소만으로 장바구니·주문 내역·좋아요·재입고 알림을 유지하고, 관리자 화면에서 재고를 관리합니다.",
    kind: "개인 프로젝트",
    period: "2026.09",
    stack: ["React 19", "React Router 7", "Vite", "CSS Modules", "localStorage", "Cloudflare Pages"],
    facts: [
      { label: "서버", value: "없음" },
      { label: "배포", value: "Cloudflare" },
      { label: "저장", value: "브라우저" },
    ],
    highlights: [
      "Context 로 의류·재고, 장바구니, 주문, 좋아요, 재입고 알림 상태를 화면 사이에 공유",
      "새로고침해도 유지되도록 localStorage 에 저장·복원",
    ],
    live: false,
    shot: ootdShot,
  },
];

// 카드를 눌렀을 때 갈 곳: 사이트 → 공개 저장소 → 없음
export function primaryLink(project: Project): ProjectLink | undefined {
  if (project.site) return project.site;
  if (project.repo && !project.repo.private) return project.repo;
  return undefined;
}
