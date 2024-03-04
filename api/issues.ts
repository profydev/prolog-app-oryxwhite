import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  options?: { signal?: AbortSignal },
  status?: "open" | "resolved",
  level?: "error" | "warning" | "info",
  project?: string,
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, status, level, project },
    signal: options?.signal,
  });
  return data;
}
