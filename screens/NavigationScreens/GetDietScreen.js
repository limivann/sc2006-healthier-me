import { Layout } from "@ui-kitten/components";
import { Text, FlatList, StyleSheet } from "react-native";
import { FocusedStatusBar, FoodItem, SearchBar } from "../../components";
import { assets, COLORS, FONTS, SIZES } from "../../constants";

const data = [
	{
		id: 1,
		foodName: "Chicken Breast",
		foodImg: assets.chickenRiceImg,
	},
	{
		id: 2,
		foodName: "Chicken Leg",
		foodImg: assets.chickenRiceImg,
	},
	{
		id: 3,
		foodName: "Chicken Rice",
		foodImg: assets.chickenRiceImg,
	},
	{
		id: 4,
		foodName: "Chicken Rice",
		foodImg: assets.chickenRiceImg,
	},
	{
		id: 5,
		foodName: "Chicken Rice",
		foodImg: assets.chickenRiceImg,
	},
];

const GetDietHeader = () => {
	return (
		<Layout style={styles.headerContainer}>
			<Text style={styles.headerText}>What food do you want to eat today?</Text>
			<Layout style={styles.searchBar}>
				<SearchBar onSearch={() => {}} placeholder="Search for a food" />
			</Layout>
		</Layout>
	);
};

const GetDietScreen = () => {
	return (
		<Layout style={{ flex: 1 }}>
			<FocusedStatusBar
				backgroundColor={COLORS.primary}
				barStyle="dark-content"
			/>
			<Layout
				style={{
					flex: 1,
					width: "100%",
					height: "100%",
					alignItems: "center",
				}}
			>
				<Layout
					style={{
						zIndex: 0,
						flex: 1,
						width: "100%",
						backgroundColor: COLORS.primary,
					}}
				>
					<GetDietHeader />
					<Layout style={styles.borders}>
						<Text style={styles.bordersText}>Healthier diets for you</Text>
					</Layout>
					<Layout style={styles.contentContainer}>
						<FlatList
							numColumns={2}
							data={data}
							renderItem={({ item }) => <FoodItem data={item} />}
							keyExtractor={item => item.id}
						/>
					</Layout>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default GetDietScreen;

const styles = StyleSheet.create({
	borders: {
		backgroundColor: "white",
		borderTopLeftRadius: SIZES.medium,
		borderTopRightRadius: SIZES.medium,
		minHeight: 20,
	},
	bordersText: {
		paddingVertical: SIZES.large,
		paddingHorizontal: "5%",
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
	},
	headerContainer: {
		width: "100%",
		backgroundColor: COLORS.primary,
		paddingBottom: "5%",
	},
	headerText: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
		color: "white",
		paddingHorizontal: "5%",
		paddingVertical: SIZES.large,
	},
	searchBar: {
		backgroundColor: "transparent",
		paddingHorizontal: "5%",
	},
	contentContainer: {
		flex: 1,
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "",
		paddingTop: 0,
	},
});
