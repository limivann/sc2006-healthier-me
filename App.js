import {
	createContext,
	useState,
	useMemo,
	useEffect,
	useCallback,
} from "react";
import { app } from "./firebase/firebase-config";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import {
	ApplicationProvider,
	IconRegistry,
	Divider,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

// screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

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
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						{!isSignedIn ? (
							<Stack.Screen name="Login" component={LoginScreen} />
						) : (
							// whatever screens if user is logged in
							<Stack.Screen name="Home" component={HomeScreen} />
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</ApplicationProvider>
		</AppContext.Provider>
	);
};

export default App;
