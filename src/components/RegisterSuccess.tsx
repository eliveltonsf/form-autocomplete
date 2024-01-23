"use client";

import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { usePersonStore } from "@/hooks/usePersonStore";

export default function RegisterSuccess() {
  const { person, setPerson } = usePersonStore();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 1500);
  }, []);

  return (
    <div className="text-center p-3">
      {isShow ? (
        <>
          {" "}
          <CheckIcon style={{ fontSize: 144 }} className="text-green-500" />
          <h1 className="text-2xl text-gray-700 font-bold">
            Registro efetuado com sucesso!
          </h1>
          <p className="text-sm text-gray-500 font-medium my-6">
            {person?.name}, foi registrado com a matrícula de número {person.id}
            , e-mail: {person.email} e telefone: {person.phone}.
          </p>
        </>
      ) : (
        <div className="flex flex-col flex-1 gap-5 items-center justify-center content-center text-center w-full">
          <Skeleton variant="circular" width={110} height={110} />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1.5rem" }}
            className="w-full"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "3rem" }}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
