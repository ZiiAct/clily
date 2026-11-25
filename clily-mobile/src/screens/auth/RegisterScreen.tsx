import React, { useRef, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, View, type TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import UserIcon from '../../assets/icons/user.svg';
import MailIcon from '../../assets/icons/mail.svg';
import LockIcon from '../../assets/icons/lock.svg';
import { AuthScreen } from '../../components/auth/AuthScreen';
import { AuthSubtitle, AuthTitle, FooterLink } from '../../components/auth/AuthText';
import { MonsteraDecoration } from '../../components/auth/MonsteraDecoration';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { useAuthStore } from '../../store/authStore';
import { colors, fontSizes, gradients } from '../../theme/tokens';
import { validateEmail, validatePassword, validateRequired } from '../../utils/validation';

const GMAIL = require('../../assets/images/gmail.png');
const GOOGLE = require('../../assets/images/google.png');

type Props = {
  onGoToLogin: () => void;
  onRegisterSuccess: () => void;
};

type Errors = { username?: string; email?: string; password?: string };

/** Daftar (Figma: "sign in"). Validation: required username, valid email, password ≥ 8. */
export function RegisterScreen({ onGoToLogin, onRegisterSuccess }: Props) {
  const register = useAuthStore((s) => s.register);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next: Errors = {
      username: validateRequired(username, 'Username'),
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(next);
    if (next.username || next.email || next.password) return;

    setLoading(true);
    try {
      await register({ username: username.trim(), email: email.trim(), password });
      onRegisterSuccess();
    } finally {
      setLoading(false);
    }
  };

  // Social sign-in needs the backend (POST /auth/google), so it is a placeholder for now.
  const socialNotReady = () =>
    Alert.alert('Segera hadir', 'Daftar dengan akun Google akan tersedia setelah backend terhubung.');

  return (
    <AuthScreen
      statusBar="dark"
      contentTop={140}
      background={
        <>
          <LinearGradient
            colors={gradients.register}
            locations={[0, 0.5, 1]}
            style={StyleSheet.absoluteFill}
          />
          <MonsteraDecoration variant="register" />
        </>
      }
      footer={<FooterLink prompt="Sudah punya akun?" action="Masuk" onPress={onGoToLogin} />}
    >
      <AuthTitle>Daftar</AuthTitle>
      <AuthSubtitle style={styles.subtitle}>Buat akun baru anda</AuthSubtitle>

      <TextField
        icon={<UserIcon width={15.5556} height={16} />}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        error={errors.username}
        autoCapitalize="none"
        autoComplete="username-new"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        style={styles.firstField}
      />
      <TextField
        ref={emailRef}
        icon={<MailIcon width={18} height={12} />}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        style={styles.field}
      />
      <TextField
        ref={passwordRef}
        icon={<LockIcon width={14} height={19} />}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secureTextEntry
        autoComplete="password-new"
        returnKeyType="go"
        onSubmitEditing={submit}
        style={styles.field}
      />

      <Button label="Daftar" onPress={submit} loading={loading} style={styles.field} />

      <AuthSubtitle center style={styles.orLabel}>
        Atau lanjutkan dengan
      </AuthSubtitle>
      <View style={styles.socialRow}>
        <Pressable
          onPress={socialNotReady}
          accessibilityRole="button"
          accessibilityLabel="Lanjutkan dengan Gmail"
          style={styles.socialButton}
        >
          <Image source={GMAIL} style={styles.gmail} />
        </Pressable>
        <Pressable
          onPress={socialNotReady}
          accessibilityRole="button"
          accessibilityLabel="Lanjutkan dengan Google"
          style={[styles.socialButton, styles.googleButton]}
        >
          <Image source={GOOGLE} style={styles.google} />
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 13,
  },
  firstField: {
    marginTop: 39,
  },
  field: {
    marginTop: 19,
  },
  orLabel: {
    marginTop: 83,
    fontSize: fontSizes.input,
  },
  socialRow: {
    marginTop: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
  },
  socialButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    width: 64,
  },
  gmail: {
    width: 40,
    height: 41,
  },
  google: {
    width: 48,
    height: 48,
  },
});
