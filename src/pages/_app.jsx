import { Amplify } from "aws-amplify";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import { RecoilRoot } from "recoil";
import Loading from "@/components/Loading";

import '../styles/globals.scss';
import 'highlight.js/styles/vs2015.css';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

Amplify.configure({
  aws_cognito_region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_WEB_CLIENT_ID,
});

export default function App({ Component, pageProps }) {
  // ローディング 
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  
  useEffect(() => {
    const start = (url) => {
      return url !== router.asPath && setPageLoading(true);
    }
    const complete = () => setPageLoading(false);

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', complete);
    router.events.on('routeChangeError', complete);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', complete);
      router.events.off('routeChangeError', complete);
    }
  })

  const loadingComponent = (<Loading />)

  return (
    <RecoilRoot>
      {pageLoading && loadingComponent}
      <Header />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  )
}
