import { createArticle } from "@/function/axios";
import { getCurrentUserNickname } from "@/function/cognito";
import { changeHtml } from "@/function/markdown";
import { useEffect, useState } from "react";
import { Autocomplete, Switch, FormGroup, FormControlLabel, TextField } from "@mui/material";
import { autoCategory, autoIndustry } from "@/function/markdown/selectCategory";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function CreateMarkdown () {
  // state
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [markdownContents, setMarkdownContents] = useState([]);
  const [isPublished, setIsPublished] = useState(true);
  const [nickname, setNickname] = useState("");
  const [categoryImg, setCategoryImg] = useState("");
  const [activeEmoji, setActiveEmoji] = useState(false);

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
    // console.log("save data", title, category, contents, markdownContents, isPublished, nickname)
    const params = {
      title: title,
      industry: industry,
      emoji: emoji,
      category: category,
      contents: contents,
      isPublished: isPublished,
      nickname: nickname
    }
    const response = await createArticle(params);
  }

  function changeVal (e) {
    const val = e.target.value;
    const name = e.target.name;
   if (name === "isPublished") {
      setIsPublished(val);
    } else if (name === "contents") {
      setContents(val);
      const result = changeHtml(val);
      setMarkdownContents(result);
    }
  }

  function emojiSelect (e) {
    console.log("クリックされました", e)
    setActiveEmoji(!activeEmoji);
  }

  // カテゴリ画像を取得
  async function getSvg(category) {
    const svg = await getS3CategoryImage(category);
    setCategoryImg(svg)
  }

  return (
    <div className="create">
      <div className="create-input">
        <FormGroup>
          <TextField
            sx={{ mb: 1 }}
            placeholder="タイトル"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Autocomplete
            fullWidth
            options={autoIndustry}
            renderInput={params => <TextField {...params} placeholder="職種カテゴリ" />}
            onChange={(event, value) => {
              setIndustry(value.category);
            }}
          />
          <button
            className="create-input__selectEmoji"
            onClick={emojiSelect}
          >
            アイキャッチ画像を選択
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
          <Autocomplete
            fullWidth
            options={autoCategory}
            renderInput={params => <TextField {...params} placeholder="カテゴリ" />}
            onChange={(event, value) => {
              setCategory(value.category);
              getSvg(value.category);
            }}
          />
          <div className="create-input__contents">
            <textarea 
              type="text"
              name="contents"
              placeholder="ここに本文を書いてね"
              value={contents}
              onChange={changeVal}
            />
          </div>
          <FormControlLabel
            control={
              <Switch 
                onClick={togglePublished}
                defaultChecked
              />
            }
            label={ isPublished ? "公開" : "非公開" }
          />
          <button
            className="create-input__selectEmoji"
            onClick={create}
          >
            { isPublished ?  "保存" : "一時保存" }
          </button>
        </FormGroup>
      </div>
      {/* プレビュー */}
      <div className="create-preview">
        <div className="selected-category">
          <p>{industry}</p>
          <p>{category}</p>
        </div>
        <div className="selected-isPublished">
          公開設定：<p>{isPublished ? "公開します" : "一時保存用"}</p>
        </div>
        <div className="select">
          <div className="selected-emoji">{emoji}</div>
        </div>
        <h1>{title}</h1>
        <div
          className="md-contents"
          dangerouslySetInnerHTML={{ __html: markdownContents }} 
        />
      </div>
    </div>
  )
}