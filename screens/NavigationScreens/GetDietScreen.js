import { Layout, Spinner } from "@ui-kitten/components";
import { Text, FlatList, StyleSheet } from "react-native";
import { FocusedStatusBar, FoodItem, SearchBar } from "../../components";
import { COLORS, FONTS, SIZES } from "../../constants";

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

const GetDietScreen = ({ navigation, route }) => {
	const { data, isDietLoading } = route.params;
	const handlePress = id => {
		const filterData = data.filter(item => item.id == id);
		navigation.navigate("DietDetailsPage", { data: filterData[0] });
	};

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
					{!isDietLoading ? (
						<Layout style={styles.contentContainer}>
							<FlatList
								numColumns={2}
								data={data}
								renderItem={({ item }) => (
									<FoodItem data={item} onPress={handlePress} />
								)}
								keyExtractor={item => item.id}
							/>
						</Layout>
					) : (
						<Layout style={styles.spinner}>
							<Spinner status="primary" size="giant" />
						</Layout>
					)}
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
		paddingTop: 0,
	},
	spinner: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
