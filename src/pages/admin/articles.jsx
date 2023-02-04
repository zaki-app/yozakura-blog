import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import Link from "next/link";
import AdminArticleCard from "@/components/admin/AdminArticleCard";
import { getArticles } from "@/function/axios";

export default function Articles ({articles}) {
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
      {/* テーブルエリア */}
      {articles.map(article => (
        <div key={article.id}>          
          <p>{article.nickname}</p>
        </div>
      ))}
    </ContentsWrapper>
  )
}

export async function getServerSideProps() {
  const articles = await getArticles();
  console.log("記事たち", articles);
  return {
    props: {
      articles
    }
  }
}