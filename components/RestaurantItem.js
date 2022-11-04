import { Icon, Layout } from "@ui-kitten/components";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const RestaurantItem = ({ data, onPress }) => {
	return (
		<TouchableOpacity
			style={styles.restaurantContainer}
			onPress={() => onPress(data.id)}
		>
			<Layout style={styles.restaurant}>
				<Image
					source={{
						uri: data.imageUrl,
					}}
					style={styles.img}
					resizeMode="cover"
				/>
				<Layout style={styles.restaurantDescContainer}>
					<Layout style={styles.restaurantDesc}>
						<Layout style={styles.titleAndDistance}>
							<Text style={styles.title}>{data.title}</Text>
							{/* <Text style={styles.distance}>{data.rating}/5</Text> */}
						</Layout>
						<Layout style={styles.descriptionContainer}>
							<Icon
								fill={COLORS.gray}
								name="menu-outline"
								style={styles.descriptionIcon}
							/>
							<Text style={styles.descriptionText}>{data.shortDesc}</Text>
						</Layout>
						<Layout style={styles.descriptionContainer}>
							<Icon
								fill={COLORS.gray}
								name="clock-outline"
								style={styles.descriptionIcon}
							/>
							<Text style={styles.descriptionText}>
								<Text
									style={{
										color: data.status ? COLORS.primary : COLORS.error,
										fontFamily: FONTS.semiBold,
									}}
								>
									{data.status ? "Open" : "Close"} now. {`\n`}
								</Text>
								Opening Time {data.openingTime}
							</Text>
						</Layout>

						<Text style={styles.descriptionText}>{data.option}</Text>
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
		paddingHorizontal: SIZES.large,
		paddingVertical: SIZES.small,
		borderBottomLeftRadius: SIZES.large,
	},
	titleAndDistance: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: SIZES.base,
		alignItems: "center",
		width: "100%",
	},
	title: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
		paddingRight: SIZES.base,
		width: "80%",
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
		paddingRight: 28,
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
