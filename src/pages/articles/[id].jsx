import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId } from "@/function/axios";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CategoryImageArticle } from "@/components/articles/CategoryImage";

export default function ArticleId ({msg}) {
  console.log("get server", msg);
  const router = useRouter();

  const [article, setArticle] = useState([]);
  const [categoryImg, setCategoryImg] = useState("");

  useEffect(() => {
    getArticle();
  }, [router.query.id]);

  // 記事取得
  async function getArticle() {
    if (router.query.id) {
      const response = await getArticleId(router.query.id);
      console.log("レスポンス", response)
      setArticle(response);
      const svg = await getS3CategoryImage(router.query.category);
      setCategoryImg(svg);
    }
  }

  return (
    <ContentsWrapper>
      <h1>{article.title}</h1>
      <p>{article.nickname}が投稿しました</p>
      <CategoryImageArticle>
        <div dangerouslySetInnerHTML={{ __html: categoryImg }}></div>
      </CategoryImageArticle>
      <div dangerouslySetInnerHTML={{ __html: article.contents }} ></div>
      <p>{article.createdAt}</p>
    </ContentsWrapper>
  )
}

export const getServerSideProps = async (context) => {
  console.log("ちゃんと入るか？", context);
  
  return {
    props: { msg: "hello" }
  }
}
