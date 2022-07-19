module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run serve',
        url: ['http://localhost:7000']
      },
      upload: {
        target: 'filesystem',
        outputDir: 'reports'
      },
    },
  };
