import { createArticle } from "@/function/axios";
import { getCurrentUserNickname } from "@/function/cognito";
import { changeHtml } from "@/function/markdown";
import { useEffect, useState } from "react";

export default function CreateMarkdown () {
  // state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [markdownContents, setMarkdownContents] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [nickname, setNickname] = useState("");

  // toggle
  function togglePublished () {
    setIsPublished(!isPublished);
  }

  // get user nickname
  useEffect(() => {
    (async () => {
      const user = await getCurrentUserNickname();
      setNickname(user.nickname);
    })();
  }, [])
  
  // create
  async function create (e) {
    e.preventDefault();
    console.log("save data", title, category, contents, markdownContents, isPublished, nickname)
    const params = {
      title: title,
      category: category,
      contents: markdownContents,
      isPublished: isPublished,
      nickname: nickname
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
    } else if (name === "category") {
      setCategory(val);
    } else if (name === "isPublished") {
      setIsPublished(val);
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
            placeholder="カテゴリー セレクトボックスにする"
            value={category}
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
        <div className="create__toggle">
          <button onClick={togglePublished}>公開する</button>
          <div dangerouslySetInnerHTML={{ __html: isPublished }}></div>
        </div>
        <button onClick={create}>保存</button>
      </div>
      <div className="create-preview">
        <div dangerouslySetInnerHTML={{ __html: markdownContents }} />
      </div>
    </>
  )
}