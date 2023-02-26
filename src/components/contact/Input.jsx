import { useForm, Controller } from "react-hook-form"
// import { TextField, Button, MenuItem, FormControlLabel } from "@mui/material"
import { 
  Textarea, 
  Input, 
  FormControl,
  Typography,
  FormLabel,
  Button,
  CssVarsProvider,
  Sheet,
} from "@mui/joy";
import { useState, useEffect } from "react";

export default function InputContact (props) {
  console.log("入力画面", props)

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      email: '',
      contact: '',
    }
  });

  // 確認画面へ
  const onConfirm = (data) => {
    console.log("確認画面へ", data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, input: data });
  }

  return (
    <CssVarsProvider>
      <form onSubmit={handleSubmit(onConfirm)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <>
              <FormLabel>お名前</FormLabel>
              <Input 
                {...field}
                type="text"
                placeholder="ヨザクラ花子"
              />
            </>
          )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <>
                <FormLabel>メールアドレス</FormLabel>
                <Input 
                  {...field}
                  type="email"
                  placeholder="yozakura@example.com"
                />
              </>
            )}
          />
          <Controller 
            control={control}
            name="contact"
            render={({ field }) => (
              <>
                <FormLabel>お問い合わせ内容</FormLabel>
                <Textarea
                  {...field}
                  placeholder="お問い合わせ内容をご入力ください"
                  minRows={8}
                />
              </>
            )}
          />
        <Button
          sx={{ mt: 1 }}
          variant="outlined"
          color="primary"
          type="submit"
        >
          確認画面に進む
        </Button>
      </form>
    </CssVarsProvider>
  )
}