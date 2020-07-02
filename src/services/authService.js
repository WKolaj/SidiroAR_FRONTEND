import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const authTokenName = config["authTokenName"];
const authRoute = config["authRoute"];

export async function login(email, password) {
  let result = await http.post(authRoute, {
    email: email,
    password: password,
  });
  let jwt = result.headers[authTokenName];

  return loginWithJWT(jwt);
}

export function getCurrentUser() {
  let jwt = localStorage.getItem(authTokenName);
  return jwtDecode(jwt);
}

export function getCurrentJWT() {
  return localStorage.getItem(authTokenName);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(authTokenName, jwt);
  //Assigning JWT to every header in axios
  http.assignJWT(authTokenName, jwt);
  return getCurrentUser();
}

export function logout() {
  localStorage.removeItem(authTokenName);
}
