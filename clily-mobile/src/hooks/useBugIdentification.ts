import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { bugService } from '../services/bugService';
import { IdentifyBugResponse, SelectedImageAsset } from '../types/bug.types';

export const useBugIdentification = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImageAsset | null>(null);
  const [result, setResult] = useState<IdentifyBugResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageResult = (pickerResult: ImagePicker.ImagePickerResult) => {
    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      const asset = pickerResult.assets[0];
      setSelectedImage({
        uri: asset.uri,
        fileName: asset.fileName || `bug_${Date.now()}.jpg`,
        mimeType: asset.mimeType || 'image/jpeg',
      });
      setResult(null);
      setError(null);
    }
  };

  const pickFromGallery = useCallback(async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setError('Izin akses galeri diperlukan untuk memilih gambar serangga.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.85,
      });

      handleImageResult(pickerResult);
    } catch (err) {
      setError('Gagal membuka galeri gambar.');
    }
  }, []);

  const takePhoto = useCallback(async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        setError('Izin akses kamera diperlukan untuk memotret serangga.');
        return;
      }

      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.85,
      });

      handleImageResult(pickerResult);
    } catch (err) {
      setError('Gagal membuka kamera.');
    }
  }, []);

  const identifySelectedBug = useCallback(async () => {
    if (!selectedImage) {
      setError('Silakan pilih atau ambil foto serangga terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await bugService.identifyBug(selectedImage);
      setResult(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal mengidentifikasi gambar.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage]);

  const reset = useCallback(() => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    selectedImage,
    result,
    isLoading,
    error,
    pickFromGallery,
    takePhoto,
    identifySelectedBug,
    reset,
  };
};

