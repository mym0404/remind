# Content Quality

이 문서는 문서 본문을 고칠 때의 품질 기준만 둔다. 섹션 개수나 개별 주제 목록은 evergreen knowledge로 관리하지 않는다.

## Audience

독자는 React를 여러 번 써 본 개발자다. `useState`, `map`, `button type`, 단순 label 연결처럼 너무 당연한 설명은 줄인다. 대신 실제 구현에서 자주 놓치는 경계, cleanup, race condition, focus, URL state, cache invalidation 같은 판단 지점을 남긴다.

## Code Examples

- 코드 예시는 전체 앱이 아니라 핵심 흐름만 보여준다.
- 예시 코드는 빌드 가능한 전체 파일일 필요가 없다.
- import, export, 주변 type 선언, Props 보일러플레이트는 주제가 아니면 생략한다.
- 본문 설명보다 코드가 빠르면 코드 가까이에 짧은 영어 주석을 둔다.
- 주석은 의도, 경계 조건, race condition, cleanup처럼 놓치기 쉬운 판단만 설명한다.
- 반복되는 JSX, 타입, mock data, 스타일, 단순 handler는 `// ...` 또는 `{/* ... */}`로 접는다.
- 중요한 라인은 `// [!code highlight]`로 표시한다.
- 코드 블록에는 필요할 때 `title="..."`를 붙인다.
- 긴 코드는 독자가 바로 비교해야 하는 부분만 남긴다.
- 본문은 코드에서 이미 보이는 내용을 다시 설명하지 않는다.

## Rspress MDX

- 중요한 주의점은 `:::warning` 또는 `:::danger`를 쓴다.
- 짧은 보충 설명은 `:::tip` 또는 `:::info`를 쓴다.
- Admonition은 본문을 대신하는 장식이 아니라, 놓치면 버그가 나는 지점을 강조할 때만 쓴다.
- 코드 하이라이트 문법은 `rspress.config.ts`의 Shiki transformer 설정과 함께 유지한다.

## Korean Style

- 번역투와 메타 문구를 줄인다.
- "결론적으로", "이를 통해", "본질적으로" 같은 관용구는 쓰지 않는다.
- 같은 문장 끝맺음을 반복하지 않는다.
- 설명은 짧게 쓰되, 의미를 흐리지 않는다.
- 기술어와 고유명사는 임의로 바꾸지 않는다.
