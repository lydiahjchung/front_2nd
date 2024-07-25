module.exports = {
  ci: {
    collect: {
      staticDistDir: "./", // Use current directory
      url: ["index.html"], // Test the simple HTML file
      numberOfRuns: 1,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      preset: "lighthouse:no-pwa",
    },
  },
}
