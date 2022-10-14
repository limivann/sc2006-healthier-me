import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Icon, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

// screens
import {
	MainScreen,
	LoginScreen,
	HomeScreen,
	SignupScreen,
	SignupScreen1,
	SignupScreen2,
	SignupScreen3,
	ForgotPasswordScreen,
	ProfileScreen,
	ChangePasswordScreen,
	SupportScreen,
	SettingsScreen,
	VerificationCodeScreen,
	TermsAndConditionsScreen,
	PrivacyPolicyScreen,
	VerifyEmailScreen,
} from "./screens";

// setup fonts
import { useFonts } from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import customTheme from "./constants/custom-theme.json";
import { COLORS, SIZES } from "./constants";

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "transparent",
	},
};

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomePage" component={HomeScreen} />
		</Stack.Navigator>
	);
};

const ProfileNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ProfilePage" component={ProfileScreen} />
		</Stack.Navigator>
	);
};

const AddDailyNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="AddDailyPage" component={HomeScreen} />
		</Stack.Navigator>
	);
};

const NavigateNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="NavigatePage" component={HomeScreen} />
		</Stack.Navigator>
	);
};

const SettingsNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SettingsPage" component={SettingsScreen} />
			<Stack.Screen
				name="TermsAndConditionsPage"
				component={TermsAndConditionsScreen}
			/>
			<Stack.Screen name="PrivacyPolicyPage" component={PrivacyPolicyScreen} />
			<Stack.Screen name="SupportPage" component={SupportScreen} />
			<Stack.Screen
				name="ChangePasswordPage"
				component={ChangePasswordScreen}
			/>
		</Stack.Navigator>
	);
};

const App = () => {
	const [fontsLoaded] = useFonts({
		InterBold: require("./assets/fonts/Inter-Bold.ttf"),
		InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
		InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
		InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
		InterLight: require("./assets/fonts/Inter-Light.ttf"),
	});

	const [isSignedIn, setIsSignedIn] = useState(false);
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) setIsSignedIn(true);
			else {
				setIsSignedIn(false);
			}
		});
	}, [auth.currentUser]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
			<IconRegistry icons={EvaIconsPack} />
			<NavigationContainer theme={theme}>
				{!isSignedIn ? (
					<Stack.Navigator
						screenOptions={{ headerShown: false }}
						initialRouteName="MainPage"
					>
						<Stack.Group>
							<Stack.Screen name="MainPage" component={MainScreen} />
							<Stack.Screen name="LoginPage" component={LoginScreen} />
							<Stack.Screen name="SignupPage" component={SignupScreen} />
							<Stack.Screen
								name="VerifyEmailPage"
								component={VerifyEmailScreen}
							/>
							<Stack.Screen name="SignupPage1" component={SignupScreen1} />
							<Stack.Screen name="SignupPage2" component={SignupScreen2} />
							<Stack.Screen name="SignupPage3" component={SignupScreen3} />
							<Stack.Screen
								name="VerificationCodePage"
								component={VerificationCodeScreen}
							/>

							<Stack.Screen
								name="ForgotPasswordPage"
								component={ForgotPasswordScreen}
							/>
						</Stack.Group>
					</Stack.Navigator>
				) : (
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color, size }) => {
								let iconName;
								if (route.name === "Home") {
									iconName = focused ? "home" : "home-outline";
								} else if (route.name === "Profile") {
									iconName = focused ? "person" : "person-outline";
								} else if (route.name === "AddDaily") {
									iconName = focused ? "plus-square" : "plus-square-outline";
								} else if (route.name === "Navigate") {
									iconName = focused ? "compass" : "compass-outline";
								} else if (route.name === "Settings") {
									iconName = focused ? "settings-2" : "settings-2-outline";
								}
								return (
									<Icon
										name={iconName}
										fill="white"
										style={{ width: 32, height: 32 }}
									/>
								);
							},
							tabBarShowLabel: false,
							headerShown: false,
							tabBarStyle: {
								backgroundColor: COLORS.primary,
								paddingHorizontal: SIZES.extraLarge,
							},
						})}
						initialRouteName="Home"
					>
						<Tab.Screen name="Home" component={HomeNavigator} />
						<Tab.Screen name="Profile" component={ProfileNavigator} />
						<Tab.Screen name="AddDaily" component={AddDailyNavigator} />
						<Tab.Screen name="Navigate" component={NavigateNavigator} />
						<Tab.Screen name="Settings" component={SettingsNavigator} />
					</Tab.Navigator>
				)}
			</NavigationContainer>
		</ApplicationProvider>
	);
};

export default App;
