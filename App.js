import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { app } from "./firebase/firebase-config";

export default function App() {
	console.log(app);
	return (
		<View style={styles.container}>
			<Text>Hello world</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
