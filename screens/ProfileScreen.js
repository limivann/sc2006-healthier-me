import { Text, Layout, Input } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	Image,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { COLORS, FONTS, SIZES, SHADOWS } from "../constants";
import { EditButton, FocusedStatusBar } from "../components";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [age, setAge] = useState("");
	const [bmi, setBmi] = useState("20");
	const [activityLevel, setActivityLevel] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const userDocRef = doc(db, "users", auth.currentUser.uid);
			const docSnap = await getDoc(userDocRef);
			if (docSnap.exists()) {
				const user = docSnap.data();
				setName(user.displayName);
				setAge(user.age);
				setEmail(user.email);
				setWeight(user.weight);
				setActivityLevel(user.activityLevel);
				setHeight(user.height);
			}
		};
		fetchData();
	}, []);

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
			<Layout style={{ alignItems: "center" }}>
				<Layout style={styles.header}></Layout>
				<Layout
					style={{
						width: "100%",
						height: TITLEBAR_HEIGHT,
						backgroundColor: COLORS.primary,
						justifyContent: "flex-end",
						position: "relative",
						alignItems: "center",
					}}
				>
					<EditButton onPress={() => {}} color="white" />
					<Text
						style={{
							fontFamily: FONTS.bold,
							letterSpacing: 1,
							textAlign: "center",
							paddingBottom: SIZES.font,
							color: COLORS.white,
							fontSize: SIZES.large,
						}}
					>
						Profile
					</Text>
				</Layout>
				<Image
					style={styles.avatar}
					source={require("../assets/icons/avatar.png")}
				/>
				<Layout style={styles.headerContent}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.userInfo}>{email}</Text>
					<Text style={styles.userInfo}>Singapore</Text>
				</Layout>

				<Layout style={styles.profileContent}>
					<Layout style={styles.row}>
						<Layout style={styles.component}>
							<Text style={styles.title}>Height</Text>
							<Input
								style={styles.input}
								disabled={true}
								value={height}
								textStyle={{ color: "black" }}
							/>
						</Layout>
						<Layout style={styles.component}>
							<Text style={styles.title}>Weight</Text>
							<Input
								style={styles.input}
								disabled={true}
								value={weight}
								textStyle={{ color: "black" }}
							/>
						</Layout>
					</Layout>
					<Layout style={styles.row}>
						<Layout style={styles.component}>
							<Text style={styles.title}>Age</Text>
							<Input
								style={styles.input}
								disabled={true}
								value={age}
								textStyle={{ color: "black" }}
							/>
						</Layout>
						<Layout style={styles.component}>
							<Text style={styles.title}>BMI</Text>
							<Input
								style={styles.input}
								disabled={true}
								value={bmi}
								textStyle={{ color: "black" }}
							/>
						</Layout>
					</Layout>
					<Layout style={styles.row}>
						<Layout style={styles.longComponent}>
							<Text style={styles.title}>Activity Level</Text>
							<Input
								style={styles.input}
								disabled={true}
								value={activityLevel}
								textStyle={{ color: "black" }}
							/>
						</Layout>
					</Layout>
				</Layout>
			</Layout>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.primary,
		height: 150,
		width: "100%",
		position: "absolute",
	},
	headerContent: {
		alignItems: "center",
		marginBottom: SIZES.font,
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 75,
		borderWidth: 4,
		borderColor: "white",
		alignSelf: "center",
		marginTop: 30,
		marginBottom: 15,
	},
	name: {
		fontSize: 30,
		color: "black",
		fontFamily: FONTS.bold,
		letterSpacing: 1,
	},
	userInfo: {
		fontSize: 16,
		color: COLORS.gray,
		paddingVertical: 2,
		fontFamily: FONTS.light,
		letterSpacing: 0.5,
	},
	profileContent: {
		width: "75%",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 10,
	},
	component: {
		width: "40%",
	},
	longComponent: {
		width: "90%",
	},
	title: {
		fontSize: SIZES.medium,
		color: "black",
		fontFamily: FONTS.medium,
		paddingVertical: SIZES.base,
	},
	input: {
		fontSize: SIZES.medium,
		fontFamily: FONTS.medium,
		backgroundColor: "white",
		...SHADOWS.light,
	},
});

export default ProfileScreen;
