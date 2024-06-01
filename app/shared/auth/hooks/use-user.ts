import { cookies } from "next/headers";

export const useUser = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) return null
  return fetch("http://localhost:3000/api/user/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  }).then((res) => res.json());
};
