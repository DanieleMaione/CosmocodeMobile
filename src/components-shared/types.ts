export type TDeveloper = {
  username: string;
  totalGists: string;
  avatar_url: string;
  isExternalUser: boolean;
  totalFollowers: number;
  totalFollowing: number;
};

export interface TGist {
  _id?: string;
  idGithub: string;
  avatar_url: string;
  username: string;
  tags: Array<string>;
  filename: string;
  type: string;
  language: string;
  raw: string;
  size: number;
  title: string;
  description: string;
  private: boolean;
  createdAt: string;
  lastUpdate: Date;
  nft: string | null;
  verified: boolean;
  html: string;
  likes: Array<{avatar_url: string; username: string}>;
}

export interface TFollow {
  username: string;
  avatar_url: string;
}
