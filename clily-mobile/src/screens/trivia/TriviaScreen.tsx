import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import EditPencil from '../../assets/icons/edit-pencil.svg';
import EditSparkles from '../../assets/icons/edit-sparkles.svg';
import { MessageDialog } from '../../components/MessageDialog';
import { ScreenHeader } from '../../components/ScreenHeader';
import { AddTriviaModal } from '../../components/trivia/AddTriviaModal';
import { submitTrivia } from '../../api/newsApi';
import { useTodayTrivia } from '../../hooks/useNewsQueries';
import { colors, fonts, gradients, layout } from '../../theme/tokens';

const cardShadow = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.25,
  shadowRadius: 10,
  elevation: 8,
};

/** Trivia Hari Ini! (Figma: TRIVIA) with the add-trivia form and confirmation. */
export function TriviaScreen() {
  const { data: trivia, isPending, isError, refetch } = useTodayTrivia();
  const [formOpen, setFormOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScreenHeader title="Trivia" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text accessibilityRole="header" style={styles.title}>
          Trivia Hari Ini!
        </Text>

        {!trivia ? (
          <View style={styles.state}>
            {isPending && <ActivityIndicator color={colors.navy} />}
            {isError && (
              <Text style={styles.stateText} onPress={() => refetch()} accessibilityRole="button">
                Trivia gagal dimuat. Ketuk untuk mencoba lagi.
              </Text>
            )}
          </View>
        ) : (
          <View style={[styles.card, cardShadow]}>
            <LinearGradient
              colors={gradients.triviaCard}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={[StyleSheet.absoluteFill, styles.cardFill]}
            />
            <View style={[styles.photoFrame, cardShadow]}>
              <Image source={trivia.image} style={styles.photo} resizeMode="cover" />
              {/* Figma uses a radial navy vignette; approximated with a diagonal fade. */}
              <LinearGradient
                colors={['rgba(18, 65, 112, 0)', 'rgba(18, 65, 112, 0.85)']}
                start={{ x: 0.75, y: 0.35 }}
                end={{ x: 0, y: 1.1 }}
                style={[StyleSheet.absoluteFill, styles.photo]}
              />
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.question}>{trivia.title}</Text>
              {trivia.body.map((paragraph, i) => (
                <Text key={i} style={[styles.paragraph, i > 0 && styles.paragraphGap]}>
                  {paragraph}
                </Text>
              ))}
              <Text style={styles.author}>({trivia.authorName})</Text>
              <Text style={styles.source}>Sumber: {trivia.source}</Text>
            </View>
          </View>
        )}

        <Pressable
          onPress={() => setFormOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Tambahkan trivia yang kamu ketahui dan dapatkan XP lebih banyak"
          style={({ pressed }) => [styles.addBar, cardShadow, pressed && { opacity: 0.9 }]}
        >
          <Text style={styles.addText}>Tambahkan trivia yang kamu ketahui dan dapatkan XP lebih banyak!</Text>
          <View style={styles.editBadge}>
            <View style={styles.editCircle}>
              <LinearGradient colors={gradients.softButton} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} style={[StyleSheet.absoluteFill, styles.editCircleFill]} />
              <EditPencil width={16} height={16} />
            </View>
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <EditSparkles width={33.453} height={26.453} />
            </View>
          </View>
        </Pressable>
      </ScrollView>

      <AddTriviaModal
        visible={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={async (input) => {
          await submitTrivia(input);
          setFormOpen(false);
          setSent(true);
        }}
      />
      <MessageDialog
        visible={sent}
        title="Trivia Terkirim!"
        message="Proses verifikasi trivia memerlukan waktu 1-2 hari. Kami akan mengirimkan notifikasi untuk informasi selanjutnya."
        buttonLabel="Saya mengerti"
        onClose={() => setSent(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mint,
  },
  content: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 18,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 18,
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 40,
  },
  state: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  stateText: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    borderRadius: 15,
    backgroundColor: colors.blue,
  },
  cardFill: {
    borderRadius: 15,
  },
  photoFrame: {
    height: 246,
    borderRadius: 20,
    backgroundColor: colors.navy,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  cardBody: {
    paddingTop: 25,
    paddingHorizontal: 15,
    paddingBottom: 14,
  },
  question: {
    marginLeft: -1,
    marginBottom: 6,
    color: colors.white,
    fontFamily: fonts.extraBold,
    fontSize: 20,
  },
  paragraph: {
    textAlign: 'justify',
    color: colors.onDark,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  paragraphGap: {
    marginTop: 19, // one blank line, as in Figma
  },
  author: {
    color: colors.onDark,
    fontFamily: fonts.italic,
    fontSize: 15,
  },
  source: {
    marginTop: 14,
    textAlign: 'right',
    color: colors.onDark,
    fontFamily: fonts.light,
    fontSize: 10,
  },
  addBar: {
    marginTop: 12,
    minHeight: 63,
    paddingVertical: 12,
    paddingLeft: 14,
    paddingRight: 27,
    borderRadius: 15,
    backgroundColor: colors.onDark,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addText: {
    flex: 1,
    marginRight: 12,
    color: colors.navyMuted,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  editBadge: {
    width: 33.453,
    height: 26.453,
  },
  editCircle: {
    position: 'absolute',
    left: 8.73,
    top: 4.73,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  editCircleFill: {
    borderRadius: 12,
  },
});
