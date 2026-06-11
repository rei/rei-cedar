import type { StatusType } from '../../types/componentOptions';

export const bannerTypeOptions = ['default', 'info', 'warning', 'success', 'error'] as const;

/**
 * CdrBanner component properties
 */
export type CdrBannerProps = {
  /**
   * Sets the banner visual style and semantic status.
   *
   * Supported values:
   * - `default`: Neutral announcement
   * - `info`: Informational message
   * - `warning`: Cautionary message
   * - `success`: Confirmation message
   * - `error`: Failure/problem message
   *
   * @values default, info, warning, success, error
   * @example "info"
   * @example "error"
   */
  type?: StatusType;
};
