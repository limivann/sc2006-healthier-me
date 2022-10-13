import { memo, useState } from "react";
import {
	Layout,
	Text,
	Icon,
	Input,
	Divider,
	CheckBox,
	Spinner,
} from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Image,
	Platform,
	TouchableOpacity,
} from "react-native";
import { CustomButton, FocusedStatusBar } from "../../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../../constants";
import { createUser } from "../../firebase/auth/emailProvider";
import { db } from "../../firebase/firebase-config";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";

const SignupScreen = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [checked, setChecked] = useState(false);
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [signupError, setSignupError] = useState("");

	const [signupLoading, setSignupLoading] = useState(false);

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

	const clearInputs = () => {
		setPassword("");
		setConfirmPassword("");
		setChecked(false);
	};

	const handleSignup = async () => {
		try {
			setSignupLoading(true);
			// check if any of the fields are empty
			if (!username || !email || !password || !confirmPassword || !checked) {
				setSignupError("Please enter all fields");
				clearInputs();
				setSignupLoading(false);
				return;
			}
			// TODO: check if password has at least one alphabet, at least one number and more than 12

			// check if password and confirmPassword is the same
			if (password && password !== confirmPassword) {
				setSignupError("Passwords does not match");
				// clear passwords
				setSignupLoading(false);
				return;
			}

			const { user, error } = await createUser(email, password);
			if (error) {
				setSignupError(error);
				// clear passwords
				clearInputs();
				setSignupLoading(false);
				return;
			}

			// no errors, create user details and update to firestore
			const userDocRef = doc(db, "users", user.uid);
			await setDoc(userDocRef, {
				displayName: username,
				email: email,
				joinedDate: serverTimestamp(),
				finishedSetup: false,
			});
			navigation.navigate("SignupPage1");
			setSignupLoading(false);
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
						<Layout style={{ marginBottom: 20 }}>
							<Text
								style={{
									fontFamily: FONTS.bold,
									fontSize: SIZES.extraLarge,
									paddingVertical: SIZES.large,
								}}
							>
								Sign up
							</Text>
							<Text
								style={{
									fontFamily: FONTS.regular,
									fontSize: SIZES.font,
									paddingVertical: SIZES.regular,
									color: COLORS.gray,
								}}
							>
								Please sign up to use our app
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
									Username
								</Text>

								<Input
									placeholder="John Doe"
									autoCompleteType="username-new"
									value={username}
									onChangeText={nextValue => setUsername(nextValue)}
									autoCorrect={false}
									style={{
										borderRadius: SIZES.base,
										...SHADOWS.light,
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
									}}
								/>
							</Layout>
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
									Email address
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
							</Layout>
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
									Confirm Password
								</Text>
								<Input
									placeholder="Confirm Password"
									autoCompleteType="password"
									value={confirmPassword}
									onChangeText={nextValue => setConfirmPassword(nextValue)}
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
							<Layout
								style={{
									flexDirection: "row",
									paddingLeft: SIZES.large,
									paddingTop: SIZES.base,
									alignItems: "center",
								}}
							>
								<CheckBox
									checked={checked}
									onChange={nextValue => setChecked(nextValue)}
								></CheckBox>
								<Text
									style={{
										fontFamily: FONTS.semiBold,
										fontSize: SIZES.small,
										color: COLORS.gray,
										paddingLeft: SIZES.small,
									}}
								>
									I agree to the{" "}
									<Text
										style={{
											fontFamily: FONTS.semiBold,
											fontSize: SIZES.small,
											color: COLORS.primary,
										}}
									>
										Terms and Conditions
									</Text>
								</Text>
							</Layout>
							{signupError && (
								<Layout>
									<Text
										style={{
											fontFamily: FONTS.medium,
											fontSize: SIZES.small,
											color: COLORS.error,
											paddingTop: SIZES.base,
										}}
									>
										{signupError}
									</Text>
								</Layout>
							)}
							<Layout>
								<Divider style={{ marginVertical: 26 }} />
								<Text
									style={{
										position: "absolute",
										alignSelf: "center",
										marginVertical: 15,
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
								<Layout>
									{!signupLoading ? (
										<CustomButton
											text={"Sign up"}
											backgroundColor={COLORS.primary}
											onPress={() => handleSignup()}
										/>
									) : (
										<CustomButton backgroundColor={COLORS.lightPrimary}>
											<Spinner status="basic" size="small" />
										</CustomButton>
									)}
									<TouchableOpacity
										onPress={() =>
											!signupLoading && navigation.navigate("LoginPage")
										}
									>
										<Text
											style={{
												alignSelf: "center",
												fontFamily: FONTS.regular,
												fontSize: SIZES.font,
												color: COLORS.gray,
												textDecorationLine: "underline",
											}}
										>
											Already have an account? Login
										</Text>
									</TouchableOpacity>
								</Layout>
							</Layout>
						</Layout>
					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SignupScreen;
