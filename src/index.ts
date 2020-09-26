import "./style.pcss";

const rootClassName = "EmailsInput";

const initialHtml = `
<div class="Content">
    <span class="Content__Title">Share <b>Board name</b> with others</span>
    <ul class="EmailBox"><li class='EmailBox__item'><input class='EmailBox__input' type="email" placeholder="add more people..."></li></ul>
</div>
<div class="ActionBar">
    <button data-add-button class="AddButton">
        Add email
    </button>
    <button data-add-count class="CountButton">
        Get emails count
    </button>
</div>
`;

const addNewTag = (
  tagList: HTMLUListElement,
  tagText: string,
  validity: boolean
) => {
  const tag = document.createElement("li");

  if (!validity) {
    tag.setAttribute("data-invalid", "");
    tag.classList.add("Tag--invalid");
  } else {
    tag.classList.add("Tag--valid");
  }

  tag.innerText = tagText;

  tag.classList.add("Tag");
  tag.classList.add("EmailBox__item");

  const deleteButton = document.createElement("svg");
  deleteButton.innerHTML = `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/>
  </svg>`;
  deleteButton.classList.add("Tag__delete");

  // TODO create an element to be clicked
  deleteButton.addEventListener("click", () => {
    tag.remove();
  });

  tag.appendChild(deleteButton);
  tagList.insertBefore(tag, tagList.childNodes[tagList.childNodes.length - 1]);
};

const clearInput = (input: HTMLInputElement) => {
  input.value = "";
};

// It's a very simple and silly way to generate random text.
const randomText = () => Math.random().toString(36).substring(9);

const randomEmail = () => `${randomText()}@${randomText()}.com`;

const EmailsInput = (node: HTMLElement) => {
  // ---------- SETUP HTML INITIAL STATE ----------

  // Using innerHTML to save time. Even though it ins't safe or fast.
  node.classList.add(rootClassName);
  node.innerHTML = initialHtml;

  // ---------- QUERY SELECTORS  ----------

  const input = node.querySelector("input")!;
  const tagList = node.querySelector("ul")!;
  const addButton = node.querySelector("button[data-add-button]")!;
  const countButton = node.querySelector("button[data-add-count]")!;

  // ---------- ATTACH EVENT LISTENER ----------

  input.addEventListener("paste", (event: ClipboardEvent) => {
    let pastedText = event.clipboardData!.getData("text");
    pastedText
      ?.trim()
      .split(",")
      .forEach((text) => {
        if (text != "") {
          input.value = text;
          addNewTag(tagList, text, input.validity.valid);
        }
      });

    clearInput(input);
    event.preventDefault();
  });

  input.addEventListener("keyup", (event: KeyboardEvent) => {
    const cleanValue = input.value.replace(/[,]/g, "");

    if (["Enter", ","].includes(event.key)) {
      if (cleanValue != "") {
        addNewTag(tagList, cleanValue, input.validity.valid);
      }
      clearInput(input);
    }
  });

  const addTagAndClearInput = (tagText: string) => {
    addNewTag(tagList, tagText, input.validity.valid);
    clearInput(input);
  };

  input.addEventListener(
    "focusout",
    () => input.value != "" && addTagAndClearInput(input.value)
  );

  addButton.addEventListener("click", () => {
    addTagAndClearInput(randomEmail());
  });

  countButton.addEventListener("click", () => {
    const invalidTags = [...tagList.children].filter(
      (tag) => (tag as HTMLLIElement).getAttribute("data-invalid") === null
    );

    alert(invalidTags.length - 1); // Subtract one for the input field
  });
};

export default EmailsInput;
