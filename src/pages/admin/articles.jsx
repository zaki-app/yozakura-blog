import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import Link from "next/link";
import AdminArticleCard from "@/components/admin/AdminArticleCard";

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
      <AdminArticleCard />
    </ContentsWrapper>
  )
}