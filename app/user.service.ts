import { API_URL } from "../contants";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const getUsers = async () => {
  let data: User[];
  try {
    const res = await fetch(API_URL);
    data = (await res.json()) as User[];
  } catch (err) {
    data = [];
    console.error(err);
  }

  return data;
};
