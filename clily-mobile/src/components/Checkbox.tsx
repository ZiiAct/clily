import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, fontSizes, radius } from '../theme/tokens';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

/** Navy outlined checkbox with a label (Figma: "checklist"). */
export function Checkbox({ checked, onChange, label }: Props) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      hitSlop={8}
      style={styles.row}
    >
      <View style={styles.touch}>
        <View style={[styles.box, checked && styles.boxChecked]}>
          {checked && <View style={styles.tick} />}
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touch: {
    width: 29,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 17,
    height: 17,
    borderWidth: 2,
    borderColor: colors.navy,
    borderRadius: radius.checkbox,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: colors.navy,
  },
  tick: {
    width: 8,
    height: 4,
    marginTop: -2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.onDark,
    transform: [{ rotate: '-45deg' }],
  },
  label: {
    marginLeft: 5,
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
  },
});
