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
  photoURL?: string;
}

export interface Rating {
  votesCount: number;
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
  actorId?: number;
}

export interface MovieList {
  movies: MovieData[];
  movieListId: number;
  listURL: string;
  listName: string;
}
