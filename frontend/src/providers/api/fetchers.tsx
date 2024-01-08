import { Actor, Rating, Comment } from "../interfaces/movieDataTypes";

export const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());

export const fetchActors = function (actorsList: Actor[]) {
  const aList: string[] = [];
  for (let i = 0; i < actorsList.length; i++) {
    aList.push(actorsList[i].firstName + " " + actorsList[i].lastName);
    if (i != actorsList.length - 1) {
      aList[i] = aList[i] + ",";
    }
  }
  return aList;
};

export const fetchComments = function (commentList: Comment[]) {
  let comments = "";
  for (let i = 0; i < commentList.length; i++) {
    comments += `<b>Użytkownik ${commentList[i].id}</b>: ${commentList[i].text}<br>`;
  }
  return comments;
};

export const fetchRating = function (rating: Rating) {
  const votes: number = parseInt(rating.votesCount);
  const plot: number = parseInt(rating.plot);
  const acting: number = parseInt(rating.acting);
  const scenography: number = parseInt(rating.scenography);
  return [plot / votes, acting / votes, scenography / votes];
};
