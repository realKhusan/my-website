export const sampleContributions = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(2023, 0, i + 1).toISOString().split("T")[0],
  count: Math.floor(Math.random() * 20),
}))

