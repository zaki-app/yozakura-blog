import PageSEO from '@/components/PageSEO';
import CategoryIcon from '@/components/articles/CategoryIcon';
import { getArticles } from '@/function/axios';
import { getS3CategoryImage } from '@/function/s3/getCategoryImage';
import { newDisplayName } from '@/function/categoryName';

export default function Home(props) {
  return (
    <>
      <PageSEO title="トップページ" />
      <CategoryIcon articles={props} />
    </>
  )
}

// ISRで表示
export const getStaticProps = async(context) => {
  console.time("test")
  console.log("hello", context);
  // 最初のデータ取得
  const articles = await getArticles();
  console.log(articles);
  // カテゴリ取得
  const categoryItems = await Promise.all(articles.map(async(article) => {
    // 画像とカテゴリ名とURLを配列へ
    const svg = await getS3CategoryImage(article.category);
    const categoryName = newDisplayName(article.category);
    
    return { name: categoryName, svg: svg, url: article.category }
  }));

  // カテゴリ重複削除
  const uniqueItems = Array.from(
    new Map(categoryItems.map(category => [category.name, category])).values()
  );
  // ALLを追加
  uniqueItems.unshift({name: "すべて", svg: "🌸", url: "all" });

  console.timeEnd("test");
  return {
    props: {
      categoryItems: uniqueItems,
      now: new Date().toLocaleString(),
    },
    revalidate: 10 // 新しいリクエストがあってから5秒間は新しいHTMLを生成しない
  }
}