import { createTagElement } from "./dom-creation";
import "@testing-library/jest-dom";

const TAG_TEXT = "test 123";
const TAG_VALID = true;
const TAG_CALLBACK = () => undefined;

describe("createTagElement()", () => {
  it("Creates a valid tag", () => {
    const tag = createTagElement(TAG_TEXT, true, TAG_CALLBACK);

    expect(tag).toHaveClass("tag--valid");
    expect(tag).toHaveAttribute("data-valid");
  });

  it("Creates a invalid tag", () => {
    const tag = createTagElement(TAG_TEXT, false, TAG_CALLBACK);

    expect(tag).toHaveClass("tag--invalid");
  });

  it("Calls onDeleteClick when close button is clicked", () => {
    const callback = jest.fn();
    const tag = createTagElement(TAG_TEXT, TAG_VALID, callback);

    tag.querySelector("button")!.click();

    expect(callback).toBeCalledWith(tag);
  });

  it("Display tag text", () => {
    const tagText = "test tag text";
    const tag = createTagElement(tagText, TAG_VALID, TAG_CALLBACK);

    expect(tag).toHaveTextContent(tagText);
  });
});
