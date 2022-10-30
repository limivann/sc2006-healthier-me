import {
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
} from "react-native";
import { Layout } from "@ui-kitten/components";
import { BackButton, FocusedStatusBar, HistoryComponent } from "../components";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { useEffect, useState } from "react";
import Date from "../components/DateComponent";

const FoodHistoryScreen = ({ navigation, route }) => {
	const { data } = route?.params;
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
	console.log(data);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar barStyle="dark-content" backgroundColor="transparent" />
			<Layout style={styles.container}>
				<Layout style={styles.headerContainer}>
					<Text style={styles.header}>Food History</Text>
					<BackButton
						top={"50%"}
						left={4}
						backgroundColor={"transparent"}
						color={COLORS.primary}
						onPress={() => navigation.goBack()}
					/>
				</Layout>
				<Layout style={styles.datesContainer}>
					<FlatList
						horizontal={true}
						data={dates}
						renderItem={({ item }) => <Date date={item} onPress={focusDate} />}
						keyExtractor={item => item.id}
						style={{ width: "100%" }}
					/>
				</Layout>
			</Layout>
			<ScrollView contentContainerStyle={styles.historyContainer}>
				<Layout>
					<Text style={styles.title}>Breakfast</Text>
					{data?.breakfast.map((item, index) => {
						return <HistoryComponent key={index} data={item} />;
					})}
				</Layout>
				<Layout>
					<Text style={styles.title}>Lunch</Text>
					{data?.lunch.map((item, index) => {
						return <HistoryComponent key={index} data={item} />;
					})}
				</Layout>
				<Layout>
					<Text style={styles.title}>Dinner</Text>
					{data?.dinner.map((item, index) => {
						return <HistoryComponent key={index} data={item} />;
					})}
				</Layout>
			</ScrollView>
		</SafeAreaView>
	);
};

export default FoodHistoryScreen;

const styles = StyleSheet.create({
	headerContainer: {
		width: "100%",
		backgroundColor: "#F9F9F9",
		alignItems: "center",
		paddingVertical: "5%",
		...SHADOWS.light,
	},
	header: {
		color: COLORS.primary,
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
	},
	container: {
		alignItems: "center",
	},
	datesContainer: {
		height: 100,
		marginTop: SIZES.extraLarge,
	},
	historyContainer: {
		width: "100%",
		paddingHorizontal: "5%",
		backgroundColor: "white",
	},
	title: {
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.medium,
		paddingHorizontal: SIZES.base,
		paddingVertical: SIZES.base,
	},
});
