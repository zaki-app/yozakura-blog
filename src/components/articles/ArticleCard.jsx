import { getArticles } from "@/function/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoryBlock } from "@/components/articles/CategoryBlock";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";

export default function ArticleCard () {
  const [ articles, setArticles ] = useState([]);
  const [ category, setCategory ] = useState("");

  useEffect(() => {
    getArticlesPublic();
  }, []);

  async function getArticlesPublic () {
    const response = await getArticles();
    setArticles(response);
  }

  return (
    <div className="articles-flex">
      {articles.map(article => (
        <Link href={`/articles/${article.articleId}`} key={article.articleId}>
          <div className="article-card">
            <h2 className="article-card__title">&#128220;　{article.title}</h2>
            <p className="article-card__createdAt">{article.createdAt}</p>
            <div className="article-card__category">
              <CategoryBlock category={article.category} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}