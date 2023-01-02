import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import ArticleCard from "@/components/articles/ArticleCard";
import Link from "next/link";

export default function Articles () {
  UseRequireLogin();

  return (
    <ContentsWrapper>
      <h1>管理者ページ</h1>
      <p>ここで一覧、記事作成、更新、削除などができる</p>
      <button>
        <Link href={"/admin/article-create"}>
          新規作成
        </Link>
      </button>
      <ArticleCard />
    </ContentsWrapper>
  )
}