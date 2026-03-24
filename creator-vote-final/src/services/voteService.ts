import { VoteResponse, ApiErrorBody } from '../types/api';

import { API_BASE_URL } from './apiConfig';

const API_PATH = '/votes';
const API_ENDPOINT = `${API_BASE_URL}${API_PATH}`;

export class VoteApiError extends Error {
  status: number;
  code: string | undefined;

  constructor(status: number, code: string | undefined, message: string) {
    super(message);
    this.name = 'VoteApiError';
    this.status = status;
    this.code = code;
  }
}

/**
 * POST /votes — Submit votes using token authentication
 * NOTE: Backend accepts one vote per request. For multiple votes,
 * this function will make multiple API calls sequentially.
 */
export const submitVotes = async (
  token: string,
  creatorIds: string[],
): Promise<VoteResponse> => {
  const acceptedCreatorIds: string[] = [];

  // Submit each vote sequentially
  for (const creatorId of creatorIds) {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, creatorId }),
    });

    if (!response.ok) {
      let errorBody: ApiErrorBody | any = {};
      try {
        errorBody = (await response.json()) as ApiErrorBody | any;
      } catch {
        // ignore parse failure
      }

      // Some backend responses use `error` field instead of `code`.
      const codeFromBody: string | undefined = errorBody.code ?? errorBody.error;
      const messageFromBody: string | undefined = errorBody.message ?? errorBody.errorMessage ?? undefined;

      throw new VoteApiError(
        response.status,
        codeFromBody,
        messageFromBody ?? `投票に失敗しました (status ${response.status})`,
      );
    }

    const result = (await response.json()) as { acceptedCreatorId: string };
    acceptedCreatorIds.push(result.acceptedCreatorId);
  }

  return { acceptedCreatorIds };
};
