![React 문법 실전 압축](./public/readme-banner.png)

# React 문법 실전 압축

React와 TypeScript 문법을 빠르게 확인하는 정적 치트시트입니다.

## 구성

- `references/sections.md`: 포함해야 하는 기준 섹션 목록
- `content/sections/*.md`: 섹션별 Markdown 원문
- `src/`: Markdown을 읽어 렌더링하는 Vite 앱
- `scripts/validate-content.mjs`: 기준 섹션과 콘텐츠 구조 검증

## 배포 URL

[https://mym0404.github.io/remind/](https://mym0404.github.io/remind/)

## 실행 방법

```bash
npm install
npm run dev
```

```bash
npm run validate:content
npm run build
```
