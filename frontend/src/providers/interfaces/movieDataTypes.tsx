export interface MovieData {
  actors: Actor[];
  comments: Comment[];
  rating: Rating;
  title: string;
  director: string;
  productionYear: string;
  movieId: number;
  genre: string;
  description: string;
}

export interface Rating {
  votesCount: string;
  plot: string;
  acting: string;
  scenography: string;
}

export interface Comment {
  id: number;
  text: string;
}

export interface Actor {
  firstName: string;
  lastName: string;
}
