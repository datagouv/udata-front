import { getLocalizedUrl } from "../helpers/i18n";
import { type Granularities } from "../types/granularity";
import { api } from "./api";

let granularitiesRequest: Promise<Granularities>;

export function getGranularity(granularities: Granularities, id: string): string | null {
  const granularity = granularities.find((g: any) => g.id === id);
  return granularity ? granularity.name : null;
}

export function getGranularitiesUrl() {
  return getLocalizedUrl('spatial/granularities/');
}

export function fetchGranularities(): Promise<Granularities> {
  if (granularitiesRequest) {
    return granularitiesRequest;
  }
  return granularitiesRequest = api.get(getGranularitiesUrl())
  .then((resp) => resp.data);
}
