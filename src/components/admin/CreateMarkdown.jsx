import { changeHtml } from "@/function/markdown";
import { useState } from "react";

export default function CreateMarkdown () {

  const [contents, setContents] = useState("");
  const [markdownContents, setMarkdownContents] = useState("");

  function saveArticle (e) {
    console.log(e);
    console.log("コンテンツ", contents);
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
      setMarkdownContents(result)
    }
  }

  return (
    <>
      <div className="create">
        <div className="create__label">
          <label>タイトル</label>
          <input type="text" />
        </div>        
        <div className="create__label">
          <label>カテゴリー</label>
          <input type="text" />
        </div>        
        <div className="create__label">
          <label>カテゴリー画像</label>
          <input type="text" />
        </div>        
        <div className="create__label">
          <label>ここがマークダウンのところ</label>
          <textarea 
            type="text"
            name="contents"
            value={contents}
            onChange={changeVal}
          />
        </div>
        <button onClick={saveArticle}>保存</button>
      </div>
      <div className="create-preview">
        {/* preview */}
        {markdownContents}
      </div>
    </>
  )
}