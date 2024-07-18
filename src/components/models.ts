export interface Author {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface OtherSite {
  id: string;
  name: string;

}

export interface Comic {
  id: number;
  title: string;
  description: string;
  authors: Array<Author>;
  tags: Array<Tag>;
  sites: Array<OtherSite>;
  release: string;
}

export interface CoverInfo {
  id: number;
  url: string;
  release: string;
  // otherSites: Array<OtherSite>;
}


