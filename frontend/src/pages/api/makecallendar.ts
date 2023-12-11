// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { Client } from "@notionhq/client";
// import type { NextApiRequest, NextApiResponse } from "next";
//
// import { callendarDatabaseId } from "..";
// const notion = new Client({
//   auth: process.env.NOTION_TOKEN,
// });
//
// const createEventHandler = async (
//   request: NextApiRequest,
//   response: NextApiResponse
//   // eslint-disable-next-line @typescript-eslint/require-await
// ) => {
//   if (request.method !== "POST") {
//     return response.status(400).json({ error: "Don't!" });
//   }
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//
//     await notion.pages.create({
//       parent: {
//         database_id: callendarDatabaseId,
//         //process.env.NOTION_CALLENDAR_DATABASE_ID as string,
//       },
//       properties: {
//         DAY: {
//           type: "title",
//           title: [
//             {
//               //  type: "text",
//               text: {
//                 content: request.body.DAY,
//               },
//             },
//           ],
//         },
//         HOUR_FROM: {
//           rich_text: [
//             {
//               text: {
//                 content: request.body.HOUR_FROM,
//               },
//             },
//           ],
//         },
//         HOUR_TO: {
//           rich_text: [
//             {
//               text: {
//                 content: request.body.HOUR_TO,
//               },
//             },
//           ],
//         },
//
//         AVAILABILITY: {
//           select: {
//             name: request.body.AVAILABILITY.name,
//             color: request.body.AVAILABILITY.color,
//           },
//         },
//
//         USER: {
//           rich_text: [
//             {
//               text: {
//                 content: (request.body.USER as string).toUpperCase(),
//               },
//             },
//           ],
//           // type: "relation",
//           // relation: [
//           //   {
//           //     database_id: "c13d3f81-0e93-4da7-acaa-77953079dc3b",
//           //     id: "c13d3f81-0e93-4da7-acaa-77953079dc3b",
//           //     synced_property_name: "MARIO",
//           //   },
//           // ],
//         },
//       },
//     });
//
//     const res = await notion.databases.query({
//       database_id: callendarDatabaseId,
//     });
//     const pages = res.results;
//     console.log(pages);
//
//     response.status(201).json({ message: "Success" });
//   } catch (error) {
//     response.status(500).json({ error });
//   }
// };
//
// export default createEventHandler;
//
// // // Update your state or view with the new data
