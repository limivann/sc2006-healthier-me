import {
	Text,
	Layout,
	Input,
	Spinner,
	IndexPath,
	Select,
	SelectItem,
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	Image,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { COLORS, FONTS, SIZES, SHADOWS, assets } from "../constants";
import { CustomButton, EditButton, FocusedStatusBar } from "../components";
import { calculateBmi } from "../utils";
import { UserController } from "../firebase/firestore/UserController";
const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const activityLevelSelection = [
	"Not Very Active",
	"Lightly Active",
	"Active",
	"Very Active",
];

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [age, setAge] = useState("");
	const [bmi, setBmi] = useState("");
	const [isMale, setIsMale] = useState(true);

	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isEditingLoading, setIsEditingLoading] = useState(false);

	// all editing stuff
	const [editingHeight, setEditingHeight] = useState("");
	const [editingWeight, setEditingWeight] = useState("");
	const [editingAge, setEditingAge] = useState("");
	const [editingActivityLevel, setEditingActivityLevel] = useState(
		new IndexPath(0)
	);

	const [activityLevelIndex, setActivityLevelIndex] = useState(
		new IndexPath(0)
	);

	const displayValue = activityLevelSelection[activityLevelIndex.row];
	const displayValueEditing = activityLevelSelection[editingActivityLevel.row];

	const [errorText, setErrorText] = useState("");
	const [successMessageVisible, setSuccessMessageVisible] = useState(false);

	const renderOption = (title, index) => (
		<SelectItem title={title} key={index} />
	);

	useEffect(() => {
		const fetchData = async () => {
			const temp = await UserController.fetchData();
			setName(temp.displayName);
			setAge(+temp.age);
			setEmail(temp.email);
			setHeight(+temp.height);
			setWeight(+temp.weight);
			if (temp.gender === "male") {
				setIsMale(true);
			} else {
				setIsMale(false);
			}
			if (temp.activityLevel === "Not Very Active") {
				setActivityLevelIndex(new IndexPath(0));
			} else if (temp.activityLevel === "Lightly Active") {
				setActivityLevelIndex(new IndexPath(1));
			} else if (temp.activityLevel === "Active") {
				setActivityLevelIndex(new IndexPath(2));
			} else {
				setActivityLevelIndex(new IndexPath(3));
			}
			const tempBmi = calculateBmi(temp.weight, temp.height);
			setBmi(tempBmi);
			setIsLoading(false);
		};
		setIsLoading(true);
		fetchData();
	}, []);

	const handleEdit = () => {
		if (isEditing) {
			setIsEditing(false);
			setErrorText("");
			return;
		}
		setEditingHeight(height);
		setEditingWeight(weight);
		setEditingAge(age);
		setEditingActivityLevel(activityLevelIndex);
		setIsEditing(true);
	};

	const handleSubmitEdit = async () => {
		setIsEditingLoading(true);
		if (!isEditing) {
			setIsEditingLoading(false);
			return;
		}
		if (
			editingHeight === height &&
			editingWeight === weight &&
			editingAge === age &&
			displayValue === displayValueEditing
		) {
			setIsEditingLoading(false);
			setIsEditing(false);
			return;
		}
		// check height is numeric
		if (isNaN(editingHeight)) {
			setErrorText("Height must be a number");
			setIsEditingLoading(false);
			return;
		}

		// check height
		if (!(editingHeight >= 140 && editingHeight <= 210)) {
			setErrorText("Height must be within the range of 140 cm to 210 cm");
			setIsEditingLoading(false);
			return;
		}

		// check weight is numeric
		if (isNaN(editingWeight)) {
			setErrorText("Weight must be a number");
			setIsEditingLoading(false);
			return;
		}

		// check weight
		if (!(editingWeight >= 40 && editingWeight <= 130)) {
			setErrorText("Weight must be within the range of 40kg to 130kg");
			setIsEditingLoading(false);
			return;
		}

		// check age is numeric and integer
		if (isNaN(editingAge) || !Number.isInteger(+editingAge)) {
			setErrorText("Age must be an integer");
			setIsEditingLoading(false);
			return;
		}

		// check age
		if (!(editingAge >= 12 && editingAge <= 99)) {
			setErrorText("Age must be within the range of 12 and 99");
			setIsEditingLoading(false);
			return;
		}

		// update
		const newData = {
			age: +editingAge,
			height: +editingHeight,
			weight: +editingWeight,
			activityLevel: displayValueEditing,
		};
		const { success } = await UserController.updateData(newData);
		if (!success) {
			setErrorText("Something went wrong");
			setIsEditingLoading(false);
			return;
		}
		setHeight(editingHeight);
		setWeight(editingWeight);
		setAge(editingAge);
		setActivityLevelIndex(editingActivityLevel);
		const tempBmi = calculateBmi(editingWeight, editingHeight);
		setBmi(tempBmi);
		setIsEditingLoading(false);
		setIsEditing(false);
		setSuccessMessageVisible(true);
		setErrorText("");
		setTimeout(() => {
			setSuccessMessageVisible(false);
		}, 2000);
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
				backgroundColor={COLORS.primary}
				barStyle="dark-content"
			/>
			{!isLoading ? (
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<Layout
						style={{
							alignItems: "center",
							flex: 1,
							justifyContent: "space-around",
						}}
					>
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
							<EditButton onPress={() => handleEdit()} color="white" />
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
							source={isMale ? assets.avatarMale : assets.avatarFemale}
						/>
						<Layout style={styles.headerContent}>
							<Text style={styles.name}>{name}</Text>
							<Text style={styles.userInfo}>{email}</Text>
							<Text style={styles.userInfo}>Singapore</Text>
						</Layout>

						<Layout style={styles.profileContent}>
							<Layout style={styles.row}>
								<Layout style={styles.component}>
									<Text style={styles.title}>Height (cm)</Text>
									{isEditing ? (
										<Input
											style={{
												...styles.input,
												backgroundColor: "#F7F9FC",
											}}
											value={editingHeight.toString()}
											textStyle={{ color: "black" }}
											keyboardType="numeric"
											onChangeText={nextValue => setEditingHeight(nextValue)}
										/>
									) : (
										<Input
											style={{
												...styles.input,
												backgroundColor: "white",
											}}
											disabled={true}
											value={height.toString()}
											textStyle={{ color: "black" }}
										/>
									)}
								</Layout>
								<Layout style={styles.component}>
									<Text style={styles.title}>Weight (kg)</Text>
									{isEditing ? (
										<Input
											style={{
												...styles.input,
												backgroundColor: "#F7F9FC",
											}}
											value={editingWeight.toString()}
											textStyle={{ color: "black" }}
											keyboardType="numeric"
											onChangeText={nextValue => setEditingWeight(nextValue)}
										/>
									) : (
										<Input
											style={{
												...styles.input,
												backgroundColor: "white",
											}}
											disabled={true}
											value={weight.toString()}
											textStyle={{ color: "black" }}
										/>
									)}
								</Layout>
							</Layout>
							<Layout style={styles.row}>
								<Layout style={styles.component}>
									<Text style={styles.title}>Age</Text>
									{isEditing ? (
										<Input
											style={{
												...styles.input,
												backgroundColor: "#F7F9FC",
											}}
											value={editingAge.toString()}
											textStyle={{ color: "black" }}
											keyboardType="numeric"
											onChangeText={nextValue => setEditingAge(nextValue)}
										/>
									) : (
										<Input
											style={{
												...styles.input,
												backgroundColor: "white",
											}}
											disabled={true}
											value={age.toString()}
											textStyle={{ color: "black" }}
										/>
									)}
								</Layout>
								<Layout style={styles.component}>
									<Text style={styles.title}>BMI</Text>
									<Input
										style={{
											...styles.input,
											backgroundColor: "white",
										}}
										disabled={true}
										value={bmi}
										textStyle={{ color: "black" }}
									/>
								</Layout>
							</Layout>
							<Layout style={styles.row}>
								<Layout style={styles.longComponent}>
									<Text style={styles.title}>Activity Level</Text>
									{isEditing ? (
										<Select
											style={{
												...styles.input,
											}}
											value={displayValueEditing}
											selectedIndex={editingActivityLevel}
											onSelect={index => setEditingActivityLevel(index)}
										>
											{activityLevelSelection.map(renderOption)}
										</Select>
									) : (
										<Select
											style={{
												...styles.input,
											}}
											value={displayValue}
											selectedIndex={activityLevelIndex}
											onSelect={index => setActivityLevelIndex(index)}
											disabled={true}
										>
											{activityLevelSelection.map(renderOption)}
										</Select>
									)}
								</Layout>
							</Layout>
							{errorText && (
								<Layout style={styles.errorContainer}>
									<Text style={styles.errorText}>{errorText}</Text>
								</Layout>
							)}
							{successMessageVisible && (
								<Layout style={styles.successMessageContainer}>
									<Text style={styles.successMessageText}>
										{"Profile edited successfully!"}
									</Text>
								</Layout>
							)}
						</Layout>
						{isEditing ? (
							<Layout style={styles.cancelSaveButtons}>
								<CustomButton
									text={"Cancel"}
									backgroundColor={COLORS.secondary}
									flex={1}
									onPress={() => handleEdit()}
								/>
								<Layout style={{ width: "5%" }} />
								{!isEditingLoading ? (
									<CustomButton
										text={"Save"}
										backgroundColor={COLORS.primary}
										flex={1}
										onPress={() => handleSubmitEdit()}
									/>
								) : (
									<CustomButton backgroundColor={COLORS.lightPrimary} flex={1}>
										<Spinner status="basic" size="small" />
									</CustomButton>
								)}
							</Layout>
						) : (
							<Layout style={{ height: 75 }} />
						)}
					</Layout>
				</TouchableWithoutFeedback>
			) : (
				<Layout style={styles.spinner}>
					<Spinner status="primary" size="giant" />
				</Layout>
			)}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.primary,
		height: 150,
		width: "100%",
		position: "absolute",
		top: 0,
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
		marginBottom: 36,
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
		...SHADOWS.light,
	},
	cancelSaveButtons: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "75%",
		paddingTop: "5%",
	},
	spinner: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		width: "100%",
	},
	errorText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.font,
		color: COLORS.error,
		paddingTop: SIZES.base,
	},
	successMessageContainer: {
		width: "100%",
	},
	successMessageText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.font,
		color: COLORS.primary,
		paddingTop: SIZES.base,
	},
});

export default ProfileScreen;
