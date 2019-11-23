export interface Movie {
  id: number,
  title: string,
  genre_ids: number[],
  poster: string,
  description: string,
  release_date: string
}

export interface Movie_Detail extends Movie {
  casts: Person[],
  crews: Person[],
}

export interface Person {
  name: string,
  poster: string,
  role: string
}

export interface Review {
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

export interface Genre {
  id: number,
  name: string
}

export interface Certification {
  certification: string,
  meaning : string,
  order: string
}
