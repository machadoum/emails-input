import "@testing-library/jest-dom";
import EmailsInput from ".";

const ADD_BUTTON_SELECTOR = "button[data-add-button]";
const COUNT_BUTTON_SELECTOR = "button[data-count-button]";
const INPUT_SELECTOR = "input[data-el-input]";
const VALID_TAG_SELECTOR = "li[data-valid]";
const INVALID_TAG_SELECTOR = ".tag--invalid";

describe("EmailsInput()", () => {
  beforeAll(() => {
    spyOn(window, "alert").and.returnValue(() => undefined);
  });

  beforeEach(() => {
    document.body.innerHTML = `<div id="emails-input"></div>`;
  });

  it("Initializes DOM", () => {
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    expect(node).toHaveClass("EmailsInput");
    expect(node).not.toBeEmptyDOMElement();
  });

  it("Adds tag when add button is clicked", () => {
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    node.querySelector<HTMLInputElement>(ADD_BUTTON_SELECTOR)!.click();

    expect(node.querySelectorAll(VALID_TAG_SELECTOR)).toHaveLength(1);
  });

  it("Alerts 0 when no email is added", () => {
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    node.querySelector<HTMLInputElement>(COUNT_BUTTON_SELECTOR)!.click();

    expect(window.alert).toBeCalledWith(0);
  });

  it("Alerts 1 when one email is added", () => {
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    node.querySelector<HTMLInputElement>(ADD_BUTTON_SELECTOR)!.click();
    node.querySelector<HTMLInputElement>(COUNT_BUTTON_SELECTOR)!.click();

    expect(window.alert).toBeCalledWith(0);
  });

  it("Deletes the tag when tag delete button is clicked", () => {
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    node.querySelector<HTMLInputElement>(ADD_BUTTON_SELECTOR)!.click();
    node.querySelector<HTMLButtonElement>(`${VALID_TAG_SELECTOR} .tag__delete`)!.click();

    expect(node.querySelectorAll(VALID_TAG_SELECTOR)).toHaveLength(0);
  });

  it("Add email when ',' is typed in the input", () => {
    const typedEmail = "a@mail.com";
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    const input = node.querySelector<HTMLInputElement>(INPUT_SELECTOR)!;

    input.setAttribute("value", typedEmail);
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "," }));

    expect(node.querySelector(VALID_TAG_SELECTOR)).toHaveTextContent(typedEmail);
  });

  it("Add an invalid email when ',' is typed in the input", () => {
    const typedInvalidEmail = "IAmNotAnEmail";
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    const input = node.querySelector<HTMLInputElement>(INPUT_SELECTOR)!;

    input.setAttribute("value", typedInvalidEmail);
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "," }));

    expect(node.querySelector(INVALID_TAG_SELECTOR)).toHaveTextContent(typedInvalidEmail);
  });

  it("Add email when 'Enter' is typed in the input", () => {
    const typedEmail = "a@mail.com";
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    const input = node.querySelector<HTMLInputElement>(INPUT_SELECTOR)!;

    input.setAttribute("value", typedEmail);
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));

    expect(node.querySelector(VALID_TAG_SELECTOR)).toHaveTextContent(typedEmail);
  });

  it("Add email when user focus out the input", () => {
    const typedEmail = "a@mail.com";
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    const input = node.querySelector<HTMLInputElement>(INPUT_SELECTOR)!;

    input.setAttribute("value", typedEmail);
    input.dispatchEvent(new FocusEvent("focusout"));

    expect(node.querySelector(VALID_TAG_SELECTOR)).toHaveTextContent(typedEmail);
  });

  it("Add emails when 3 e-mails are pasted in the input", () => {
    const pastedText = "a@mail.com,b@mail.com,c@mail.com";
    const node = document.body.querySelector<HTMLElement>("#emails-input")!;
    EmailsInput(node);

    const input = node.querySelector<HTMLInputElement>(INPUT_SELECTOR)!;

    // @ts-ignore It is required for simulating pasting event
    window.clipboardData = { getData: () => pastedText };
    input.dispatchEvent(new Event("paste"));

    expect(node.querySelectorAll(VALID_TAG_SELECTOR)).toHaveLength(3);
    expect(node.querySelectorAll(VALID_TAG_SELECTOR)[0]).toHaveTextContent("a@mail.com");
    expect(node.querySelectorAll(VALID_TAG_SELECTOR)[1]).toHaveTextContent("b@mail.com");
    expect(node.querySelectorAll(VALID_TAG_SELECTOR)[2]).toHaveTextContent("c@mail.com");
  });
});
