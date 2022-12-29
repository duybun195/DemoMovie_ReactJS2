export interface MovieRequest {
  pageNumber: number
  pageSize: number
}

export interface MovieResponse {
  title: string
  coverURL: string
  totalLike: string
}

export interface MovieState {
  listMovie?: MovieResponse[]
}
