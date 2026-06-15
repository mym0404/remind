# Rspress Reference

이 문서는 이 저장소에서 쓰는 Rspress 사용법만 정리한다. 전체 공식 문서를 복사하지 않는다.

## Source

- Rspress version: `@rspress/core` 2.0.x
- Checked on: 2026-06-15
- Context7 library: `/web-infra-dev/rspress`
- Quick start: https://rspress.rs/guide/start/getting-started
- Conventional route: https://rspress.rs/guide/basic/conventional-route
- MDX and React components: https://rspress.rs/guide/use-mdx/components
- Frontmatter: https://rspress.rs/guide/use-mdx/frontmatter
- Code blocks: https://rspress.rs/guide/use-mdx/code-blocks
- Links: https://rspress.rs/guide/use-mdx/link
- Container: https://rspress.rs/guide/use-mdx/container
- llms.txt / SSG-MD: https://rspress.rs/guide/basic/ssg-md
- Rspress llms.txt: https://rspress.rs/llms.txt

## Project Setup

공식 Quick start는 `pnpm create rspress@latest`로 scaffold하고, `pnpm install`, `pnpm dev` 순서로 시작한다. 이 repo는 scaffold 결과를 기준으로 `rspress.config.ts`, `docs/`, `package.json` script를 유지한다.

## Config

`defineConfig`는 `@rspress/core`에서 가져온다. 이 repo에서 중요한 설정은 `root`, `base`, `outDir`, `title`, `description`, `themeConfig.sidebar`, `themeConfig.nav`, `search`, `llms`다.

`llms: true`를 켜면 production build에서 agent가 읽기 쉬운 Markdown 산출물과 `llms.txt` 계열 파일이 생성된다.

## MDX

MDX는 Markdown 위에서 React component를 쓸 수 있는 형식이다. 이 repo의 문서 원본은 `.mdx` 확장자를 쓴다.

- Frontmatter는 문서 제목 같은 page metadata가 필요할 때만 쓴다.
- 외부 component가 필요하면 MDX 상단에서 import한다.
- 코드 블록은 fenced code block을 쓴다.
- Custom container는 `:::tip`, `:::info`, `:::warning`, `:::danger`, `:::details` 형식을 쓴다.
- 문서 내부 링크는 Rspress route 경로를 쓴다. 예: `/sections/react-state-events`

## Routing

Rspress는 `docs/` 아래 파일 위치로 route를 만든다. `docs/index.mdx`는 홈이고, `docs/sections/*.mdx`는 `/sections/*` 문서다.
