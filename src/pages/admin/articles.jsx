import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import Link from "next/link";
import { getArticles, deleteArticle } from "@/function/axios";
import CommonButton from "@/components/CommonButton";

export default function Articles ({articles}) {
  UseRequireLogin();

  // 削除
  async function deleteArticleBtn (id) {
    const result = confirm("本当に削除しますか？");
    if (!result) return;
    
    const response = await deleteArticle(id);
    console.log("削除状況", response);
  }
  

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
        <table border="1">
          <thead>
            <tr>
              <th>公開状態</th>
              <th>タイトル</th>
              <th>カテゴリ</th>
              <th>作成日</th>
              <th>作成者</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {articles.map(article => (
            <tr key={article.articleId}>
              <td>{article.isPublished ? "公開中": "公開されてません"}</td>
              <td>{article.title}</td>
              <td>{article.category}</td>
              <td>{article.createdAt}</td>
              <td>{article.nickname}</td>
              <td>
                <Link href={`/admin/update/${article.articleId}`}>
                  <CommonButton text="更新"></CommonButton>
                </Link>
                <div onClick={() => deleteArticleBtn(article.articleId)}>
                  <CommonButton text="削除"></CommonButton>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
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