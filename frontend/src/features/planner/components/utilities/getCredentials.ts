/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const getCredentials = (notionCredentials: any) => {
  const callendar = [];

  for (let i = 0; i < notionCredentials.length; i++) {
    const AVAILABILITY = notionCredentials[i].properties.AVAILABILITY.select
      .name as string;
    const DAY = notionCredentials[i].properties.DAY.title[0].text
      .content as string;
    const HOUR_FROM = notionCredentials[i].properties.HOUR_FROM.rich_text[0]
      .text.content as string;
    const HOUR_TO = notionCredentials[i].properties.HOUR_TO.rich_text[0].text
      .content as string;
    const USER = notionCredentials[i].properties.USER.rich_text[0].text
      .content as string;

    callendar.push({ AVAILABILITY, DAY, HOUR_FROM, HOUR_TO, USER });
  }
  return { callendar };
};
