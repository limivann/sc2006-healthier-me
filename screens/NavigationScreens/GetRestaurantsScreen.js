import { Layout, Spinner } from "@ui-kitten/components";
import { useState } from "react";
import {
	Image,
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FocusedStatusBar, RestaurantItem, SearchBar } from "../../components";
import { assets, COLORS, FONTS, SIZES } from "../../constants";

const GetRestaurantHeader = ({ handleSearch }) => {
	return (
		<Layout style={styles.headerContainer}>
			<Text style={styles.headerText}>
				What restaurant would you like to explore today?
			</Text>
			<Layout style={styles.searchBar}>
				<SearchBar
					onSearch={handleSearch}
					placeholder="Search for a restaurant"
				/>
			</Layout>
		</Layout>
	);
};

const GetRestaurantsScreen = ({ navigation, route }) => {
	const { restaurantsData, isResLoading } = route.params;
	const [displayData, setDisplayData] = useState(restaurantsData);
	const handlePress = id => {
		const filterData = restaurantsData.filter(item => item.id == id);
		navigation.navigate("RestaurantDetailsPage", { data: filterData[0] });
	};

	const handleSearch = value => {
		if (!value.length) {
			setDisplayData(restaurantsData);
			return;
		}
		const filteredData = restaurantsData.filter(item => {
			return item.title.toLowerCase().includes(value.toLowerCase());
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
					<GetRestaurantHeader handleSearch={handleSearch} />
					<Layout style={styles.borders}>
						<Text style={styles.bordersText}>Healthy food near you</Text>
					</Layout>
					{!isResLoading ? (
						<Layout style={styles.contentContainer}>
							{displayData.length > 0 ? (
								<FlatList
									data={displayData}
									renderItem={({ item }) => (
										<RestaurantItem data={item} onPress={handlePress} />
									)}
									keyExtractor={item => item.id}
									style={{ width: "100%" }}
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

export default GetRestaurantsScreen;

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
