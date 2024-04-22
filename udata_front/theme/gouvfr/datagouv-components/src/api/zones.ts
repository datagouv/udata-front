import { getLocalizedUrl } from "../helpers/i18n";
import { api } from "./api";

export function getZoneUrl(zoneId: string) {
  return getLocalizedUrl('/spatial/zones/' + zoneId + '/');
}

export function fetchZone(zoneId: string): Promise<string> {
  return api.get(getZoneUrl(zoneId))
  .then((resp) => resp.data.features[0].properties.name);
}
