import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import { useState } from "react";
import { createArticle } from "@/function/axios";

export default function ArticleCreate () {
  UseRequireLogin();

  // state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");

  // create
  async function create (e) {
    e.preventDefault();    
    const params = {
      title: title,
      image: image,
      category: category,
      contents: contents,
    }
    const response = await createArticle(params);
    console.log("結果", response);
  }

  // set
  function changeVal (e) {
    const val = e.target.value;
    const name = e.target.name;
    if (name === "title") {
      setTitle(val);
    } else if (name === "image") {
      setImage(val);
    } else if (name === "category") {
      setCategory(val);
    } else if (name === "contents") {
      setContents(val);
    }
  }

  return (
    <ContentsWrapper>
      <h1>新規作成</h1>
      <p>マークダウンをかけるように</p>
      <br />
      <form onSubmit={create}>
        <label>タイトル</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={changeVal}
        />  
        <label>カテゴリー</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={changeVal}
        />  
        <label>カテゴリー</label>
        <textarea
          name="contents"
          value={contents}
          onChange={changeVal}
        />
        <button type="submit">保存</button>
      </form>
    </ContentsWrapper>
  )
}