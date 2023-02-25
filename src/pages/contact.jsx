import ContentsWrapper from "@/components/ContentsWrapper";
import { Grid, Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import { useState } from "react";
import InputContact from "@/components/contact/Input";
import ConfirmContact from "@/components/contact/Confirm";
import CompleteContact from "@/components/contact/Complete";

function getSteps() {
  return [
    'お問い合わせ入力',
    '確認',
    'お問い合わせ完了',
  ]
}

function getStepContent(stepIndex) {
  console.log(stepIndex);
  switch(stepIndex) {
    case 0:
      return <InputContact />;
    case 1:
      return <ConfirmContact />;
    case 2:
      return <CompleteContact />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function Contact () {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  }

  return (
    <ContentsWrapper>
      <h1>コンタクトページ</h1>
      <Grid container>
        <Grid sm={2} />
        <Grid>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <div>
              <Typography>全ステップの表示を終了</Typography>
              <Button onClick={handleReset}>リセット</Button>
            </div>
          ) : (
            <div>
              <Typography>{getStepContent(activeStep)}</Typography>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                戻る
              </Button>
              <Button
                variant="contained" 
                color="primary"
                onClick={handleNext} 
              >
                {activeStep === Step.length - 1 ? '送信' : '次へ'}
              </Button>
            </div>
          
          )}
        </Grid>
      </Grid>
    </ContentsWrapper>
  )
}