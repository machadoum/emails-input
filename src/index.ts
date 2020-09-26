import { createTagElement, createInitialHtml } from "./dom-creation";
import { randomEmail, removeKeysInList } from "./helper";
import "./style.pcss";

const rootClassName = "EmailsInput";

const ACTION_KEY_LIST = ["Enter", ",", ";", " "];

const EmailsInput = (node: HTMLElement) => {
  // ---------- SETUP HTML INITIAL STATE ----------
  node.classList.add(rootClassName);
  node.innerHTML = createInitialHtml(); // Using innerHTML to save time. Even though it ins't safe or fast.

  // ---------- QUERY SELECTORS  ----------
  const input = node.querySelector<HTMLInputElement>("input[data-el-input]")!;
  const tagList = node.querySelector<HTMLUListElement>("ul[data-el-box]")!;
  const addButton = node.querySelector<HTMLButtonElement>("button[data-add-button]")!;
  const countButton = node.querySelector<HTMLButtonElement>("button[data-add-count]")!;

  // ---------- DOM MANIPULATION ----------
  const addNewTagToList = (tag: HTMLLIElement) => {
    tagList.insertBefore(tag, tagList.childNodes[tagList.childNodes.length - 1]);
  };

  const clearInput = () => {
    input.value = "";
  };

  const setInput = (value: string) => {
    input.value = value;
  };

  const getAllValidEmails = () => tagList.querySelectorAll("li[data-valid]");

  // ---------- EVENT LISTENER INITIALIZATION ----------
  const onPaste = (event: ClipboardEvent) => {
    const pastedText = event.clipboardData!.getData("text");
    pastedText
      ?.trim()
      .split(",")
      .forEach(text => {
        if (text !== "") {
          // Add email by email in order to use HTML5 email validation
          setInput(text);
          addNewTagToList(createTagElement(text, input.validity.valid));
        }
      });

    clearInput();
    event.preventDefault();
  };

  const onKeyUp = (event: KeyboardEvent) => {
    if (ACTION_KEY_LIST.includes(event.key)) {
      const cleanValue = removeKeysInList(input.value, ACTION_KEY_LIST);

      if (cleanValue !== "") {
        setInput(cleanValue); // Update the input value to use HTML5 validation API
        addNewTagToList(createTagElement(cleanValue, input.validity.valid));
      }
      clearInput();
    }
  };

  const onFocusOut = () => {
    if (input.value !== "") {
      addNewTagToList(createTagElement(input.value, input.validity.valid));
      clearInput();
    }
  };

  const onClickAdd = () => {
    addNewTagToList(createTagElement(randomEmail(), true));
    clearInput();
  };

  const onClickCount = () => {
    // eslint-disable-next-line no-alert
    alert(getAllValidEmails().length); // Subtract one for the input field
  };

  // ---------- ATTACH EVENT LISTENER ----------
  input.addEventListener("paste", onPaste);
  input.addEventListener("keyup", onKeyUp);
  input.addEventListener("focusout", onFocusOut);
  addButton.addEventListener("click", onClickAdd);
  countButton.addEventListener("click", onClickCount);
};

export default EmailsInput;
