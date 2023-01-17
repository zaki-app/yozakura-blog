import { getArticles } from "@/function/axios";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { CategoryBlock } from "@/components/articles/CategoryBlock";
import { useRecoilState } from "recoil";
import { centerState } from "@/function/atom/Atom";

export default function ArticleCard () {
  const [ articles, setArticles ] = useState([]);
  const [ category, setCategory ] = useRecoilState(centerState);

  useEffect(() => {
    getArticlesPublic();
  }, []);

  async function getArticlesPublic () {
    const response = await getArticles();
    setArticles(response);
    // recoil
    if (response) {
      const center = response.map(res => res.category);
      setCategory(center);
    }
  };

  return (
    <>
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
    </>
  )
}