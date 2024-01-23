import axios from "axios";

export const getPersonData = async (query:string) => {
  const response = await axios.get(
   `https://form-autocomplete-jsonserver.vercel.app/person?q=${query}`
  );
  return response.data
};