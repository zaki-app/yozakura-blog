import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId } from "@/function/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ArticleId () {
  const router = useRouter();
  const [articleIds, setArticleIds] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getArticleId(router.query.id);
      setArticleIds(response);
      console.log("ブラウザ側レスポンス", response);
    })();
  }, []);

  return (
    <ContentsWrapper>
      <h2>{articleIds.title}</h2>
      <p>{articleIds.category}</p>
      <p>{articleIds.contents}</p>
      <p>{articleIds.createdAt}</p>
    </ContentsWrapper>
  )
}