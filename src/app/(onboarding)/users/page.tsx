"use client";
import { StepOne } from "./(components)/step-one";
import { StepTwo } from "./(components)/step-two";
import { useState } from "react";

export default function usersPage() {
  const [step, setStep] = useState<number>(1);
  const [projectId, setProjectId] = useState<number | null>(null);
  return (
    <>
      {step === 1 ? (
        <StepOne
          setStep={setStep}
          projectId={projectId}
          setProjectId={setProjectId}
        />
      ) : (
        <StepTwo setStep={setStep} />
      )}
    </>
  );
}
