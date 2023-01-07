import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId } from "@/function/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ArticleId () {
  const router = useRouter();
  const [articleIds, setArticleIds] = useState({});
  console.log("パス", router.query.id);

  useEffect(() => {
    (async () => {
      console.log("呼ばれるか？", router.query.id);
      const response = await getArticleId(router.query.id);
      setArticleIds(response);
      console.log("ブラウザ側レスポンス", response);
    })();
  }, [router.isReady, router.query.id]);

  return (
    <ContentsWrapper>
      <h2>{articleIds.title}</h2>
      <p>{articleIds.category}</p>
      {/* <p>{articleIds.contents}</p> */}
      <div dangerouslySetInnerHTML={{ __html: articleIds.contents }}></div>
      <p>{articleIds.createdAt}</p>
    </ContentsWrapper>
  )
}