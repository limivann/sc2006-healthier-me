import { SafeAreaView, Image } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";
import React from "react";
import { FocusedStatusBar, CircularDots } from "../../components";
import { assets, COLORS, FONTS, SIZES } from "../../constants";

const SignupScreen1 = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			<Layout style={{ flex: 1, width: "100%", alignItems: "center" }}>
				<Layout style={{ width: "100%", paddingVertical: 90 }}>
					<Text
						style={{
							textAlign: "center",
							fontFamily: FONTS.bold,
							fontSize: SIZES.extraLarge,
							color: COLORS.primary,
						}}
					>
						Step 1 of 3
					</Text>
				</Layout>
				<Layout
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: SIZES.extraLarge,
					}}
				>
					<Image source={assets.welcomeImg} />
				</Layout>
				<Layout
					style={{
						width: "76%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontFamily: FONTS.semiBold,
							fontSize: SIZES.extraLarge,
							textAlign: "center",
							paddingVertical: SIZES.font,
						}}
					>
						Welcome to HealthierMe Application
					</Text>
					<Text
						style={{
							textAlign: "center",
							fontFamily: FONTS.regular,
							fontSize: SIZES.font,
							color: COLORS.gray,
						}}
					>
						Healthy food recommendations and calorie tracker will help you to
						get in better shape and embrace a healthy lifestyle.
					</Text>
				</Layout>
				<Layout
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
						bottom: 0,
						paddingBottom: "10%",
					}}
				>
					<Layout style={{ paddingTop: 50, width: "80%" }}>
						<Button
							status="success"
							style={{
								marginBottom: SIZES.extraLarge,
								backgroundColor: COLORS.primary,
								borderRadius: SIZES.font,
							}}
						>
							Login
						</Button>
					</Layout>
					<Layout
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CircularDots bgColor={COLORS.primary} />
						<CircularDots bgColor={COLORS.gray} />
						<CircularDots bgColor={COLORS.gray} />
					</Layout>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
};

export default SignupScreen1;
