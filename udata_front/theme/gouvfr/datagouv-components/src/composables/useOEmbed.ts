import { config } from "..";

function constructUrl(baseUrl: string, path: string): string {
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname}${path}`
  return url.toString();
}

export default function useOEmbed(type: string, id: string): string {
  const staticUrl = constructUrl(config.static_root, 'oembed.js');
  return `<div data-udata-${type}="${id}"></div>` + '<' + `script data-udata="${config.site_root}" src="${staticUrl}" async defer><` + '/script>';
}
