import { Amplify } from "aws-amplify";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import { RecoilRoot } from "recoil";

import '../styles/globals.scss';

Amplify.configure({
  aws_cognito_region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_WEB_CLIENT_ID,
});

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  )
}
