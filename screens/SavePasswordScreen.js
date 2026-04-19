import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import BackButton from '../components/BackButton';
import { safeBackTo } from '../utils/navigationSafeBack';

export default function SavePasswordScreen({ navigation }) {
  const { t } = useLanguage();
  const { resetPetStateAfterRegistration } = useApp();

  const goMain = () => {
    resetPetStateAfterRegistration();
    navigation.navigate('Main');
  };

  const handleYes = () => {
    Alert.alert('', t('savePassword'), [{ text: 'OK', onPress: goMain }]);
  };

  const handleNo = () => {
    goMain();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        <BackButton onPress={() => safeBackTo(navigation, 'SignUp')} />
        <Text style={styles.question}>{t('savePassword')}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleYes}>
          <Text style={styles.primaryButtonText}>{t('yes')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleNo}>
          <Text style={styles.secondaryButtonText}>{t('no')}</Text>
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
    paddingTop: 48,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  primaryButton: {
    paddingVertical: 14,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButton: {
    paddingVertical: 14,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2563eb',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2563eb',
  },
});
