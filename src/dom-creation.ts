const createDeleteButtonElement = (onDeleteClick: () => void) => {
  const deleteButton = document.createElement("span");
  deleteButton.innerHTML = "&times;"; // close symbol
  deleteButton.classList.add("tag__delete");
  deleteButton.addEventListener("click", onDeleteClick);

  return deleteButton;
};

const createTagContentElement = (tagText: string) => {
  const tagContent = document.createElement("span");
  tagContent.classList.add("tag__content");
  tagContent.innerText = tagText;
  return tagContent;
};

export const createTagElement = (tagText: string, validity: boolean) => {
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
    tag.remove();
  };

  tag.appendChild(createTagContentElement(tagText));
  tag.appendChild(createDeleteButtonElement(onClickDelete));

  return tag;
};

export const createInitialHtml = () => `
<div class="content">
    <span class="content__title">Share <b>Board name</b> with others</span>
    <ul class="email-box" data-el-box><li class='email-box__item'><input data-el-input class='email-box__input' type="email" placeholder="add more people..."></li></ul>
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
