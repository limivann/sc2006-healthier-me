import { StatusBar } from "expo-status-bar";
import { Text, Button, Layout, Input } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { assets, COLORS, FONTS, SIZES, SHADOWS } from "../constants";

const ProfileScreen = ({ navigation }) => {
	const [height, setHeight] = useState("");
	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
			<Image
				style={styles.avatar}
				source={require("../assets/icons/avatar.png")}
			/>
			<View style={styles.headerContent}>
				<Text style={styles.name}>John Doe </Text>
				<Text style={styles.userInfo}>johndoe@gmail.com </Text>
				<Text style={styles.userInfo}>Singapore</Text>
			</View>

			<View
				style={[
					styles.container,
					{
						flexDirection: "row",
						alignContent: "space-between",
						justifyContent: "center",
						alignItems: "center",
					},
				]}
			>
				<View style={[styles.row, { flexDirection: "column" }]}>
					<View style={[styles.boxLabel]}>
						<Layout style={{ marginBottom: SIZES.base, padding: 30 }}>
							<Text
								style={{
									paddingLeft: SIZES.large,
									paddingTop: SIZES.base,
									color: COLORS.gray,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							>
								Height
							</Text>

							<Input
								placeholder="165cm"
								autoCompleteType="165cm "
								value={height}
								onChangeText={nextValue => setHeight(nextValue)}
								style={{
									borderRadius: SIZES.base,
									...SHADOWS.light,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							/>
						</Layout>
					</View>

					<View style={[styles.boxLabel]}>
						<Layout style={{ marginBottom: SIZES.base, padding: 30 }}>
							<Text
								style={{
									paddingLeft: SIZES.large,
									paddingTop: SIZES.base,
									color: COLORS.gray,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							>
								Age
							</Text>

							<Input
								placeholder="21"
								autoCompleteType="21"
								value={height}
								onChangeText={nextValue => setHeight(nextValue)}
								style={{
									borderRadius: SIZES.base,
									...SHADOWS.light,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							/>
						</Layout>
					</View>
				</View>
				<View style={[styles.row, { flexDirection: "column" }]}>
					<View style={[styles.boxLabel]}>
						<Layout
							style={{ marginBottom: SIZES.base, padding: 30, paddingLeft: 10 }}
						>
							<Text
								style={{
									paddingLeft: SIZES.large,
									paddingTop: SIZES.base,
									color: COLORS.gray,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							>
								Weight
							</Text>

							<Input
								placeholder="52 kg"
								autoCompleteType="52 kg"
								value={height}
								onChangeText={nextValue => setHeight(nextValue)}
								style={{
									borderRadius: SIZES.base,
									...SHADOWS.light,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							/>
						</Layout>
					</View>

					<View style={[styles.boxLabel]}>
						<Layout
							style={{ marginBottom: SIZES.base, padding: 30, paddingLeft: 10 }}
						>
							<Text
								style={{
									paddingLeft: SIZES.large,
									paddingTop: SIZES.base,
									color: COLORS.gray,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							>
								BMI
							</Text>

							<Input
								placeholder="20.0"
								autoCompleteType="20.0"
								value={height}
								onChangeText={nextValue => setHeight(nextValue)}
								style={{
									borderRadius: SIZES.base,
									...SHADOWS.light,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							/>
						</Layout>
					</View>
				</View>
			</View>

			<View style={[styles.boxLabel]}>
				<Layout style={{ marginBottom: SIZES.base, padding: 30 }}>
					<Text
						style={{
							paddingLeft: SIZES.large,
							paddingTop: SIZES.base,
							color: COLORS.gray,
							fontFamily: FONTS.regular,
							fontSize: SIZES.font,
						}}
					>
						Email
					</Text>

					<Input
						placeholder="johndoe@example.com"
						autoCompleteType="johndoe@example.com "
						value={height}
						onChangeText={nextValue => setHeight(nextValue)}
						style={{
							borderRadius: SIZES.base,
							...SHADOWS.light,
							fontFamily: FONTS.regular,
							fontSize: SIZES.font,
						}}
					/>
				</Layout>
			</View>

			<View style={[styles.boxLabel]}>
				<Layout style={{ marginBottom: SIZES.base, padding: 30 }}>
					<Text
						style={{
							paddingLeft: SIZES.large,
							paddingTop: SIZES.base,
							color: COLORS.gray,
							fontFamily: FONTS.regular,
							fontSize: SIZES.font,
						}}
					>
						Activity Level
					</Text>

					<Input
						placeholder="Not Very Active"
						autoCompleteType="Not Very Active"
						value={height}
						onChangeText={nextValue => setHeight(nextValue)}
						style={{
							borderRadius: SIZES.base,
							...SHADOWS.light,
							fontFamily: FONTS.regular,
							fontSize: SIZES.font,
						}}
					/>
				</Layout>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#59D235",
		height: 200,
	},
	headerContent: {
		marginTop: 30,
		padding: 30,
		alignItems: "center",
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: "center",
		position: "absolute",
		marginTop: 130,
	},
	name: {
		fontSize: 22,
		color: "#FFFFFF",
		fontWeight: "600",
	},
	body: {
		marginTop: 40,
	},
	bodyContent: {
		flex: 1,
		alignItems: "center",
		padding: 30,
	},
	name: {
		fontSize: 28,
		color: "#696969",
		fontWeight: "600",
	},
	info: {
		fontSize: 16,
		color: "#00BFFF",
		marginTop: 10,
	},
	description: {
		fontSize: 16,
		color: "#696969",
		marginTop: 10,
		textAlign: "center",
	},
	buttonContainer: {
		marginTop: 10,
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
		backgroundColor: "#00BFFF",
	},
});

export default ProfileScreen;
