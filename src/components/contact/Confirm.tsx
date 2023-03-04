import { Grid, Box, Typography } from "@mui/joy";
import { Button } from "@mui/material";

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
    if (url) {
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
  }

  return (
    <Grid sx={{ mt: 4 }}>
      <Typography level="h4" sx={{mb: 2}}>
        下記の内容でよろしいですか？
      </Typography>
      <Box sx={{ mb: 3 }}>
        <h5>お名前</h5>
        <Typography level="h4" sx={{mt: 1}}>
          {value.name}
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <h4>メールアドレス</h4>
        <Typography level="h4" sx={{mt: 1}}>
          {value.email}
        </Typography>
      </Box>
      <Box sx={{ mb: 5 }}>
        <h4>お問い合わせ内容</h4>
        <Typography level="h4" sx={{mt: 1}}>
          {value.contact}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={props.handleBack}
        >
          戻って編集
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          送信する
        </Button>
      </Box>
    </Grid>
  )
}