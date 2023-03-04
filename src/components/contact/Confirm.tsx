import { Button } from "@mui/joy";
import { contactValue } from "@/types/contactType";

export default function ConfirmContact (props: any) {
  console.log(props)
  const value = props.formValue.input;

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
        onClick={props.handleNext}
      >
        送信する
      </Button>
    </>
  )
}