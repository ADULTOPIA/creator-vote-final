export type VoteRequest = {
  token: string;
  creatorIds: string[];
};

export type VoteResponse = {
  acceptedCreatorIds: string[];
};

export type ApiErrorBody = {
  code?: string;
  message?: string;
};
