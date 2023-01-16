import PageSEO from '@/components/PageSEO';
import ContentsWrapper from '@/components/ContentsWrapper';
import ArticleCard from '@/components/articles/ArticleCard';
import CategoryIcon from '@/components/articles/CategoryIcon';

export default function Home() {
  return (
    <>
      <PageSEO title="トップページ" />
      <ContentsWrapper>
        <CategoryIcon />
        <ArticleCard />
      </ContentsWrapper>
    </>
  )
}
