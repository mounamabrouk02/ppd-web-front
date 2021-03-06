import { atom } from "recoil";

const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    user: null,
    token: null,
    fullName:""
  },
});


export { authState };
