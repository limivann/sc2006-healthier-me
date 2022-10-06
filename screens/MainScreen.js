import { StatusBar } from "expo-status-bar";
import { Text, Button, Layout } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { assets, COLORS, FONTS, SIZES } from "../constants";

const MainScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Layout style={styles.image}>
				<Image source={require("../assets/images/welcomeImg.png")} />
			</Layout>

			<StatusBar style="auto" />

			<Layout style={{ width: "80%" }}>
				<Layout style={{ width: "100%" }}>
					<Button
						status="success"
						style={{
							marginBottom: 10,
							backgroundColor: COLORS.primary,
							borderRadius: SIZES.font,
						}}
						onPress={() => navigation.navigate("SignupPage1")}
					>
						Sign Up
					</Button>
				</Layout>

				<Layout style={{ paddingTop: 0, width: "100%" }}>
					<Button
						status="success"
						style={{
							marginBottom: SIZES.extraLarge,
							backgroundColor: COLORS.primary,
							borderRadius: SIZES.font,
						}}
						onPress={() => navigation.navigate("LoginPage")}
					>
						Login
					</Button>
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
	/* 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  signup_button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
    backgroundColor: "#A2F789",
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#A2F789",
  },
  */
});

export default MainScreen;
