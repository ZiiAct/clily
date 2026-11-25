import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Outline button, e.g. "nanti" / "Batal" */
  secondaryLabel: string;
  /** Filled button, e.g. "kirim" / "Simpan" */
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
};

/** White dialog with outline + filled buttons (Figma: Frame 131/132, 319 wide, 126 × 40 buttons). */
export function DialogCard({ visible, onClose, children, secondaryLabel, primaryLabel, onPrimary, primaryDisabled }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView style={styles.backdrop} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Tutup" />
        <View style={styles.card}>
          {children}
          <View style={styles.buttons}>
            <Pressable onPress={onClose} accessibilityRole="button" style={({ pressed }) => [styles.button, styles.outline, pressed && styles.pressed]}>
              <Text style={[styles.label, styles.outlineLabel]}>{secondaryLabel}</Text>
            </Pressable>
            <Pressable
              onPress={onPrimary}
              disabled={primaryDisabled}
              accessibilityRole="button"
              accessibilityState={{ disabled: !!primaryDisabled }}
              style={({ pressed }) => [styles.button, styles.filled, (pressed || primaryDisabled) && styles.pressed]}
            >
              <Text style={[styles.label, styles.filledLabel]}>{primaryLabel}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export const dialogStyles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 15,
  },
  input: {
    marginTop: 14,
    height: 48,
    borderRadius: 15,
    backgroundColor: colors.onDark,
    paddingHorizontal: 14,
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  error: {
    marginTop: 6,
    color: colors.error,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 319,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 27,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  buttons: {
    marginTop: 19,
    flexDirection: 'row',
    gap: 11,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    borderWidth: 2,
    borderColor: colors.navy,
  },
  filled: {
    backgroundColor: colors.navy,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontFamily: fonts.extraBold,
    fontSize: 15,
  },
  outlineLabel: {
    color: colors.navy,
  },
  filledLabel: {
    color: colors.white,
  },
});
