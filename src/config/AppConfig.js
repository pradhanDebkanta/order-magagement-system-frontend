import { env } from "./EnvionmentConfig";

export const APP_NAME = "oder-management-system";
export const API_BASE_URL = env.API_ENDPOINT_URL;

export const clientId = process.env.REACT_APP_CLIENT_ID;