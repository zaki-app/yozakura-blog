import { Grid } from "@mui/joy";
import Link from "next/link";
import { Button, Typography } from "@mui/material";

export default function CompleteContact () {
  return ( 
    <Grid
      container
      direction="column"
    >
      <Typography sx={{ mb: 4 }}>
        お問い合わせいただきありがとうございました。
      </Typography>
      <Button variant="contained" color="primary">
        <Link href="/">トップへ戻る</Link>
      </Button>
    </Grid>
  )
}