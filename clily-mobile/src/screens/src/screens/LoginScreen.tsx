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

type Props = { onGoToRegister: () => void };

const NAVY = '#214675';
const MUTED = '#829EB0';

function UserIcon() {
  return <View style={styles.userIcon}><View style={styles.userHead} /><View style={styles.userBody} /></View>;
}
function LockIcon() {
  return <View style={styles.lockIcon}><View style={styles.lockShackle} /><View style={styles.lockBody}><View style={styles.lockKey} /></View></View>;
}

export const LoginScreen: React.FC<Props> = ({ onGoToRegister }) => {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const submit = () => {
    if (!username.trim() || !password) {
      Alert.alert('Data belum lengkap', 'Masukkan username dan password terlebih dahulu.');
      return;
    }
    Alert.alert('Belum terhubung', 'Tampilan Login sudah siap. Autentikasi akan dihubungkan setelah API backend tersedia.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <LinearGradient colors={['#DDF3E6', '#F5F7F4']} locations={[0, 1]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={[styles.hero, { height: width * 0.64 }]}>
            <View style={[styles.navyCircle, { width: width * 0.98, height: width * 0.98, borderRadius: width * 0.49, right: -width * 0.18, top: -width * 0.43 }]} />
            <View style={[styles.greenCircle, { width: width * 0.46, height: width * 0.46, borderRadius: width * 0.23, right: width * 0.18, top: -width * 0.25 }]} />
            <Image source={require('../assets/images/monstera.png')} style={[styles.loginLeaves, { width: width * 0.82, height: width * 0.76 }]} resizeMode="contain" />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Selamat Datang{'\n'}Kembali!</Text>
            <Text style={styles.subtitle}>Masuk ke akun anda</Text>

            <View style={styles.fields}>
              <View style={styles.inputBox}>
                <UserIcon />
                <TextInput value={username} onChangeText={setUsername} placeholder="Username" placeholderTextColor="#8CA1B8" autoCapitalize="none" style={styles.input} />
              </View>
              <View style={styles.inputBox}>
                <LockIcon />
                <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#8CA1B8" secureTextEntry style={styles.input} />
              </View>
            </View>

            <View style={styles.options}>
              <Pressable style={styles.rememberWrap} onPress={() => setRemember(!remember)}>
                <View style={[styles.checkbox, remember && styles.checkboxChecked]}>{remember ? <Text style={styles.checkmark}>✓</Text> : null}</View>
                <Text style={styles.optionText}>Ingat saya</Text>
              </Pressable>
              <Pressable onPress={() => Alert.alert('Lupa Password?', 'Fitur ini akan tersedia setelah backend autentikasi dibuat.')}>
                <Text style={styles.linkSmall}>Lupa Password?</Text>
              </Pressable>
            </View>

            <View style={styles.bottom}>
              <Pressable style={styles.primaryButton} onPress={submit}>
                <Text style={styles.primaryButtonText}>Masuk</Text>
              </Pressable>
              <Text style={styles.footerText}>Belum punya akun? <Text onPress={onGoToRegister} style={styles.footerLink}>Daftar</Text></Text>
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
  scroll: { flexGrow: 1, paddingBottom: 22 },
  hero: { width: '100%', overflow: 'hidden', position: 'relative' },
  navyCircle: { position: 'absolute', backgroundColor: '#214675' },
  greenCircle: { position: 'absolute', backgroundColor: '#83C39C' },
  loginLeaves: { position: 'absolute', left: -widthSafe(0.06), top: widthSafe(0.02) },
  content: { paddingHorizontal: '13%', flex: 1 },
  title: { color: NAVY, fontSize:  thirty(8), lineHeight: thirty(11), fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: MUTED, fontSize: 18, fontWeight: '700', marginTop: 22 },
  fields: { marginTop: 52, gap: 22 },
  inputBox: { minHeight: 65, borderRadius: 18, backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22 },
  input: { flex: 1, color: NAVY, fontSize: 17, paddingVertical: 12, marginLeft: 12 },
  options: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  rememberWrap: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkbox: { width: 21, height: 21, borderWidth: 2.5, borderColor: NAVY, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: NAVY },
  checkmark: { color: 'white', fontSize: 14, fontWeight: '800', lineHeight: 16 },
  optionText: { color: NAVY, fontSize: 13 },
  linkSmall: { color: NAVY, fontSize: 13, fontWeight: '800', textDecorationLine: 'underline' },
  bottom: { marginTop: 'auto', paddingTop: 150, alignItems: 'center' },
  primaryButton: { height: 65, borderRadius: 17, backgroundColor: NAVY, width: '100%', alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  footerText: { color: NAVY, fontSize: 17, marginTop: 8, textAlign: 'center' },
  footerLink: { fontWeight: '800', textDecorationLine: 'underline' },
  userIcon: { width: 19, height: 21, alignItems: 'center', justifyContent: 'flex-end' },
  userHead: { width: 8, height: 8, borderRadius: 4, backgroundColor: NAVY, position: 'absolute', top: 0 },
  userBody: { width: 18, height: 10, borderTopLeftRadius: 9, borderTopRightRadius: 9, backgroundColor: NAVY },
  lockIcon: { width: 20, height: 23, alignItems: 'center', justifyContent: 'flex-end' },
  lockShackle: { position: 'absolute', top: 0, width: 12, height: 12, borderWidth: 2, borderColor: NAVY, borderRadius: 7 },
  lockBody: { width: 17, height: 15, borderRadius: 7, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },
  lockKey: { width: 3, height: 6, borderRadius: 2, backgroundColor: '#FFFFFF' },
});

function widthSafe(factor: number) { return factor * 390; }
function thirty(extra: number) { return 38 + extra; }
