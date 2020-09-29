const randomText = () => Math.random().toString(36).substring(9); // It's a very simple and silly way to generate random text.
export const randomEmail = () => `${randomText()}@mail.com`;

export const removeCharactersInList = (value: string, list: string[]) =>
  value
    .split("")
    .filter(char => list.indexOf(char) === -1) // filters out characters that are not present in the list
    .join("");
