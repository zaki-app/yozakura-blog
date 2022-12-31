import Test from '@/components/Test';
import PageSEO from '@/components/PageSEO';

// import { Inter } from '@next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <PageSEO title="トップページ" />
      <main>
        <Test />
      </main>
    </>
  )
}
