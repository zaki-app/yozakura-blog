import { getArticles } from "@/function/axios";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Articles () {
  const [ articles, setArticles ] = useState([]);

  useEffect(() => {
    (async() => {
      const response = await getArticles();
      setArticles(response);
    })();
  }, []);

  return (
    <>
      {articles.map(article => (
        <Link href={`/articles/${article.articleId}`} key={article.articleId}>
          <p>{article.image}</p>
          <p>{article.title}</p>
          <p>{article.category}</p>
        </Link>
      ))}
    </>
  )
}