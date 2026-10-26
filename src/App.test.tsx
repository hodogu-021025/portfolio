import { render, screen, within } from "@testing-library/react";
import { App } from "./App";
import { PROJECTS, primaryLink } from "./data/projects";

describe("포트폴리오", () => {
  it("프로젝트마다 카드가 하나씩, 정해진 순서로 나온다", () => {
    render(<App />);
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles.slice(0, PROJECTS.length)).toEqual(PROJECTS.map((p) => p.name));
  });

  it("사이트가 있는 카드의 제목은 그 사이트를 새 탭으로 연다", () => {
    render(<App />);
    for (const project of PROJECTS) {
      const card = screen.getByRole("article", { name: project.name });
      const link = primaryLink(project);
      const title = within(card).getByRole("heading", { level: 3 });
      const anchor = title.querySelector("a");
      if (link) {
        expect(anchor).toHaveAttribute("href", link.url);
        expect(anchor).toHaveAttribute("target", "_blank");
        expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      } else {
        expect(anchor).toBeNull();
      }
    }
  });

  it("비공개 저장소는 링크 대신 비공개로 표시한다", () => {
    render(<App />);
    for (const project of PROJECTS.filter((p) => p.repo?.private)) {
      const card = screen.getByRole("article", { name: project.name });
      expect(within(card).getByText("GitHub (비공개)")).toBeInTheDocument();
      expect(within(card).queryByRole("link", { name: /GitHub/ })).toBeNull();
    }
  });
});

describe("프로젝트 데이터", () => {
  it("모든 링크는 https 이고 id 는 겹치지 않는다", () => {
    const ids = new Set(PROJECTS.map((p) => p.id));
    expect(ids.size).toBe(PROJECTS.length);
    for (const p of PROJECTS) {
      for (const url of [p.site?.url, p.repo?.url].filter(Boolean)) {
        expect(url).toMatch(/^https:\/\//);
      }
      expect(p.facts.length).toBeGreaterThan(0);
      expect(p.shot || p.placeholder).toBeTruthy();
    }
  });
});
