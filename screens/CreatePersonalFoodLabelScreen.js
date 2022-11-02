import { Layout, Text, Input, Spinner } from "@ui-kitten/components";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
} from "react-native";
import { FocusedStatusBar, CustomButton, BackButton } from "../components";
import { COLORS, FONTS, SIZES, SHADOWS } from "../constants";
import { auth, db } from "../firebase/firebase-config";

const CreatePersonalFoodLabelScreen = ({ navigation, route }) => {
	const [errorText, setErrorText] = useState("");
	const [labelName, setLabelName] = useState("");
	const [calories, setCalories] = useState("");
	const { setPersonalFoodLabelData } = route?.params;
	const [createLoading, setCreateLoading] = useState(false);
	const [successMessageVisible, setSuccessMessageVisible] = useState(false);

	const handleCreate = async () => {
		try {
			setCreateLoading(true);
			// check required fields
			if (labelName === "" || calories == null) {
				setErrorText("Please fill in all fields");
				setCreateLoading(false);
				return;
			}
			// check length of name >=3 and <= 30
			if (!(labelName.length >= 3 && labelName.length <= 30)) {
				setErrorText("Length of name must be within 3 to 30");
				setCreateLoading(false);
				return;
			}

			// check if calories > 0 and < 10000
			if (!(calories > 0 && calories < 10000)) {
				setErrorText("Calories must be greater than 0 and less than 10000");
				setCreateLoading(false);
				return;
			}
			// check if the food label already exists
			const personalFoodLabelRef = collection(
				db,
				"users",
				auth.currentUser.uid,
				"personalFoodLabel"
			);
			const q = query(personalFoodLabelRef, where("name", "==", labelName));
			const querySnapshot = await getDocs(q);
			if (querySnapshot.size > 0) {
				setErrorText("Food name already taken");
				setCreateLoading(false);
				return;
			}
			const newData = {
				name: labelName,
				calories: +calories,
			};
			const docRef = await addDoc(personalFoodLabelRef, newData);
			setPersonalFoodLabelData(prev => [
				{
					name: labelName,
					calories: +calories,
					id: docRef.id,
				},
				...prev,
			]);
			Promise.all([docRef]).then(() => {
				setErrorText("");
				setCreateLoading(false);
				// clear inputs
				setLabelName("");
				setCalories("");
				setSuccessMessageVisible(true);
				setTimeout(() => {
					setSuccessMessageVisible(false);
				}, 1000);
			});
		} catch (error) {
			console.log(error);
			setCreateLoading(false);
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
				backgroundColor="white"
				translucent={true}
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Layout style={styles.page}>
					<BackButton
						onPress={() => navigation.goBack()}
						color={COLORS.primary}
						backgroundColor="transparent"
						top={8}
						paddingLeft={SIZES.large}
					/>
					<Layout style={styles.headerContainer}>
						<Text style={styles.header}>Create Personal Food Label</Text>
					</Layout>

					<Layout style={styles.contentContainer}>
						<Layout style={styles.inputContainer}>
							<Layout style={styles.labelInput}>
								<Text style={styles.text}>Food Name</Text>
								<Input
									style={styles.input}
									placeholder="John Doe's Chicken Rice"
									value={labelName}
									autoCapitalize={false}
									onChangeText={nextValue => setLabelName(nextValue)}
								/>
							</Layout>
							<Layout style={styles.labelInput}>
								<Text style={styles.text}>Calories (in kcal)</Text>
								<Input
									style={styles.input}
									placeholder="500"
									keyboardType="numeric"
									value={calories.toString()}
									onChangeText={nextValue => setCalories(+nextValue)}
								/>
							</Layout>
							{errorText && (
								<Layout style={styles.errorContainer}>
									<Text style={styles.errorText}>{errorText}</Text>
								</Layout>
							)}
							{successMessageVisible && (
								<Layout style={styles.successMessageContainer}>
									<Text style={styles.successMessageText}>
										{"Personal food label created!"}
									</Text>
								</Layout>
							)}
						</Layout>
					</Layout>
					<Layout style={styles.buttonContainer}>
						{!createLoading ? (
							<CustomButton
								text={"Create"}
								backgroundColor={COLORS.primary}
								borderRadius={SIZES.large}
								onPress={() => handleCreate()}
							/>
						) : (
							<CustomButton backgroundColor={COLORS.lightPrimary}>
								<Spinner status="basic" size="small" />
							</CustomButton>
						)}
					</Layout>
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	headerContainer: {
		width: "100%",
		backgroundColor: "#F9F9F9",
		alignItems: "center",
		paddingVertical: "5%",
		...SHADOWS.dark,
	},
	header: {
		color: COLORS.primary,
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
	},
	contentContainer: {
		width: "100%",
		paddingHorizontal: "7.5%",
		flex: 1,
		justifyContent: "center",
	},
	text: {
		fontFamily: FONTS.regular,
		fontSize: SIZES.font,
		paddingLeft: SIZES.font,
		paddingBottom: 5,
	},
	input: {
		...SHADOWS.light,
		marginBottom: SIZES.large,
	},
	buttonContainer: {
		width: "100%",
		paddingHorizontal: "7.5%",
	},
	inputContainer: {
		paddingBottom: "20%",
	},
	labelInput: {
		width: "100%",
	},
	errorContainer: {
		width: "100%",
	},
	errorText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.small,
		color: COLORS.error,
		paddingTop: SIZES.base,
	},
	successMessageContainer: {
		width: "100%",
	},
	successMessageText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.small,
		color: COLORS.primary,
		paddingTop: SIZES.base,
	},
	page: {
		flex: 1,
		width: "100%",
	},
});
export default CreatePersonalFoodLabelScreen;
