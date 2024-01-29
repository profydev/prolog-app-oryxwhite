import { useQuery } from "@tanstack/react-query";
import { getLandingContent } from "@api/landing";
import type { LandingContent } from "@api/landing.types";

export function useGetContent() {
  return useQuery<LandingContent, Error>(["landing"], getLandingContent);
}
