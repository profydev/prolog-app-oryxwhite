import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(
  page?: number,
  status?: "open" | "resolved",
  level?: "error" | "warning" | "info",
  project?: string,
) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page, status, level, project];
}

export function useGetIssues(
  page: number,
  status?: "open" | "resolved",
  level?: "error" | "warning" | "info",
  project?: string,
) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, status, level, project),
    ({ signal }) => getIssues(page, { signal }, status, level, project),
    { keepPreviousData: true },
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(
        getQueryKey(page + 1, status, level, project),
        ({ signal }) => getIssues(page + 1, { signal }, status, level, project),
      );
    }
  }, [query.data, page, queryClient, status, level, project]);
  return query;
}
