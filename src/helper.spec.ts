// export const randomEmail = () => `${randomText()}@mail.com`;

// export const removeKeysInList = (value: string, list: string[]) => {

import { randomEmail, removeCharactersInList } from "./helper";
import "@testing-library/jest-dom";

describe("randomEmail()", () => {
  it("Generates random email", () => {
    expect(randomEmail()).toMatch(/.*@mail.com/);
  });

  it("Generates different e-mail each time", () => {
    expect(randomEmail()).not.toEqual(randomEmail());
  });
});

describe("removeKeysInList()", () => {
  it("Remove characters of the string that are present in the given list", () => {
    expect(removeCharactersInList("abcdefgh", ["a", "c", "f"])).toBe("bdegh");
  });
});
