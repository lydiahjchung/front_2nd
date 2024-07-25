module.exports = {
  ci: {
    collect: {
      staticDistDir: "./",
      url: ["index.html"],
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--no-sandbox --disable-gpu --disable-dev-shm-usage",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:no-pwa",
    },
  },
}
