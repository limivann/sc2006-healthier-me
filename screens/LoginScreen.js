import { memo, useState } from "react";
import {
	Layout,
	Text,
	Icon,
	Input,
	Divider,
	Spinner,
} from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Image,
	Platform,
} from "react-native";
import { CustomButton, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";
import { signInUser } from "../firebase/auth/emailProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../firebase/firebase-config";

const LoginScreen = ({ navigation }) => {
	const [loginError, setLoginError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const [loginLoading, setLoginLoading] = useState(false);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderIcon = props => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
		</TouchableWithoutFeedback>
	);

	const GoogleIcon = memo(
		() => (
			<Image
				source={assets.googleIcon}
				resizeMode="contain"
				style={{ height: 20, width: 36, marginRight: 10 }}
			></Image>
		),
		[]
	);

	const handleLogin = async () => {
		try {
			setLoginLoading(true);
			// check if any of the fields are empty
			if (!email || !password) {
				setLoginError("Please enter all fields");
				setLoginLoading(false);
				return;
			}
			const { user, error } = await signInUser(email, password);
			if (error) {
				setLoginError(error);
				// clear password
				setPassword("");
				setLoginLoading(false);
				return;
			}
			// no errors navigate to home page
			navigation.navigate("HomePage");
			setLoginLoading(false);
			return;
		} catch (error) {
			console.log(error);
		}
	};

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
										marginBottom: SIZES.base,
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
										marginBottom: SIZES.base,
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
						{loginError && (
							<Layout>
								<Text
									style={{
										fontFamily: FONTS.medium,
										fontSize: SIZES.small,
										color: COLORS.error,
										paddingTop: SIZES.base,
									}}
								>
									{loginError}
								</Text>
							</Layout>
						)}
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
							<CustomButton
								backgroundColor="black"
								text={"Sign in with Google"}
							>
								<GoogleIcon />
							</CustomButton>
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
						{!loginLoading ? (
							<CustomButton
								text={"Sign up"}
								backgroundColor={COLORS.primary}
								onPress={() => handleLogin()}
							/>
						) : (
							<CustomButton backgroundColor={COLORS.lightPrimary}>
								<Spinner status="basic" size="small" />
							</CustomButton>
						)}
						<TouchableOpacity
							onPress={() => !loginLoading && navigation.navigate("SignupPage")}
						>
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
						</TouchableOpacity>
					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;
