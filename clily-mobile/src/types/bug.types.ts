export interface BugTaxonomy {
  genus: string;
  species: string;
  family: string;
  order: string;
}

export interface BugIdentificationData {
  species_name: string;
  taxonomy: BugTaxonomy | null;
  reference_url?: string;
}

export type IdentifyStatus = 'success' | 'partial_success' | 'error';

export interface IdentifyBugResponse {
  status: IdentifyStatus;
  process_time_seconds?: number;
  message?: string;
  data?: BugIdentificationData;
}

export interface SelectedImageAsset {
  uri: string;
  fileName: string;
  mimeType: string;
}

