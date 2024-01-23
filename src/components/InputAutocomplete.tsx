"use client";

import React, { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPersonData } from "@/services/api";

import { usePersonStore } from "@/hooks/usePersonStore";

type InputAutocompleteProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  register?: any;
  isError?: boolean;
  errorMessage?: string;
  handleData: (data: any) => void;
};

interface PersonProps {
  id: number;
  name: string;
}

export default function InputAutocomplete({
  name,
  register,
  isError,
  errorMessage,
  handleData,
  ...rest
}: InputAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [personSelect, setPersonSelect] = useState<PersonProps>();
  const { person, setPerson } = usePersonStore();

  const { data, isLoading } = useQuery<PersonProps[]>({
    initialData: [{ id: 0, name: "" }],
    queryFn: getPersonData,
    queryKey: ["personData"],
  });

  const sendData = (data: any) => {
    handleData({ id: data });
  };

  return (
    <Autocomplete
      id="autocomplete"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      onChange={(_, value) => sendData(value ? value.id : null)}
      options={open ? data : []}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...rest}
          {...params}
          {...register(name)}
          error={isError}
          helperText={errorMessage}
          label="Nome"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
