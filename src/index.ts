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
  const clearInput = () => {
    input.value = "";
  };

  const setInput = (value: string) => {
    input.value = value;
  };

  const getAllValidEmails = () => tagList.querySelectorAll("li[data-valid]");

  const addNewTagToList = (tag: HTMLLIElement) => {
    // IE 11 hack (IE doesn't support Array.from or spreading NodeList)
    const alreadyExistis = Array.prototype.some.call(
      getAllValidEmails(),
      (el: Element) => el.textContent === tag.textContent
    );

    if (!alreadyExistis) {
      tagList.insertBefore(tag, tagList.childNodes[tagList.childNodes.length - 1]);
    }
  };

  // ---------- EVENT LISTENER INITIALIZATION ----------
  const onDeleteTagClick = (tag: HTMLLIElement) => {
    // IE 11 hack (IE 11 doesn't support childNode.remove)
    tag.parentNode?.removeChild(tag);

    input.focus();
  };

  const onPaste = (event: ClipboardEvent) => {
    // @ts-ignore IE 11 hack (ClipboardEvent.clipboardData is undefined)
    const pastedText: string = (event.clipboardData || window.clipboardData).getData("text");
    pastedText
      ?.trim()
      .split(",")
      .forEach(text => {
        if (text !== "") {
          // Add email by email in order to use HTML5 email validation
          setInput(text);
          addNewTagToList(createTagElement(text, input.validity.valid, onDeleteTagClick));
        }
      });

    clearInput();
    event.preventDefault();
  };

  const onKeyUp = (event: KeyboardEvent) => {
    // IE 11 hack (IE doesn't support Array.includes)
    if (ACTION_KEY_LIST.indexOf(event.key) > -1) {
      const cleanValue = removeKeysInList(input.value, ACTION_KEY_LIST);

      if (cleanValue !== "") {
        setInput(cleanValue); // Update the input value to use HTML5 validation API
        addNewTagToList(createTagElement(cleanValue, input.validity.valid, onDeleteTagClick));
      }
      clearInput();
    }
  };

  const onFocusOut = () => {
    if (input.value !== "") {
      addNewTagToList(createTagElement(input.value, input.validity.valid, onDeleteTagClick));
      clearInput();
    }
  };

  const onClickAdd = () => {
    addNewTagToList(createTagElement(randomEmail(), true, onDeleteTagClick));
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
