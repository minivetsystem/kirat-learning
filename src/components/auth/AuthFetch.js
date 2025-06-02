export async function authFetch(url, options = {}) {
  const getAuthToken = () => {
    if (typeof document === "undefined") return null
    const authToken = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("authToken="))
      ?.split("=")[1]
    return authToken ? decodeURIComponent(authToken) : null
  }

  const token = getAuthToken()

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  if (options.body instanceof FormData) {
    delete headers["Content-Type"]
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
