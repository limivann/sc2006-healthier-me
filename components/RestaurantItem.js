import { Icon, Layout } from "@ui-kitten/components";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { assets, COLORS, FONTS, SIZES } from "../constants";

const RestaurantItem = () => {
	return (
		<TouchableOpacity style={styles.restaurantContainer}>
			<Layout style={styles.restaurant}>
				<Image
					source={assets.chickenRiceImg}
					style={styles.img}
					resizeMode="cover"
				/>
				<Layout style={styles.restaurantDescContainer}>
					<Layout style={styles.restaurantDesc}>
						<Layout style={styles.titleAndDistance}>
							<Text style={styles.title}>The Crowded Bowl</Text>
							<Text style={styles.distance}>0.1km</Text>
						</Layout>
						<Layout style={styles.descriptionContainer}>
							<Icon
								fill={COLORS.gray}
								name="menu-outline"
								style={styles.descriptionIcon}
							/>
							<Text style={styles.descriptionText}>Organic Greens, Salads</Text>
						</Layout>
						<Layout style={styles.descriptionContainer}>
							<Icon
								fill={COLORS.gray}
								name="clock-outline"
								style={styles.descriptionIcon}
							/>
							<Text style={styles.descriptionText}>
								<Text
									style={{ color: COLORS.primary, fontFamily: FONTS.semiBold }}
								>
									Open now
								</Text>
								. Closes 8:00pm
							</Text>
						</Layout>

						<Text style={styles.descriptionText}>Dine In | Takeaway</Text>
					</Layout>
					<Layout style={styles.navigate}>
						<Icon
							fill="white"
							name="navigation-2-outline"
							style={styles.navigateIcon}
						/>
					</Layout>
				</Layout>
			</Layout>
		</TouchableOpacity>
	);
};

export default RestaurantItem;

const styles = StyleSheet.create({
	restaurantContainer: {
		width: "100%",
		padding: SIZES.base,
	},
	restaurant: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		borderRadius: SIZES.large,
		borderColor: COLORS.gray,
		borderWidth: 1,
	},
	img: {
		width: "100%",
		height: 250,
		borderRadius: SIZES.large,
		zIndex: 1,
	},

	restaurantDescContainer: {
		zIndex: 2,
		position: "absolute",
		width: "100%",
		bottom: 0,
		display: "flex",
		flexDirection: "row",
		borderBottomLeftRadius: SIZES.large,
		borderBottomRightRadius: SIZES.large,
	},
	restaurantDesc: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		paddingHorizontal: SIZES.extraLarge,
		paddingVertical: SIZES.small,
		borderBottomLeftRadius: SIZES.large,
	},
	titleAndDistance: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: SIZES.base,
		alignItems: "flex-end",
	},
	title: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
		paddingRight: SIZES.base,
	},
	distance: {
		fontFamily: FONTS.regular,
		color: COLORS.gray,
		letterSpacing: 1,
	},
	descriptionContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 2,
	},
	descriptionIcon: {
		width: SIZES.extraLarge,
		height: SIZES.extraLarge,
		marginRight: SIZES.small,
	},
	descriptionText: {
		fontFamily: FONTS.regular,
		color: COLORS.gray,
		fontSize: SIZES.font,
	},
	navigate: {
		width: "20%",
		backgroundColor: COLORS.primary,
		justifyContent: "center",
		alignItems: "center",
		borderBottomRightRadius: SIZES.large,
	},
	navigateIcon: {
		width: 40,
		height: 40,
	},
});
