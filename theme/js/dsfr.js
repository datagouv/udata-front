/**
 * When loading, DSFR check for custom settings in `window.dsfr`
 * Then, they overwrite it with the DSFR object
 * We use a manual mode to load all our vue instances before starting the DSFR engine.
 */
window.dsfr = {
    mode: 'manual',
}
