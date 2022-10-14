import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { CustomButton, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { Layout, Text, Input } from "@ui-kitten/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const ForgotPasswordScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
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
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Layout
					style={{
						flex: 1,
						width: "100%",
						height: "100%",
					}}
				>
					<Layout
						style={{
							marginTop: "15%",
							paddingVertical: "10%",
							paddingHorizontal: "7.5%",
						}}
					>
						<Text category="h2">Forgot Password</Text>
						<Text
							style={{
								paddingVertical: 10,
								fontFamily: FONTS.light,
								fontSize: SIZES.medium,
							}}
						>
							Enter your email and we will send you a reset code.
						</Text>
					</Layout>
					<Layout
						style={{
							paddingHorizontal: "7.5%",
						}}
					>
						<Text
							style={{
								fontFamily: FONTS.regular,
								fontSize: SIZES.medium,
								color: COLORS.gray,
								paddingBottom: "3%",
								paddingLeft: "5%",
							}}
						>
							Email<Text style={{color: COLORS.error}}> *</Text>
						</Text>
						<Input
							placeholder="johndoe@example.com"
							autoCompleteType="email"
							value={email}
							onChangeText={nextValue => setEmail(nextValue)}
							style={{
								borderRadius: SIZES.base,
								...SHADOWS.light,
								fontFamily: FONTS.regular,
								fontSize: SIZES.font,
							}}
						/>
						<Layout
							style={{
								width: "100%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Layout
								style={{
									paddingTop: "95%",
									width: "100%",
								}}
							>
								<CustomButton
									text={"Continue"}
									backgroundColor={COLORS.primary}
								/>
							</Layout>
							<TouchableOpacity
								onPress={() => navigation.navigate("LoginPage")}
							>
								<Text
									style={{
										alignSelf: "center",
										color: COLORS.gray,
										fontSize: SIZES.font,
										fontFamily: FONTS.regular,
										textDecorationLine: "underline",
									}}
								>
									Already have an account? Login
								</Text>
							</TouchableOpacity>
						</Layout>
					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default ForgotPasswordScreen;
