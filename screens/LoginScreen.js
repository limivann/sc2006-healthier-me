import { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";

const LoginScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					paddingHorizontal: SIZES.font,
				}}
			>
				<View style={{}}>
					<Text
						style={{
							fontWeight: FONTS.bold,
							fontSize: SIZES.extraLarge,
							paddingVertical: SIZES.extraLarge,
						}}
					>
						Login
					</Text>
					<Text
						style={{
							fontWeight: FONTS.regular,
							fontSize: SIZES.regular,
							paddingVertical: SIZES.regular,
							color: COLORS.gray,
						}}
					>
						Please sign in to continue
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;
