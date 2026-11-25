import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import EnvelopeOpen from '../../assets/illustrations/envelope-open.svg';
import ChatBubble from '../../assets/illustrations/chat-bubble.svg';
import { AuthBackground } from '../../components/auth/AuthBackground';
import { IllustrationCircle } from '../../components/auth/AuthIllustration';
import { AuthScreen } from '../../components/auth/AuthScreen';
import { AuthDescription, AuthTitle } from '../../components/auth/AuthText';
import { Button } from '../../components/Button';
import { CodeInput } from '../../components/CodeInput';
import { ResendCountdown } from '../../components/ResendCountdown';
import { VerifiedDialog } from '../../components/VerifiedDialog';
import { colors, fonts, fontSizes } from '../../theme/tokens';
import type { VerifyMethod } from './ForgotMethodScreen';

const CODE_LENGTH = 4;

const COPY: Record<VerifyMethod, { title: string; description: string; verified: string }> = {
  email: {
    title: 'Verifikasi Email Anda',
    description: 'Mohon masukkan kode 4 digit yang telah kami kirimkan ke email Anda.',
    verified: 'Email terverifikasi',
  },
  sms: {
    title: 'Verifikasi SMS Anda',
    description: 'Mohon masukkan kode 4 digit dalam SMS yang telah kami kirimkan ke nomor telepon Anda.',
    verified: 'SMS terverifikasi',
  },
};

type Props = {
  method: VerifyMethod;
  onVerified: () => void;
};

/**
 * Lupa Password, step 3 (Figma: "FORGOT PASS 3" for email, "FORGOT PASS 4" for SMS).
 * Mock: any 4-digit code is accepted.
 */
export function VerifyCodeScreen({ method, onVerified }: Props) {
  const copy = COPY[method];
  const [code, setCode] = useState('');
  const [error, setError] = useState<string>();
  const [verified, setVerified] = useState(false);

  const submit = () => {
    if (code.length < CODE_LENGTH) {
      setError(`Masukkan ${CODE_LENGTH} digit kode verifikasi.`);
      return;
    }
    setError(undefined);
    setVerified(true);
  };

  const resend = () => {
    setCode('');
    Alert.alert('Kode dikirim ulang', method === 'email' ? 'Cek kotak masuk email Anda.' : 'Cek SMS di ponsel Anda.');
  };

  return (
    <AuthScreen
      statusBar="light"
      contentTop={108}
      background={<AuthBackground variant={method === 'email' ? 'verifyEmail' : 'verify'} />}
      footer={<Button label="Selanjutnya" onPress={submit} style={styles.footerButton} />}
    >
      <AuthTitle center style={styles.title}>
        {copy.title}
      </AuthTitle>

      <IllustrationCircle style={styles.circle}>
        {method === 'email' ? (
          <View style={styles.envelope}>
            <EnvelopeOpen width={122.029} height={106.823} />
          </View>
        ) : (
          <View style={styles.chat}>
            <ChatBubble width={146} height={107.107} />
          </View>
        )}
      </IllustrationCircle>

      <AuthDescription style={styles.description}>{copy.description}</AuthDescription>

      <View style={styles.code}>
        <CodeInput value={code} onChange={setCode} length={CODE_LENGTH} />
      </View>
      {!!error && (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}

      <AuthDescription center style={styles.noCode}>
        Tidak menerima kode?
      </AuthDescription>
      <View style={styles.resend}>
        <ResendCountdown onResend={resend} />
      </View>

      <VerifiedDialog visible={verified} message={copy.verified} onDone={onVerified} />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.verifyTitle,
    marginHorizontal: -20, // "Verifikasi Email Anda" is wider than the 330px form
  },
  circle: {
    marginTop: 27,
  },
  envelope: {
    position: 'absolute',
    left: 48.5,
    top: 53,
  },
  chat: {
    position: 'absolute',
    left: 41.5,
    top: 54,
  },
  description: {
    marginTop: 26,
    marginHorizontal: -8.5,
  },
  code: {
    marginTop: 26,
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.error,
    fontFamily: fonts.medium,
    fontSize: fontSizes.small,
  },
  noCode: {
    marginTop: 26,
  },
  resend: {
    marginTop: 7,
    alignItems: 'center',
  },
  footerButton: {
    marginBottom: 24, // no link under the button on these screens
  },
});
