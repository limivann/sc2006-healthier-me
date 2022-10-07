import { useMemo, useState } from "react";
import {
	Layout,
	Text,
	Icon,
	Input,
	Button,
	Divider,
} from "@ui-kitten/components";	
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Image,
	Platform,
} from "react-native";
import { FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";

const LoginScreen = () => {
	const [loginError, setLoginError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderIcon = props => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
		</TouchableWithoutFeedback>
	);

	const GoogleIcon = useMemo(
		() => (
			<Image
				source={assets.googleIcon}
				resizeMode="contain"
				style={{ height: 20, width: 36 }}
			></Image>
		),
		[]
	);

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
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}
				>
					<Layout style={{ width: "85%" }}>
						<Layout style={{ marginBottom: 30 }}>
							<Text
								style={{
									fontFamily: FONTS.bold,
									fontSize: SIZES.extraLarge,
									paddingVertical: SIZES.extraLarge,
								}}
							>
								Login
							</Text>
							<Text
								style={{
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
									paddingVertical: SIZES.regular,
									color: COLORS.gray,
								}}
							>
								Please sign in to continue
							</Text>
						</Layout>
						<Layout>
							<Layout style={{ marginBottom: SIZES.base }}>
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
									placeholder="Email"
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
							</Layout>
							<Layout>
								<Text
									style={{
										paddingLeft: SIZES.large,
										paddingTop: SIZES.base,
										color: COLORS.gray,
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
									}}
								>
									Password
								</Text>
								<Input
									placeholder="Password"
									autoCompleteType="password"
									value={password}
									onChangeText={nextValue => setPassword(nextValue)}
									accessoryRight={renderIcon}
									secureTextEntry={secureTextEntry}
									style={{
										borderRadius: SIZES.base,
										...SHADOWS.light,
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
									}}
								/>
							</Layout>
						</Layout>
						<Layout>
							<Divider style={{ marginVertical: 36 }} />
							<Text
								style={{
									position: "absolute",
									alignSelf: "center",
									marginVertical: 27,
									paddingHorizontal: SIZES.medium,
									backgroundColor: COLORS.white,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							>
								or
							</Text>
						</Layout>
						<Layout>
							<Button
								style={{
									marginBottom: SIZES.medium,
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
									...SHADOWS.medium,
									backgroundColor: "black",
									borderRadius: SIZES.font,
								}}
								accessoryLeft={GoogleIcon}
							>
								Sign in with Google
							</Button>
							<Text
								style={{
									alignSelf: "center",
									color: COLORS.gray,
									textDecorationLine: "underline",
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
								}}
							>
								Forgot password?
							</Text>
						</Layout>
					</Layout>
					<Layout style={{ paddingTop: 50, width: "85%" }}>
						<Button
							status="success"
							style={{
								marginBottom: SIZES.extraLarge,
								backgroundColor: "#72BE79",
								borderRadius: SIZES.font,
							}}
						>
							Login
						</Button>
						<Text
							style={{
								alignSelf: "center",
								color: COLORS.gray,
								textDecorationLine: "underline",
								fontFamily: FONTS.regular,
								fontSize: SIZES.font,
							}}
						>
							I'm a new user. Registration
						</Text>
					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;
