import baseAPi from "./config";

interface UserPayload {
  name: string;
  email: string;
  username: string;
  password: string;
  age: string;
  photo: string;
}
export function cadastroUser(payload: UserPayload) {
  return baseAPi.post("/users/create", payload);
}
