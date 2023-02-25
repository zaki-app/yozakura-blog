import { getArticleId, updateArticle } from "@/function/axios";
import { useState } from "react";
import { changeHtml } from "@/function/markdown";
import { newDisplayName, newIndustryName } from "@/function/categoryName";
import { Autocomplete, Switch, FormGroup, FormControlLabel, TextField } from "@mui/material";
import { autoIndustry } from "@/function/markdown/selectCategory";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function Update (article) {
  // console.log("更新記事", article)

  const [title, setTitle] = useState(article.title);
  const [industry, setIndustry] = useState(article.industry);
  const [emoji, setEmoji] = useState(article.emoji);
  const [category, setCategory] = useState(article.category);
  const [isPublished, setIsPublished] = useState(article.isPublished);
  const [contents, setContents] = useState(article.contents);
  const [markdownContents, setMarkdownContents] = useState(article.markdownContents);
  const [activeEmoji, setActiveEmoji] = useState(false);

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

  function emojiSelect (e) {
    setActiveEmoji(!activeEmoji);
  }

  async function updateArticleId(e) {
    console.log(article.articleId)
    e.preventDefault();
    const params = {
      title: title,
      industry: industry,
      emoji: emoji,
      category: category,
      contents: contents,
      isPublished: isPublished,
    }

    await updateArticle(article.articleId, params);
  }

  return(
    // <ContentsWrapper>
    <div className="create">
      <div className="create-input">
        <FormGroup>
          <TextField 
            type="text"
            name="title"
            value={title}
            onChange={changeVal}
          />
          <Autocomplete
            fullWidth
            options={autoIndustry}
            renderInput={params => <TextField {...params} placeholder="職種カテゴリ" />}
            onChange={(event, value) => {
              setIndustry(value.category);
            }}
          />
          <FormControlLabel
            control={
              <Switch 
                onClick={togglePublished}
                defaultChecked
              />
            }
            label={ isPublished ? "公開" : "非公開" }
          />
          <TextField 
            type="text"
            name="category"
            value={category}
            onChange={changeVal}
          />
          <TextField 
            type="text"
            name="emoji"
            value={emoji}
            onChange={changeVal}
          />
          <button
            className="create-input__selectEmoji"
            onClick={emojiSelect}
          >
            アイキャッチ画像を変更
            {activeEmoji ? (
              <div className="emoji">
                <Picker
                  className={activeEmoji ? "active" : ""}
                  data={data} 
                  onEmojiSelect={(emoji) => setEmoji(emoji.native)}
                />
              </div>
            ) : (
              <></>
            )}
          </button>
          <div className="create-input__contents">
            <textarea 
              type="text"
              name="contents"
              placeholder="ここに本文を書いてね"
              value={contents}
              onChange={changeVal}
            />
          </div>
          <button
            className="create-input__selectEmoji"
            onClick={updateArticleId}
          >
            { isPublished ?  "更新する" : "一時保存" }
          </button>
        </FormGroup>
      </div>
      {/* プレビュー */}
      <div className="create-preview">
        <div className="selected-category">
          <p>{newIndustryName(industry)}</p>
          <p>{newDisplayName(category)}</p>
        </div>
        <div className="selected-isPublished">
          {/* 公開設定：<p>{isPublished ? "公開します" : "一時保存用"}</p> */}
        </div>
        <div className="select">
          <div className="selected-emoji">
            {emoji ? emoji : "絵文字なし"}
          </div>
          {/* <div
            dangerouslySetInnerHTML={{ __html: categoryImg }}
          /> */}
        </div>
        <h1>{title}</h1>
        <div
          className="md-contents"
          dangerouslySetInnerHTML={{ __html: markdownContents }} 
        />
      </div>
      {/* <div className="create-preview">
        <div 
          className="md-contents"
          dangerouslySetInnerHTML={{ __html: markdownContents }} 
        />
      </div> */}
      <p>{article.createdAt}に作成されました</p>
    </div>
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