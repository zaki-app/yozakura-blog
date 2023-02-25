import ContentsWrapper from "@/components/ContentsWrapper";
import { categorySearch, getArticleId, getArticles } from "@/function/axios";
import { changeHtml } from "@/function/markdown";
import { History, DriveFileRenameOutline } from '@mui/icons-material';
import PageSEO from "@/components/PageSEO";
import ArticleCard from "@/components/articles/ArticleCard";
import { emojiParse } from "@/function/emojiParse";
import Image from "next/image";
import OtherArticle from "@/components/articles/OtherArticle";
import { newDisplayName } from "@/function/categoryName";
import { useEffect, useState } from "react";

export default function ArticleId ({article, categories}) {

  return (
    <>
      <PageSEO title={article.title} />
      <ContentsWrapper>
        <div className="article-detail">
          <div className="article-detail__contents">
            <div className="info">
              {/* ここらへんでアイキャッチ画像を設定する？？ */}
              <figure>
                <figcaption className="date">
                  <History />
                  <p>{article.updatedAt ? `${article.updatedAt}に更新`: `${article.createdAt}に投稿` }</p>
                </figcaption>
                <div className="eyecatch">
                  {article.emoji
                    ? <Image 
                        src={emojiParse(article.emoji)} 
                        alt="絵文字" 
                        width={80}
                        height={80}
                      />
                    : <Image
                        src={emojiParse("😷")}
                        alt="not emoji"
                        width={80}
                        height={80}
                      />
                  }
                </div>
                <div className="title">
                  <h1>{article.title}</h1>
                </div>
                <figcaption className="user">
                  <DriveFileRenameOutline />
                  <p>{article.nickname}が投稿しました</p>
                </figcaption>
              </figure>
            </div>
            <div 
              className="md-contents"
              dangerouslySetInnerHTML={{ __html: changeHtml(article.contents) }}
            />
          </div>
          <div className="article-column">
            <div className="article-column__title">
              {/* その他の同じ言語カテゴリーの記事 */}
              <OtherArticle category={newDisplayName(article.category)}/>
            </div>
            <div className="article-column__article">
              {categories.length === 0 
                ? `${newDisplayName(article.category)}の投稿はまだありません`
                : <ArticleCard articles={categories} />}
            </div>
          </div>
        </div>
      </ContentsWrapper>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const article = await getArticleId(params.id);
  // 同じカテゴリ記事を取得
  const categoryArticles = await categorySearch(article.categories, {
    limit: 10,
    articleId: article.articleId,
  });
  return {
    props: {
      article: article,
      categories: categoryArticles
    }
  }
}