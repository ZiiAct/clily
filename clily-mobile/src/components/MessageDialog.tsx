import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme/tokens';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  buttonLabel: string;
  onClose: () => void;
};

/** White rounded dialog with a bold title, message and one navy button (Figma: "Trivia Terkirim!"). */
export function MessageDialog({ visible, title, message, buttonLabel, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.card} accessibilityRole="alert">
          <Text style={styles.text}>
            <Text style={styles.title}>{title}</Text>
            {'\n'}
            {message}
          </Text>
          <Pressable onPress={onClose} accessibilityRole="button" style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonLabel}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 319,
    paddingTop: 21,
    paddingBottom: 19,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  title: {
    fontFamily: fonts.extraBold,
  },
  button: {
    marginTop: 10,
    minWidth: 130,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: colors.onDark,
    fontFamily: fonts.extraBold,
    fontSize: 15,
  },
});
