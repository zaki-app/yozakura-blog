import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId, updateArticle } from "@/function/axios";
import { CategoryImageArticle } from "@/components/articles/CategoryImage";
import { useState } from "react";
import { changeHtml } from "@/function/markdown";


export default function Update (article) {

  const [title, setTitle] = useState(article.title);
  const [category, setCategory] = useState(article.category);
  const [isPublished, setIsPublished] = useState(article.isPublished);
  const [contents, setContents] = useState(article.contents);
  const [markdownContents, setMarkdownContents] = useState(article.markdownContents);

  function changeVal (e) {
    const val = e.target.value;
    const name = e.target.name;

    if (name === "title") {
      setTitle(val);
    } else if (name === 'category') {
      setCategory(val);
    } else if (name === 'contents') {
      setContents(val);
      // preview用
      setMarkdownContents(changeHtml(val))
    }
  }

  function togglePublished (e) {
    e.preventDefault();
    setIsPublished(!isPublished);
  }

  async function updateArticleId(e) {
    console.log(article.articleId)
    e.preventDefault();
    const params = {
      title: title,
      category: category,
      contents: contents,
      isPublished: isPublished,
    }

    const response = await updateArticle(article.articleId, params);
    console.log("更新情報", response);
  }

  return(
    <ContentsWrapper>
      更新画面
      <form>
        <input 
          type="text"
          name="title"
          value={title}
          onChange={changeVal}
        />
        <input 
          type="text"
          name="category"
          value={category}
          onChange={changeVal}
        />
        <div className="create-input__toggle">
          <button onClick={togglePublished}>公開する</button>
          <div dangerouslySetInnerHTML={{ __html: isPublished }}></div>
        </div>
        <button onClick={updateArticleId}>更新する</button>
        <textarea 
          name="contents"
          cols="30" 
          rows="10"
          value={contents}
          onChange={changeVal}
          ></textarea>
      </form>
      <div className="create-preview">
        <div 
          className="md-contents"
          dangerouslySetInnerHTML={{ __html: markdownContents }} 
        />
      </div>
      <p>{article.createdAt}に作成されました</p>
    </ContentsWrapper>
  )
}

export async function getServerSideProps({params}) {
  console.log("getServer", params);
  const article = await getArticleId(params.id);
  const markdownContents = changeHtml(article.contents);
  article.markdownContents = markdownContents;
  return {
    props: article
  }
}
