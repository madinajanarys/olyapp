import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import BackButton from '../components/BackButton';
import { safeBackTo } from '../utils/navigationSafeBack';
import { isValidEmailOrPhone, isValidPassword } from '../utils/contactValidation';

export default function SignUpScreen({ navigation }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /** false = пароль скрыт (точки), true = виден текст */
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleContinue = () => {
    const login = email.trim();
    const pass = password.trim();
    if (!login || !pass) {
      Alert.alert(t('signUpErrorTitle'), t('signUpErrorEmpty'));
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert(t('signUpErrorTitle'), t('signUpErrorPasswordShort'));
      return;
    }
    if (!isValidEmailOrPhone(login)) {
      Alert.alert(t('signUpErrorTitle'), t('signUpErrorInvalidContact'));
      return;
    }
    navigation.navigate('SavePassword');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <BackButton onPress={() => safeBackTo(navigation, 'Welcome')} />
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder={t('emailPlaceholder')}
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.box}>
          <View style={styles.passwordRow}>
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setPasswordVisible((v) => !v)}
              hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
            >
              <Ionicons
                name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
            <TextInput
              style={styles.inputPassword}
              placeholder={t('passwordPlaceholder')}
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>{t('continue')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  eyeBtn: {
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 16,
    paddingVertical: 14,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
});
