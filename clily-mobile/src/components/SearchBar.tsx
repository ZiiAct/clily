import React from 'react';
import { Pressable, StyleSheet, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';

import SearchIcon from '../assets/icons/search.svg';
import { colors, fonts, fontSizes, radius } from '../theme/tokens';

type Props = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** White pill search field with the search icon on the right (Figma: Component 1). */
export function SearchBar({ placeholder, value, onChangeText, onSubmit, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={colors.navy}
        returnKeyType="search"
        style={styles.input}
        accessibilityLabel={placeholder}
      />
      <Pressable
        onPress={onSubmit}
        accessibilityRole="button"
        accessibilityLabel="Cari"
        hitSlop={8}
        style={styles.iconButton}
      >
        <SearchIcon width={21.4615} height={21} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 47,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 23.5,
    paddingRight: 5,
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    paddingVertical: 0,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
