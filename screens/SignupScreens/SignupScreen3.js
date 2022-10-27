import { Text, Spinner, Layout, Divider, Input } from "@ui-kitten/components";
import React, { useState } from "react";
import {
	FocusedStatusBar,
	CircularDots,
	GenderSwitchButton,
	CustomButton,
} from "../../components";
import { COLORS, FONTS, SIZES } from "../../constants";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	DevSettings,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";

const SignupScreen3 = ({ navigation, route }) => {
	const [age, setAge] = useState(null);
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [isMaleToggled, setIsMaleToggled] = useState(true);
	const { selectedActivityStr } = route.params;
	const [inputError, setInputError] = useState("");
	const [isSignupLoading, setIsSignupLoading] = useState(false);

	const handlePress = async () => {
		// check validity
		// check required fields
		setIsSignupLoading(true);
		if (age == null || height === "" || weight === "") {
			setInputError("Please fill in all fields");
			setIsSignupLoading(false);
			return;
		}
		// check age
		if (age < 12 || age > 99) {
			setInputError("Age must be within the range of 12 and 99");
			setIsSignupLoading(false);
			return;
		}
		if (height < 140 || height > 210) {
			setInputError("Height must be within the range of 140 cm to 210 cm");
			setIsSignupLoading(false);
			return;
		}
		if (weight < 40 || weight > 130) {
			setInputError("Weight must be within the range of 40kg to 130kg");
			setIsSignupLoading(false);
			return;
		}
		console.log(selectedActivityStr, age, height, weight);
		// no errors, create user details and update to firestore
		const userDocRef = doc(db, "users", auth.currentUser.uid);
		await setDoc(
			userDocRef,
			{
				finishedSetup: true,
				age: age,
				height: height,
				weight: weight,
				activityLevel: selectedActivityStr,
				gender: isMaleToggled ? "male" : "female",
			},
			{ merge: true }
		);
		DevSettings.reload();
		setIsSignupLoading(false);
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
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}
				>
					<Layout
						style={{
							width: "100%",
							paddingTop: "0%",
							paddingBottom: "5%",
						}}
					>
						<Text
							style={{
								textAlign: "center",
								fontFamily: FONTS.bold,
								fontSize: SIZES.extraLarge,
								color: COLORS.primary,
							}}
						>
							Step 3 of 3
						</Text>
					</Layout>
					<Layout
						style={{
							width: "100%",
							marginBottom: 56,
						}}
					>
						<Text
							style={{
								textAlign: "center",
								fontFamily: FONTS.bold,
								fontSize: SIZES.extraLarge,
							}}
						>
							Personal Details
						</Text>
					</Layout>
					<Layout
						style={{
							width: "85%",
							alignItems: "center",
						}}
					>
						<Layout
							style={{
								paddingVertical: SIZES.small,
								flexDirection: "row",
								alignItems: "center",
								width: "95%",
							}}
						>
							<Layout
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<Text
									style={{
										fontFamily: FONTS.semiBold,
										fontSize: SIZES.extraLarge,
										color: COLORS.gray,
									}}
								>
									Age
								</Text>
								<Input
									style={{
										color: COLORS.primary,
										fontFamily: FONTS.semiBold,
										fontSize: SIZES.large,
										backgroundColor: "transparent",
									}}
									placeholder="E.g. 21"
									value={age}
									onChangeText={nextValue => setAge(nextValue)}
									keyboardType="numeric"
								/>
							</Layout>
						</Layout>
						<Divider
							style={{
								height: 2,
								backgroundColor: COLORS.lightgray,
								width: "95%",
								alignSelf: "center",
							}}
						/>
						<Layout
							style={{
								paddingVertical: SIZES.small,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "95%",
							}}
						>
							<Text
								style={{
									fontFamily: FONTS.semiBold,
									fontSize: SIZES.extraLarge,
									color: COLORS.gray,
								}}
							>
								Height
							</Text>
							<Layout
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Input
									style={{
										color: COLORS.primary,
										fontFamily: FONTS.semiBold,
										fontSize: SIZES.large,
										backgroundColor: "transparent",
									}}
									value={height}
									onChangeText={nextValue => setHeight(nextValue)}
									placeholder="E.g. 173"
									keyboardType="numeric"
								/>
								<Text
									style={{
										color: COLORS.primary,
										fontFamily: FONTS.regular,
										fontSize: SIZES.large,
										paddingLeft: SIZES.base,
									}}
								>
									cm
								</Text>
							</Layout>
						</Layout>
						<Divider
							style={{
								height: 2,
								backgroundColor: COLORS.lightgray,
								width: "95%",
								alignSelf: "center",
							}}
						/>
						<Layout
							style={{
								paddingVertical: SIZES.small,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "95%",
							}}
						>
							<Text
								style={{
									fontFamily: FONTS.semiBold,
									fontSize: SIZES.extraLarge,
									color: COLORS.gray,
								}}
							>
								Weight
							</Text>
							<Layout
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Input
									style={{
										color: COLORS.primary,
										fontFamily: FONTS.semiBold,
										fontSize: SIZES.large,
										backgroundColor: "transparent",
									}}
									value={weight}
									onChangeText={nextValue => setWeight(nextValue)}
									placeholder="E.g. 65"
									keyboardType="numeric"
								/>
								<Text
									style={{
										color: COLORS.primary,
										fontFamily: FONTS.regular,
										fontSize: SIZES.large,
										paddingLeft: SIZES.font,
									}}
								>
									kg
								</Text>
							</Layout>
						</Layout>
						<Divider
							style={{
								height: 2,
								backgroundColor: COLORS.lightgray,
								width: "95%",
								alignSelf: "center",
							}}
						/>
						<Layout
							style={{
								paddingVertical: SIZES.small,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "95%",
							}}
						>
							<Text
								style={{
									fontFamily: FONTS.semiBold,
									fontSize: SIZES.extraLarge,
									color: COLORS.gray,
								}}
							>
								Gender
							</Text>

							<Layout style={{ display: "flex", flexDirection: "row" }}>
								<GenderSwitchButton
									isMale={true}
									isMaleToggled={isMaleToggled}
									setIsMaleToggled={setIsMaleToggled}
								/>
								<GenderSwitchButton
									isMale={false}
									isMaleToggled={isMaleToggled}
									setIsMaleToggled={setIsMaleToggled}
								/>
							</Layout>
						</Layout>
						<Layout style={{ width: "95%" }}>
							<Text
								style={{
									fontFamily: FONTS.medium,
									fontSize: SIZES.small,
									color: COLORS.error,
									paddingTop: SIZES.base,
								}}
							>
								{inputError}
							</Text>
						</Layout>
					</Layout>

					<Layout
						style={{
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Layout style={{ paddingTop: 100, width: "80%" }}>
							{!isSignupLoading ? (
								<CustomButton
									text={"Sign up"}
									backgroundColor={COLORS.primary}
									onPress={() => handlePress()}
								/>
							) : (
								<CustomButton backgroundColor={COLORS.lightPrimary}>
									<Spinner status="basic" size="small" />
								</CustomButton>
							)}
						</Layout>
						<Layout
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<CircularDots bgColor={COLORS.gray} />
							<CircularDots bgColor={COLORS.gray} />
							<CircularDots bgColor={COLORS.primary} />
						</Layout>
					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SignupScreen3;
