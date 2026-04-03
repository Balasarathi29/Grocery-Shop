export async function requestJson(path, options = {}) {
  const token = localStorage.getItem("freshshelf-auth-token");
  const shouldAttachAuth = options.auth !== false;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (shouldAttachAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(path, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed.");
  }

  return payload;
}
