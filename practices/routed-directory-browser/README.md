# Routed Directory Browser

## 목표

CoderPad File Tree Challenge와 비슷한 파일 탐색기를 완성한다.

현재 코드는 파일 경로를 flat list로 보여준다. 파일 경로 목록을 임의 깊이의 중첩 트리로 바꾸고, 선택한 파일 내용을 표시해야 한다.

## 요구사항

- `path`, `contents`를 가진 파일 배열을 중첩 tree로 변환한다.
- 폴더는 파일보다 먼저 보여준다.
- 같은 depth 안의 항목은 대소문자를 무시하고 알파벳 순으로 정렬한다.
- 임의 깊이의 폴더 구조를 재귀로 렌더링한다.
- 파일을 클릭하면 해당 파일 내용을 오른쪽에 표시한다.
- `react-router-dom`으로 파일 상세 route를 만든다.
- `useParams`로 선택 파일 경로를 읽는다.
- 검색어와 펼침 상태 중 하나는 URL search params에 반영한다.
- 없는 파일 경로는 404 fallback을 보여준다.

## 채점 기준

- `pnpm test`가 통과해야 한다.
- folder/file 구분을 문자열 아이콘에만 의존하지 않는다.
- key는 index가 아니라 안정적인 path를 사용한다.
- CoderPad 예시처럼 `FilePane`과 editor 영역의 책임을 분리한다.

## 실행

```bash
pnpm install
pnpm --filter @remind/practice-routed-directory-browser dev
pnpm --filter @remind/practice-routed-directory-browser test
```
