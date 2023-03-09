const { defineConfig } = require("cypress");
const fs = require('fs')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      console.log('Starting script');
      const cfgFile = './cypress/udata-front-e2e.cfg';
      if (fs.existsSync(cfgFile)) {
        const cfg = fs.readFileSync(cfgFile, 'utf8');
        config.env.CAPTCHETAT_CONFIGURED = cfg.includes("CAPTCHETAT_BASE_URL");
      }
      return getLocations(`${config.baseUrl}/sitemap.xml`).then(urls => {
        console.log(urls);
        config.env.URLS = urls;
        return config;
      });
    },
    baseUrl: "http://localhost:7000",
    numTestsKeptInMemory: 10,
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});

const axios = require('axios').default;

/**
 * Loads Sitemap and extracts urls
 * @param {string} url
 * @returns {Promise<Array<string>>}
 */
const getLocations = (url) => {
  console.log(`Getting locations from ${url}`);
  return axios.get(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
    },
  })
    .then(res => res.data)
    .then(xml => {
      const locs = [...xml.matchAll(`<loc>(.|\n)*?</loc>`)].map(([loc]) =>
        loc.replace('<loc>', '').replace('</loc>', ''),
      );
      console.log(`Found ${locs.length} locations`);
      return locs;
    });
}
