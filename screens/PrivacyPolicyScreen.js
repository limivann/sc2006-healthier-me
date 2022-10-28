import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { BackButton, FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const PrivacyPolicyScreen = ({ navigation }) => {
	return (
		<Layout style={{ flex: 1 }}>
			<FocusedStatusBar
				backgroundColor={COLORS.primary}
				barStyle="dark-content"
			/>
			<SafeAreaView style={{ flex: 1 }}>
				<BackButton onPress={() => navigation.goBack()} color="white" />
				<Layout style={styles.container}>
					<Text style={styles.header1}>Privacy Policy</Text>
				</Layout>
				<ScrollView>
					<Layout style={{ margin: SIZES.font }}>
						<Text style={styles.header2}>Privacy Policy</Text>
						<Text style={styles.text}>
							{`HealthierMe Pte Ltd built the HealthierMe app as a Free app. This SERVICE is provided by HealthierMe Pte Ltd at no cost and is intended for use as is.\n\nThis page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.\n\nIf you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.\n\nThe terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at HealthierMe unless otherwise defined in this Privacy Policy.`}
						</Text>
						<Text style={styles.header2}>Information Collection and Use</Text>
						<Text style={styles.text}>
							{`For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Name, Age, Email, Height, Weight, Gender, Location, Activity level, Restaurant search history, Food search history, Food records. The information that we request will be retained by us and used as described in this privacy policy.\n\nThe app does use third-party services that may collect information used to identify you.\n\nLink to the privacy policy of third-party service providers used by the app\n\nGoogle Play Services\nGoogle Analytics for Firebase\nFirebase Crashlitics\nLog Data`}
						</Text>
						<Text style={styles.header2}>Cookies</Text>
						<Text style={styles.text}>
							{`Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.\n\nThis Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.`}
						</Text>
						<Text style={styles.header2}>Service Provider</Text>
						<Text style={styles.text}>
							{`We may employ third-party companies and individuals due to the following reasons:
							\nTo facilitate our Service;\nTo provide the Service on our behalf;\nTo perform Service-related services; or\nTo assist us in analyzing how our Service is used.\n\nWe want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.`}
						</Text>
						<Text style={styles.header2}>Security</Text>
						<Text style={styles.text}>
							{`We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.`}
						</Text>
						<Text style={styles.header2}>Links to Other Sites</Text>
						<Text style={styles.text}>
							{`This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.`}
						</Text>
						<Text style={styles.header2}>Changes to This Privacy Policy</Text>
						<Text style={styles.text}>
							{`We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.\n\nThis policy is effective as of 2022-10-22`}
						</Text>
						<Text style={styles.header2}>Contact Us</Text>
						<Text style={styles.text}>
							{`If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at HealthierMePteLtd@gmail.com`}
						</Text>
					</Layout>
				</ScrollView>
			</SafeAreaView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: TITLEBAR_HEIGHT,
		backgroundColor: COLORS.primary,
		justifyContent: "flex-end",
	},
	header1: {
		fontFamily: FONTS.bold,
		textAlign: "center",
		paddingBottom: SIZES.font,
		color: COLORS.white,
		fontSize: SIZES.large,
	},
	header2: {
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.large,
		paddingVertical: SIZES.font,
	},
	text: {
		fontFamily: FONTS.regular,
		fontSize: SIZES.font,
		color: COLORS.gray,
		textAlign: "justify",
	},
});

export default PrivacyPolicyScreen;
