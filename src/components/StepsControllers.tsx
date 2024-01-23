"use client";
import React from "react";
import { useStepStore } from "@/hooks/useStepStore";
import StepsContainer from "./StepsContainer";
import FormCustom from "./FormCustom";
import RegisterSuccess from "./RegisterSuccess";

export default function StepsControllers() {
  const { stepIndex, setStepIndex } = useStepStore();
  return (
    <>
      {stepIndex === 0 ? (
        <StepsContainer title="Form Autocomplete">
          <FormCustom />
        </StepsContainer>
      ) : (
        <StepsContainer>
          <RegisterSuccess />
        </StepsContainer>
      )}
    </>
  );
}
