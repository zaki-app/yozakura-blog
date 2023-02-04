import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import { useState } from "react";
import { createArticle } from "@/function/axios";
import CreateMarkdown from "@/components/admin/CreateMarkdown";

export default function ArticleCreate () {
  UseRequireLogin();

  return (
    <CreateMarkdown />
  )
}