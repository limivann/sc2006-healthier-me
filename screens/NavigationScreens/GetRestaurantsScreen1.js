import { Layout } from "@ui-kitten/components";
import { StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FocusedStatusBar, RestaurantItem, SearchBar } from "../../components";
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
];

const GetDietHeader = () => {
	return (
		<Layout style={styles.headerContainer}>
			<Text style={styles.headerText}>
				What restaurant would you like to explore today?
			</Text>
			<Layout style={styles.searchBar}>
				<SearchBar onSearch={() => {}} placeholder="Search for a restaurant" />
			</Layout>
		</Layout>
	);
};

const GetRestaurantsScreen1 = () => {
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
						<Text style={styles.bordersText}>Healthy food near you</Text>
					</Layout>
					<Layout style={styles.contentContainer}>
						<FlatList
							data={data}
							renderItem={({ item }) => <RestaurantItem data={item} />}
							keyExtractor={item => item.id}
							style={{ width: "100%" }}
						/>
					</Layout>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default GetRestaurantsScreen1;

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
		paddingTop: 0,
	},
});
