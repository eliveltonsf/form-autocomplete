"use client";

import React, { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPersonData } from "@/services/api";
import { debounce } from "lodash";

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
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const { data, isLoading } = useQuery<PersonProps[]>({
    initialData: [{ id: 0, name: "" }],
    queryFn: () => getPersonData(debouncedInputValue),
    queryKey: ["personData"],
    enabled: !!debouncedInputValue,
  });

  const debouncedFetchUsers = debounce((value) => {
    setDebouncedInputValue(value);
  }, 600);

  const handleInputChange = (event: any, value: string) => {
    setInputValue(value);
    debouncedFetchUsers(value);
  };

  const sendData = (data: number | null) => {
    handleData({ id: data });
  };

  return (
    <Autocomplete
      options={inputValue ? data : []}
      loading={isLoading}
      getOptionLabel={(option) => option.name}
      onChange={(_, value) => sendData(value ? value.id : null)}
      onInputChange={handleInputChange}
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
