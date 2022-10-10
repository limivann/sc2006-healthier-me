import { createContext, useState, useMemo } from "react";
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
	SettingsScreen,
	ProfileScreen,
	VerificationCodeScreen,
	TermsAndConditionsScreen,
	PrivacyPolicyScreen,
} from "./screens";

// setup fonts
import { useFonts } from "expo-font";

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

	if (!fontsLoaded) {
		return null;
	}

	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<IconRegistry icons={EvaIconsPack} />
			<NavigationContainer theme={theme}>
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName="LoginPage"
				>
					<Stack.Group>
						<Stack.Screen name="LoginPage" component={LoginScreen} />
						<Stack.Screen name="MainPage" component={MainScreen} />
						<Stack.Screen
							name="VerificationCodePage"
							component={VerificationCodeScreen}
						/>

						<Stack.Screen
							name="TermsAndConditions"
							component={TermsAndConditionsScreen}
						/>
						<Stack.Screen
							name="PrivacyPolicyScreen"
							component={PrivacyPolicyScreen}
						/>

						<Stack.Screen name="SettingsPage" component={SettingsScreen} />
						<Stack.Screen name="ProfilePage" component={ProfileScreen} />
						<Stack.Screen name="SignupPage" component={SignupScreen} />
						<Stack.Screen name="SignupPage1" component={SignupScreen1} />
						<Stack.Screen name="SignupPage2" component={SignupScreen2} />
						<Stack.Screen name="SignupPage3" component={SignupScreen3} />

						<Stack.Screen
							name="ForgotPasswordPage"
							component={ForgotPasswordScreen}
						/>
					</Stack.Group>

					<Stack.Group>
						<Stack.Screen name="HomePage" component={HomeScreen} />
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
		</ApplicationProvider>
	);
};

export default App;
