module.exports = {
  ci: {
    collect: {
      staticDistDir: "./build",
      url: ["http://localhost:5173"],
      numberOfRuns: 1,
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
  },
}
