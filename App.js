import { createContext, useState, useMemo } from "react";
import { app } from "./firebase/firebase-config";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// SCREENS
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

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
	return (
		<AppContext.Provider value={appContextValue}>
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
		</AppContext.Provider>
	);
};

export default App;
