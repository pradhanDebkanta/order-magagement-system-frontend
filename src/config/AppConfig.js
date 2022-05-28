import { env } from "./EnvionmentConfig";

export const APP_NAME = "oder-management-system";
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const AUTH_SUFFIX_PATH = '/auth';
export const ADMIN_SUFFIX_PATH = '/admin';
export const SIGNUP_SUFFIX_PATH = "/signup";
export const LOGIN_SUFFIX_PATH = "/login";

export const clientId = process.env.REACT_APP_CLIENT_ID;