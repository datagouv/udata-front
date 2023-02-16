const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      console.log('Starting script');
      return getLocations(`${config.baseUrl}/sitemap.xml`).then(locations =>
        Promise.all(locations.map(url => getLocations(url)))
          .then(result => result.flat())
          .then(urls => {
            let countDatasets = 0;
            let countReuses = 0;
            let countOrganizations = 0;
            config.env.URLS = urls.filter(url =>
              (!url.includes('/datasets/') || ++countDatasets <= 200) &&
              (!url.includes('/reuses/') || ++countReuses <= 200) &&
              (!url.includes('/organizations/') || ++countOrganizations <= 200)
            );
            return config;
          })
      );
    },
    baseUrl: "http://dev.local:7000",
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
