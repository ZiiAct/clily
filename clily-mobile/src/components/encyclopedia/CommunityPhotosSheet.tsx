import React from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import UserSmall from '../../assets/icons/user-small.svg';
import { StateMessage } from '../StateMessage';
import { colors, fonts, gradients } from '../../theme/tokens';
import type { CommunityPhoto } from '../../types/species.types';

type Props = {
  visible: boolean;
  photos: CommunityPhoto[];
  onClose: () => void;
};

const CARD_W = 180;
const CARD_H = 240;

/** "Temukan Lebih Banyak Foto Spesies ini" bottom sheet (Figma: Frame 129). */
export function CommunityPhotosSheet({ visible, photos, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Tutup" />
      <View style={styles.sheet}>
        <LinearGradient colors={gradients.communitySheet} locations={[0, 0.5, 1]} style={[StyleSheet.absoluteFill, styles.sheetFill]} />

        <View style={styles.header}>
          <LinearGradient
            colors={[colors.green, colors.green, '#A9DCBE']}
            locations={[0, 0.27, 1]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={[StyleSheet.absoluteFill, styles.sheetFill]}
          />
          <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Tutup" hitSlop={14} style={styles.handleTouch}>
            <View style={styles.handle} />
          </Pressable>
          <Text accessibilityRole="header" style={styles.title}>
            Temukan Lebih Banyak Foto Spesies ini
          </Text>
        </View>

        <FlatList
          data={photos}
          keyExtractor={(p) => p.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<StateMessage tone="light" message="Belum ada foto dari pengguna untuk spesies ini." />}
          renderItem={({ item }) => (
            <View style={styles.card} accessible accessibilityLabel={`Foto oleh ${item.author}`}>
              <View style={styles.photoFrame}>
                <Image source={item.photo} style={styles.photo} resizeMode="cover" />
              </View>
              <View style={styles.author}>
                <UserSmall width={12.6389} height={13} />
                <Text style={styles.authorName} numberOfLines={1}>
                  {item.author}
                </Text>
              </View>
            </View>
          )}
        />

        <LinearGradient colors={gradients.navyFade} style={styles.fade} pointerEvents="none" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop,
  },
  sheet: {
    height: '88%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  sheetFill: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  header: {
    height: 74,
    alignItems: 'center',
  },
  handleTouch: {
    paddingTop: 9,
    paddingBottom: 15,
  },
  handle: {
    width: 53,
    height: 4,
    borderRadius: 30,
    backgroundColor: colors.navy,
  },
  title: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 15,
  },
  grid: {
    paddingTop: 0,
    paddingBottom: 60,
    alignItems: 'center',
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  card: {
    width: CARD_W,
    height: CARD_H,
    backgroundColor: colors.onDark,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  photoFrame: {
    marginTop: 17,
    marginLeft: 13,
    width: 154,
    height: 170,
    overflow: 'hidden',
    backgroundColor: colors.mint,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  author: {
    position: 'absolute',
    left: 14,
    right: 10,
    top: 210,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authorName: {
    flex: 1,
    color: colors.navy,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 51,
  },
});
