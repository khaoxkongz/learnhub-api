export const getAuthHeader = (authHeader: string | undefined): string => {
  if (!authHeader) {
    throw new TypeError("Authorization header is expected");
  }

  return authHeader.replace("Bearer ", "").trim();
};
