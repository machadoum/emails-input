const randomText = () => Math.random().toString(36).substring(9); // It's a very simple and silly way to generate random text.
export const randomEmail = () => `${randomText()}@mail.com`;

export const removeKeysInList = (value: string, list: string[]) => {
  let cleanValue = value;
  list.forEach(key => {
    cleanValue = cleanValue.replace(key, "");
  });
  return cleanValue;
};
