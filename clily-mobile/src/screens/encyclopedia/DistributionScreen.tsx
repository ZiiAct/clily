import React, { useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MapMinus from '../../assets/icons/map-minus.svg';
import MapPlus from '../../assets/icons/map-plus.svg';
import SearchSquare from '../../assets/icons/search-square.svg';
import { Button } from '../../components/Button';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CommunityPhotosSheet } from '../../components/encyclopedia/CommunityPhotosSheet';
import { useSpeciesDetail } from '../../hooks/useEncyclopediaQueries';
import { colors, fonts } from '../../theme/tokens';
import { useDesignScale } from '../../theme/useDesignScale';

type Props = {
  speciesId: string;
};

// Figma "sebaran spesies 2": map box 371 × 536 with a 3px border; hotspots are in inner-box pixels.
const BOX = { w: 371, h: 536, border: 3 };
const INNER = { w: BOX.w - BOX.border * 2, h: BOX.h - BOX.border * 2 };
const ZOOM_STEPS = [1, 1.5, 2, 3];

/** Peta Sebaran Spesies (Figma: sebaran spesies 2) with the community photo sheet (Frame 129). */
export function DistributionScreen({ speciesId }: Props) {
  const insets = useSafeAreaInsets();
  const { sx } = useDesignScale();
  const { data: species, isPending, isError, refetch } = useSpeciesDetail(speciesId);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [photosOpen, setPhotosOpen] = useState(false);
  const hScroll = useRef<ScrollView>(null);
  const vScroll = useRef<ScrollView>(null);
  const offset = useRef({ x: 0, y: 0 });

  // The map box keeps Figma proportions and scales with the screen width.
  const viewW = INNER.w * sx;
  const viewH = INNER.h * sx;
  const zoom = ZOOM_STEPS[zoomIndex];

  const setZoom = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(ZOOM_STEPS.length - 1, nextIndex));
    const factor = ZOOM_STEPS[clamped] / zoom;
    // Keep the point at the center of the view centered.
    const cx = (offset.current.x + viewW / 2) * factor - viewW / 2;
    const cy = (offset.current.y + viewH / 2) * factor - viewH / 2;
    setZoomIndex(clamped);
    requestAnimationFrame(() => {
      hScroll.current?.scrollTo({ x: Math.max(0, cx), animated: false });
      vScroll.current?.scrollTo({ y: Math.max(0, cy), animated: false });
    });
  };

  const recenter = () => {
    setZoomIndex(0);
    requestAnimationFrame(() => {
      hScroll.current?.scrollTo({ x: 0, animated: true });
      vScroll.current?.scrollTo({ y: 0, animated: true });
    });
  };

  const contentScale = sx * zoom;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScreenHeader title="Ensiklopedia" />

      {!species ? (
        <View style={styles.state}>
          {isPending && <ActivityIndicator color={colors.navy} />}
          {isError && (
            <Text style={styles.stateText} onPress={() => refetch()} accessibilityRole="button">
              Peta sebaran tidak dapat dimuat. Ketuk untuk mencoba lagi.
            </Text>
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} showsVerticalScrollIndicator={false}>
          <Text accessibilityRole="header" style={styles.title}>
            Peta Sebaran Spesies
          </Text>

          <View style={[styles.mapBox, { width: BOX.w * sx, height: BOX.h * sx }]}>
            <ScrollView
              ref={hScroll}
              horizontal
              bounces={false}
              scrollEnabled={zoom > 1}
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => (offset.current.x = e.nativeEvent.contentOffset.x)}
              scrollEventThrottle={32}
            >
              <ScrollView
                ref={vScroll}
                nestedScrollEnabled
                bounces={false}
                scrollEnabled={zoom > 1}
                showsVerticalScrollIndicator={false}
                onScroll={(e) => (offset.current.y = e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={32}
                style={{ width: viewW * zoom, height: viewH }}
              >
                <View
                  style={{ width: viewW * zoom, height: viewH * zoom }}
                  accessible
                  accessibilityLabel={`Peta sebaran ${species.scientificName} dengan ${species.distribution.hotspots.length} area penampakan`}
                >
                  <Image source={species.distribution.map} style={StyleSheet.absoluteFill} resizeMode="cover" />
                  {species.distribution.hotspots.map((h, i) => (
                    <View
                      key={i}
                      style={[
                        styles.hotspot,
                        {
                          left: h.x * contentScale,
                          top: h.y * contentScale,
                          width: h.w * contentScale,
                          height: h.h * contentScale,
                          borderRadius: (Math.max(h.w, h.h) * contentScale) / 2,
                        },
                      ]}
                    />
                  ))}
                </View>
              </ScrollView>
            </ScrollView>

            <View style={[styles.controls, { bottom: 10 * sx }]} pointerEvents="box-none">
              <View style={styles.zoomButtons}>
                <MapButton label="Perkecil peta" onPress={() => setZoom(zoomIndex - 1)} disabled={zoomIndex === 0}>
                  <MapMinus width={37} height={37} />
                </MapButton>
                <MapButton label="Perbesar peta" onPress={() => setZoom(zoomIndex + 1)} disabled={zoomIndex === ZOOM_STEPS.length - 1}>
                  <MapPlus width={37} height={37} />
                </MapButton>
              </View>
              <MapButton label="Pusatkan peta" onPress={recenter}>
                <SearchSquare width={37} height={37} />
              </MapButton>
            </View>
          </View>

          <Text style={styles.note}>*Peta ini bedasarkan foto yang dikirimkan banyak Pengguna</Text>

          <Button label="Lihat Foto Lainnya" onPress={() => setPhotosOpen(true)} style={styles.cta} />
        </ScrollView>
      )}

      {species && (
        <CommunityPhotosSheet visible={photosOpen} photos={species.communityPhotos} onClose={() => setPhotosOpen(false)} />
      )}
    </View>
  );
}

function MapButton({ label, onPress, disabled, children }: { label: string; onPress: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      hitSlop={4}
      style={({ pressed }) => [pressed && { opacity: 0.8 }, disabled && { opacity: 0.5 }]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mint,
  },
  state: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  stateText: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    marginTop: 25,
    marginBottom: 25,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 24,
  },
  mapBox: {
    alignSelf: 'center',
    borderWidth: BOX.border,
    borderColor: colors.mapBorder,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: colors.onDark,
  },
  hotspot: {
    position: 'absolute',
    backgroundColor: colors.hotspot,
  },
  controls: {
    position: 'absolute',
    left: 13,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  zoomButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  note: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 10,
  },
  cta: {
    marginTop: 24,
    marginHorizontal: 41,
  },
});
