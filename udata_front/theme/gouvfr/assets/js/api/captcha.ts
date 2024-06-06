import { apiv2 } from "../plugins/api";

const captchEtatUrl = "captchetat/"
export type CaptchaStyle = 'captchaFR' | 'captchaEN' | 'numerique6_7CaptchaFR' | 'numerique6_7CaptchaEN' |
  'alphabetique6_7CaptchaFR' | 'alphabetique6_7CaptchaEN' | 'alphanumerique12CaptchaFR' |
  'alphanumerique12CaptchaEN' | 'alphabetique12CaptchaFR' | 'alphabetique12CaptchaEN' |
  'numerique12CaptchaFR' | 'numerique12CaptchaEN' | 'alphanumerique6to9LightCaptchaEN' |
  'alphanumerique6to9LightCaptchaFR' | 'alphanumerique4to6LightCaptchaEN' |
  'alphanumerique4to6LightCaptchaFR';

export type CatpchaParams = {
  get: 'html' | 'layout-stylesheet' | 'script-include' | 'image' |
    'reload-icon' | 'sound-icon' | 'reload-disabled-icon' | 'sound-disabled-icon' | 'sound' | 'p';
  c: CaptchaStyle;
  t?: string;
  cs?: string;
}

function fetch(params: CatpchaParams) {
  return apiv2.get(captchEtatUrl, {params})
    .then((resp) => resp.data);
}

export function fetchHtml(style: CaptchaStyle) {
  return fetch({get: 'html', c: style}).then(html =>
    html.replaceAll("/api/simple-captcha-endpoint", apiv2.defaults.baseURL + captchEtatUrl)
  );
}

export function fetchScript(style: CaptchaStyle, id: string) {
  return fetch({get: 'script-include',c: style, t: id}).then(script => {
    const f = new Function(script);
    return f();
  });
}
