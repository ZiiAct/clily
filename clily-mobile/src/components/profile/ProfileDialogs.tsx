import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from 'react-native';

import StarIcon from '../../assets/icons/star.svg';
import StarFilledIcon from '../../assets/icons/star-filled.svg';
import { DialogCard, dialogStyles } from './DialogCard';
import { colors, fonts } from '../../theme/tokens';

// ---------- "Suka clily? Nilai aplikasi kami!" (Figma: Frame 131 + material-symbols:star) ----------

type RatingProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (stars: number) => void;
};

export function RatingDialog({ visible, onClose, onSubmit }: RatingProps) {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (visible) setStars(0);
  }, [visible]);

  return (
    <DialogCard
      visible={visible}
      onClose={onClose}
      secondaryLabel="nanti"
      primaryLabel="kirim"
      primaryDisabled={stars === 0}
      onPrimary={() => onSubmit(stars)}
    >
      <View style={styles.stars} accessibilityRole="adjustable" accessibilityLabel={`Nilai ${stars} dari 5 bintang`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable key={n} onPress={() => setStars(n)} accessibilityRole="button" accessibilityLabel={`${n} bintang`} hitSlop={4}>
            {n <= stars ? <StarFilledIcon width={37.6786} height={35.625} /> : <StarIcon width={37.6786} height={35.625} />}
          </Pressable>
        ))}
      </View>
    </DialogCard>
  );
}

// ---------- Edit a single text field (name, email, phone) ----------

type EditFieldProps = {
  visible: boolean;
  title: string;
  initialValue: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  /** Return an error message to keep the dialog open */
  validate?: (value: string) => string | undefined;
  onClose: () => void;
  onSave: (value: string) => void;
};

export function EditFieldDialog({ visible, title, initialValue, placeholder, keyboardType, validate, onClose, onSave }: EditFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (visible) {
      setValue(initialValue);
      setError(undefined);
    }
  }, [visible, initialValue]);

  const save = () => {
    const message = validate?.(value.trim());
    setError(message);
    if (!message) onSave(value.trim());
  };

  return (
    <DialogCard visible={visible} onClose={onClose} secondaryLabel="Batal" primaryLabel="Simpan" onPrimary={save}>
      <Text style={dialogStyles.title}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={colors.navyMuted}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
        autoFocus
        onSubmitEditing={save}
        accessibilityLabel={title}
        style={dialogStyles.input}
      />
      {!!error && <Text style={dialogStyles.error}>{error}</Text>}
    </DialogCard>
  );
}

// ---------- Bahasa ----------

export type LanguageCode = 'id' | 'en';

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'en', label: 'English' },
];

export const languageLabel = (code: LanguageCode) => LANGUAGES.find((l) => l.code === code)?.label ?? code;

type LanguageProps = {
  visible: boolean;
  current: LanguageCode;
  onClose: () => void;
  onSave: (code: LanguageCode) => void;
};

export function LanguageDialog({ visible, current, onClose, onSave }: LanguageProps) {
  const [selected, setSelected] = useState(current);

  useEffect(() => {
    if (visible) setSelected(current);
  }, [visible, current]);

  return (
    <DialogCard visible={visible} onClose={onClose} secondaryLabel="Batal" primaryLabel="Simpan" onPrimary={() => onSave(selected)}>
      <Text style={dialogStyles.title}>Bahasa</Text>
      <View style={styles.options} accessibilityRole="radiogroup">
        {LANGUAGES.map((lang) => {
          const checked = lang.code === selected;
          return (
            <Pressable
              key={lang.code}
              onPress={() => setSelected(lang.code)}
              accessibilityRole="radio"
              accessibilityState={{ checked }}
              style={styles.option}
            >
              <View style={[styles.radio, checked && styles.radioChecked]}>{checked && <View style={styles.radioDot} />}</View>
              <Text style={styles.optionLabel}>{lang.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </DialogCard>
  );
}

const styles = StyleSheet.create({
  stars: {
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 9, // Figma: stars at y=38, buttons at y=102 in the 166px card
    flexDirection: 'row',
    gap: 4,
  },
  options: {
    marginTop: 14,
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: colors.onDark,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioChecked: {
    borderColor: colors.navy,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.navy,
  },
  optionLabel: {
    marginLeft: 10,
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
});
