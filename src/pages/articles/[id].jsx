import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId, getArticles } from "@/function/axios";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { CategoryImageArticle } from "@/components/articles/CategoryImage";

export default function ArticleId ({article}) {
  console.log("props", article);

  return (
    <ContentsWrapper>
      <h1>{article.title}</h1>
      <p>{article.nickname}が投稿しました</p>
      <CategoryImageArticle>
        <div dangerouslySetInnerHTML={{ __html: article.svg }}></div>
      </CategoryImageArticle>
      <div dangerouslySetInnerHTML={{ __html: article.contents }} ></div>
      <p>{article.createdAt}</p>
    </ContentsWrapper>
  )
}

export const getStaticPaths = async (context, foo) => {
  const articles = await getArticles();
  const paths = articles.map(article => {
    return {
      params: {
        id: article.articleId.toString()
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params}) => {
  console.log("getStaticPropsです", params);
  const article = await getArticleId(params.id);
  const svg = await getS3CategoryImage(article.category);
  article.svg = svg;
  
  return {
    props: { 
      article: article
    },
    revalidate: 10
  }
}
