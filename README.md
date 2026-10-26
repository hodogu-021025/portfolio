# portfolio

풀스택 개발자 홍동국의 포트폴리오 사이트입니다. → **https://hdg3383.com**

| 프로젝트 | 내용 | 주소 |
|---|---|---|
| STAR | AI 데이터 분석 구독 서비스의 대외 홈페이지 + 사내 인트라넷 (Spring Boot · React) | https://star.hdg3383.com |
| 우연한 식탁 | 소셜다이닝 매칭 PWA, 해커톤 제출작 (Next.js · Supabase) | https://wytable.vercel.app |
| 볼파크 티켓 | 야구 티켓 예매, 6인 팀 프로젝트 (Spring Boot · Redis · React) | [GitHub](https://github.com/Kwonoyoon/Baseball-Ticket-Reservation) |
| OOTD | React 의류 쇼핑몰 | |

## 구조

- React 19 + TypeScript + Vite 로 만든 정적 사이트
- 프로젝트 내용은 [`src/data/projects.ts`](src/data/projects.ts), 내 정보는 [`src/data/profile.ts`](src/data/profile.ts) 만 고치면 된다
- 스크린샷은 `src/assets/projects/*.webp` (1200×750)

## 실행

```bash
npm ci
npm run dev      # http://localhost:5190
npm test
npm run build
```

## 배포

`main` 에 푸시하면 GitHub Actions 가 테스트 → 빌드 → `ghcr.io/hodogu-021025/portfolio` 이미지(amd64/arm64)를 올린다.
서버는 STAR 와 같은 Oracle Cloud VM 이고, Caddy 가 `hdg3383.com` 을 이 컨테이너로 넘긴다 (설정은 company-cms 저장소의 `deploy/`).

## 라이선스

코드는 [MIT](LICENSE). `src/assets/projects/` 의 스크린샷은 각 프로젝트의 화면이며 MIT 대상이 아니다.
