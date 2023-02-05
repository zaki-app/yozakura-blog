import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId, getArticles } from "@/function/axios";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { CategoryImageArticle } from "@/components/articles/CategoryImage";
import { changeHtml } from "@/function/markdown";
import { History, DriveFileRenameOutline } from '@mui/icons-material';

export default function ArticleId ({article}) {
  console.log("props", article);

  return (
    <ContentsWrapper>
      <div className="article-detail">
        <div className="article-detail__date">
          <History />
          <p>{article.createdAt}に作成</p>
        </div>
        <div className="article-detail__title">
          <CategoryImageArticle>
            <div dangerouslySetInnerHTML={{ __html: article.svg }}/>
          </CategoryImageArticle>
          <h1>{article.title}</h1>
        </div>
        <div className="article-detail__info">
          <DriveFileRenameOutline />
          <p>{article.nickname}が投稿しました</p>
        </div>

        <div 
          className="md-contents"
          dangerouslySetInnerHTML={{ __html: changeHtml(article.contents) }}
        />
      </div>
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
