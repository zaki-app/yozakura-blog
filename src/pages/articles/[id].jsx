import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId } from "@/function/axios";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CategoryImageArticle } from "@/components/articles/CategoryImage";

export default function ArticleId () {
  const router = useRouter();
  const [articleIds, setArticleIds] = useState({});
  const [categoryImg, setCategoryImg] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getArticle();
    getImage();
  }, [router.isReady, router.query.id, category]);

  // 記事取得
  async function getArticle() {
    const response = await getArticleId(router.query.id);
    setArticleIds(response);
    setCategory(response.category);
  }
  // 画像取得
  async function getImage() {
    console.log("カテゴリ", category);
    const result = await getS3CategoryImage(category);
    // console.log("S3の方です", result);
    setCategoryImg(result);
  }

  return (
    <ContentsWrapper>
      <h2>{articleIds.title}</h2>
      <CategoryImageArticle>
        <div dangerouslySetInnerHTML={{ __html: categoryImg }}></div>
      </CategoryImageArticle>
      <div dangerouslySetInnerHTML={{ __html: articleIds.contents }}></div>
      <p>{articleIds.createdAt}</p>
    </ContentsWrapper>
  )
}