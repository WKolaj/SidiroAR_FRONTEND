import { getBit } from "./utilities";

const userBit = 0;
const adminBit = 1;
const superAdminBit = 2;

export const isUser = function(permissions) {
  return getBit(permissions, userBit);
};

export const isAdmin = function(permissions) {
  return getBit(permissions, adminBit);
};

export const isSuperAdmin = function(permissions) {
  return getBit(permissions, superAdminBit);
};

export const getUserPermissionsLabel = function(permissions) {
  if (isSuperAdmin(permissions)) return "Super Admin";
  if (isAdmin(permissions)) return "Admin";
  if (isUser(permissions)) return "Użytkownik";
  else return "Nieuprawniony";
};
