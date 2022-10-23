import { useState } from "react";
import { Layout, Text, Avatar } from "@ui-kitten/components";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { FocusedStatusBar, HomePageIcon, CustomButton } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES, assets } from "../constants";
import { VictoryPie } from "victory-native";
import Date from "../components/Date";

const MiddleLabel = () => {
	return (
		<Layout style={styles.midLabel}>
			<Text style={styles.caloriesText}>2560</Text>
			<Text style={styles.remainingText}>Remaining</Text>
		</Layout>
	);
};
const HomeScreen = ({ navigation }) => {
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
	]);

	const [caloriesData, setCaloriesData] = useState([
		{
			baseGoal: 2940,
			Food: 370,
			Exercise: 0,
		},
	]);

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

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar barStyle="dark-content" backgroundColor="transparent" />
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
							Victoria
						</Text>
					</Layout>
					<Avatar source={assets.avatar} size="giant" />
				</Layout>

				<Layout style={{ height: 100 }}>
					<FlatList
						horizontal={true}
						data={dates}
						renderItem={({ item }) => <Date date={item} onPress={focusDate} />}
						keyExtractor={item => item.id}
						style={{ width: "100%" }}
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
									{ x: "Cats", y: 30 },
									{ x: "Dogs", y: 40 },
									{ x: "Birds", y: 55 },
								]}
								width={200}
								height={250}
								innerRadius={70}
								labels={() => null}
								style={{
									data: {
										fill: ({ datum }) => {
											return datum.x === "Cats" ? COLORS.primary : "#e4e6eb";
										},
									},
								}}
							/>
							<MiddleLabel />
						</Layout>
						<Layout
							style={{
								width: "40%",
							}}
						>
							<HomePageIcon
								source={assets.flagIcon}
								title="Base Goal"
								data={2940}
							/>
							<HomePageIcon source={assets.eatIcon} title="Food" data={370} />
							<HomePageIcon
								source={assets.fireIcon}
								title="Exercise"
								data={0}
							/>
						</Layout>
					</Layout>
				</Layout>
			</Layout>
			<Layout style={styles.button}>
				<CustomButton
					text={"View History"}
					backgroundColor={COLORS.primary}
					onPress={() => navigation.navigate("FoodHistoryPage")}
				></CustomButton>
			</Layout>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
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
