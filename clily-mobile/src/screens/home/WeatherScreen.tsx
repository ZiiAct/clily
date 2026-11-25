import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { DesignCanvas } from '../../components/DesignCanvas';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Skeleton, SkeletonGroup } from '../../components/Skeleton';
import { StateMessage, errorMessage } from '../../components/StateMessage';
import {
  AirQualityIcon,
  CurrentWeatherIllustration,
  ForecastIcon,
  HumidityIcon,
  RainIcon,
  WindIcon,
} from '../../components/weather/WeatherIcons';
import { useWeather } from '../../hooks/useHomeQueries';
import { colors, fonts } from '../../theme/tokens';

/** Figma CUACA is 917px tall; the 102px header sits outside the canvas (Figma y − 102). */
const CANVAS_HEIGHT = 917 - 102;
const TABLE = { x: 20, y: 439, w: 371, h: 275, padX: 20, padY: 12, rowStep: 44.17 };
const DIVIDERS = [49.5, 95.5, 141.5, 187.5, 233.5];
const CONDITION_LABEL = {
  cerah: 'Cerah',
  'cerah-berawan': 'Cerah Berawan',
  berawan: 'Berawan',
  mendung: 'Mendung',
  'hujan-angin': 'Hujan Angin',
  'badai-petir': 'Badai Petir',
} as const;

function Abs({ x, y, w, children }: { x: number; y: number; w?: number; children: React.ReactNode }) {
  return <View style={{ position: 'absolute', left: x, top: y, width: w }}>{children}</View>;
}

/** A stat label centered on cx, like the Figma text boxes. */
function Stat({ cx, y, w, title, value }: { cx: number; y: number; w: number; title: string; value: string }) {
  return (
    <Abs x={cx - w / 2} y={y} w={w}>
      <Text style={styles.statText}>
        {title}
        {'\n'}
        {value}
      </Text>
    </Abs>
  );
}

/** Cuaca (Figma: CUACA). */
export function WeatherScreen() {
  const { data: weather, isPending, isError, refetch } = useWeather();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScreenHeader title="Cuaca" variant="light" />

      {!weather ? (
        isError && !isPending ? (
          <StateMessage tone="light" message={errorMessage('Cuaca')} actionLabel="Coba lagi" onAction={() => refetch()} />
        ) : (
          <SkeletonGroup label="Memuat cuaca" style={styles.skeleton}>
            <Skeleton width={180} height={24} radius={8} tone="dark" />
            <Skeleton width={203} height={109} tone="dark" style={styles.skeletonCenter} />
            <Skeleton width={90} height={48} radius={10} tone="dark" style={styles.skeletonCenter} />
            <Skeleton width="100%" height={60} tone="dark" style={styles.skeletonGap} />
            <Skeleton width="100%" height={275} tone="dark" style={styles.skeletonGap} />
          </SkeletonGroup>
        )
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <DesignCanvas height={CANVAS_HEIGHT}>
            <Abs x={20} y={40}>
              <Text style={styles.location}>{weather.location}, Hari ini</Text>
            </Abs>
            <Abs x={200} y={40} w={191}>
              <Text style={[styles.time, styles.right]}>{weather.observedAt}</Text>
            </Abs>

            <Abs x={105} y={102}>
              <CurrentWeatherIllustration condition={weather.condition} />
            </Abs>
            <Abs x={0} y={220} w={412}>
              <Text style={styles.temperature} accessibilityLabel={`Suhu ${weather.temperature} derajat`}>
                {weather.temperature}°
              </Text>
            </Abs>
            <Abs x={0} y={280} w={412}>
              <Text style={styles.caption}>{CONDITION_LABEL[weather.condition]}</Text>
              <Text style={styles.caption}>Terasa seperti {weather.feelsLike}°</Text>
            </Abs>

            <Abs x={57.5} y={336}>
              <HumidityIcon />
            </Abs>
            <Abs x={129} y={336}>
              <WindIcon />
            </Abs>
            <Abs x={226} y={339}>
              <RainIcon />
            </Abs>
            <Abs x={319} y={339}>
              <AirQualityIcon />
            </Abs>
            <Stat cx={67.5} y={375} w={67} title="Kelembapan" value={`${weather.humidity}%`} />
            <Stat cx={150} y={376} w={82} title="Kecepatan angin" value={`${weather.windSpeedKmh}km/h`} />
            <Stat cx={246} y={376} w={94} title="Kemungkinan hujan" value={`${weather.rainChance}%`} />
            <Stat cx={339.5} y={376} w={77} title="Kualitas Udara" value={weather.airQuality} />

            <View style={styles.table} accessibilityRole="list" accessibilityLabel="Prakiraan cuaca 6 hari">
              {DIVIDERS.map((y) => (
                <View key={y} style={[styles.divider, { top: y - 0.5 }]} />
              ))}
              {weather.forecast.map((day, i) => (
                <View
                  key={day.day}
                  style={[styles.row, { top: TABLE.padY + i * TABLE.rowStep }]}
                  accessible
                  accessibilityLabel={`${day.day}, ${CONDITION_LABEL[day.condition]}, ${day.temperature} derajat`}
                >
                  <View style={styles.rowIcon}>
                    <ForecastIcon condition={day.condition} />
                  </View>
                  <Text style={styles.rowText}>{day.day}</Text>
                  <Text style={styles.rowText}>{day.temperature}°</Text>
                </View>
              ))}
            </View>
          </DesignCanvas>
        </ScrollView>
      )}
    </View>
  );
}

const COL = (TABLE.w - TABLE.padX * 2 - 80 * 2) / 3; // Figma grid: 3 columns, 80px gaps

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  skeleton: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  skeletonCenter: {
    alignSelf: 'center',
    marginTop: 30,
  },
  skeletonGap: {
    marginTop: 30,
  },
  location: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  time: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 20,
  },
  right: {
    textAlign: 'right',
  },
  temperature: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.extraBold,
    fontSize: 48,
  },
  caption: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
  },
  statText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 10,
  },
  table: {
    position: 'absolute',
    left: TABLE.x,
    top: TABLE.y,
    width: TABLE.w,
    height: TABLE.h,
    borderRadius: 15,
    backgroundColor: colors.forecastPanel,
    overflow: 'hidden',
  },
  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.navy,
  },
  row: {
    position: 'absolute',
    left: TABLE.padX,
    right: TABLE.padX,
    height: 30.17,
    flexDirection: 'row',
    gap: 80,
  },
  rowIcon: {
    width: COL,
  },
  rowText: {
    width: COL,
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});
