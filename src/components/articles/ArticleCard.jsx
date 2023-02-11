import { CategorySearch, getArticles } from "@/function/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { centerState } from "@/function/atom/Atom";
import { newDisplayName } from "@/function/categoryName";
import { emojiParse } from "@/function/emojiParse";
import Image from "next/image";

/**
 * 職種of言語カテゴリごとの記事カードを表示
 * 初期値は全ての記事
 * @param {category or industry} articles object 
 * @returns 記事カード
 */
export default function ArticleCard ({articles}) {
  
  return (
    <>
      {articles.map(article => (
        <Link
          href={{
            pathname: `/articles/${article.articleId}`,
          }}
          as={`/articles/${article.articleId}`}
          key={article.articleId}
        >
          <div className="article-card">
            <div className="article-card__logo">
              <span className="article-card__logo__emoji">
                {article.emoji 
                  ? <Image 
                      src={emojiParse(article.emoji)} 
                      alt="絵文字" 
                      width={50}
                      height={50}
                    />
                  : <Image
                      src={emojiParse("😷")}
                      alt="絵文字がない"
                      width={50}
                      height={50}
                    />
                }
              </span>
            </div>
            <h2 className="article-card__title">{article.title}</h2>
            <p className="article-card__createdAt">{article.createdAt}</p>
            <p className="article-card__category">
              <span>{newDisplayName(article.category)}</span>
            </p>
          </div>
        </Link>
      ))}
    </>
  )
}