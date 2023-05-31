import ContentsWrapper from "@/components/ContentsWrapper";
import PageSEO from "@/components/PageSEO";
import { changeHtml } from "@/function/markdown";
import fs from "fs";
import path from "path";

export default function Profile () {
  return (
    <>
      <PageSEO title="プロフィール" />
      <ContentsWrapper>
        
      </ContentsWrapper>
    </>
  )
};

export async function getStaticProps () {
  const files = fs.readdirSync(path.join("public/profile"));
  const profile = fs.readFileSync(path.join("/public/profile/", "profile.md"), "utf-8");

  console.log("ファイル名", profile);
  return {
    props: {}
  }
}
