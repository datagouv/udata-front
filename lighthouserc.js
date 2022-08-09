module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run serve',
        url: ['http://localhost:7000/en/']
      },
      assert: {
        "assertions": {
          "categories:performance": ["error", {"minScore": 0.43}],
          "categories:accessibility": ["error", {"minScore": 0.98}],
          "categories:best-practices": ["error", {"minScore": 0.93}],
          "categories:seo": ["error", {"minScore": 0.78}],
        }
      },
      upload: {
        target: 'filesystem',
        outputDir: 'reports'
      },
    },
  };
