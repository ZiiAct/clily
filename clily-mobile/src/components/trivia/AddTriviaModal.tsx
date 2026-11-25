import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CloseCircle from '../../assets/icons/close-circle.svg';
import PlusGreen from '../../assets/icons/plus-green.svg';
import { colors, fonts, gradients } from '../../theme/tokens';
import type { TriviaSubmission } from '../../types/news.types';

type Props = {
  visible: boolean;
  onClose: () => void;
  /** Rejects with a user-facing message on failure */
  onSubmit: (input: TriviaSubmission) => Promise<void>;
};

const fieldShadow = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.25,
  shadowRadius: 10,
  elevation: 6,
};

/** "Tambahkan trivia" form (Figma: input trivia). */
export function AddTriviaModal({ visible, onClose, onSubmit }: Props) {
  const insets = useSafeAreaInsets();
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [source, setSource] = useState('');
  const [photoUri, setPhotoUri] = useState<string>();
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);

  const reset = () => {
    setHeadline('');
    setBody('');
    setSource('');
    setPhotoUri(undefined);
    setError(undefined);
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
    if (!result.canceled) setPhotoUri(result.assets[0]?.uri);
  };

  const submit = async () => {
    if (!headline.trim() || !body.trim() || !source.trim()) {
      setError('Lengkapi headline, penjelasan, dan sumber.');
      return;
    }
    setError(undefined);
    setSending(true);
    try {
      await onSubmit({ headline: headline.trim(), body: body.trim(), source: source.trim(), photoUri });
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Trivia gagal dikirim. Coba lagi.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView style={styles.scrim} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.scrimContent, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.panel}>
            <LinearGradient
              colors={gradients.triviaForm}
              locations={[0, 0.2, 0.4, 1]}
              start={{ x: 0.25, y: 0 }}
              end={{ x: 0.75, y: 1 }}
              style={[StyleSheet.absoluteFill, styles.panelFill]}
            />
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Tutup" hitSlop={10} style={styles.close}>
              <CloseCircle width={28.6667} height={28.9884} />
            </Pressable>

            <Text style={styles.label}>Headline Trivia</Text>
            <View style={[styles.headlineBox]}>
              <TextInput
                value={headline}
                onChangeText={setHeadline}
                placeholder="Buat headline semenarik mungkin"
                placeholderTextColor={colors.navyMuted}
                multiline
                maxLength={120}
                accessibilityLabel="Headline trivia"
                style={[styles.input, styles.headlineInput]}
              />
              <Pressable
                onPress={pickPhoto}
                accessibilityRole="button"
                accessibilityLabel={photoUri ? 'Ganti foto' : 'Tambah foto'}
                style={styles.photoSlot}
              >
                {photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> : <PlusGreen width={14} height={14} />}
              </Pressable>
            </View>

            <Text style={styles.label}>Penjelasan</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Penjelasan lebih lanjut"
              placeholderTextColor={colors.navyMuted}
              multiline
              textAlignVertical="top"
              accessibilityLabel="Penjelasan"
              style={[styles.input, styles.box, styles.bodyBox, fieldShadow]}
            />

            <Text style={styles.label}>Sumber</Text>
            <TextInput
              value={source}
              onChangeText={setSource}
              placeholder="Sumber harus terverifikasi"
              placeholderTextColor={colors.navyMuted}
              accessibilityLabel="Sumber"
              style={[styles.input, styles.box, styles.sourceBox, fieldShadow]}
            />

            {!!error && (
              <Text style={styles.error} accessibilityLiveRegion="polite">
                {error}
              </Text>
            )}

            <Pressable
              onPress={submit}
              disabled={sending}
              accessibilityRole="button"
              accessibilityState={{ busy: sending }}
              style={({ pressed }) => [styles.submit, pressed && { opacity: 0.85 }]}
            >
              {sending ? <ActivityIndicator color={colors.onDark} /> : <Text style={styles.submitLabel}>Kirim</Text>}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: colors.scrim,
  },
  scrimContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  panel: {
    paddingTop: 48,
    paddingHorizontal: 21,
    paddingBottom: 20,
  },
  panelFill: {
    borderRadius: 20,
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 9,
  },
  label: {
    marginBottom: 12,
    color: colors.onDark,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  input: {
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  headlineBox: {
    height: 108,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: colors.onDark,
    flexDirection: 'row',
  },
  headlineInput: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 8,
    textAlignVertical: 'top',
  },
  photoSlot: {
    alignSelf: 'flex-end',
    width: 61,
    height: 61,
    margin: 11,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.green,
    backgroundColor: colors.photoSlot,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  box: {
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: colors.onDark,
    paddingHorizontal: 15,
  },
  bodyBox: {
    height: 244,
    paddingTop: 11,
  },
  sourceBox: {
    height: 52,
  },
  error: {
    marginBottom: 10,
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  submit: {
    height: 55,
    borderRadius: 15,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitLabel: {
    color: colors.onDark,
    fontFamily: fonts.extraBold,
    fontSize: 15,
  },
});
