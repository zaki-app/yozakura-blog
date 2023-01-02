import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticles } from "@/function/axios";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Articles () {
  UseRequireLogin();

  

  // articles 
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getArticles();
      if (response) {
        setArticles(response);
      } else {
        setArticles(null);
      }
    })();
  }, []);

  return (
    <ContentsWrapper>
      <h1>管理者ページ</h1>
      <p>ここで一覧、記事作成、更新、削除などができる</p>
      {articles.map(article => {
        <Link href={`/articles/${article.postId}`} key={article.postId}>
          <p>{article.postId}</p>
          <p>{article.content}</p>
        </Link>
      })}
    </ContentsWrapper>
  )
}