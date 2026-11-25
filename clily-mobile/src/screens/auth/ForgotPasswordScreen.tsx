import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import UserIcon from '../../assets/icons/user.svg';
import LockLarge from '../../assets/illustrations/lock-large.svg';
import { AuthBackground } from '../../components/auth/AuthBackground';
import { LockBadge } from '../../components/auth/AuthIllustration';
import { AuthScreen } from '../../components/auth/AuthScreen';
import { AuthSubtitle, AuthTitle, FooterLink } from '../../components/auth/AuthText';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import { validateRequired } from '../../utils/validation';

type Props = {
  onNext: (identifier: string) => void;
  onBackToLogin: () => void;
};

/** Lupa Password, step 1 (Figma: "FORGOT PASS"). */
export function ForgotPasswordScreen({ onNext, onBackToLogin }: Props) {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string>();

  const submit = () => {
    const message = validateRequired(identifier, 'Username/email');
    setError(message);
    if (!message) onNext(identifier.trim());
  };

  return (
    <AuthScreen
      statusBar="light"
      contentTop={251}
      background={<AuthBackground variant="forgot" />}
      footer={
        <>
          <Button label="Selanjutnya" onPress={submit} />
          <FooterLink prompt="Ingat akun? Kembali" action="Masuk" onPress={onBackToLogin} />
        </>
      }
    >
      <View style={styles.lock}>
        <LockLarge width={101} height={137} />
        <LockBadge kind="question" style={styles.badge} />
      </View>

      <AuthTitle center style={styles.title}>
        Lupa Password
      </AuthTitle>
      <AuthSubtitle center>Masukan username/email anda</AuthSubtitle>

      <TextField
        icon={<UserIcon width={15.5556} height={16} />}
        placeholder="Username/email"
        value={identifier}
        onChangeText={setIdentifier}
        error={error}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={submit}
        style={styles.field}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  lock: {
    width: 101,
    height: 137,
    alignSelf: 'center',
  },
  badge: {
    left: 76.5,
    top: 100,
  },
  title: {
    marginTop: 10,
  },
  field: {
    marginTop: 37,
  },
});
