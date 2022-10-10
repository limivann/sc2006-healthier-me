import { memo, useState } from "react";
import {
	Layout,
	Text,
	Icon,
	Input,
	Divider,
	CheckBox,
} from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Image,
	Platform,
} from "react-native";
import { CustomButton, FocusedStatusBar } from "../../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../../constants";

const SignupScreen = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [checked, setChecked] = useState(false);
	const [secureTextEntry, setSecureTextEntry] = useState(true);

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

	const handleSignup = async () => {
		try {
			console.log("pressed");
			navigation.navigate("HomePage");
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
									}}
								>
									Username
								</Text>

								<Input
									placeholder="John Doe"
									autoCompleteType="username-new"
									value={username}
									onChangeText={nextValue => setUsername(nextValue)}
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
								}}
							>
								<CheckBox
									checked={checked}
									onChange={nextValue => setChecked(nextValue)}
								></CheckBox>
								<Text
									style={{
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
										color: COLORS.gray,
										paddingLeft: SIZES.medium,
									}}
								>
									I agree with the Privacy Policy
								</Text>
							</Layout>
							<Layout>
								<Divider style={{ marginVertical: 36 }} />
								<Text
									style={{
										position: "absolute",
										alignSelf: "center",
										marginVertical: 25,
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
									<CustomButton
										text={"Sign up"}
										backgroundColor={COLORS.primary}
										onPress={() => handleSignup()}
									/>
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
