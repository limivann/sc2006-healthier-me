import { Layout, Spinner } from "@ui-kitten/components";
import { useState } from "react";
import {
	Text,
	FlatList,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { FocusedStatusBar, FoodItem, SearchBar } from "../../components";
import { assets, COLORS, FONTS, SIZES } from "../../constants";

const GetDietHeader = ({ handleSearch }) => {
	return (
		<Layout style={styles.headerContainer}>
			<Text style={styles.headerText}>What food do you want to eat today?</Text>
			<Layout style={styles.searchBar}>
				<SearchBar onSearch={handleSearch} placeholder="Search for a food" />
			</Layout>
		</Layout>
	);
};

const GetDietScreen = ({ navigation, route }) => {
	const { dietsData, isDietLoading } = route.params;
	const [displayData, setDisplayData] = useState(dietsData);
	const handlePress = id => {
		const filterData = dietsData.filter(item => item.id == id);
		navigation.navigate("DietDetailsPage", { data: filterData[0] });
	};

	const handleSearch = value => {
		if (!value.length) {
			setDisplayData(dietsData);
			return;
		}
		const filteredData = dietsData.filter(item => {
			return item.foodName.toLowerCase().includes(value.toLowerCase());
		});
		setDisplayData(filteredData);
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
					<GetDietHeader handleSearch={handleSearch} />
					<Layout style={styles.borders}>
						<Text style={styles.bordersText}>Healthier diets for you</Text>
					</Layout>
					{!isDietLoading ? (
						<Layout style={styles.contentContainer}>
							{displayData.length > 0 ? (
								<FlatList
									numColumns={2}
									data={displayData}
									renderItem={({ item }) => (
										<FoodItem data={item} onPress={handlePress} />
									)}
									keyExtractor={item => item.id}
								/>
							) : (
								<TouchableWithoutFeedback
									onPress={() => {
										Keyboard.dismiss();
									}}
								>
									<Layout style={styles.content}>
										<Image source={assets.magnifierIcon} style={styles.image} />
										<Text
											style={{
												fontFamily: FONTS.bold,
												fontSize: 24,
												paddingVertical: SIZES.large,
											}}
										>
											No Results Found
										</Text>
									</Layout>
								</TouchableWithoutFeedback>
							)}
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
		paddingTop: 0,
	},
	spinner: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		alignItems: "center",
		flex: 1,
		paddingTop: 75,
	},
	image: {
		resizeMode: "contain",
		height: 150,
	},
});
