interface Movies {
  title: string;
  //for now, later gonna change
  image?: string;
  href?: string;
  popularity: number;
  addDate: string;
}

export const MOVIES: Array<Movies> = [
  {
    title: "Movie1",
    popularity: 12,
    addDate: "2021-05-12",
  },
  {
    title: "Movie2",
    popularity: 13,
    addDate: "2021-05-12",
  },
  {
    title: "Movie3",
    popularity: 14,
    addDate: "2021-05-12",
  },
  {
    title: "Movie5",
    popularity: 15,
    addDate: "2021-05-12",
  },
  {
    title: "Movie4",
    popularity: 17,
    addDate: "2021-05-12",
  },
  {
    title: "Movie6",
    popularity: 18,
    addDate: "2021-04-12",
  },
  {
    title: "Movie10",
    popularity: 54,
    addDate: "2021-03-12",
  },
  {
    title: "1",
    popularity: 61,
    addDate: "2021-02-12",
  },
  {
    title: "Movie12",
    popularity: 44,
    addDate: "2021-01-12",
  },
];
