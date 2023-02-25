import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

import ContentsWrapper from "./ContentsWrapper";

export default function Test () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jh5icvweg2.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      .then(res => {
        setPosts(res.data.data);
        console.log(res.data.Items);
      }).catch(err => {
        console.error("エラー", err)
      })
  }, [])

  return (
    <ContentsWrapper>
      <h1>テスト</h1>
      {posts.map(post => (
        <Link href={`/articles/${post.postId}`} key={post.postId}>
          <p>{post.author}</p>
          <p>{post.content}</p>
        </Link>
      ))}
    </ContentsWrapper>
  )
}

export function getStaticProps () {
  console.log("nodejsです", process.env.COGNITO_USER_POOL_ID);
  return {
    props: { hello: "hello" }
  }
}