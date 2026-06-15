# 콘텐츠 작성 가이드

이 저장소의 글은 코드 객체가 아니라 Markdown 평문으로 관리한다. 앱은 `references/sections.md`의 섹션 타이틀을 기준으로 `content/sections/*.md` 원문을 읽어 렌더링한다.

## 기준

- `references/sections.md`가 포함 여부와 순서의 기준이다.
- 각 콘텐츠 파일은 `content/sections/<semantic-slug>.md`에 둔다.
- 파일명은 저장용 slug일 뿐 검증 키로 쓰지 않는다.
- 각 파일의 첫 줄은 `# <기준 타이틀>`이어야 한다.
- 기준 타이틀과 Markdown의 H1은 정확히 같아야 한다.
- 번호 기반 ID나 우선순위 라벨을 쓰지 않는다.
- frontmatter, JSON, TypeScript 객체, export 형태로 글을 만들지 않는다.

## 섹션 구조

각 섹션은 아래 구조를 따른다. 문장이 자연스럽게 이어져야 하면 짧은 설명 문단을 먼저 둘 수 있다.

- `## 언제 쓰나`
- `## 바로 쓰는 코드`
- `## 실수 포인트`
- `## 참고`

## 문체

- 섹션을 작성하거나 검수하는 에이전트는 먼저 `/Users/user1/.codex/skills/humanizer-korean-tech/SKILL.md`와 그 안에서 요구하는 `references/quick-rules.md`를 읽고 적용한다.
- 섹션을 작성하거나 검수하는 에이전트는 [Toss technical-writing](https://github.com/toss/technical-writing)의 개발 글쓰기 원칙을 적용한다.
- 쉬운 한국어로 쓴다.
- 번역투와 장식 문구를 줄인다.
- `React`, `TypeScript`, `API`, `ARIA`, `DOM` 같은 기술어는 그대로 둔다.
- 한 문단에는 한 가지 핵심만 둔다.
- 코드가 먼저 빠르게 보이도록 쓴다.
- 개인 목적, 구현 지시, 검증 지시, 홍보 문구를 사이트 본문에 넣지 않는다.

## 코드 예시

- 최신 React와 TypeScript 기준으로 작성한다.
- `any`, `as any`, `@ts-ignore`, `@ts-expect-error`를 쓰지 않는다.
- deprecated API나 낡은 Router 패턴을 쓰지 않는다.
- 접근성 섹션은 native element를 우선하고 필요한 ARIA만 쓴다.
- 코드 예시는 복사해 바로 고칠 수 있을 만큼 짧게 유지한다.

## 참고 링크

- 화면에 보이는 참고 링크는 해당 개념이 처음 나오는 섹션에만 둔다.
- 같은 URL을 여러 섹션에서 반복하지 않는다.
- React는 React 공식 문서, TypeScript는 TypeScript Handbook, DOM API는 MDN, ARIA 패턴은 WAI-ARIA APG를 기준으로 확인한다.
