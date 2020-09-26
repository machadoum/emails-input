import "./style.css";

const rootClassName = "EmailsInput";

const initialHtml = `
<div>
    <span>Share <b>Board Name</b> with others</span>
    <ul><li><input type="email" placeholder="add more people..."></li></ul>
</div>
<div>
    <button data-add-button>
        Add email
    </button>
    <button data-add-count>
        Get emails count
    </button>
</div>
`;

const addNewTag = (
  tagList: HTMLUListElement,
  tagText: string,
  validity: boolean
) => {
  const newTag = document.createElement("li");
  // TODO create an element to be clicked
  newTag.addEventListener("click", () => {
    newTag.remove();
  });
  if (!validity) {
    newTag.setAttribute("data-invalid", "");
    newTag.classList.add("invalid");
  }

  newTag.innerText = tagText;
  tagList.insertBefore(
    newTag,
    tagList.childNodes[tagList.childNodes.length - 1]
  );
};

const clearInput = (input: HTMLInputElement) => {
  input.value = "";
};

// It's a very simple and silly way to generate random text.
const randomText = () => Math.random().toString(36).substring(7);

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
