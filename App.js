import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SavePasswordScreen from './screens/SavePasswordScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import AlgebraMenuScreen from './screens/AlgebraMenuScreen';
import SolveSectionScreen from './screens/solve/SolveSectionScreen';
import AlgebraTopicsScreen from './screens/solve/AlgebraTopicsScreen';
import LessonScreen from './screens/solve/LessonScreen';
import TopicProblemScreen from './screens/solve/TopicProblemScreen';
import OlympiadListScreen from './screens/olympiad/OlympiadListScreen';
import OlympiadSessionScreen from './screens/olympiad/OlympiadSessionScreen';
import OlympiadProblemScreen from './screens/olympiad/OlympiadProblemScreen';
import OlympiadResultsScreen from './screens/olympiad/OlympiadResultsScreen';
import PetEntryScreen from './screens/pet/PetEntryScreen';
import PetKindScreen from './screens/pet/PetKindScreen';
import PetSpeciesScreen from './screens/pet/PetSpeciesScreen';
import PetHubScreen from './screens/pet/PetHubScreen';
import PetShopScreen from './screens/pet/PetShopScreen';
import PetAnimalFoodScreen from './screens/pet/PetAnimalFoodScreen';
import PetPlantShopScreen from './screens/pet/PetPlantShopScreen';
import KitchenScreen from './screens/pet/KitchenScreen';
import PlantCareScreen from './screens/pet/PlantCareScreen';
import PetFlappyScreen from './screens/pet/PetFlappyScreen';
import ProgressScreen from './screens/ProgressScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { ready } = useApp();
  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SavePassword" component={SavePasswordScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="AlgebraMenu" component={AlgebraMenuScreen} />
        <Stack.Screen name="SolveSection" component={SolveSectionScreen} />
        <Stack.Screen name="AlgebraTopics" component={AlgebraTopicsScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="TopicProblem" component={TopicProblemScreen} />
        <Stack.Screen name="OlympiadList" component={OlympiadListScreen} />
        <Stack.Screen name="OlympiadSession" component={OlympiadSessionScreen} />
        <Stack.Screen name="OlympiadProblem" component={OlympiadProblemScreen} />
        <Stack.Screen name="OlympiadResults" component={OlympiadResultsScreen} />
        <Stack.Screen name="Pet" component={PetEntryScreen} />
        <Stack.Screen name="PetKind" component={PetKindScreen} />
        <Stack.Screen name="PetSpecies" component={PetSpeciesScreen} />
        <Stack.Screen name="PetHub" component={PetHubScreen} />
        <Stack.Screen name="PetShop" component={PetShopScreen} />
        <Stack.Screen name="PetAnimalFood" component={PetAnimalFoodScreen} />
        <Stack.Screen name="PetPlantShop" component={PetPlantShopScreen} />
        <Stack.Screen name="Kitchen" component={KitchenScreen} />
        <Stack.Screen name="PlantCare" component={PlantCareScreen} />
        <Stack.Screen name="PetFlappy" component={PetFlappyScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppNavigation />
      </AppProvider>
    </LanguageProvider>
  );
}
