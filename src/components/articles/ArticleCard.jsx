import { CategorySearch, getArticles } from "@/function/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { centerState } from "@/function/atom/Atom";

// カテゴリクリックごとに表示する記事を変える
export default function ArticleCard (props) {
  const [ articles, setArticles ] = useState([]);
  const [ _, setCategory ] = useRecoilState(centerState);

  useEffect(() => {
    getArticlesPublic();
  }, [props.select]);

  async function getArticlesPublic () {
    let response;
    if (props.select === "all") {
      response = await getArticles();
      // recoil
      const center = response.map(res => res.category);
      setCategory(center)
    } else {
      response = await CategorySearch(props.select);
    }

    setArticles(response);
  };

  return (
    <>
      <div className="articles-flex">
        {articles.map(article => (
          <Link 
            href={{ 
              pathname: `/articles/${article.articleId}`, 
              query: {id: article.articleId, category: article.category}
            }}
            key={article.articleId}
          >
            <div className="article-card">
              <h2 className="article-card__title">&#128220;　{article.title}</h2>
              <p className="article-card__createdAt">{article.createdAt}</p>
              {/* <div className="article-card__category">
                <CategoryBlock category={article.category} />
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

// export const getStaticProps = async(context) => {
//   console.log("hello", context);

//   return {
//     isrData: {
//       msg: "ISRで実験中です", 
//       now: new Date().toLocaleString()
//     },
//     revalidate: 5
//   }
// }