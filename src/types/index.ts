import { ReactNode } from "react";

export interface IIRoutingProps {
    isLoggedin: {
        isUserLoggedIn: () => string | null;
        isUserLoggedInToken: () => string | null;
        userData?: () => string | null;
    };
    children: ReactNode;
}

export interface IAuthRouteProps extends IIRoutingProps {
    children: ReactNode;
}

export interface IProtectedRouteProps extends IIRoutingProps {
    children: ReactNode;
}

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}

export type TLoginForm = {
    email: string;
    password: string
  };