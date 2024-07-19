export interface Author {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Circle {
  id: number;
  name: string;
}

export interface OtherSite {
  id: string;
  name: string;

}

export interface Work {
  id: number;
  title: string;
  description: string;
  authors: Array<Author>;
  tags: Array<Tag>;
  circle: Circle;
  release: string;
  cover: string;
}

export interface CoverInfo {
  id: number;
  url: string;
  release: string;
  // otherSites: Array<OtherSite>;
}


