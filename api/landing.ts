import { axios } from "./axios";
import type { LandingContent } from "./landing.types";

const ENDPOINT = "/content-page/home";

export async function getLandingContent() {
  const { data } = await axios.get<LandingContent>(ENDPOINT);
  return data;
}
