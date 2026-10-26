import { primaryLink, type Project } from "../data/projects";

// 프로젝트 카드 하나. 왼쪽 미리보기 | 오른쪽 설명, 좁은 화면에서는 위아래로 쌓인다.
// 카드 전체를 누르면 primaryLink 로 간다: 제목 링크(.stretch)가 카드 전체를 덮고, 아래 버튼들은 그 위에 올라온다.
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const link = primaryLink(project);
  const host = project.site?.label ?? project.repo?.url.replace("https://", "");

  return (
    <article className={`project${featured ? " project--featured" : ""}${link ? " project--link" : ""}`} aria-labelledby={`${project.id}-title`}>
      <div className="preview" aria-hidden="true">
        <div className="preview-bar">
          <i />
          <i />
          <i />
          <span>{host ?? project.name}</span>
        </div>
        {project.shot ? (
          <img src={project.shot} alt="" loading={featured ? "eager" : "lazy"} width={1200} height={750} />
        ) : (
          <div className="preview-blank" style={{ background: project.placeholder?.bg, color: project.placeholder?.fg }}>
            <span>{project.name}</span>
          </div>
        )}
      </div>

      <div className="info">
        <div className="meta">
          <span>{project.kind}</span>
          <span>{project.period}</span>
          {project.live && (
            <span className="status">
              <span className="dot" />
              운영 중
            </span>
          )}
        </div>

        <h3 id={`${project.id}-title`}>
          {link ? (
            <a className="stretch" href={link.url} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="summary">{project.summary}</p>
        <p className="desc">{project.description}</p>
        {project.role && (
          <p className="role-line">
            <b>맡은 부분</b> {project.role}
          </p>
        )}

        <ul className="stack" aria-label="사용 기술">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <dl className="facts">
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="actions">
          {project.site && (
            <a className="btn btn--go" href={project.site.url} target="_blank" rel="noopener noreferrer">
              사이트 보기 ↗
            </a>
          )}
          {project.repo &&
            (project.repo.private ? (
              <span className="btn btn--off" title="저장소가 비공개라 코드는 요청 시 보여드립니다">
                GitHub (비공개)
              </span>
            ) : (
              <a className="btn" href={project.repo.url} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            ))}
          {project.demo && <span className="demo-note">{project.demo}</span>}
        </div>
      </div>
    </article>
  );
}
