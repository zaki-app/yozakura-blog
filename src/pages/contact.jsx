import ContentsWrapper from "@/components/ContentsWrapper";
import { Stepper, Step, StepLabel, Button, Typography, Container } from "@mui/material";
import { useState } from "react";
import InputContact from "@/components/contact/Input";
import ConfirmContact from "@/components/contact/Confirm";
import CompleteContact from "@/components/contact/Complete";
import PageSEO from "@/components/PageSEO";

const steps = ['お問い合わせ入力', '確認', 'お問い合わせ完了',];

export default function Contact () {
  const [activeStep, setActiveStep] = useState(0);
  const [formValue, setFormValue] = useState({});

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  }

  // コンポーネントの振り分け
  const changeForm = (activeStep) => {
    switch(activeStep) {
      case 0:
        return (
          <InputContact
            handleNext={handleNext}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        );
      case 1:
        return (
          <ConfirmContact
            handleNext={handleNext}
            handleBack={handleBack}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        );
      case 2:
        return (
          <CompleteContact
            handleNext={handleNext}
            formValue={formValue}
            setFormValue={setFormValue}
          />
        );
    }
  }

  return (
    <>
      <PageSEO title="お問い合わせ" />
      <ContentsWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === Step.length ? (
          <>
            <Typography>
              最後のページに表示されるところ
            </Typography>
          </>
        ) : (
          <>
            <Typography
              sx={{ mt:2, mb:1 }}
            >
              現在のステップ場所 {activeStep + 1}
            </Typography>
            {changeForm(activeStep)}
          </>
        )}
      </ContentsWrapper>
    </>
  )
}