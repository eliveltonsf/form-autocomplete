import axios from "axios";

export const getPersonData = async () => {
  const response = await axios.get(
    "https://form-autocomplete-jsonserver.vercel.app/person"
  );
  return response.data
};