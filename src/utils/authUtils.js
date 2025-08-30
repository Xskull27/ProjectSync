export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    // Decode JWT token to check expiration (handles base64url and padding)
    const base64Url = token.split(".")[1];
    if (!base64Url) return false;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
    const payload = JSON.parse(atob(padded));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};
