import { apiv2 } from "../plugins/api";

const captchEtatUrl = "captchetat/"
/**
 * @typedef {'captchaFR' | 'captchaEN' | 'numerique6_7CaptchaFR' | 'numerique6_7CaptchaEN' | 
 *              'alphabetique6_7CaptchaFR' | 'alphabetique6_7CaptchaEN' | 'alphanumerique12CaptchaFR' |
 *              'alphanumerique12CaptchaEN' | 'alphabetique12CaptchaFR' | 'alphabetique12CaptchaEN' | 
 *              'numerique12CaptchaFR' | 'numerique12CaptchaEN' | 'alphanumerique6to9LightCaptchaEN' | 
 *              'alphanumerique6to9LightCaptchaFR' | 'alphanumerique4to6LightCaptchaEN' |
 *              'alphanumerique4to6LightCaptchaFR'} CaptchaStyle
 */

/**
 * @param {{ get: 'html' | 'layout-stylesheet' | 'script-include' | 'image' | 
 *              'reload-icon' | 'sound-icon' | 'reload-disabled-icon' | 'sound-disabled-icon' | 'sound' | 'p';
 *          c: 'captchaFR' | 'captchaEN' | 'numerique6_7CaptchaFR' | 'numerique6_7CaptchaEN' | 
 *              'alphabetique6_7CaptchaFR' | 'alphabetique6_7CaptchaEN' | 'alphanumerique12CaptchaFR' |
 *              'alphanumerique12CaptchaEN' | 'alphabetique12CaptchaFR' | 'alphabetique12CaptchaEN' | 
 *              'numerique12CaptchaFR' | 'numerique12CaptchaEN' | 'alphanumerique6to9LightCaptchaEN' | 
 *              'alphanumerique6to9LightCaptchaFR' | 'alphanumerique4to6LightCaptchaEN' |
 *              'alphanumerique4to6LightCaptchaFR';
 *          t?: string;
 *          cs?: string }} params
 */
function fetch(params) {
    return apiv2.get(captchEtatUrl, {params})
    .then((resp) => resp.data);
}

/**
 * @param {CaptchaStyle} style
 */
export function fetchHtml(style) {
    return fetch({get: 'html', c: style}).then(html =>
        html.replaceAll("/api/simple-captcha-endpoint", apiv2.defaults.baseURL + captchEtatUrl)
    );
}

/**
 * @param {CaptchaStyle} style
 * @param {string} id
 */
export function fetchScript(style, id) {
    return fetch({get: 'script-include',c: style, t: id}).then(script => {
            const f = new Function(script);
            return f();
        });
}
