export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const PORT = import.meta.env.PORT || 3000;

  try {
    const res = await fetch(`http://localhost:${PORT}/api${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message = errorData?.error || "API request failed";
      throw new Error(message);
    }

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred");
  }
}
