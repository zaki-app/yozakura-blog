import ContentsWrapper from "@/components/ContentsWrapper";
import { getArticleId, updateArticle } from "@/function/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// updateのみちょっとわからん。。。あとまわし
export default function ArticleUpdate () {
  const router = useRouter();

  // state
  const [oldArticles, setOldArticles] = useState([]);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    (async () => {
      const response = await getArticleId(router.query.id);
      setOldArticles(response);
      setImage(oldArticles.image);
      setTitle(oldArticles.title);
      setCategory(oldArticles.category);
      setContents(oldArticles.contents);
    })();
  }, [
    router.isReady,
    router.query.id,
    oldArticles.image,
    oldArticles.title,
    oldArticles.category,
    oldArticles.contents,
  ]);

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

  // update
  async function update(e) {
    console.log(e);
    const response = await updateArticle(router.query.id);
    console.log("更新状況", response);
  }

  return (
    <ContentsWrapper>
      <h1>更新画面</h1>
      <form onSubmit={update}>
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
        <label>本文</label>
        <textarea
          type="text"
          name="contents"
          value={contents}
          onChange={changeVal}
        />
        <button>更新</button>
      </form>
    </ContentsWrapper>
  )
}