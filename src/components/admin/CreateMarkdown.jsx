import { createArticle } from "@/function/axios";
import { changeHtml } from "@/function/markdown";
import { useState } from "react";

export default function CreateMarkdown () {
  // state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [markdownContents, setMarkdownContents] = useState([]);

  // create
  async function create (e) {
    e.preventDefault();
    console.log("save data", image, title, category, contents, markdownContents)
    const params = {
      title: title,
      image: image,
      category: category,
      contents: markdownContents,
    }
    const response = await createArticle(params);
    console.log("結果", response);
  }

  // change 
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
      const result = changeHtml(val);
      console.log(result);
      setMarkdownContents(result);
    }
  }

  return (
    <>
      <div className="create">
        <div className="create__title">
          <input
            type="text"
            name="title"
            placeholder="タイトル"
            value={title}
            onChange={changeVal}
          />
        </div>        
        <div className="create__category">
          <input
            type="text"
            name="category"
            placeholder="カテゴリー"
            value={category}
            onChange={changeVal}
          />  
        </div>        
        <div className="create__image">
          <input
              type="text"
              name="image"
              placeholder="画像"
              value={image}
              onChange={changeVal}
            />
        </div>        
        <div className="create__contents">
          <textarea 
            type="text"
            name="contents"
            placeholder="ここに本文を書いてね"
            value={contents}
            onChange={changeVal}
          />
        </div>
        <button onClick={create}>保存</button>
      </div>
      <div className="create-preview">
        <div dangerouslySetInnerHTML={{ __html: markdownContents }} />
      </div>
    </>
  )
}