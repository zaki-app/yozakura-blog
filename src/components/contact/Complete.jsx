import { Button } from "@mui/joy";
import Link from "next/link";

export default function CompleteContact () {
  return (
    <>
      お問い合わせいただきありがとうございました。
      <Button>
        <Link href="/">トップへ戻る</Link>
      </Button>
    </>
  )
}