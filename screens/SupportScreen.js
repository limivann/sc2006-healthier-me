import { useState } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import { CustomButton, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const SupportScreen = () => {
	const [email, setEmail] = useState("");
	const [problem, setProblem] = useState("");

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.select({
				ios: () => -200,
				android: () => -200,
			})()}
		>
			<FocusedStatusBar
				backgroundColor={COLORS.primary}
				barStyle="dark-content"
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Layout style={{ flex: 1, alignItems: "center" }}>
					<Layout
						style={{
							width: "100%",
							height: TITLEBAR_HEIGHT,
							backgroundColor: COLORS.primary,
							justifyContent: "flex-end",
						}}
					>
						<Text
							style={{
								fontFamily: FONTS.bold,
								textAlign: "center",
								paddingBottom: SIZES.font,
								color: COLORS.white,
								fontSize: SIZES.large,
							}}
						>
							Support
						</Text>
					</Layout>
					<Layout style={styles.supportContainer}>
						<Layout style={{ width: "100%" }}>
							<Text style={styles.titleText}>What do you need from us?</Text>
						</Layout>
						<Layout style={{ width: "100%", marginBottom: 10 }}>
							<Input
								placeholder="Email"
								autoCompleteType="email"
								value={email}
								onChangeText={nextValue => setEmail(nextValue)}
								style={{
									borderRadius: SIZES.base,
									...SHADOWS.light,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
									marginBottom: SIZES.extraLarge,
								}}
							/>
							<Input
								multiline={true}
								textStyle={{ minHeight: 80 }}
								placeholder="Enter your problem"
								autoCompleteType="Enter your problem"
								value={problem}
								onChangeText={nextValue => setProblem(nextValue)}
								style={{
									paddingTop: SIZES.base,
									borderRadius: SIZES.base,
									...SHADOWS.light,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							/>
						</Layout>
						<Layout style={{ width: "100%", position: "absolute", bottom: 0 }}>
							<CustomButton
								text={"Send"}
								backgroundColor={COLORS.primary}
								onPress={() => {}}
							/>
						</Layout>
					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SupportScreen;

const styles = StyleSheet.create({
	supportContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "85%",
	},
	titleText: {
		paddingVertical: "7.5%",
		color: "black",
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.medium,
	},
});
