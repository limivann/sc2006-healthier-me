import { createContext, useState, useMemo } from "react";
import { app } from "./firebase/firebase-config";
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
	SignupScreen1,
	SignupScreen2,
	SignupScreen3,
	ForgotPasswordScreen,
	ProfileScreen

} from "./screens";

// setup fonts
import { useFonts } from "expo-font";

const AppContext = createContext();

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "transparent",
	},
};

const App = () => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const appContextValue = useMemo(
		() => ({
			isSignedIn,
			setIsSignedIn,
		}),
		[isSignedIn]
	);

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
		<AppContext.Provider value={appContextValue}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light}>
				<NavigationContainer theme={theme}>
					<Stack.Navigator
						screenOptions={{ headerShown: false }}
						initialRouteName="HomePage"
					>
						{!isSignedIn ? (
							<Stack.Group>
								<Stack.Screen name="ProfilePage" component={ProfileScreen} />
								<Stack.Screen name="MainPage" component={MainScreen} />
								
								<Stack.Screen name="LoginPage" component={LoginScreen} />
								<Stack.Screen name="SignupPage1" component={SignupScreen1} />
								<Stack.Screen name="SignupPage2" component={SignupScreen2} />
								<Stack.Screen name="SignupPage3" component={SignupScreen3} />
								
								
								<Stack.Screen
									name="ForgotPasswordPage"
									component={ForgotPasswordScreen}
								/>
							</Stack.Group>
						) : (
							// whatever screens if user is logged in
							<Stack.Group>
								<Stack.Screen name="HomePage" component={HomeScreen} />
							</Stack.Group>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</ApplicationProvider>
		</AppContext.Provider>
	);
};

export default App;
