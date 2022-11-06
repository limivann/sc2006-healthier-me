import { Layout, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import {
	Platform,
	StyleSheet,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { FocusedStatusBar } from "../components";
import { assets, COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { DietsController } from "../firebase/firestore/DietsController";
import { RestaurantController } from "../firebase/firestore/RestaurantController";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const HealthyDietRestaurantScreen = ({ navigation }) => {
	const [dietsData, setDietsData] = useState([]);
	const [restaurantsData, setRestaurantsData] = useState([]);

	const [isDietLoading, setIsDietLoading] = useState(true);
	const [isResLoading, setIsResLoading] = useState(true);

	useEffect(() => {
		const fetchDietData = async () => {
			const results = await DietsController.fetchDietData();
			setIsDietLoading(false);
			setDietsData(results);
		};
		const fetchRestaurantData = async () => {
			const results = await RestaurantController.fetchRestaurantData();
			setIsResLoading(false);
			setRestaurantsData(results);
		};
		fetchDietData();
		fetchRestaurantData();
	}, []);

	return (
		<Layout style={{ flex: 1 }}>
			<FocusedStatusBar
				backgroundColor={COLORS.primary}
				barStyle="dark-content"
			/>
			<SafeAreaView style={{ flex: 1 }}>
				<Layout
					style={{
						width: "100%",
						height: TITLEBAR_HEIGHT,
						backgroundColor: COLORS.primary,
						justifyContent: "flex-end",
						padding: 10,
					}}
				>
					<Text
						style={{
							fontFamily: FONTS.bold,
							textAlign: "center",
							paddingBottom: SIZES.font,
							color: COLORS.white,
							fontSize: SIZES.large,
						}}
					>
						Navigation
					</Text>
				</Layout>
				<Layout style={styles.content}>
					<TouchableOpacity
						style={{ marginBottom: SIZES.extraLarge }}
						onPress={() =>
							navigation.navigate("GetDietPage", {
								dietsData,
								isDietLoading,
							})
						}
					>
						<Layout style={styles.container}>
							<Image source={assets.healthyFoodIcon} style={styles.image} />
							<Layout style={styles.right}>
								<Text style={styles.titleText}>Healthy Diets</Text>
								<Text style={styles.description}>
									Get recommended diets which consist of your favourite
									ingredients or dishes
								</Text>
							</Layout>
						</Layout>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() =>
							navigation.navigate("GetRestaurantsPage", {
								restaurantsData,
								isResLoading,
							})
						}
					>
						<Layout style={styles.container}>
							<Image
								source={assets.healthyRestaurantIcon}
								style={styles.image}
							/>
							<Layout style={styles.right}>
								<Text style={styles.titleText}>Healthy Restaurants</Text>
								<Text style={styles.description}>
									Filter recommended healthy restaurants based on your current
									location
								</Text>
							</Layout>
						</Layout>
					</TouchableOpacity>
				</Layout>
			</SafeAreaView>
		</Layout>
	);
};

export default HealthyDietRestaurantScreen;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: "5%",
	},
	titleText: {
		paddingVertical: "5%",
		color: "black",
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
	},
	description: {
		color: COLORS.gray,
		fontFamily: FONTS.medium,
		fontSize: SIZES.font,
	},
	image: {
		height: 120,
		width: 120,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "white",
		paddingHorizontal: "7.5%",
		paddingVertical: "7.5%",
		...SHADOWS.medium,
		borderRadius: SIZES.medium,
		minHeight: 200,
	},
	right: {
		width: "65%",
		paddingHorizontal: SIZES.large,
	},
});
