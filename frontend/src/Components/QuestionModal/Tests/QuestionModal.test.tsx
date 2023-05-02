import { checkWhitespaces } from "../../../Helpers/helper";

describe("checkWhitespaces", () => {
  it("Correctly detects a whitespace", () => {
    const value = "Super man";
    const funcResult = checkWhitespaces(value);
    expect(funcResult).toBe(true);
  });

  it("Correctly detects the abscence of whitespace", () => {
    const value = "Batman";
    const funcResult = checkWhitespaces(value);
    expect(funcResult).toBe(false);
  });
});

export {};
