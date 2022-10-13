import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
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
} from "./screens";

// setup fonts
import { useFonts } from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import customTheme from "./constants/custom-theme.json";

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "transparent",
	},
};

const App = () => {
	const [fontsLoaded] = useFonts({
		InterBold: require("./assets/fonts/Inter-Bold.ttf"),
		InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
		InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
		InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
		InterLight: require("./assets/fonts/Inter-Light.ttf"),
	});

	const [isSignedIn, setIsSignedIn] = useState(true);
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
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName="MainPage"
				>
					{!isSignedIn ? (
						<Stack.Group>
							<Stack.Screen name="MainPage" component={MainScreen} />
							<Stack.Screen name="LoginPage" component={LoginScreen} />
							<Stack.Screen name="SignupPage" component={SignupScreen} />
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
					) : (
						<Stack.Group>
							<Stack.Screen name="HomePage" component={HomeScreen} />
							<Stack.Screen name="SettingsPage" component={SettingsScreen} />
							<Stack.Screen name="ProfilePage" component={ProfileScreen} />
							<Stack.Screen
								name="TermsAndConditionsPage"
								component={TermsAndConditionsScreen}
							/>
							<Stack.Screen
								name="PrivacyPolicyPage"
								component={PrivacyPolicyScreen}
							/>
							<Stack.Screen name="SupportPage" component={SupportScreen} />
							<Stack.Screen
								name="ChangePasswordPage"
								component={ChangePasswordScreen}
							/>
						</Stack.Group>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</ApplicationProvider>
	);
};

export default App;
