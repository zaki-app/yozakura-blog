import { CategorySearch, getArticles } from "@/function/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { centerState } from "@/function/atom/Atom";
import { newDisplayName } from "@/function/categoryName";
import { emojiParse } from "@/function/emojiParse";
import Image from "next/image";


// カテゴリクリックごとに表示する記事を変える
export default function ArticleCard (props) {
  console.log(props.select)

  const [ articles, setArticles ] = useState([]);
  const [ _, setCategory ] = useRecoilState(centerState);
  const [emojiUrl, setEmojiUrl] = useState("");

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
              query: {id: article.articleId, category: article.category }
            }}
            as={`/articles/${article.articleId}`}
            key={article.articleId}
          >
            <div className="article-card">
              <div className="article-card__logo">
                <span className="article-card__logo__emoji">
                  {article.emoji 
                    ? <Image 
                        src={emojiParse(article.emoji)} 
                        alt="絵文字" 
                        width={50}
                        height={50}
                      />
                    : <Image
                        src={emojiParse("😷")}
                        alt="絵文字がない"
                        width={50}
                        height={50}
                      />
                  }
                </span>
              </div>
              <h2 className="article-card__title">{article.title}</h2>
              <p className="article-card__createdAt">{article.createdAt}</p>
              <p className="article-card__category">
                <span>{newDisplayName(article.category)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}