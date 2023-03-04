import { Button } from "@mui/joy";

export default function ConfirmContact (props: any) {
  const value = props.formValue.input;
  
  const handleSubmit = async() => {
    const params = props.formValue.input;
    // gas用にparamを修正
    const formBody = [];
    for (let param in params) {
      let encodeKey = encodeURI(param);
      let encodeVal = encodeURIComponent(params[param]);
      formBody.push(encodeKey + "=" + encodeVal);
    }
    const newBody = formBody.join("&");

    // gasでスプレッドシートに保存
    const url = process.env.NEXT_PUBLIC_CONTACT_GAS_URL;
    await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: newBody,
    }).then(res => {
      props.handleNext();
    }).catch(err => {
      alert("送信に失敗しました");
      console.log("送信エラー", err);
    })
  }

  return (
    <>
      下記の内容でよろしいですか？
      <p>{value.name}</p>
      <p>{value.email}</p>
      <p>{value.contact}</p>
      <Button
        onClick={props.handleBack}
      >
        戻って編集
      </Button>
      <Button
        onClick={handleSubmit}
      >
        送信する
      </Button>
    </>
  )
}