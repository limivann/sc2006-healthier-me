import { StatusBar } from "expo-status-bar";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { COLORS } from "../constants";
import { CustomButton } from "../components";

const MainScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Layout style={styles.image}>
				<Image source={require("../assets/images/welcomeImg.png")} />
			</Layout>

			<StatusBar style="auto" />

			<Layout style={{ width: "80%" }}>
				<Layout style={{ width: "100%" }}>
					<CustomButton
						text={"Sign up"}
						backgroundColor={COLORS.primary}
						onPress={() => navigation.navigate("SignupPage")}
					/>
				</Layout>

				<Layout style={{ paddingTop: 0, width: "100%" }}>
					<CustomButton
						text={"Login"}
						backgroundColor={COLORS.primary}
						onPress={() => navigation.navigate("LoginPage")}
					/>
				</Layout>
			</Layout>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 36,
	},
	image: {
		marginBottom: 200,
		paddingTop: 100,
	},
});

export default MainScreen;
