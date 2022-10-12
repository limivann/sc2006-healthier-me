import { useEffect, useState } from "react";
import {
	Divider,
	Icon,
	Layout,
	Text,
	Toggle,
	Modal,
	Card,
} from "@ui-kitten/components";
import { CustomButton, FocusedStatusBar, Navbar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOutUser } from "../firebase/auth/emailProvider";
import { auth } from "../firebase/firebase-config";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const SettingsScreen = ({ navigation }) => {
	const [notificationsChecked, setNotificationsChecked] = useState(false);
	const [locationsChecked, setLocationsChecked] = useState(false);

	const onNotificationsCheckedChanged = isChecked => {
		setNotificationsChecked(isChecked);
	};
	const onLocationsCheckedChanged = isChecked => {
		setLocationsChecked(isChecked);
	};
	const [logoutPanelVisible, setLogoutPanelVisible] = useState(false);

	useEffect(() => {
		// TODO: initialize notifications and location checked?
	}, []);

	const handleLogout = async () => {
		const { success } = await signOutUser();
		if (success) {
			setLogoutPanelVisible(false);
			navigation.navigate("MainPage");
		}
	};

	return (
		<Layout style={{ flex: 1 }}>
			<FocusedStatusBar
				backgroundColor={COLORS.primary}
				barStyle="dark-content"
			/>
			<Layout
				style={{
					width: "100%",
					position: "absolute",
				}}
			></Layout>
			<SafeAreaView style={{ flex: 1 }}>
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
							paddingBottom: SIZES.base,
							color: COLORS.white,
							fontSize: SIZES.large,
						}}
					>
						Settings
					</Text>
				</Layout>
				<Layout style={styles.settingsContent}>
					<Layout style={styles.settingsItem}>
						<Layout style={styles.iconTitle}>
							<Icon name="bell-outline" fill="black" style={styles.icon} />
							<Text style={styles.iconText}>Notifcations</Text>
						</Layout>
						<Toggle
							status="basic"
							checked={notificationsChecked}
							onChange={onNotificationsCheckedChanged}
						/>
					</Layout>
					<Divider style={styles.divider} />
					<Layout style={styles.settingsItem}>
						<Layout style={styles.iconTitle}>
							<Icon name="pin-outline" fill="black" style={styles.icon} />
							<Text style={styles.iconText}>Locations</Text>
						</Layout>
						<Toggle
							status="basic"
							checked={locationsChecked}
							onChange={onLocationsCheckedChanged}
						/>
					</Layout>
					<Divider style={styles.divider} />
					<Layout style={styles.settingsItem}>
						<Layout style={styles.iconTitle}>
							<Icon name="lock-outline" fill="black" style={styles.icon} />
							<Text style={styles.iconText}>Change Password</Text>
						</Layout>
						<TouchableOpacity>
							<Icon
								name="chevron-right-outline"
								fill="black"
								style={styles.icon}
							/>
						</TouchableOpacity>
					</Layout>
					<Divider style={styles.divider} />
					<Layout style={styles.settingsItem}>
						<Layout style={styles.iconTitle}>
							<Icon
								name="question-mark-circle-outline"
								fill="black"
								style={styles.icon}
							/>
							<Text style={styles.iconText}>Terms and Conditions</Text>
						</Layout>
						<TouchableOpacity
							onPress={() => navigation.navigate("TermsAndConditionsPage")}
						>
							<Icon
								name="chevron-right-outline"
								fill="black"
								style={styles.icon}
							/>
						</TouchableOpacity>
					</Layout>
					<Divider style={styles.divider} />
					<Layout style={styles.settingsItem}>
						<Layout style={styles.iconTitle}>
							<Icon name="shield-outline" fill="black" style={styles.icon} />
							<Text style={styles.iconText}>Privacy Policy</Text>
						</Layout>
						<TouchableOpacity
							onPress={() => navigation.navigate("PrivacyPolicyPage")}
						>
							<Icon
								name="chevron-right-outline"
								fill="black"
								style={styles.icon}
							/>
						</TouchableOpacity>
					</Layout>
					<Divider style={styles.divider} />
					<Layout style={styles.settingsItem}>
						<Layout style={styles.iconTitle}>
							<Icon name="email-outline" fill="black" style={styles.icon} />
							<Text style={styles.iconText}>Support</Text>
						</Layout>
						<TouchableOpacity>
							<Icon
								name="chevron-right-outline"
								fill="black"
								style={styles.icon}
							/>
						</TouchableOpacity>
					</Layout>
					<Divider style={styles.divider} />
					<Layout style={styles.settingsItem}>
						<TouchableOpacity
							style={styles.iconTitle}
							onPress={() => setLogoutPanelVisible(true)}
						>
							<Icon
								name="log-out-outline"
								fill={COLORS.error}
								style={styles.icon}
							/>
							<Text style={{ ...styles.iconText, color: COLORS.error }}>
								Logout
							</Text>
						</TouchableOpacity>
					</Layout>
				</Layout>
				<Navbar />
				<Modal
					visible={logoutPanelVisible}
					backdropStyle={styles.backdrop}
					onBackdropPress={() => setLogoutPanelVisible(false)}
					style={styles.modal}
				>
					<Card disabled={true} style={styles.modalContent}>
						<Layout style={styles.modalTitle}>
							<Text
								style={{
									...styles.iconText,
									color: COLORS.error,
									fontFamily: FONTS.semiBold,
								}}
							>
								Logout
							</Text>
						</Layout>
						<Divider />
						<Layout
							style={{
								justifyContent: "center",
								alignItems: "center",
								paddingVertical: SIZES.font,
							}}
						>
							<Text
								style={{
									...styles.iconText,
									textAlign: "center",
									fontSize: SIZES.medium,
									marginBottom: SIZES.large,
								}}
							>
								Are you sure you want to log out?
							</Text>
						</Layout>
						<Layout style={styles.logoutButtonContainer}>
							<CustomButton
								text={"Cancel"}
								backgroundColor={COLORS.secondary}
								flex={1}
								onPress={() => setLogoutPanelVisible(false)}
							/>
							<Layout style={{ width: "5%" }} />
							<CustomButton
								text={"Logout"}
								backgroundColor={COLORS.primary}
								flex={1}
								onPress={() => handleLogout()}
							/>
						</Layout>
					</Card>
				</Modal>
			</SafeAreaView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	settingsContent: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	icon: {
		width: 32,
		height: 32,
		marginRight: SIZES.small,
	},
	iconTitle: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},

	iconText: {
		fontSize: SIZES.large,
		fontFamily: FONTS.medium,
	},
	divider: {
		width: "85%",
	},
	settingsItem: {
		width: "100%",
		paddingVertical: SIZES.extraLarge,
		paddingHorizontal: SIZES.extraLarge,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modal: {
		width: "85%",
	},
	modalContent: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
	},
	logoutButtonContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	modalTitle: {
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: SIZES.font,
	},
});

export default SettingsScreen;
