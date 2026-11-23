import { apiClient } from '../api/apiClient';
import { IdentifyBugResponse, SelectedImageAsset } from '../types/bug.types';

/**
 * Mengirim gambar serangga ke endpoint POST /api/identify-bug di clily-backend.
 * Menggunakan multipart/form-data dengan field key 'image' sesuai konfigurasi multer(`upload.single('image')`).
 */
export const bugService = {
  identifyBug: async (image: SelectedImageAsset): Promise<IdentifyBugResponse> => {
    const formData = new FormData();

    // Format khusus file multipart di React Native
    formData.append('image', {
      uri: image.uri,
      name: image.fileName || `bug_${Date.now()}.jpg`,
      type: image.mimeType || 'image/jpeg',
    } as unknown as Blob);

    const response = await apiClient.post<IdentifyBugResponse>('/api/identify-bug', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

