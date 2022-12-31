import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";

export default function Articles () {
  UseRequireLogin();
  return (
    <ContentsWrapper>
      <h1>管理者ページ</h1>
      <p>ここで一覧、記事作成、更新、削除などができる</p>
    </ContentsWrapper>
  )
}