# URL Search Params

## 언제 쓰나

- 검색어나 필터를 URL에 남겨서 새로고침해도 같은 결과를 보여줘야 할 때 쓴다.
- 목록 화면의 조건을 링크로 공유해야 할 때 쓴다.
- 뒤로 가기 기록이 검색어 한 글자마다 쌓이지 않게 관리해야 할 때 쓴다.

## 바로 쓰는 코드

`useSearchParams`로 query string을 읽고 쓴다. 컴포넌트가 처음 렌더링될 때도 URL에서 값을 읽으므로 별도 초기화 effect가 필요 없다.

```tsx
import { type ChangeEvent, useMemo } from "react";
import { useSearchParams } from "react-router";

type Category = "all" | "docs" | "api";

type Article = {
  bookmarked: boolean;
  category: Exclude<Category, "all">;
  id: string;
  title: string;
};

const articles: Article[] = [
  {
    bookmarked: true,
    category: "docs",
    id: "article-1",
    title: "URLSearchParams로 query string 만들기",
  },
  {
    bookmarked: false,
    category: "api",
    id: "article-2",
    title: "검색 조건으로 API 다시 호출하기",
  },
  {
    bookmarked: true,
    category: "docs",
    id: "article-3",
    title: "필터 상태를 URL에 복원하기",
  },
];

const categories: Category[] = ["all", "docs", "api"];

const categoryLabels: Record<Category, string> = {
  all: "전체",
  docs: "문서",
  api: "API",
};

const isCategory = (value: string): value is Category =>
  categories.some((category) => category === value);

export const ArticleListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "all";
  const category = isCategory(categoryParam) ? categoryParam : "all";
  const bookmarkedOnly = searchParams.get("bookmarked") === "true";

  const updateSearchParams = ({
    nextBookmarkedOnly = bookmarkedOnly,
    nextCategory = category,
    nextQuery = query,
  }: {
    nextBookmarkedOnly?: boolean;
    nextCategory?: Category;
    nextQuery?: string;
  }) => {
    const nextParams = new URLSearchParams(searchParams);
    const trimmedQuery = nextQuery.trim();

    if (trimmedQuery) {
      nextParams.set("q", trimmedQuery);
    } else {
      nextParams.delete("q");
    }

    if (nextCategory === "all") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", nextCategory);
    }

    if (nextBookmarkedOnly) {
      nextParams.set("bookmarked", "true");
    } else {
      nextParams.delete("bookmarked");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const visibleArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesQuery = article.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        category === "all" || article.category === category;
      const matchesBookmark = !bookmarkedOnly || article.bookmarked;

      return matchesQuery && matchesCategory && matchesBookmark;
    });
  }, [bookmarkedOnly, category, query]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearchParams({ nextQuery: event.target.value });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextCategory = event.target.value;

    if (isCategory(nextCategory)) {
      updateSearchParams({ nextCategory });
    }
  };

  const handleBookmarkedChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearchParams({ nextBookmarkedOnly: event.target.checked });
  };

  return (
    <section>
      <label htmlFor="article-query">검색어</label>
      <input
        id="article-query"
        onChange={handleQueryChange}
        placeholder="예: URL"
        value={query}
      />

      <label htmlFor="article-category">분류</label>
      <select
        id="article-category"
        onChange={handleCategoryChange}
        value={category}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {categoryLabels[item]}
          </option>
        ))}
      </select>

      <label>
        <input
          checked={bookmarkedOnly}
          onChange={handleBookmarkedChange}
          type="checkbox"
        />
        북마크만 보기
      </label>

      {visibleArticles.length === 0 ? (
        <p>조건에 맞는 글이 없습니다.</p>
      ) : (
        <ul>
          {visibleArticles.map((article) => (
            <li key={article.id}>
              <strong>{article.title}</strong>
              <span>{categoryLabels[article.category]}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
```

## 실수 포인트

- URL에서 값을 읽을 때 `null`을 그대로 state처럼 쓰지 말고 기본값으로 바꾼다.
- query string 값은 문자열이므로 필터 값은 허용된 값인지 확인한 뒤 쓴다.
- `URLSearchParams`를 직접 수정한 뒤에는 `setSearchParams`에 새 값을 넘겨 URL을 갱신한다.
- 검색어와 필터가 바뀌면 표시 목록을 다시 계산하도록 `useMemo` dependency에 모두 넣는다.
- 입력할 때마다 `push`로 이동하면 history entry가 너무 많이 쌓이므로 `{ replace: true }`를 쓴다.
- URL과 React state를 따로 두면 새로고침이나 뒤로 가기에서 서로 다른 조건을 보여줄 수 있다.

## 참고

- [React Router useSearchParams](https://reactrouter.com/api/hooks/useSearchParams)
