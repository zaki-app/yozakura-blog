import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId, getArticles } from "@/function/axios";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { CategoryImageArticle } from "@/components/articles/CategoryImage";
import { changeHtml } from "@/function/markdown";

export default function ArticleId ({article}) {
  console.log("props", article);

  return (
    <ContentsWrapper>
      <h1>{article.title}</h1>
      <p>{article.nickname}が投稿しました</p>
      <CategoryImageArticle>
        <div dangerouslySetInnerHTML={{ __html: article.svg }} />
      </CategoryImageArticle>
      <div 
        className="md-contents"
        dangerouslySetInnerHTML={{ __html: changeHtml(article.contents) }} />
      <p>{article.createdAt}</p>
    </ContentsWrapper>
  )
}

export const getStaticPaths = async () => {
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
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  console.log("getStaticPropsです", params.id);
  const article = await getArticleId(params.id);
  const svg = await getS3CategoryImage(article.category);
  article.svg = svg;
  
  return {
    props: { 
      article: article
    },
    // revalidate: 10
  }
}
