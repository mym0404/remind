# Design

이 저장소의 UI 표면은 Rspress 문서 사이트, README 배너, CoderPad형 practice 앱이다.

## README Banner

- README 상단 이미지는 `public/readme-banner.png`다.
- 배너의 현재 텍스트는 `Remind`와 `React Live Coding in your mind`다.
- 배너는 어두운 navy grid 배경, 오른쪽 neon purple/cyan orbital shape, 왼쪽 흰색 타이포그래피 구성을 쓴다.
- README에서 이미지는 `![Remind](./public/readme-banner.png)`로 참조한다.

## Practice UI

- practice package는 CoderPad 문제처럼 얇은 Vite 앱 형태를 유지한다.
- 첫 화면은 문제 풀이에 필요한 starter UI여야 한다.
- UI 문구는 문제 지시를 반복하지 않고 사용자가 조작해야 하는 label, button, status 중심으로 둔다.
- 카드형 장식보다 입력, 리스트, 상세, overlay 같은 문제 풀이 표면을 우선한다.

## Verification

- 배너 변경 후에는 `public/readme-banner.png`를 직접 열어 텍스트와 배경이 의도에 맞는지 확인한다.
- practice UI 변경 후에는 해당 package의 `pnpm --filter <practice-package-name> dev`로 로컬 화면을 확인한다.
