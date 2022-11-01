import { useEffect, useRef, useState } from "react";
import { Layout, Text, Avatar, Spinner } from "@ui-kitten/components";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { FocusedStatusBar, HomePageIcon, CustomButton } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";
import { VictoryPie } from "victory-native";
import { auth, db } from "../firebase/firebase-config";
import DateComponent from "../components/DateComponent";
import { doc, getDoc } from "firebase/firestore";
import { getFoodHistory } from "../firebase/firestore";
import {
	calculateCaloriesNeeded,
	calculateRemainingCalories,
	calculateTotalCaloriesConsumed,
} from "../utils";

const MiddleLabel = ({ caloriesRemaining }) => {
	return (
		<Layout style={styles.midLabel}>
			<Text style={styles.caloriesText}>{caloriesRemaining}</Text>
			<Text style={styles.remainingText}>Remaining</Text>
		</Layout>
	);
};
const HomeScreen = ({ navigation }) => {
	const [isHistoryLoading, setIsHistoryLoading] = useState(true);
	const [dates, setDates] = useState([
		{
			id: 1,
			dayOfWeek: "Sat",
			dayOfMonth: "26",
			isFocused: false,
		},
		{
			id: 2,
			dayOfWeek: "Sun",
			dayOfMonth: "27",
			isFocused: false,
		},
		{
			id: 3,
			dayOfWeek: "Mon",
			dayOfMonth: "28",
			isFocused: false,
		},
		{
			id: 4,
			dayOfWeek: "Tue",
			dayOfMonth: "29",
			isFocused: false,
		},
		{
			id: 5,
			dayOfWeek: "Wed",
			dayOfMonth: "30",
			isFocused: false,
		},
		{
			id: 6,
			dayOfWeek: "Wed",
			dayOfMonth: "30",
			isFocused: false,
		},
		{
			id: 7,
			dayOfWeek: "Wed",
			dayOfMonth: "30",
			isFocused: true,
		},
	]);

	const [caloriesData, setCaloriesData] = useState({
		baseGoal: 2940,
		food: 370,
		exercise: 0,
	});

	const focusDate = id => {
		const temp = [];
		dates.forEach(d => {
			if (d.id === id) {
				temp.push({ ...d, isFocused: true });
			} else {
				temp.push({ ...d, isFocused: false });
			}
		});
		setDates(temp);
	};

	const [history, setHistory] = useState({
		breakfast: [],
		lunch: [],
		dinner: [],
	});

	// user details
	const [name, setName] = useState("");

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const userDocRef = doc(db, "users", auth.currentUser.uid);
				const docSnap = await getDoc(userDocRef);
				if (docSnap.exists()) {
					const user = docSnap.data();
					setName(user.displayName);
					let activityLevelInCalories = 0;
					if (user.activityLevel === "Not Very Active") {
						activityLevelInCalories = 0;
					} else if (user.activityLevel === "Lightly Active") {
						activityLevelInCalories = 200;
					} else if (user.activityLevel === "Active") {
						activityLevelInCalories = 400;
					} else {
						activityLevelInCalories = 600;
					}
					return {
						isMale: user.gender == "male" ? true : false,
						weight: user.weight,
						height: user.height,
						age: user.age,
						activityLevel: activityLevelInCalories,
					};
				}
			} catch (error) {
				console.log(error);
			}
		};
		const fetchHistory = async ({
			isMale,
			weight,
			height,
			age,
			activityLevel,
		}) => {
			try {
				const today = new Date();
				const day = today.getDay();
				const month = today.getMonth();
				const year = today.getFullYear();
				const todayAsStr = day + "_" + month + "_" + year;
				const userDailyConsumptionRef = doc(
					db,
					"users",
					auth.currentUser.uid,
					"userDailyConsumption",
					todayAsStr
				);
				const docSnap = await getDoc(userDailyConsumptionRef);
				let foodConsumed = 0;
				if (docSnap.exists()) {
					let breakfastTemp = await getFoodHistory(docSnap.data()?.breakfast);
					let lunchTemp = await getFoodHistory(docSnap.data()?.lunch);
					let dinnerTemp = await getFoodHistory(docSnap.data()?.dinner);
					Promise.all([breakfastTemp, lunchTemp, dinnerTemp]).then(() => {
						setHistory({
							breakfast: breakfastTemp,
							lunch: lunchTemp,
							dinner: dinnerTemp,
						});

						foodConsumed = calculateTotalCaloriesConsumed(
							breakfastTemp,
							lunchTemp,
							dinnerTemp
						);
					});
				} else {
					foodConsumed = 0;
				}
				Promise.all([docSnap]).then(() => {
					setCaloriesData({
						baseGoal: calculateCaloriesNeeded(isMale, weight, height, age),
						food: foodConsumed,
						exercise: activityLevel,
					});
					setIsHistoryLoading(false);
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserData().then(data => {
			fetchHistory(data);
		});
	}, []);

	// for scroll view
	const scrollViewRef = useRef();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			{!isHistoryLoading ? (
				<>
					<Layout
						style={{
							width: "100%",
							alignItems: "center",
							padding: SIZES.font,
						}}
					>
						<Layout
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								width: "90%",
								marginBottom: SIZES.large,
								paddingTop: "5%",
							}}
						>
							<Layout>
								<Text
									style={{
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
										color: COLORS.gray,
										paddingBottom: SIZES.font,
									}}
								>
									Good Morning!
								</Text>
								<Text
									style={{
										fontFamily: FONTS.bold,
										fontSize: SIZES.extraLarge,
									}}
								>
									{name}
								</Text>
							</Layout>
							<Avatar source={assets.avatar} size="giant" />
						</Layout>

						<Layout style={{ height: 100 }}>
							<FlatList
								horizontal={true}
								data={dates}
								renderItem={({ item }) => (
									<DateComponent date={item} onPress={focusDate} />
								)}
								ref={scrollViewRef}
								onContentSizeChange={() =>
									scrollViewRef.current.scrollToEnd({ animated: true })
								}
								keyExtractor={item => item.id}
								// style={{ width: "100%" }}
							/>
						</Layout>

						<Layout
							style={{
								borderRadius: SIZES.font,
								...SHADOWS.dark,
							}}
						>
							<Layout
								style={{
									padding: SIZES.font,
									paddingBottom: 0,
								}}
							>
								<Text
									style={{
										fontFamily: FONTS.bold,
										fontSize: SIZES.large,
									}}
								>
									Calories
								</Text>
								<Text
									style={{
										fontFamily: FONTS.regular,
										fontSize: SIZES.font,
									}}
								>
									Remaining = Goal - Food + Exercise
								</Text>
							</Layout>
							<Layout
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Layout
									style={{
										justifyContent: "center",
										alignItems: "center",
										width: "60%",
									}}
								>
									<VictoryPie
										data={[
											{
												x: "Consumed",
												y:
													(caloriesData.food /
														(caloriesData.baseGoal + caloriesData.exercise)) *
													360,
											},
											{
												x: "Remaining",
												y:
													(calculateRemainingCalories(
														caloriesData.baseGoal,
														caloriesData.food,
														caloriesData.exercise
													) /
														(caloriesData.baseGoal + caloriesData.exercise)) *
													360,
											},
										]}
										width={200}
										height={250}
										innerRadius={70}
										labels={() => null}
										style={{
											data: {
												fill: ({ datum }) => {
													return datum.x === "Consumed"
														? COLORS.primary
														: "#e4e6eb";
												},
											},
										}}
									/>
									<MiddleLabel
										caloriesRemaining={calculateRemainingCalories(
											caloriesData.baseGoal,
											caloriesData.food,
											caloriesData.exercise
										)}
									/>
								</Layout>
								<Layout
									style={{
										width: "40%",
									}}
								>
									<HomePageIcon
										source={assets.flagIcon}
										title="Base Goal"
										data={caloriesData.baseGoal}
									/>
									<HomePageIcon
										source={assets.eatIcon}
										title="Food"
										data={caloriesData.food}
									/>
									<HomePageIcon
										source={assets.fireIcon}
										title="Exercise"
										data={caloriesData.exercise}
									/>
								</Layout>
							</Layout>
						</Layout>
					</Layout>
					<Layout style={styles.button}>
						<CustomButton
							text={"View History"}
							backgroundColor={COLORS.primary}
							onPress={() =>
								navigation.navigate("FoodHistoryPage", { data: history })
							}
						></CustomButton>
					</Layout>
				</>
			) : (
				<Layout style={styles.spinner}>
					<Spinner status="primary" size="giant" />
				</Layout>
			)}
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	spinner: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	midLabel: {
		position: "absolute",
		alignItems: "center",
	},
	caloriesText: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
		color: "black",
	},
	remainingText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.small,
		color: COLORS.gray,
	},
	lineChart: {
		width: 123,
		height: 200,
	},
	button: {
		width: "100%",
		paddingHorizontal: "8%",
		marginTop: "auto",
	},
});
