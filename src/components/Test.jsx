import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

import ContentsWrapper from "./ContentsWrapper";

export default function Test () {
  // console.log("環境変数", process.env.COGNITO_REGION);
  const [posts, setPosts] = useState([]);
  // axios
  // useEffect(() => {
  //   axios.get("https://jh5icvweg2.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
  //     .then(res => {
  //       setPosts(res.data.data);
  //       console.log(res.data.Items);
  //     }).catch(err => {
  //       console.error("エラー", err)
  //     })
  // }, [])

  return (
    <ContentsWrapper>
      <h1>テスト</h1>
      { process.env.NEXT_PUBLIC_FOO }
      {/* {posts.map(post => (
        <Link href={`/articles/${post.postId}`} key={post.postId}>
          <p>{post.author}</p>
          <p>{post.content}</p>
        </Link>
      ))} */}
    </ContentsWrapper>
  )
}

export function getStaticProps () {
  console.log("nodejsです", process.env.COGNITO_USER_POOL_ID);
  return {
    props: { hello: "hello" }
  }
}