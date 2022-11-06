import { Icon, Layout } from "@ui-kitten/components";
import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { BackButton, CustomButton, FocusedStatusBar } from "../../components";
import { COLORS, FONTS, SIZES } from "../../constants";

const DietDetails = ({ navigation, route }) => {
	const { data } = route?.params;
	const handleFindRestaurants = () => {
		const restaurant = data.restaurants[0];
		const formattedRestaurant = {
			distance: 1.0,
			imageUrl: restaurant.imageUrl,
			isDineInAvail: true,
			isTakeawayAvail: true,
			locationUrl: restaurant.locationUrl,
			longDesc: restaurant.longDescription,
			shortDesc: restaurant.shortDescription,
			openingTime: "7.00 am ~ 9.00 pm",
			rating: restaurant.rating,
			status: true,
			title: restaurant.name,
		};
		navigation.navigate("RestaurantDetailsPage", { data: formattedRestaurant });
	};
	return (
		<Layout style={{ flex: 1 }}>
			<FocusedStatusBar backgroundColor="transparent" barStyle="dark-content" />
			<Image
				style={styles.image}
				source={{ uri: data.foodImg }}
				resizeMode="cover"
			/>
			<BackButton
				onPress={() => navigation.goBack()}
				color="white"
				backgroundColor="transparent"
				top={50}
			/>
			<Layout style={styles.overlay} />
			<Layout style={styles.rounded} />
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<Layout style={styles.titleContainer}>
					<Text style={styles.title}>{data.foodName}</Text>
				</Layout>
				<Text style={styles.shortDescription}>{data.dietType}</Text>
				<Text style={styles.longDescription}>{data.description}</Text>
				<Layout style={styles.button}>
					<CustomButton
						text={"Find Restaurants"}
						backgroundColor={COLORS.primary}
						onPress={() => handleFindRestaurants()}
					>
						<Icon
							fill="white"
							name="navigation-2-outline"
							style={styles.navigateIcon}
						/>
					</CustomButton>
				</Layout>
			</ScrollView>
		</Layout>
	);
};

export default DietDetails;

const styles = StyleSheet.create({
	overlay: {
		width: "100%",
		height: "35%",
		position: "absolute",
		backgroundColor: "rgba(0,0,0,0.3)",
	},
	image: {
		width: "100%",
		height: "35%",
		position: "absolute",
	},
	rounded: {
		backgroundColor: "white",
		zIndex: 1,
		width: "100%",
		marginTop: "50%",
		height: 30,
		borderTopLeftRadius: SIZES.extraLarge,
		borderTopRightRadius: SIZES.extraLarge,
	},
	contentContainer: {
		width: "100%",
		alignItems: "center",
		paddingHorizontal: "4%",
		flex: 1,
		backgroundColor: "white",
	},
	titleContainer: {
		flexDirection: "row",
		width: "100%",
		paddingHorizontal: "4%",
		alignItems: "center",
	},
	title: {
		flex: 1,
		fontFamily: FONTS.bold,
		fontSize: SIZES.extraLarge,
	},
	shortDescription: {
		width: "100%",
		paddingHorizontal: "4%",
		paddingVertical: SIZES.font,
		fontFamily: FONTS.bold,
		color: COLORS.gray,
		fontSize: SIZES.large,
	},
	longDescription: {
		width: "100%",
		paddingHorizontal: "4%",
		color: COLORS.gray,
		fontSize: SIZES.medium,
		fontFamily: FONTS.regular,
		marginBottom: SIZES.extraLarge,
	},
	navigateIcon: {
		width: 26,
		height: 26,
		marginRight: 10,
	},
	button: {
		width: "92%",
		marginTop: "auto",
	},
});
