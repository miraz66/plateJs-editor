import { cache } from "react";

type FetchOptions = RequestInit & {
  timeout?: number;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export const fetchData = cache(
  async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
    const { timeout = 8000, next, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        next,
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
  },
);
