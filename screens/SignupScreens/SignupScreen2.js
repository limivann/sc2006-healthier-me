import { SafeAreaView, Image } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";
import React from "react";
import { FocusedStatusBar, CircularDots } from "../../components";
import { COLORS, FONTS, SIZES } from "../../constants";

const SignupScreen2 = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			<Layout style={{ flex: 1, width: "100%", alignItems: "center" }}>
				<Layout style={{ width: "100%", paddingTop: 90, paddingBottom: 30 }}>
					<Text
						style={{
							textAlign: "center",
							fontFamily: FONTS.bold,
							fontSize: SIZES.extraLarge,
							color: COLORS.primary,
						}}
					>
						Step 2 of 3
					</Text>
				</Layout>
				<Layout
					style={{
						width: "100%",
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontFamily: FONTS.bold,
							fontSize: SIZES.extraLarge,
						}}
					>
						Select your activity level
					</Text>
				</Layout>

				<Layout
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
						bottom: 0,
						paddingBottom: 70,
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

export default SignupScreen2;
