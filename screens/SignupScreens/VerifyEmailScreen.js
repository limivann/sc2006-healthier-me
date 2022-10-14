import { Image, SafeAreaView, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { BackButton, CustomButton, FocusedStatusBar } from "../../components";
import { assets, COLORS, FONTS, SIZES } from "../../constants";
import { signOutUser, verifyEmail } from "../../firebase/auth/emailProvider";

const VerifyEmailScreen = ({ navigation }) => {
	const handleGoBack = async () => {
		const { success } = await signOutUser();
	};

	const handleVerifyEmail = async () => {
		await verifyEmail();
	};
	return (
		<Layout style={{ flex: 1 }}>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor={COLORS.primary}
			/>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
				<BackButton onPress={() => handleGoBack()} color="white" />

				<Layout
					style={{
						flex: 1,
						width: "100%",
						alignItems: "center",
						backgroundColor: "transparent",
					}}
				>
					<Layout style={styles.content}>
						<Layout style={styles.titleContainer}>
							<Text style={styles.titleText}>Verify your Email</Text>
						</Layout>
						<Layout style={styles.subtitleContainer}>
							<Text style={styles.subtitleText}>
								Check your email & click the link to activate your account
							</Text>
						</Layout>
						<Layout style={styles.imageContainer}>
							<Image source={assets.verifyEmailImg} />
						</Layout>
						<Layout
							style={{
								width: "85%",
								position: "absolute",
								bottom: 0,
								backgroundColor: "transparent",
								alignItems: "center",
							}}
						>
							<CustomButton
								width="100%"
								fontColor={COLORS.primary}
								text={"Continue"}
								backgroundColor="white"
								onPress={() => handleVerifyEmail()}
							/>
							<Text style={styles.resendEmailText}>Resend email</Text>
						</Layout>
					</Layout>
				</Layout>
			</SafeAreaView>
		</Layout>
	);
};

export default VerifyEmailScreen;
const styles = StyleSheet.create({
	content: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "transparent",
		width: "85%",
		flex: 1,
	},
	titleContainer: {
		paddingTop: "20%",
		backgroundColor: "transparent",
		width: "100%",
	},
	titleText: {
		fontFamily: FONTS.bold,
		color: "white",
		fontSize: SIZES.extraLarge,
		textAlign: "center",
	},
	subtitleContainer: {
		paddingTop: "10%",
		backgroundColor: "transparent",
		width: "90%",
	},
	subtitleText: {
		fontFamily: FONTS.regular,
		color: "white",
		fontSize: SIZES.medium,
		textAlign: "center",
	},
	imageContainer: {
		backgroundColor: "transparent",
		paddingTop: "30%",
	},
	resendEmailText: {
		paddingBottom: "20%",
		textDecorationLine: "underline",
		color: "white",
		fontFamily: FONTS.light,
		fontSize: SIZES.font,
	},
});
