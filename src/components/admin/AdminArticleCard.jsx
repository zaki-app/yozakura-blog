import { deleteArticle, getArticles } from "@/function/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import CommonButton from "../CommonButton";

export default function AdminArticleCard () {
  const [ articles, setArticles ] = useState([]);

  useEffect(() => {
    (async() => {
      const response = await getArticles();
      setArticles(response);
    })();
  }, []);

  // 削除
  async function deleteArticleBtn (id) {
    const result = confirm("本当に削除しますか？");
    if (!result) return;
    
    const response = await deleteArticle(id);
    console.log("削除状況", response);
  }

  return (
    <div className="admin-article">
      <div className="admin-article__contents">
        {articles.map(article => (
          <div key={article.articleId}>
            <Link href={`/articles/${article.articleId}`}>
              <p>{article.image}</p>
              <p>{article.title}</p>
              <p>{article.category}</p>
            </Link>
            <Link href={`/admin/${article.articleId}`}>
              <CommonButton text="更新" buttonClass="" />
            </Link>
            <div onClick={() => deleteArticleBtn(article.articleId)}>
              <CommonButton text="削除" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}