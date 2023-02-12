import ContentsWrapper from "@/components/ContentsWrapper";
import { categorySearch, getArticleId, getArticles } from "@/function/axios";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { CategoryImageArticle } from "@/components/articles/CategoryImage";
import { changeHtml } from "@/function/markdown";
import { History, DriveFileRenameOutline } from '@mui/icons-material';
import PageSEO from "@/components/PageSEO";
import ArticleCard from "@/components/articles/ArticleCard";
import { emojiParse } from "@/function/emojiParse";
import Image from "next/image";

export default function ArticleId ({article, categories}) {
  console.log("props", article);
  console.log("来てるか？", categories)
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
                        alt="絵文字がない"
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
          {/* その他の同じ言語カテゴリーの記事 */}
          <div className="article-column">
            <ArticleCard articles={categories} />
          </div>
        </div>
      </ContentsWrapper>
    </>
  )
}

export const getStaticPaths = async () => {
  const isProd = process.env.NODE_ENV === 'production';

  const articles = await getArticles();
  const paths = articles.map(article => {
    return {
      params: {
        id: article.articleId.toString()
      }
    }
  })
  console.log("Pathsです", paths);
  return {
    paths,
    // ローカルのみfallbackを有効
    fallback: isProd ? false : 'blocking'
  }
}

export const getStaticProps = async ({params}) => {
  
  // console.log("getStaticPropsです", params.id);
  console.time("getid")
  const article = await getArticleId(params.id);
  const svg = await getS3CategoryImage(article.category);
  article.svg = svg;
  const categoryArticles = await categorySearch(article.category, {
    limit: 5,
    articleId: article.articleId,
  });
  // console.log("カテゴリの記事", categoryArticles) 
  console.timeEnd("getid")
  return {
    props: { 
      article: article,
      categories: categoryArticles,
    },
    // revalidate: 10
  }
}
