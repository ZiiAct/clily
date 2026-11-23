import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBugIdentification } from '../hooks/useBugIdentification';
import { BugResultCard } from '../components/BugResultCard';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { ENV } from '../config/env';

export const HomeScreen: React.FC = () => {
  const {
    selectedImage,
    result,
    isLoading,
    error,
    pickFromGallery,
    takePhoto,
    identifySelectedBug,
    reset,
  } = useBugIdentification();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Clily Bug Scanner</Text>
          <Text style={styles.subtitle}>
            Identifikasi spesies & taksonomi serangga dengan Gemini AI
          </Text>
          <Text style={styles.serverInfo}>Backend: {ENV.API_BASE_URL}</Text>
        </View>

        {/* Area Preview Gambar */}
        <View style={styles.imageBox}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>Belum ada foto serangga dipilih</Text>
            </View>
          )}
        </View>

        {/* Tombol Pilih Gambar */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.secondaryButton, styles.flexButton]}
            onPress={takePhoto}
            disabled={isLoading}
          >
            <Text style={styles.secondaryButtonText}>Ambil Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, styles.flexButton]}
            onPress={pickFromGallery}
            disabled={isLoading}
          >
            <Text style={styles.secondaryButtonText}>Pilih Galeri</Text>
          </TouchableOpacity>
        </View>

        {/* Tombol Scan ke Backend */}
        {selectedImage && (
          <View style={styles.actionGroup}>
            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.disabledButton]}
              onPress={identifySelectedBug}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <Text style={styles.primaryButtonText}>  Mengidentifikasi...</Text>
                </View>
              ) : (
                <Text style={styles.primaryButtonText}>Identifikasi Serangga Sekarang</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={reset} disabled={isLoading}>
              <Text style={styles.resetButtonText}>Ganti / Hapus Foto</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Pesan Error */}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Kartu Hasil Taksonomi */}
        {result && <BugResultCard result={result} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  serverInfo: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontFamily: 'monospace',
  },
  imageBox: {
    width: '100%',
    height: 260,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  flexButton: {
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
    fontSize: 14,
  },
  actionGroup: {
    gap: SPACING.sm,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  resetButtonText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  errorBox: {
    backgroundColor: COLORS.errorBg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: '600',
  },
});

