// eslint-disable-next-line no-undef
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", "sentence-case"],
    "header-max-length": [2, "always", 120],
  },
};
