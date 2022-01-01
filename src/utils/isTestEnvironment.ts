export const isTestEnvironment =
  process.env.CI === "true" || process.env.NODE_ENV === "test";
