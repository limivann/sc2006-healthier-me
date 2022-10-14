import { useState } from "react";
import { Layout, Text, Icon, Input, Button } from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
} from "react-native";
import { BackButton, CustomButton, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const ChangePasswordScreen = ({ navigation }) => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderIcon = props => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
		</TouchableWithoutFeedback>
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
				backgroundColor={COLORS.primary}
				barStyle="dark-content"
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Layout
					style={{
						flex: 1,
					}}
				>
					<BackButton onPress={() => navigation.goBack()} color="white" />

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
							Change Password
							
						</Text>
					</Layout>
					<Layout style={styles.changePasswordContainer}>
						<Layout style={{ marginBottom: SIZES.base, width: "100%" }}>
							<Text style={styles.inputLabel}>Current Password<Text style={{color: 'red'}}> *</Text></Text>

							<Input
								placeholder="Current Password"
								autoCompleteType="password"
								value={oldPassword}
								onChangeText={nextValue => setOldPassword(nextValue)}
								accessoryRight={renderIcon}
								secureTextEntry={secureTextEntry}
								style={styles.textInput}
							/>
						</Layout>
						<Layout style={{ marginBottom: SIZES.base, width: "100%" }}>
							<Text style={styles.inputLabel}>New Password<Text style={{color: 'red'}}> *</Text></Text>
							<Input
								placeholder="New Password"
								autoCompleteType="password"
								value={newPassword}
								onChangeText={nextValue => setNewPassword(nextValue)}
								accessoryRight={renderIcon}
								secureTextEntry={secureTextEntry}
								style={styles.textInput}
							/>
						</Layout>
						<Layout style={{ marginBottom: SIZES.base, width: "100%" }}>
							<Text style={styles.inputLabel}>Confirm Password<Text style={{color: 'red'}}> *</Text></Text>
							<Input
								placeholder="Confirm password"
								autoCompleteType="password"
								value={confirmNewPassword}
								onChangeText={nextValue => setConfirmNewPassword(nextValue)}
								accessoryRight={renderIcon}
								secureTextEntry={secureTextEntry}
								style={styles.textInput}
							/>
						</Layout>
						<Layout style={{ width: "100%", position: "absolute", bottom: 0 }}>
							<CustomButton
								text={"Save"}
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

export default ChangePasswordScreen;

const styles = StyleSheet.create({
	changePasswordContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: "7.5%",
		paddingTop: SIZES.large,
	},
	inputLabel: {
		paddingLeft: SIZES.medium,
		paddingTop: SIZES.base,
		color: COLORS.gray,
		fontFamily: FONTS.regular,
		fontSize: SIZES.font,
		marginBottom: SIZES.base,
	},
	textInput: {
		borderRadius: SIZES.base,
		...SHADOWS.light,
		fontFamily: FONTS.regular,
		fontSize: SIZES.font,
	},
});
