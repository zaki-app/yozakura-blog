import { getArticles } from "@/function/axios";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function ArticleCard () {
  const [ articles, setArticles ] = useState([]);

  useEffect(() => {
    (async() => {
      const response = await getArticles();
      setArticles(response);
    })();
  }, []);

  return (
    <div className="articles-flex">
      {articles.map(article => (
        <Link href={`/articles/${article.articleId}`} key={article.articleId}>
          <div className="article-card">
            <h2 className="article-card__title">📝  {article.title}</h2>
            <p className="article-card__createdAt">{article.createdAt}</p>
            <p className="article-card__category">{article.category}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}