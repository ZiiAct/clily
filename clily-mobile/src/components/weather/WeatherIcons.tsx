import React from 'react';
import { View, type TransformsStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import Sun from '../../assets/weather/forecast-sun.svg';
import RainCloud from '../../assets/weather/forecast-rain-cloud.svg';
import RainWindA from '../../assets/weather/forecast-rain-wind-a.svg';
import RainWindB from '../../assets/weather/forecast-rain-wind-b.svg';
import RainDrops from '../../assets/weather/forecast-rain-drops.svg';
import CloudKamis from '../../assets/weather/forecast-cloud-kamis.svg';
import StormCloud from '../../assets/weather/forecast-storm-cloud.svg';
import StormWindA from '../../assets/weather/forecast-storm-wind-a.svg';
import StormWindB from '../../assets/weather/forecast-storm-wind-b.svg';
import StormDrops from '../../assets/weather/forecast-storm-drops.svg';
import BoltA from '../../assets/weather/forecast-bolt-a.svg';
import BoltB from '../../assets/weather/forecast-bolt-b.svg';
import CloudSabtu from '../../assets/weather/forecast-cloud-sabtu.svg';
import SunnyCloudSmall from '../../assets/weather/forecast-cerah-berawan.svg';
import SunnyCloudLarge from '../../assets/weather/cerah-berawan.svg';
import Drop from '../../assets/weather/drop.svg';
import HumidWavesA from '../../assets/weather/humid-a.svg';
import HumidWavesB from '../../assets/weather/humid-b.svg';
import Wind from '../../assets/weather/angin.svg';
import Rain from '../../assets/weather/hujan.svg';
import Leaf from '../../assets/weather/leaf.svg';
import AirLine68 from '../../assets/weather/aq-line68.svg';
import AirLine70 from '../../assets/weather/aq-line70.svg';
import AirLine71 from '../../assets/weather/aq-line71.svg';
import AirLine72 from '../../assets/weather/aq-line72.svg';
import type { WeatherCondition } from '../../types/content.types';

/**
 * Weather icons rebuilt from the Figma CUACA frame. Several icons are groups of
 * small vector pieces in Figma; each piece is placed at its Figma offset
 * (in px, relative to the icon's top-left).
 */

type SvgComponent = React.FC<SvgProps>;

/** One SVG piece at an absolute offset (its own size includes any Figma shadow padding). */
function Piece({ Svg, x, y, w, h }: { Svg: SvgComponent; x: number; y: number; w: number; h: number }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Svg width={w} height={h} />
    </View>
  );
}

/** A Figma rotated layer: bounding box at (x, y), inner box centered and transformed. */
function Rotated({
  x,
  y,
  boxW,
  boxH,
  innerW,
  innerH,
  transform,
  children,
}: {
  x: number;
  y: number;
  boxW: number;
  boxH: number;
  innerW: number;
  innerH: number;
  transform: NonNullable<TransformsStyle['transform']>;
  children: React.ReactNode;
}) {
  return (
    <View style={{ position: 'absolute', left: x, top: y, width: boxW, height: boxH, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: innerW, height: innerH, transform }}>{children}</View>
    </View>
  );
}

function Box({ w, h, children }: { w: number; h: number; children: React.ReactNode }) {
  return <View style={{ width: w, height: h }}>{children}</View>;
}

// ---------- Forecast table icons (left column of each row) ----------

const FORECAST_ICONS: Record<WeatherCondition, () => React.ReactElement> = {
  cerah: () => (
    <Box w={32} h={30.17}>
      <Piece Svg={Sun} x={-4} y={0} w={40} h={38.1667} />
    </Box>
  ),
  'hujan-angin': () => (
    <Box w={45} h={31}>
      <Piece Svg={RainCloud} x={0} y={0} w={45} h={16.7185} />
      <Piece Svg={RainWindA} x={-3.17} y={4.36} w={30.8948} h={24.2277} />
      <Piece Svg={RainWindB} x={-3.15} y={4.36} w={30.6095} h={23.999} />
      <Piece Svg={RainDrops} x={9.0} y={19.87} w={26.5363} h={10.7823} />
    </Box>
  ),
  berawan: () => (
    <Box w={45} h={20}>
      <Piece Svg={CloudKamis} x={-4} y={0} w={53} h={28} />
    </Box>
  ),
  'badai-petir': () => (
    <Box w={45} h={31}>
      <Piece Svg={BoltA} x={3.86} y={15.51} w={5.88191} h={12.4689} />
      <Piece Svg={StormCloud} x={0} y={0} w={45} h={16.1309} />
      <Piece Svg={StormWindA} x={-3.17} y={4.21} w={30.9066} h={23.6642} />
      <Piece Svg={StormWindB} x={-3.15} y={4.21} w={30.6155} h={23.4401} />
      <Piece Svg={StormDrops} x={8.48} y={20.22} w={26.5434} h={10.4295} />
      <Piece Svg={BoltB} x={25.71} y={16.38} w={5.88201} h={12.4688} />
    </Box>
  ),
  mendung: () => (
    <Box w={46} h={23}>
      <Piece Svg={CloudSabtu} x={-4} y={0} w={54} h={31} />
    </Box>
  ),
  'cerah-berawan': () => (
    <Box w={57} h={30.17}>
      <Piece Svg={SunnyCloudSmall} x={-4} y={0} w={65} h={38.1666} />
    </Box>
  ),
};

export function ForecastIcon({ condition }: { condition: WeatherCondition }) {
  const Icon = FORECAST_ICONS[condition];
  return <Icon />;
}

/** Large illustration above the current temperature. Figma only draws "cerah berawan"; other conditions reuse the forecast icon at 3×. */
export function CurrentWeatherIllustration({ condition }: { condition: WeatherCondition }) {
  if (condition === 'cerah-berawan') {
    return <SunnyCloudLarge width={203} height={108.875} />;
  }
  return (
    <View style={{ width: 203, height: 108.875, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ transform: [{ scale: 3 }] }}>
        <ForecastIcon condition={condition} />
      </View>
    </View>
  );
}

// ---------- Current-condition stat icons (Kelembapan, Angin, Hujan, Kualitas Udara) ----------

export function HumidityIcon() {
  return (
    <Box w={31} h={35}>
      {/* Drop is drawn sideways in Figma and rotated -90° */}
      <Rotated x={0} y={0} boxW={20.5} boxH={35} innerW={35} innerH={20.5} transform={[{ rotate: '-90deg' }]}>
        <Piece Svg={Drop} x={-4} y={0} w={43} h={28.5} />
      </Rotated>
      <Piece Svg={HumidWavesA} x={15.11} y={14.5} w={15.7792} h={9} />
      <Piece Svg={HumidWavesB} x={15.31} y={14.75} w={15.3896} h={8.5} />
      <Piece Svg={HumidWavesA} x={15.11} y={20.5} w={15.7792} h={9} />
      <Piece Svg={HumidWavesB} x={15.31} y={20.75} w={15.3896} h={8.5} />
    </Box>
  );
}

export function WindIcon() {
  return (
    <Box w={40} h={35}>
      <Piece Svg={Wind} x={0} y={-0.5} w={40.5277} h={35.9999} />
    </Box>
  );
}

export function RainIcon() {
  return <Rain width={40} height={35} />;
}

function AirLeaf({ x, y, flipped }: { x: number; y: number; flipped: boolean }) {
  return (
    <Rotated
      x={x}
      y={y}
      boxW={8.64}
      boxH={7.173}
      innerW={4.35}
      innerH={7.495}
      transform={flipped ? [{ rotate: '115.74deg' }, { scaleY: -1 }] : [{ rotate: '64.26deg' }]}
    >
      <Leaf width={4.35014} height={7.49472} />
    </Rotated>
  );
}

export function AirQualityIcon() {
  return (
    <Box w={45} h={33}>
      <AirLeaf x={16.01} y={24.75} flipped />
      <AirLeaf x={34.01} y={1.75} flipped />
      <AirLeaf x={35.01} y={20.75} flipped={false} />
      <AirLeaf x={7.01} y={4.75} flipped={false} />
      <Piece Svg={AirLine70} x={0} y={27} w={15} h={1} />
      <Rotated x={0} y={9} boxW={34.511} boxH={6.817} innerW={34.348} innerH={5.747} transform={[{ rotate: '-1.79deg' }]}>
        <Piece Svg={AirLine68} x={-0.05} y={-0.26} w={34.8992} h={6.5086} />
      </Rotated>
      <Rotated x={0} y={13} boxW={41.553} boxH={7.598} innerW={41.376} innerH={6.308} transform={[{ rotate: '-1.79deg' }]}>
        <Piece Svg={AirLine72} x={-0.05} y={-0.26} w={41.932} h={7.07017} />
      </Rotated>
      <Rotated
        x={0}
        y={22}
        boxW={31.779}
        boxH={6.277}
        innerW={31.629}
        innerH={5.292}
        transform={[{ rotate: '1.79deg' }, { scaleY: -1 }]}
      >
        <Piece Svg={AirLine71} x={-0.05} y={-0.26} w={32.1797} h={6.0536} />
      </Rotated>
    </Box>
  );
}
