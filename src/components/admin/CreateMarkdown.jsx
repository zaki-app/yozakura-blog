import { createArticle } from "@/function/axios";
import { getCurrentUserNickname } from "@/function/cognito";
import { changeHtml } from "@/function/markdown";
import { useEffect, useState } from "react";
import { Autocomplete, Button, Switch, FormGroup, FormControlLabel, TextField, OutlinedInput } from "@mui/material";
import { autoCategory } from "@/function/markdown/autoCategory";
import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { CategoryImageArticle } from "../articles/CategoryImage";

export default function CreateMarkdown () {
  // state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contents, setContents] = useState("");
  const [markdownContents, setMarkdownContents] = useState([]);
  const [isPublished, setIsPublished] = useState(true);
  const [nickname, setNickname] = useState("");
  const [categoryImg, setCategoryImg] = useState("");

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
      contents: contents,
      isPublished: isPublished,
      nickname: nickname
    }
    const response = await createArticle(params);
    console.log("結果", response);
  }

  function changeVal (e) {
    const val = e.target.value;
    const name = e.target.name;
   if (name === "isPublished") {
      setIsPublished(val);
    } else if (name === "contents") {
      setContents(val);
      const result = changeHtml(val);
      console.log(result);
      setMarkdownContents(result);
    }
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
          options={autoCategory}
          renderInput={params => <TextField {...params} placeholder="カテゴリ" />}
          onChange={(event, value) => {
            setCategory(value.category);
            getSvg(value.category);
          }}
        />
        カテゴリ{ category }
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
        <div dangerouslySetInnerHTML={{ __html: isPublished }}></div>
        <Button 
          onClick={create}
          variant="contained"
        >
          { isPublished ?  "保存" : "一時保存" }
        </Button>
      </FormGroup>
      </div>
      <div className="create-preview">
        <h1>{title}</h1>
        <CategoryImageArticle>
          <div dangerouslySetInnerHTML={{ __html: categoryImg }} />
        </CategoryImageArticle>
        <div
          className="md-contents"
          dangerouslySetInnerHTML={{ __html: markdownContents }} 
        />
      </div>
    </div>
  )
}