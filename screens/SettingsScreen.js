import { useEffect, useState } from "react";
import { Divider, Icon, Layout, Text, Toggle } from "@ui-kitten/components";
import { FocusedStatusBar, Navbar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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

	useEffect(() => {
		// TODO: initialize notifications and location checked?
	}, []);
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
							style={styles.toggle}
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
							style={styles.toggle}
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
						<TouchableOpacity style={styles.iconTitle}>
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
	toggle: {},
});

export default SettingsScreen;
