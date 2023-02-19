import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import Link from "next/link";
import { getArticlesAdmin, deleteArticle } from "@/function/axios";
import { newDisplayName } from "@/function/categoryName";
import Image from "next/image";
import { emojiParse } from "@/function/emojiParse";
// mui
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Stack,
} from "@mui/material";

export default function Articles ({articles}) {
  UseRequireLogin();
  console.log(articles)

  // 削除
  async function deleteArticleBtn (id) {
    const result = confirm("本当に削除しますか？");
    if (!result) return;
    
    await deleteArticle(id);
  }
  

  return (
    <ContentsWrapper>
      <Stack 
        direction="row"
        spacing={2}
        alignItems="center"
        mb={2}
      >
        <h1>管理者ページ</h1>
        {/* <Typography>管理者ページ</Typography> */}
        <Link href={"/admin/article-create"}>
          <Button variant="contained">新規作成</Button>
        </Link>
      </Stack>
      {/* テーブルエリア */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>公開状態</TableCell>
              <TableCell>絵文字</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>TOPカテゴリ</TableCell>
              <TableCell>言語別カテゴリ</TableCell>
              <TableCell>作成日</TableCell>
              <TableCell>作成者</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map(article => (
              <tr key={article.articleId}>
                <TableCell>{article.isPublished ? "公開中": "公開されてません"}</TableCell>
                <TableCell>
                  {article.emoji 
                    ? <Image
                        src={emojiParse(article.emoji)}
                        alt="絵文字"
                        width={30}
                        height={30}
                      />
                    : ""}
                </TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>{newDisplayName(article.category)}</TableCell>
                <TableCell>{article.industry ? article.industry : '---'}</TableCell>
                <TableCell>{article.createdAt}</TableCell>
                <TableCell>{article.nickname}</TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                  >
                    <Link href={`/admin/update/${article.articleId}`}>
                      <Button variant="contained" sx={{mr: 2}}>更新</Button>
                    </Link>
                    <Button 
                      variant="contained"
                      color="error"
                      onClick={() => deleteArticleBtn(article.articleId)}
                    >削除</Button>
                  </Stack>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ContentsWrapper>
  )
}

export async function getServerSideProps() {
  const articles = await getArticlesAdmin();
  return {
    props: {
      articles
    }
  }
}