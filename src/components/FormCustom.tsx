"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personFormSchema } from "@/util/schema";
import { normalizePhoneNumber } from "@/util/masks";
import { RegisterDataProps } from "@/types/personTypes";

import { Button, TextField } from "@mui/material";
import InputAutocomplete from "./InputAutocomplete";

import { usePersonStore } from "@/hooks/usePersonStore";
import { useStepStore } from "@/hooks/useStepStore";

type PersonFormSchema = z.infer<typeof personFormSchema>;

export default function FormCustom() {
  const { setPerson } = usePersonStore();
  const { setStepIndex } = useStepStore();
  const [formData, setFormData] = useState<RegisterDataProps>(
    {} as RegisterDataProps
  );
  const [idPersonSelect, setIdPersonSelect] = useState<number>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PersonFormSchema>({
    resolver: zodResolver(personFormSchema),
  });

  const handleInputMaskChange = (e: any): any => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/\D/g, ""),
    });

    e.target.name === "phone" &&
      setValue("phone", normalizePhoneNumber(e.target.value));
  };

  const getData = (data: any) => {
    const { id } = data;
    setValue("id", id);
  };

  function handlePersonData(data: any) {
    setPerson({ ...data });
    console.log(data);
    setStepIndex(1);
  }

  return (
    <form
      onSubmit={handleSubmit(handlePersonData)}
      className="flex flex-col gap-3"
    >
      <InputAutocomplete
        name="name"
        register={register}
        isError={!!errors.name}
        errorMessage={errors.name?.message}
        handleData={(data: any) => getData(data)}
        className="h-[5rem]"
      />
      <TextField
        id="email"
        label="E-mail"
        type="email"
        variant="outlined"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        className="h-[5rem]"
      />
      <TextField
        id="phone"
        label="Telefone"
        type="string"
        variant="outlined"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        onChange={handleInputMaskChange}
        className="h-[5rem]"
      />
      <Button
        type="submit"
        variant="contained"
        className="bg-blue-400 hover:bg-blue-500"
      >
        Registrar
      </Button>
    </form>
  );
}
