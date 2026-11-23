import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = { onGoToLogin: () => void };
const NAVY = '#214675';
const MUTED = '#829EB0';

function UserIcon() {
  return <View style={styles.userIcon}><View style={styles.userHead} /><View style={styles.userBody} /></View>;
}
function MailIcon() {
  return <View style={styles.mailIcon}><View style={styles.mailFlapLeft} /><View style={styles.mailFlapRight} /></View>;
}
function LockIcon() {
  return <View style={styles.lockIcon}><View style={styles.lockShackle} /><View style={styles.lockBody}><View style={styles.lockKey} /></View></View>;
}

export const RegisterScreen: React.FC<Props> = ({ onGoToLogin }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (!username.trim() || !email.trim() || !password) {
      Alert.alert('Data belum lengkap', 'Lengkapi username, email, dan password terlebih dahulu.');
      return;
    }
    Alert.alert('Belum terhubung', 'Tampilan Register sudah siap. Pendaftaran akun akan dihubungkan setelah API backend tersedia.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <LinearGradient colors={['#DDF3E6', '#F5F7F4']} locations={[0, 1]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={[styles.hero, { height: width * 0.37 }]}>
            <Image source={require('../assets/images/monstera.png')} style={[styles.leaves, { width: width * 0.72, height: width * 0.67 }]} resizeMode="contain" />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Daftar</Text>
            <Text style={styles.subtitle}>Buat akun baru anda</Text>

            <View style={styles.fields}>
              <View style={styles.inputBox}>
                <UserIcon />
                <TextInput value={username} onChangeText={setUsername} placeholder="Username" placeholderTextColor="#8CA1B8" autoCapitalize="none" style={styles.input} />
              </View>
              <View style={styles.inputBox}>
                <MailIcon />
                <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#8CA1B8" keyboardType="email-address" autoCapitalize="none" style={styles.input} />
              </View>
              <View style={styles.inputBox}>
                <LockIcon />
                <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#8CA1B8" secureTextEntry style={styles.input} />
              </View>
            </View>

            <Pressable style={styles.primaryButton} onPress={submit}>
              <Text style={styles.primaryButtonText}>Daftar</Text>
            </Pressable>

            <View style={styles.socialSection}>
              <Text style={styles.socialLabel}>Atau lanjutkan dengan</Text>
              <View style={styles.socialRow}>
                <Pressable style={styles.socialButton} onPress={() => Alert.alert('Belum tersedia', 'Login Google akan diaktifkan setelah integrasi autentikasi.') }>
                  <Text style={styles.gmailIcon}>M</Text>
                </Pressable>
                <Pressable style={styles.socialButton} onPress={() => Alert.alert('Belum tersedia', 'Login Google akan diaktifkan setelah integrasi autentikasi.') }>
                  <Text style={styles.googleIcon}>G</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Sudah punya akun? <Text onPress={onGoToLogin} style={styles.footerLink}>Masuk</Text></Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E7F3EA' },
  gradient: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 24 },
  hero: { width: '100%', overflow: 'hidden', position: 'relative', alignItems: 'flex-end' },
  leaves: { position: 'absolute', right: -12, top: -8 },
  content: { paddingHorizontal: '13%', flex: 1 },
  title: { color: NAVY, fontSize: 48, lineHeight: 58, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: MUTED, fontSize: 23, fontWeight: '700', marginTop: 10 },
  fields: { marginTop: 44, gap: 22 },
  inputBox: { minHeight: 65, borderRadius: 18, backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22 },
  input: { flex: 1, color: NAVY, fontSize: 17, paddingVertical: 12, marginLeft: 12 },
  primaryButton: { height: 65, borderRadius: 17, backgroundColor: NAVY, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 22 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  socialSection: { alignItems: 'center', marginTop: 98 },
  socialLabel: { color: MUTED, fontSize: 17, fontWeight: '800' },
  socialRow: { flexDirection: 'row', gap: 20, marginTop: 20 },
  socialButton: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  gmailIcon: { color: '#E45445', fontSize: 43, fontWeight: '900', lineHeight: 52 },
  googleIcon: { color: '#4285F4', fontSize: 43, fontWeight: '900' },
  footer: { marginTop: 'auto', paddingTop: 110, alignItems: 'center' },
  footerText: { color: NAVY, fontSize: 17, textAlign: 'center' },
  footerLink: { fontWeight: '800', textDecorationLine: 'underline' },
  userIcon: { width: 19, height: 21, alignItems: 'center', justifyContent: 'flex-end' },
  userHead: { width: 8, height: 8, borderRadius: 4, backgroundColor: NAVY, position: 'absolute', top: 0 },
  userBody: { width: 18, height: 10, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: NAVY },
  mailIcon: { width: 21, height: 16, borderRadius: 2, backgroundColor: NAVY, overflow: 'hidden' },
  mailFlapLeft: { position: 'absolute', width: 14, height: 2, backgroundColor: '#FFFFFF', top: 4, left: -1, transform: [{ rotate: '35deg' }] },
  mailFlapRight: { position: 'absolute', width: 14, height: 2, backgroundColor: '#FFFFFF', top: 4, right: -1, transform: [{ rotate: '-35deg' }] },
  lockIcon: { width: 20, height: 23, alignItems: 'center', justifyContent: 'flex-end' },
  lockShackle: { position: 'absolute', top: 0, width: 12, height: 12, borderWidth: 2, borderColor: NAVY, borderRadius: 7 },
  lockBody: { width: 17, height: 15, borderRadius: 7, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },
  lockKey: { width: 3, height: 6, borderRadius: 2, backgroundColor: '#FFFFFF' },
});
