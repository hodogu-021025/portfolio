import { useState } from "react";
import { ProjectCard } from "./components/ProjectCard";
import { PROFILE, SKILLS, TIMELINE } from "./data/profile";
import { PROJECTS } from "./data/projects";

// 이메일 복사. 클립보드를 쓸 수 없는 환경이면 주소를 선택해 두어 바로 복사할 수 있게 한다.
function EmailChip({ id }: { id: string }) {
  const [label, setLabel] = useState("복사");
  async function copy() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setLabel("복사됨");
    } catch {
      const el = document.getElementById(id);
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setLabel("선택됨");
    }
    window.setTimeout(() => setLabel("복사"), 1800);
  }
  return (
    <span className="email">
      <span id={id}>{PROFILE.email}</span>
      <button type="button" onClick={copy}>
        {label}
      </button>
    </span>
  );
}

function Contacts({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="contacts">
      <a className="chip chip--primary" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
        GitHub ↗
      </a>
      <EmailChip id={`${idPrefix}-email`} />
      {PROFILE.resume && (
        <a className="chip" href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
          이력서 PDF
        </a>
      )}
    </div>
  );
}

export function App() {
  const liveCount = PROJECTS.filter((p) => p.live).length;
  return (
    <div className="wrap">
      <header className="cover">
        <div className="eyebrow">Portfolio · Full-stack Developer</div>
        <h1>{PROFILE.name}</h1>
        <p className="role">
          {PROFILE.role}
          {PROFILE.focus.map((f) => (
            <span key={f}> · {f}</span>
          ))}
        </p>
        <p className="lede">{PROFILE.lede}</p>
        <Contacts idPrefix="cover" />
        <div className="cover-stats">
          <span>
            <span className="dot" />
            운영 중인 서비스 <b>{liveCount}</b>
          </span>
          <span>
            프로젝트 <b>{PROJECTS.length}</b>
          </span>
          <span>
            STAR 자동 테스트 <b>940+</b>
          </span>
        </div>
      </header>

      <main>
        <section aria-labelledby="projects-title">
          <div className="section-head">
            <h2 id="projects-title">프로젝트</h2>
            <p>카드를 누르면 사이트가 새 탭으로 열립니다</p>
          </div>
          <div className="projects">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} featured={i === 0} />
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-title">
          <div className="section-head">
            <h2 id="skills-title">기술 스택</h2>
          </div>
          <div className="skills">
            {SKILLS.map((s) => (
              <div className="skill-row" key={s.area}>
                <h3>{s.area}</h3>
                <p>{s.items}</p>
              </div>
            ))}
          </div>
        </section>

        {TIMELINE.length > 0 && (
          <section aria-labelledby="timeline-title">
            <div className="section-head">
              <h2 id="timeline-title">교육 · 경력</h2>
            </div>
            <ol className="timeline">
              {TIMELINE.map((t) => (
                <li key={t.title}>
                  <time>{t.period}</time>
                  <div>
                    <b>{t.title}</b>
                    <span>{t.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
      </main>

      <footer>
        <h2>연락처</h2>
        <Contacts idPrefix="footer" />
        <small>© {new Date().getFullYear()} {PROFILE.name}</small>
      </footer>
    </div>
  );
}
