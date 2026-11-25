import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FocusFrame from '../../assets/camera/focus-frame.svg';
import FlashIcon from '../../assets/camera/flash.svg';
import SettingsIcon from '../../assets/camera/settings.svg';
import SparkleLarge from '../../assets/camera/sparkle-large.svg';
import SparkleMedium from '../../assets/camera/sparkle-medium.svg';
import SparkleSmall from '../../assets/camera/sparkle-small.svg';
import { Button } from '../../components/Button';
import { ScreenHeader } from '../../components/ScreenHeader';
import { VerifiedDialog } from '../../components/VerifiedDialog';
import { colors, fonts, layout } from '../../theme/tokens';
import type { ImageSource } from '../../types/content.types';

/** Shown instead of the live preview when no camera is available (e.g. iOS Simulator). */
const SAMPLE_PHOTO = require('../../mocks/images/species-elymnias.jpg');
/** Zoom steps shown as "5 x"; values are expo-camera's 0–1 zoom range. */
const ZOOMS = [
  { label: '1 x', value: 0 },
  { label: '2 x', value: 0.15 },
  { label: '5 x', value: 0.45 },
];

type Props = {
  latestPhoto?: ImageSource;
  /** Identify the photo; resolves with the id of the saved scan */
  onIdentify: (photoUri: string) => Promise<string>;
  onShowResult: (scanId: string) => void;
  onOpenGallery: () => void;
};

/** Kamera / Scan (Figma: KAMERA). */
export function CameraScreen({ latestPhoto, onIdentify, onShowResult, onOpenGallery }: Props) {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraFailed, setCameraFailed] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(ZOOMS.length - 1);
  const [identifying, setIdentifying] = useState(false);
  const [scanId, setScanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const denied = permission?.status === 'denied';
  const useSample = cameraFailed || denied;

  // Ask once on first open; after a denial the notice offers "Izinkan kamera" (or Settings).
  useEffect(() => {
    if (permission?.status === 'undetermined') requestPermission();
  }, [permission?.status, requestPermission]);

  const headerHeight = Math.max(layout.headerHeight, insets.top + 61);
  const barHeight = 102 + insets.bottom;

  const capture = async () => {
    if (identifying) return;
    setError(null);
    setIdentifying(true);
    try {
      let uri: string | undefined;
      if (!useSample) {
        const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 }).catch(() => undefined);
        uri = photo?.uri;
      }
      // Fall back to the sample photo when the camera can't take a picture.
      uri ??= Image.resolveAssetSource(SAMPLE_PHOTO).uri;
      setScanId(await onIdentify(uri));
    } catch {
      setError('Objek tidak dapat diidentifikasi. Coba lagi.');
    } finally {
      setIdentifying(false);
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* Preview */}
      {useSample ? (
        <Image source={SAMPLE_PHOTO} style={StyleSheet.absoluteFill} resizeMode="cover" accessibilityLabel="Foto contoh" />
      ) : permission?.granted ? (
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          flash={flashOn ? 'on' : 'off'}
          zoom={ZOOMS[zoomIndex].value}
          onMountError={() => setCameraFailed(true)}
        />
      ) : null}

      <ScreenHeader title="Kamera" />

      {/* Flash / HDR / Settings */}
      <View style={[styles.toolbar, { top: headerHeight - 20 }]}>
        <Pressable
          onPress={() => setFlashOn((on) => !on)}
          accessibilityRole="switch"
          accessibilityLabel="Lampu kilat"
          accessibilityState={{ checked: flashOn }}
          hitSlop={10}
          style={{ opacity: flashOn ? 1 : 0.55 }}
        >
          <FlashIcon width={20} height={26} />
        </Pressable>
        <Text style={styles.hdr}>HDR</Text>
        <Pressable onPress={() => Linking.openSettings()} accessibilityRole="button" accessibilityLabel="Pengaturan kamera" hitSlop={10}>
          <SettingsIcon width={28} height={28} />
        </Pressable>
      </View>

      {/* Focus frame + identification chip */}
      <View style={[styles.middle, { top: headerHeight + 52, bottom: barHeight }]} pointerEvents="box-none">
        <View style={styles.frame}>
          <FocusFrame width={284} height={316} />
          {identifying && <IdentifyingChip />}
        </View>
      </View>

      {useSample && (
        <View style={[styles.notice, { top: headerHeight + 64 }]}>
          <Text style={styles.noticeText}>{denied ? 'Izin kamera ditolak' : 'Kamera tidak tersedia'} — memakai foto contoh</Text>
          {denied && (
            <Text
              style={styles.noticeLink}
              onPress={() => (permission?.canAskAgain ? requestPermission() : Linking.openSettings())}
              accessibilityRole="button"
            >
              Izinkan kamera
            </Text>
          )}
        </View>
      )}
      {!permission?.granted && !useSample && permission && (
        <View style={[styles.permission, { top: headerHeight + 120 }]}>
          <Text style={styles.permissionText}>Clily membutuhkan akses kamera untuk memotret dan mengenali serangga.</Text>
          <Button label="Izinkan Kamera" onPress={requestPermission} />
        </View>
      )}
      {error && (
        <Text style={[styles.error, { bottom: barHeight + 110 }]} accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}

      {/* Zoom selector */}
      <View style={[styles.zoomRow, { bottom: barHeight + 62 }]}>
        <Pressable
          onPress={() => setZoomIndex((i) => Math.max(0, i - 1))}
          accessibilityRole="button"
          accessibilityLabel="Perkecil zoom"
          hitSlop={14}
          style={styles.zoomDot}
        />
        <View style={styles.zoomCircle} accessible accessibilityLabel={`Zoom ${ZOOMS[zoomIndex].label}`}>
          <Text style={styles.zoomLabel}>{ZOOMS[zoomIndex].label}</Text>
        </View>
        <Pressable
          onPress={() => setZoomIndex((i) => Math.min(ZOOMS.length - 1, i + 1))}
          accessibilityRole="button"
          accessibilityLabel="Perbesar zoom"
          hitSlop={14}
          style={styles.zoomDot}
        />
      </View>

      {/* Bottom bar: gallery thumbnail + shutter */}
      <View style={[styles.bar, { height: barHeight }]}>
        <LinearGradient colors={[colors.blue, colors.navy]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={[StyleSheet.absoluteFill, styles.barFill]} />
        <Pressable onPress={onOpenGallery} accessibilityRole="button" accessibilityLabel="Buka Galeri Fotomu" style={styles.thumb}>
          {latestPhoto && <Image source={latestPhoto} style={styles.thumbImage} resizeMode="cover" />}
        </Pressable>
        <Pressable
          onPress={capture}
          disabled={identifying || (!permission?.granted && !useSample)}
          accessibilityRole="button"
          accessibilityLabel="Ambil foto dan identifikasi"
          accessibilityState={{ busy: identifying }}
          style={({ pressed }) => [styles.shutter, (pressed || identifying) && styles.shutterPressed]}
        />
      </View>

      <VerifiedDialog visible={!!scanId} message="Foto terverifikasi" onDone={() => scanId && onShowResult(scanId)} />
    </View>
  );
}

/** Yellow "identifikasi objek" chip with sparkles and a spinner (Figma: Frame 1 "Load"). */
function IdentifyingChip() {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 900, easing: Easing.linear, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <>
      <View style={styles.sparkles} pointerEvents="none">
        <View style={{ position: 'absolute', left: 67.3, top: 0 }}>
          <SparkleLarge width={25.453} height={25.453} />
        </View>
        <View style={{ position: 'absolute', left: 80.3, top: 0 }}>
          <SparkleMedium width={20.453} height={20.453} />
        </View>
        <View style={{ position: 'absolute', left: 76.3, top: -1 }}>
          <SparkleSmall width={15.453} height={15.453} />
        </View>
      </View>
      <View style={styles.chip} accessible accessibilityRole="progressbar" accessibilityLabel="Mengidentifikasi objek">
        <Text style={styles.chipText}>identifikasi objek</Text>
        <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.black,
  },
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 72,
    paddingTop: 20,
    paddingLeft: 21,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(18, 65, 112, 0.7)',
  },
  hdr: {
    color: colors.mint,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  middle: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 284,
    height: 316,
  },
  sparkles: {
    position: 'absolute',
    left: 0,
    top: -46.7,
  },
  chip: {
    position: 'absolute',
    left: 85,
    top: -32,
    width: 113,
    height: 21,
    borderRadius: 50,
    backgroundColor: '#F2FF00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    gap: 6,
  },
  chipText: {
    color: colors.black,
    fontFamily: fonts.regular,
    fontSize: 10,
  },
  spinner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.black,
    borderTopColor: 'transparent',
  },
  notice: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: 'rgba(18, 65, 112, 0.85)',
    flexDirection: 'row',
    gap: 8,
  },
  noticeText: {
    color: colors.onDark,
    fontFamily: fonts.medium,
    fontSize: 11,
  },
  noticeLink: {
    color: colors.mint,
    fontFamily: fonts.extraBold,
    fontSize: 11,
    textDecorationLine: 'underline',
  },
  permission: {
    position: 'absolute',
    left: 32,
    right: 32,
    padding: 20,
    gap: 16,
    borderRadius: 15,
    backgroundColor: colors.onDark,
  },
  permissionText: {
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  error: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.statusDanger,
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  zoomRow: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  zoomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.mint,
  },
  zoomCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(18, 65, 112, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomLabel: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  barFill: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  thumb: {
    position: 'absolute',
    left: 24,
    top: 20,
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.blue,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  shutter: {
    position: 'absolute',
    alignSelf: 'center',
    top: -46,
    width: 90.4,
    height: 90.4,
    borderRadius: 45.2,
    borderWidth: 4,
    borderColor: colors.mint,
    backgroundColor: '#50A08A',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  shutterPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});
