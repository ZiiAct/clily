import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LikeIcon from '../../assets/icons/like.svg';
import LikeActiveIcon from '../../assets/icons/like-active.svg';
import SendCircle from '../../assets/icons/send-circle.svg';
import SendArrow from '../../assets/icons/send-arrow.svg';
import { Skeleton, SkeletonGroup } from '../Skeleton';
import { StateMessage } from '../StateMessage';
import { useNewsStore } from '../../store/newsStore';
import { colors, fonts, gradients } from '../../theme/tokens';
import type { Comment } from '../../types/news.types';

type Props = {
  visible: boolean;
  comments: Comment[] | undefined;
  loading: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
};

/** "Komentar" bottom sheet (Figma: Frame 130). */
export function CommentsSheet({ visible, comments, loading, onSend, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState('');
  const liked = useNewsStore((s) => s.likedComments);
  const toggleLike = useNewsStore((s) => s.toggleLike);

  const send = () => {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Tutup komentar" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.sheet}>
        <LinearGradient colors={gradients.commentSheet} locations={[0, 0.1, 1]} style={[StyleSheet.absoluteFill, styles.sheetFill]} />

        <View style={styles.header}>
          <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Tutup komentar" hitSlop={14} style={styles.handleTouch}>
            <View style={styles.handle} />
          </Pressable>
          <Text accessibilityRole="header" style={styles.title}>
            Komentar
          </Text>
        </View>

        {loading ? (
          <SkeletonGroup label="Memuat komentar" style={styles.list}>
            {[118, 87, 118].map((h, i) => (
              <Skeleton key={i} height={h} radius={16} tone="dark" />
            ))}
          </SkeletonGroup>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(c) => c.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<StateMessage tone="light" message="Belum ada komentar. Jadilah yang pertama!" />}
            renderItem={({ item }) => (
              <View style={styles.comment} accessible accessibilityLabel={`${item.author}: ${item.text}`}>
                <View style={styles.commentHeader}>
                  <View style={styles.avatar} />
                  <Text style={styles.author} numberOfLines={1}>
                    {item.author}
                  </Text>
                  <Pressable
                    onPress={() => toggleLike(item.id)}
                    accessibilityRole="button"
                    accessibilityLabel={liked[item.id] ? 'Batal suka' : 'Suka'}
                    accessibilityState={{ selected: !!liked[item.id] }}
                    hitSlop={10}
                    style={styles.like}
                  >
                    {liked[item.id] ? <LikeActiveIcon width={19.06} height={18.5} /> : <LikeIcon width={19.06} height={18.5} />}
                  </Pressable>
                </View>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            )}
          />
        )}

        <View style={[styles.inputBar, { marginBottom: Math.max(insets.bottom, 16) }]}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Tambahkan komentar anda"
            placeholderTextColor={colors.navyMuted}
            onSubmitEditing={send}
            returnKeyType="send"
            accessibilityLabel="Tulis komentar"
            style={styles.input}
          />
          <Pressable onPress={send} disabled={!draft.trim()} accessibilityRole="button" accessibilityLabel="Kirim komentar" hitSlop={8} style={styles.send}>
            <View style={styles.sendCircle}>
              <SendCircle width={41} height={41} />
            </View>
            <SendArrow width={17.425} height={15.0135} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop,
  },
  sheet: {
    height: '80%',
    paddingHorizontal: 20,
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
    paddingBottom: 14,
  },
  handle: {
    width: 53,
    height: 4,
    borderRadius: 15,
    backgroundColor: colors.sheetHandle,
  },
  title: {
    color: colors.onDark,
    fontFamily: fonts.extraBold,
    fontSize: 15,
  },
  list: {
    gap: 12,
    paddingBottom: 12,
  },
  comment: {
    borderRadius: 16,
    backgroundColor: colors.mint,
    paddingTop: 12,
    paddingHorizontal: 17,
    paddingBottom: 18,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  avatar: {
    width: 26.6,
    height: 25,
    borderRadius: 13,
    backgroundColor: colors.avatar,
  },
  author: {
    flex: 1,
    marginLeft: 13,
    color: colors.navy,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  like: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'justify',
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  inputBar: {
    height: 53,
    marginTop: 4,
    borderRadius: 15,
    backgroundColor: colors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 13,
  },
  input: {
    flex: 1,
    height: 33,
    borderRadius: 10,
    backgroundColor: colors.onDark,
    paddingHorizontal: 10,
    paddingVertical: 0,
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  send: {
    marginLeft: 8,
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendCircle: {
    position: 'absolute',
    left: -3,
    top: -3,
  },
});
