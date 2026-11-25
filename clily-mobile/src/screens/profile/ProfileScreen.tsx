import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import AvatarEdit from '../../assets/icons/avatar-edit.svg';
import NameEdit from '../../assets/icons/name-edit.svg';
import XpKnob from '../../assets/icons/xp-knob.svg';
import RowChevron from '../../assets/icons/row-chevron.svg';
import ProfileHead from '../../assets/icons/nav-profile-head.svg';
import { Button } from '../../components/Button';
import { MessageDialog } from '../../components/MessageDialog';
import { ScreenHeader } from '../../components/ScreenHeader';
import { EditFieldDialog, LanguageDialog, RatingDialog, languageLabel, type LanguageCode } from '../../components/profile/ProfileDialogs';
import { useAuthStore } from '../../store/authStore';
import { colors, fonts } from '../../theme/tokens';
import { validateEmail, validateRequired } from '../../utils/validation';

type Props = {
  onContactSupport: () => void;
  onLoggedOut: () => void;
};

type EditTarget = 'name' | 'email' | 'phone' | null;

const HEADER_OVERLAP = 20; // the hero continues under the header's rounded corners

/** Profil Saya (Figma: PROFILE SETTINGS). */
export function ProfileScreen({ onContactSupport, onLoggedOut }: Props) {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const logout = useAuthStore((s) => s.logout);

  const [editing, setEditing] = useState<EditTarget>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [notice, setNotice] = useState<{ title: string; message: string } | null>(null);

  const xp = user?.xp ?? 0;
  const xpToNext = user?.xpToNext ?? 0;
  const progress = xp + xpToNext > 0 ? xp / (xp + xpToNext) : 0;

  const changePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!result.canceled && result.assets[0]) await updateProfile({ avatarUrl: result.assets[0].uri });
  };

  const confirmLogout = () =>
    Alert.alert('Keluar', 'Kamu yakin ingin keluar dari akun ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: () => {
          logout();
          onLoggedOut();
        },
      },
    ]);

  const editConfig = {
    name: { title: 'Ubah Nama', value: user?.username ?? '', placeholder: 'Nama kamu', validate: (v: string) => validateRequired(v, 'Nama') },
    email: { title: 'Alamat Email', value: user?.email ?? '', placeholder: 'nama@email.com', validate: validateEmail },
    phone: {
      title: 'Nomor Ponsel',
      value: user?.phone ?? '',
      placeholder: '08xxxxxxxxxx',
      validate: (v: string) => (v && !/^\+?\d{9,15}$/.test(v.replace(/[\s-]/g, '')) ? 'Nomor ponsel tidak valid.' : undefined),
    },
  } as const;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScreenHeader title="Profil Saya" variant="light" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <LinearGradient colors={[colors.navy, colors.blue]} locations={[0.1, 0.95]} start={{ x: 0.35, y: 0 }} end={{ x: 0.65, y: 1 }} style={[StyleSheet.absoluteFill, styles.heroFill]} />

          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              {user?.avatarUrl ? (
                <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} resizeMode="cover" accessibilityLabel="Foto profil" />
              ) : (
                <View style={styles.avatarFallback}>
                  <ProfileHead width={60} height={60} />
                </View>
              )}
            </View>
            <Pressable onPress={changePhoto} accessibilityRole="button" accessibilityLabel="Ganti foto profil" hitSlop={8} style={styles.avatarEdit}>
              <AvatarEdit width={34} height={34} />
            </Pressable>
          </View>

          <Pressable onPress={() => setEditing('name')} accessibilityRole="button" accessibilityLabel={`Nama: ${user?.username ?? ''}. Ubah nama`} style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {user?.username ?? 'Tamu'}
            </Text>
            <NameEdit width={18} height={18} />
          </Pressable>

          <View
            style={styles.track}
            accessible
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: xp + xpToNext, now: xp, text: `${xp} XP, ${xpToNext} XP lagi` }}
          >
            <View style={[styles.fill, { width: `${progress * 100}%` }]} />
            <View style={[styles.knob, { left: `${progress * 100}%` }]}>
              <XpKnob width={16.85} height={16} />
            </View>
          </View>

          <Text style={styles.title}>{user?.title ?? 'Kontributor'}</Text>
          <Text style={styles.nextTitle}>{xpToNext} XP lagi untuk lanjut ke title selanjutnya!</Text>
        </View>

        {/* Akun Saya */}
        <Text style={styles.section}>Akun Saya</Text>
        <SettingRow label="Alamat Email*" value={user?.email ?? '-'} onPress={() => setEditing('email')} />
        <SettingRow label="Nomor Ponsel" value={user?.phone || '-'} onPress={() => setEditing('phone')} />

        {/* Pengaturan */}
        <Text style={styles.section}>Pengaturan</Text>
        <SettingRow label="Bahasa" value={languageLabel(user?.language ?? 'id')} onPress={() => setLanguageOpen(true)} />

        {/* Dukungan Pengguna */}
        <Text style={styles.section}>Dukungan Pengguna</Text>
        <LinkRow label="Pelayanan Pelanggan" onPress={onContactSupport} />
        <LinkRow
          label="Tentang Kami"
          onPress={() =>
            setNotice({
              title: 'Tentang Clily',
              message: 'Clily membantu kamu memantau ekosistem: mengenali serangga, menjelajah ensiklopedia makhluk hidup, dan mengikuti berita lingkungan.\nVersi 1.0.0',
            })
          }
        />
        <LinkRow label="Suka clily? Nilai aplikasi kami!" onPress={() => setRatingOpen(true)} />

        <Button label="Keluar" onPress={confirmLogout} style={styles.logout} />
      </ScrollView>

      {editing && (
        <EditFieldDialog
          visible
          title={editConfig[editing].title}
          initialValue={editConfig[editing].value}
          placeholder={editConfig[editing].placeholder}
          keyboardType={editing === 'email' ? 'email-address' : editing === 'phone' ? 'phone-pad' : 'default'}
          validate={editConfig[editing].validate}
          onClose={() => setEditing(null)}
          onSave={async (value) => {
            const field = editing === 'name' ? 'username' : editing;
            await updateProfile({ [field]: value });
            setEditing(null);
          }}
        />
      )}
      <LanguageDialog
        visible={languageOpen}
        current={(user?.language ?? 'id') as LanguageCode}
        onClose={() => setLanguageOpen(false)}
        onSave={async (code) => {
          await updateProfile({ language: code });
          setLanguageOpen(false);
        }}
      />
      <RatingDialog
        visible={ratingOpen}
        onClose={() => setRatingOpen(false)}
        onSubmit={(stars) => {
          setRatingOpen(false);
          setNotice({ title: 'Terima kasih!', message: `Kamu memberi clily ${stars} bintang. Masukanmu membantu kami berkembang.` });
        }}
      />
      <MessageDialog visible={!!notice} title={notice?.title ?? ''} message={notice?.message ?? ''} buttonLabel="Tutup" onClose={() => setNotice(null)} />
    </View>
  );
}

function SettingRow({ label, value, onPress }: { label: string; value: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${label}: ${value}`} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue} numberOfLines={1}>
          {value}
        </Text>
      </View>
      <Chevron />
    </Pressable>
  );
}

function LinkRow({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}>
      <Text style={styles.linkLabel}>{label}</Text>
      <Chevron />
    </Pressable>
  );
}

function Chevron() {
  // Figma rotates the chevron asset 90° to point right.
  return (
    <View style={styles.chevron}>
      <RowChevron width={13.8932} height={8.96644} />
    </View>
  );
}

const ROW_W = 330;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mint,
  },
  scroll: {
    marginTop: -HEADER_OVERLAP,
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    paddingTop: HEADER_OVERLAP + 24,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.navy,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  heroFill: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarWrap: {
    width: 185,
    height: 185,
  },
  avatar: {
    width: 185,
    height: 185,
    borderRadius: 92.5,
    overflow: 'hidden',
    backgroundColor: colors.mint,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEdit: {
    position: 'absolute',
    left: 138,
    top: 157,
  },
  nameRow: {
    marginTop: 6,
    maxWidth: ROW_W,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    flexShrink: 1,
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  track: {
    marginTop: 17,
    width: ROW_W,
    height: 7.8,
    borderRadius: 28,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  fill: {
    height: 8.2,
    borderRadius: 28,
    backgroundColor: colors.green,
  },
  knob: {
    position: 'absolute',
    marginLeft: -15,
    top: -4.1,
  },
  title: {
    marginTop: 26,
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  nextTitle: {
    marginTop: 6,
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 11,
  },
  section: {
    width: ROW_W,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 6,
    color: colors.navy,
    opacity: 0.6,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  row: {
    width: ROW_W,
    alignSelf: 'center',
    height: 55,
    marginBottom: 6,
    borderRadius: 15,
    backgroundColor: colors.onDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
    paddingRight: 8,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  rowValue: {
    marginTop: 3,
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  linkRow: {
    width: ROW_W,
    alignSelf: 'center',
    height: 30,
    marginBottom: 6,
    borderRadius: 10,
    backgroundColor: colors.onDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
    paddingRight: 8,
  },
  linkLabel: {
    flex: 1,
    color: colors.navy,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  chevron: {
    width: 9,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '90deg' }],
  },
  pressed: {
    opacity: 0.8,
  },
  logout: {
    width: ROW_W,
    alignSelf: 'center',
    marginTop: 12,
  },
});
