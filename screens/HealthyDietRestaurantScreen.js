import { Layout, Text } from "@ui-kitten/components";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	query,
} from "firebase/firestore";
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
import { db } from "../firebase/firebase-config";

const TITLEBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const HealthyDietRestaurantScreen = ({ navigation }) => {
	const [dietsData, setDietsData] = useState([]);
	const [restaurantsData, setRestaurantsData] = useState([]);

	const [isDietLoading, setIsDietLoading] = useState(true);
	const [isResLoading, setIsResLoading] = useState(true);

	useEffect(() => {
		const getSingleDoc = async ref => {
			const docSnap = await getDoc(ref);
			if (docSnap.exists()) {
				return docSnap.data();
			}
			return null;
		};

		const getRestaurants = async refs => {
			const temp = [];
			for (const ref of refs) {
				const restaurants = await getSingleDoc(ref);
				temp.push(restaurants);
			}
			return temp;
		};
		const fetchDietData = async () => {
			const dietsRef = collection(db, "diets");
			const q = query(dietsRef, limit(8));
			const querySnapshot = await getDocs(q);
			const tempDiets = [];
			querySnapshot.forEach(async doc => {
				const restaurantsRefs = doc.data().restaurants;
				const results = await getRestaurants(restaurantsRefs);
				const formattedDiet = {
					id: doc.id,
					foodName: doc.data().name,
					calories: doc.data().calories,
					foodImg: doc.data().imageUrl,
					description: doc.data().longDescription,
					restaurants: [...results],
				};
				tempDiets.push(formattedDiet);
			});
			setIsDietLoading(false);
			setDietsData(tempDiets);
		};
		const fetchRestaurantData = async () => {
			const restaurantRef = collection(db, "restaurants");
			const q = query(restaurantRef, limit(8));
			const querySnapshot = await getDocs(q);
			const tempRestaurants = [];
			querySnapshot.forEach(async doc => {
				const formattedRestaurant = {
					id: doc.id,
					title: doc.data().name,
					shortDesc: doc.data().shortDescription,
					longDesc: doc.data().longDescription,
					rating: doc.data().rating,
					locationUrl: doc.data().locationUrl,
					openingTime: "7.00 am ~ 9.00 pm",
					status: true,
					isDineInAvail: true,
					isTakeawayAvail: true,
					imageUrl: doc.data().imageUrl,
					locationUrl: doc.data().locationUrl,
				};
				tempRestaurants.push(formattedRestaurant);
			});
			setIsResLoading(false);
			setRestaurantsData(tempRestaurants);
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
