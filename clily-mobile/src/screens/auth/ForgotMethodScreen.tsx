import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MailOptionIcon from '../../assets/icons/mail-option.svg';
import ChatOptionIcon from '../../assets/icons/chat-option.svg';
import ChevronNavy from '../../assets/icons/chevron-navy.svg';
import ChevronMint from '../../assets/icons/chevron-mint.svg';
import { AuthBackground } from '../../components/auth/AuthBackground';
import { AuthScreen } from '../../components/auth/AuthScreen';
import { AuthDescription, AuthTitle } from '../../components/auth/AuthText';
import { colors, fonts, fontSizes, layout, radius } from '../../theme/tokens';
import { useDesignScale } from '../../theme/useDesignScale';

export type VerifyMethod = 'email' | 'sms';

type Props = {
  onSelect: (method: VerifyMethod) => void;
  onBack: () => void;
};

/** Lupa Password, step 2: choose email or SMS (Figma: "FORGOT PASS 2"). */
export function ForgotMethodScreen({ onSelect, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const { y } = useDesignScale();

  return (
    <AuthScreen
      statusBar="light"
      contentTop={346}
      background={<AuthBackground variant="forgot" />}
      overlay={
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          hitSlop={8}
          style={[styles.back, { top: Math.max(y(56) - 12, insets.top + 4) }]}
        >
          <View style={styles.chevronLeft}>
            <ChevronMint width={19.7188} height={12.8392} />
          </View>
        </Pressable>
      }
    >
      <AuthTitle center>Lupa Password</AuthTitle>
      <AuthDescription style={styles.description}>
        Pilih salah satu opsi di bawah untuk mendapatkan kode verifikasi pengaturan ulang password Anda.
      </AuthDescription>

      <MethodOption
        label="Kirim melalui email"
        icon={<MailOptionIcon width={19.001} height={18.1554} />}
        onPress={() => onSelect('email')}
        style={styles.firstOption}
      />
      <MethodOption
        label="Kirim melalui SMS"
        icon={<ChatOptionIcon width={23} height={16.8731} />}
        onPress={() => onSelect('sms')}
        style={styles.option}
      />
    </AuthScreen>
  );
}

type OptionProps = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  style?: object;
};

function MethodOption({ label, icon, onPress, style }: OptionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.optionBox, pressed && styles.pressed, style]}
    >
      <View style={styles.optionIcon}>{icon}</View>
      <Text style={styles.optionLabel}>{label}</Text>
      <View style={styles.chevronRight}>
        <ChevronNavy width={19.7188} height={12.8392} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    left: 5,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Chevron assets point up; rotate to point left / right.
  chevronLeft: {
    transform: [{ rotate: '-90deg' }],
  },
  chevronRight: {
    marginLeft: 'auto',
    transform: [{ rotate: '90deg' }],
  },
  description: {
    marginTop: 14,
    marginHorizontal: -8.5, // the paragraph is 347px wide, slightly wider than the 330px form
  },
  firstOption: {
    marginTop: 35,
  },
  option: {
    marginTop: 6,
  },
  optionBox: {
    height: layout.fieldHeight,
    borderRadius: radius.input,
    backgroundColor: colors.onDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17,
    paddingRight: 15, // visible chevron edge lands 18px from the field edge, as in Figma
  },
  pressed: {
    opacity: 0.8,
  },
  optionIcon: {
    width: 23,
    alignItems: 'flex-start',
  },
  optionLabel: {
    marginLeft: 9,
    color: colors.navyMuted,
    fontFamily: fonts.regular,
    fontSize: fontSizes.input,
  },
});
