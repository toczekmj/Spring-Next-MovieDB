/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCredentials = (notionCredentials: any) => {
  const password = notionCredentials[0].properties.password.rich_text[0]
    .plain_text as string;

  const login = notionCredentials[0].properties.login.title[0]
    .plain_text as string;

  return { login, password };
};
