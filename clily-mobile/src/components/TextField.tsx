import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { colors, fonts, fontSizes, layout, radius } from '../theme/tokens';

type Props = Omit<TextInputProps, 'style'> & {
  /** Icon on the left (Figma: user, mail, lock). Fields without an icon start text at the left padding. */
  icon?: React.ReactNode;
  /** Small label above the field (Figma: "Masukkan password baru") */
  label?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
};

/** Light rounded input from the Figma "username/email/pw input" components. */
export const TextField = forwardRef<TextInput, Props>(function TextField(
  { icon, label, error, style, placeholder, ...inputProps },
  ref,
) {
  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.field, !icon && styles.fieldNoIcon, !!error && styles.fieldError]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={colors.navyMuted}
          accessibilityLabel={label ?? placeholder}
          style={styles.input}
          {...inputProps}
        />
      </View>
      {!!error && (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    marginBottom: 9,
    marginLeft: 3,
    color: colors.navyMuted,
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.description,
  },
  field: {
    height: layout.fieldHeight,
    borderRadius: radius.input,
    backgroundColor: colors.onDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 19,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  fieldNoIcon: {
    paddingLeft: 19,
  },
  fieldError: {
    borderColor: colors.error,
  },
  icon: {
    width: 18,
    alignItems: 'center',
    marginRight: 9, // text starts 46px from the field edge, as in Figma
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: fontSizes.input,
    paddingVertical: 0,
  },
  error: {
    marginTop: 6,
    marginLeft: 4,
    color: colors.error,
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
  },
});
