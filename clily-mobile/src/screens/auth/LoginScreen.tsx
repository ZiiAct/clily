import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, type TextInput } from 'react-native';

import UserIcon from '../../assets/icons/user.svg';
import LockIcon from '../../assets/icons/lock.svg';
import { AuthBackground } from '../../components/auth/AuthBackground';
import { AuthScreen } from '../../components/auth/AuthScreen';
import { AuthSubtitle, AuthTitle, FooterLink } from '../../components/auth/AuthText';
import { MonsteraDecoration } from '../../components/auth/MonsteraDecoration';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { TextField } from '../../components/TextField';
import { useAuthStore } from '../../store/authStore';
import { colors, fonts, fontSizes } from '../../theme/tokens';
import { validateRequired } from '../../utils/validation';

type Props = {
  onGoToRegister: () => void;
  onForgotPassword: () => void;
  onLoginSuccess: () => void;
};

type Errors = { username?: string; password?: string };

/** Masuk (Figma: "login"). Mock auth: any username + password signs in. */
export function LoginScreen({ onGoToRegister, onForgotPassword, onLoginSuccess }: Props) {
  const login = useAuthStore((s) => s.login);
  const passwordRef = useRef<TextInput>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next: Errors = {
      username: validateRequired(username, 'Username'),
      password: validateRequired(password, 'Password'),
    };
    setErrors(next);
    if (next.username || next.password) return;

    setLoading(true);
    try {
      await login(username.trim(), password);
      onLoginSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      statusBar="light"
      contentTop={276}
      background={
        <>
          <AuthBackground variant="login" />
          <MonsteraDecoration variant="login" />
        </>
      }
      footer={
        <>
          <Button label="Masuk" onPress={submit} loading={loading} />
          <FooterLink prompt="Belum punya akun?" action="Daftar" onPress={onGoToRegister} />
        </>
      }
    >
      <AuthTitle>Selamat Datang Kembali!</AuthTitle>
      <AuthSubtitle style={styles.subtitle}>Masuk ke akun anda</AuthSubtitle>

      <TextField
        icon={<UserIcon width={15.5556} height={16} />}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        error={errors.username}
        autoCapitalize="none"
        autoComplete="username"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        style={styles.firstField}
      />
      <TextField
        ref={passwordRef}
        icon={<LockIcon width={14} height={19} />}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secureTextEntry
        autoComplete="password"
        returnKeyType="go"
        onSubmitEditing={submit}
        style={styles.field}
      />

      <View style={styles.optionsRow}>
        <Checkbox checked={remember} onChange={setRemember} label="Ingat saya" />
        <Pressable onPress={onForgotPassword} accessibilityRole="link" hitSlop={10}>
          <Text style={styles.forgot}>Lupa Password?</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 16,
  },
  firstField: {
    marginTop: 46,
  },
  field: {
    marginTop: 19,
  },
  optionsRow: {
    marginTop: 7,
    marginLeft: -4, // the checkbox touch target starts 4px left of the fields in Figma
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgot: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: fontSizes.small,
    textDecorationLine: 'underline',
  },
});
