import { atomWithStorage } from "jotai/utils";

interface LoginState {
  name: string | null;
  authenticated: boolean;
}

const initialState: LoginState = {
  name: "",
  authenticated: false,
};

export const loginAtom = atomWithStorage<LoginState>(
  "LOGIN_STATE",
  initialState
);
