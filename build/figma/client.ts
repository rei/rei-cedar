import type { FigmaLocalVariablesResponse } from './types';

const DEFAULT_API_BASE_URL = 'https://api.figma.com';

export class FigmaApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'FigmaApiError';
  }
}

export interface FigmaClientOptions {
  token: string;
  apiBaseUrl?: string;
  fetchImpl?: typeof fetch;
}

export class FigmaClient {
  private readonly token: string;
  private readonly apiBaseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: FigmaClientOptions) {
    this.token = options.token;
    this.apiBaseUrl = options.apiBaseUrl ?? DEFAULT_API_BASE_URL;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async getLocalVariables(fileKey: string): Promise<FigmaLocalVariablesResponse> {
    const url = `${this.apiBaseUrl}/v1/files/${encodeURIComponent(fileKey)}/variables/local`;
    let response: Response;

    try {
      response = await this.fetchImpl(url, {
        headers: { 'X-Figma-Token': this.token },
      });
    } catch (error) {
      throw new FigmaApiError(
        `Could not reach the Figma API for file ${fileKey}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    if (!response.ok) {
      let detail = '';
      try {
        detail = (await response.text()).slice(0, 500);
      } catch {
        // Keep the status-only message if the body cannot be read.
      }
      throw new FigmaApiError(
        `Figma API returned ${response.status} for file ${fileKey}${detail ? `: ${detail}` : ''}`,
        response.status,
      );
    }

    const payload = (await response.json()) as FigmaLocalVariablesResponse;
    if (payload.error || !payload.meta?.variables) {
      throw new FigmaApiError(`Figma returned an invalid variables response for file ${fileKey}`);
    }
    return payload;
  }
}
