import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId } from "@/function/axios";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ArticleId () {
  const router = useRouter();
  const [articleIds, setArticleIds] = useState({});
  const [categoryImg, setCategoryImg] = useState("");

  useEffect(() => {
    getArticle();
    getImage();
  }, [router.isReady, router.query.id]);

  // 記事取得
  async function getArticle() {
    console.log("呼ばれるか？", router.query.id);
    const response = await getArticleId(router.query.id);
    setArticleIds(response);
    console.log("ブラウザ側レスポンス", response);
  }
  // 画像取得
  async function getImage() {
    const result = await getS3CategoryImage();
    // console.log("S3の方です", result);
    setCategoryImg(result);
    console.log("svgです", categoryImg);
  }

  return (
    <ContentsWrapper>
      <h2>{articleIds.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: categoryImg }}></div>
      {/* <p>{articleIds.contents}</p> */}
      <div dangerouslySetInnerHTML={{ __html: articleIds.contents }}></div>
      <p>{articleIds.createdAt}</p>
    </ContentsWrapper>
  )
}