import "./style.pcss";

const rootClassName = "EmailsInput";

const initialHtml = `
<div class="content">
    <span class="content__title">Share <b>Board name</b> with others</span>
    <ul class="email-box"><li class='email-box__item'><input class='email-box__input' type="email" placeholder="add more people..."></li></ul>
</div>
<div class="footer">
    <button data-add-button class="footer__add-button">
        Add email
    </button>
    <button data-add-count class="footer__count-button">
        Get emails count
    </button>
</div>
`;

const addNewTag = (tagList: HTMLUListElement, tagText: string, validity: boolean) => {
  const tag = document.createElement("li");

  if (!validity) {
    tag.setAttribute("data-invalid", "");
    tag.classList.add("tag--invalid");
  } else {
    tag.classList.add("tag--valid");
  }

  const tagContent = document.createElement("span");
  tagContent.classList.add("tag__content");
  tagContent.innerText = tagText;

  tag.classList.add("tag");
  tag.classList.add("email-box__item");

  const deleteButton = document.createElement("span");
  deleteButton.innerHTML = "&times;";
  deleteButton.classList.add("tag__delete");

  // TODO create an element to be clicked
  deleteButton.addEventListener("click", () => {
    tag.remove();
  });

  tag.appendChild(tagContent);
  tag.appendChild(deleteButton);
  tagList.insertBefore(tag, tagList.childNodes[tagList.childNodes.length - 1]);
};

const clearInput = (input: HTMLInputElement) => {
  input.value = "";
};

// It's a very simple and silly way to generate random text.
const randomText = () => Math.random().toString(36).substring(9);

const randomEmail = () => `${randomText()}@mail.com`;

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
    const pastedText = event.clipboardData!.getData("text");
    pastedText
      ?.trim()
      .split(",")
      .forEach(text => {
        if (text !== "") {
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
      if (cleanValue !== "") {
        addNewTag(tagList, cleanValue, input.validity.valid);
      }
      clearInput(input);
    }
  });

  const addTagAndClearInput = (tagText: string) => {
    addNewTag(tagList, tagText, input.validity.valid);
    clearInput(input);
  };

  input.addEventListener("focusout", () => input.value !== "" && addTagAndClearInput(input.value));

  addButton.addEventListener("click", () => {
    addTagAndClearInput(randomEmail());
  });

  countButton.addEventListener("click", () => {
    const invalidTags = [...tagList.children].filter(
      tag => (tag as HTMLLIElement).getAttribute("data-invalid") === null
    );

    // eslint-disable-next-line no-alert
    alert(invalidTags.length - 1); // Subtract one for the input field
  });
};

export default EmailsInput;
