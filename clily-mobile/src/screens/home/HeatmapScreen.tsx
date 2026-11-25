import React, { useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import SearchSquare from '../../assets/icons/search-square.svg';
import { DesignCanvas } from '../../components/DesignCanvas';
import { ScreenHeader } from '../../components/ScreenHeader';
import { colors, fonts, gradients, shadows, temperatureScaleStops, textShadows } from '../../theme/tokens';

const MAP = require('../../assets/images/temperature-map.png');

/** Figma Heatmap is 917px tall; the 102px header sits outside the canvas (Figma y − 102). */
const CANVAS_HEIGHT = 917 - 102;
const VIEWPORT = { x: 21, y: 76, w: 371, h: 575, border: 3 };
const INNER = { w: VIEWPORT.w - VIEWPORT.border * 2, h: VIEWPORT.h - VIEWPORT.border * 2 };
/** Figma "peta" component: default 1228 × 581.68, zoomed variant 1723 × 816 (same image). */
const MAP_SIZE = { w: 1228, h: 581.684 };
const ZOOM = 1723 / 1228;
const INITIAL_OFFSET = { x: 351, y: 13 };
const LEGEND = ['-30', '-20', '-10', '0', '10', '20', '30', '40', '50'];

/** Sebaran suhu iklim dunia (Figma: Heatmap). The map pans in both directions; the magnifier toggles zoom. */
export function HeatmapScreen() {
  const [zoomed, setZoomed] = useState(false);
  const hScroll = useRef<ScrollView>(null);
  const vScroll = useRef<ScrollView>(null);
  const offset = useRef({ ...INITIAL_OFFSET });

  const scale = zoomed ? ZOOM : 1;
  const mapW = MAP_SIZE.w * scale;
  const mapH = MAP_SIZE.h * scale;

  const toggleZoom = () => {
    // Keep the point at the center of the viewport centered after zooming.
    const factor = zoomed ? 1 / ZOOM : ZOOM;
    const cx = (offset.current.x + INNER.w / 2) * factor - INNER.w / 2;
    const cy = (offset.current.y + INNER.h / 2) * factor - INNER.h / 2;
    setZoomed(!zoomed);
    requestAnimationFrame(() => {
      hScroll.current?.scrollTo({ x: Math.max(cx, 0), animated: false });
      vScroll.current?.scrollTo({ y: Math.max(cy, 0), animated: false });
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <LinearGradient
        colors={gradients.heatmapScreen}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Figma labels this header "Ensiklopedia" (likely copied from another frame); "Peta Suhu" matches the screen. */}
      <ScreenHeader title="Peta Suhu" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <DesignCanvas height={CANVAS_HEIGHT}>
          <View style={[styles.abs, { left: 48.5, top: 23, width: 315 }]}>
            <Text accessibilityRole="header" style={styles.title}>
              Sebaran suhu iklim dunia
            </Text>
          </View>

          <View style={styles.viewport}>
            <ScrollView
              ref={hScroll}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentOffset={{ x: INITIAL_OFFSET.x, y: 0 }}
              onScroll={(e) => (offset.current.x = e.nativeEvent.contentOffset.x)}
              scrollEventThrottle={32}
            >
              <ScrollView
                ref={vScroll}
                nestedScrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentOffset={{ x: 0, y: INITIAL_OFFSET.y }}
                onScroll={(e) => (offset.current.y = e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={32}
                style={{ width: mapW, height: INNER.h }}
              >
                <Image
                  source={MAP}
                  style={{ width: mapW, height: mapH }}
                  resizeMode="cover"
                  accessibilityLabel="Peta sebaran suhu dunia"
                />
              </ScrollView>
            </ScrollView>
          </View>

          <Pressable
            onPress={toggleZoom}
            accessibilityRole="button"
            accessibilityLabel={zoomed ? 'Perkecil peta' : 'Perbesar peta'}
            hitSlop={4}
            style={[styles.abs, { left: 341, top: 597 }]}
          >
            <SearchSquare width={37} height={37} />
          </Pressable>

          <View style={[styles.abs, { left: 21, top: 667 }]}>
            <Text style={styles.legendTitle}>Suhu dalam °C</Text>
          </View>
          <View style={[styles.abs, styles.legend]} accessible accessibilityLabel="Skala suhu dari minus 30 sampai 50 derajat Celsius">
            <LinearGradient
              colors={gradients.temperatureScale}
              locations={temperatureScaleStops}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[StyleSheet.absoluteFill, styles.legendBar]}
            />
            {LEGEND.map((label) => (
              <Text key={label} style={styles.legendLabel}>
                {label}
              </Text>
            ))}
          </View>
        </DesignCanvas>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  abs: {
    position: 'absolute',
  },
  title: {
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 24,
  },
  viewport: {
    position: 'absolute',
    left: VIEWPORT.x,
    top: VIEWPORT.y,
    width: VIEWPORT.w,
    height: VIEWPORT.h,
    borderWidth: VIEWPORT.border,
    borderColor: colors.navy,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: colors.mint,
    ...shadows.card,
  },
  legendTitle: {
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  legend: {
    left: 21,
    top: 696,
    width: 371,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  legendBar: {
    borderRadius: 4,
  },
  legendLabel: {
    color: colors.onDark,
    fontFamily: fonts.extraBold,
    fontSize: 10,
    ...textShadows.legend,
  },
});
