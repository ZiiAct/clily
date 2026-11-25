import React, { useRef, useState } from 'react';
import { StyleSheet, View, type TextInput } from 'react-native';

import LockLarge from '../../assets/illustrations/lock-large.svg';
import { AuthBackground } from '../../components/auth/AuthBackground';
import { IllustrationCircle, LockBadge } from '../../components/auth/AuthIllustration';
import { AuthScreen } from '../../components/auth/AuthScreen';
import { AuthTitle } from '../../components/auth/AuthText';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { fontSizes } from '../../theme/tokens';
import { validatePassword, validatePasswordMatch } from '../../utils/validation';

type Props = {
  onDone: () => void;
};

type Errors = { password?: string; confirmation?: string };

/** Lupa Password, step 4 (Figma: "FORGOT PASS 5"). */
export function ResetPasswordScreen({ onDone }: Props) {
  const confirmRef = useRef<TextInput>(null);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next: Errors = {
      password: validatePassword(password),
      confirmation: validatePasswordMatch(password, confirmation),
    };
    setErrors(next);
    if (next.password || next.confirmation) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600)); // mock request
    setLoading(false);
    onDone();
  };

  return (
    <AuthScreen
      statusBar="light"
      contentTop={108}
      background={<AuthBackground variant="verify" />}
      footer={<Button label="Atur ulang password" onPress={submit} loading={loading} style={styles.footerButton} />}
    >
      <AuthTitle center style={styles.title}>
        Buat Password Baru
      </AuthTitle>

      <IllustrationCircle style={styles.circle}>
        <View style={styles.lock}>
          <LockLarge width={101} height={137} />
        </View>
        <LockBadge kind="check" style={styles.badge} />
      </IllustrationCircle>

      <TextField
        label="Masukkan password baru"
        placeholder="Masukkan minimal 8-12 karakter"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secureTextEntry
        autoComplete="password-new"
        returnKeyType="next"
        onSubmitEditing={() => confirmRef.current?.focus()}
        style={styles.firstField}
      />
      <TextField
        ref={confirmRef}
        label="Konfirmasi password baru"
        placeholder="Masukkan minimal 8-12 karakter"
        value={confirmation}
        onChangeText={setConfirmation}
        error={errors.confirmation}
        secureTextEntry
        autoComplete="password-new"
        returnKeyType="go"
        onSubmitEditing={submit}
        style={styles.field}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.verifyTitle,
    marginHorizontal: -20,
  },
  circle: {
    marginTop: 27,
  },
  lock: {
    position: 'absolute',
    left: 58,
    top: 40,
  },
  badge: {
    left: 132.5,
    top: 132,
  },
  firstField: {
    marginTop: 26,
  },
  field: {
    marginTop: 9,
  },
  footerButton: {
    marginBottom: 24,
  },
});
