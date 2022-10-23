import { Layout, Text, Input } from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
} from "react-native";
import { FocusedStatusBar, CustomButton } from "../components";
import { COLORS, FONTS, SIZES, SHADOWS } from "../constants";

const CreateByCaloriesScreen = () => {
	return (
		<Layout style={styles.contentContainer}>
			<Layout style={styles.inputContainer}>
				<Layout style={styles.labelInput}>
					<Text style={styles.text}>Food Name</Text>
					<Input style={styles.input} placeholder="John Doe's Chicken Rice" />
				</Layout>
				<Layout style={styles.labelInput}>
					<Text style={styles.text}>Calories</Text>
					<Input
						style={styles.input}
						placeholder="500"
						keyboardType="numeric"
					/>
				</Layout>
			</Layout>
		</Layout>
	);
};

const CreatePersonalFoodLabelScreen = () => {
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
					<Layout style={styles.headerContainer}>
						<Text style={styles.header}>Create Personal Food Label</Text>
					</Layout>

					<CreateByCaloriesScreen />
					<Layout style={styles.buttonContainer}>
						<CustomButton
							text={"Create"}
							backgroundColor={COLORS.primary}
							borderRadius={SIZES.large}
						/>
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
	page: {
		flex: 1,
		width: "100%",
	},
});
export default CreatePersonalFoodLabelScreen;
