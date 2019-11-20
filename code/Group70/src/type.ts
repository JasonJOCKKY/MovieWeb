export interface Movie {
  id: number,
  title: string,
  genres: number[],
  casts: Person[],
  crews: Person[],
  poster: string,
  description: string,
  release_date: string,
  rating: string
}

export interface Person {
  name: string,
  poster: string,
  role: string
}

export interface Review {
  movie_id: number,
  user: string,
  score: number,
  date: string,
  body: string,
  replies: Reply[]
}

export interface Reply {
  user: string,
  body: string,
  replies: Reply[]
}
