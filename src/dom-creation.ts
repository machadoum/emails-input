const createDeleteButtonElement = (tagText: string, onDeleteClick: () => void) => {
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&times;"; // close symbol
  deleteButton.classList.add("tag__delete");
  deleteButton.addEventListener("click", onDeleteClick);
  deleteButton.setAttribute("aria-label", `Delete ${tagText}`);

  return deleteButton;
};

const createTagContentElement = (tagText: string) => {
  const tagContent = document.createElement("span");
  tagContent.classList.add("tag__content");
  tagContent.textContent = tagText;
  return tagContent;
};

export const createTagElement = (
  tagText: string,
  validity: boolean,
  onDeleteTagClick: (tag: HTMLLIElement) => void
) => {
  const tag = document.createElement("li");

  tag.classList.add("email-box__item");
  tag.classList.add("tag");

  if (!validity) {
    tag.classList.add("tag--invalid");
  } else {
    tag.setAttribute("data-valid", "");
    tag.classList.add("tag--valid");
  }

  const onClickDelete = () => {
    onDeleteTagClick(tag);
  };

  tag.appendChild(createTagContentElement(tagText));
  tag.appendChild(createDeleteButtonElement(tagText, onClickDelete));

  return tag;
};

export const createInitialHtml = () => `
<div class="content">
    <span class="content__title">Share <b>Board name</b> with others</span>
    <ul class="email-box" aria-live="polite" data-el-box><li class='email-box__item'><input data-el-input class='email-box__input' type="email" placeholder="add more people..."></li></ul>
</div>
<div class="footer">
    <button data-add-button class="footer__add-button">
        Add email
    </button>
    <button data-count-button class="footer__count-button">
        Get emails count
    </button>
</div>
`;
