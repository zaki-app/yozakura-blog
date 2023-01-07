import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import { useState } from "react";
import { createArticle } from "@/function/axios";
import CreateMarkdown from "@/components/admin/CreateMarkdown";

export default function ArticleCreate () {
  UseRequireLogin();



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
      <CreateMarkdown />
    </ContentsWrapper>
  )
}