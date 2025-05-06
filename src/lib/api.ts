type FetchOptions = RequestInit & {
  timeout?: number;
};

export async function fetchData<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { timeout = 8000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw new Error(
      `Failed to fetch data: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
