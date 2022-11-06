import { Icon, Layout } from "@ui-kitten/components";
import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { BackButton, CustomButton, FocusedStatusBar } from "../../components";
import { COLORS, FONTS, SIZES } from "../../constants";
import * as Linking from "expo-linking";

const RestaurantDetailsScreen = ({ navigation, route }) => {
	const { data } = route?.params;
	const handlePress = () => {
		Linking.openURL(data.locationUrl);
	};

	return (
		<Layout style={{ flex: 1 }}>
			<FocusedStatusBar backgroundColor="transparent" barStyle="dark-content" />
			<Image
				style={styles.image}
				source={{ uri: data.imageUrl }}
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
				<Layout style={styles.titleAndDist}>
					<Text style={styles.title}>{data.title}</Text>
					{/* <Text style={styles.distance}>{data.rating} km</Text> */}
				</Layout>
				<Text style={styles.shortDescription}>{data.shortDesc}</Text>
				<Text style={styles.longDescription}>{data.longDesc}</Text>
				<Layout style={styles.optionsContainer}>
					<Layout style={styles.optionsInnerContainer}>
						{data.isDineInAvail && (
							<>
								<Icon
									fill={COLORS.primary}
									name="checkmark-circle-outline"
									style={styles.icon}
								/>
								<Text style={styles.optionText}>Dine In</Text>
							</>
						)}
					</Layout>
					<Layout style={styles.optionsInnerContainer}>
						{data.isTakeawayAvail && (
							<>
								<Icon
									fill={COLORS.primary}
									name="checkmark-circle-outline"
									style={styles.icon}
								/>
								<Text style={styles.optionText}>Takeaway</Text>
							</>
						)}
					</Layout>
				</Layout>
				<Layout style={styles.statusContainer}>
					<Text style={styles.statusText}>
						{data.status ? "Open" : "Close"} now.
					</Text>
					<Text style={styles.statusOppositeText}>
						Opening Time {data.openingTime}
					</Text>
				</Layout>
				<Layout style={styles.button}>
					<CustomButton
						text={"Directions"}
						backgroundColor={COLORS.primary}
						onPress={() => handlePress()}
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

export default RestaurantDetailsScreen;

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
	titleAndDist: {
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
	distance: {
		fontFamily: FONTS.regular,
		color: COLORS.gray,
		fontSize: SIZES.medium,
		letterSpacing: 1,
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
		marginBottom: SIZES.small,
	},
	optionsContainer: {
		flexDirection: "row",
		width: "100%",
		marginBottom: SIZES.small,
	},
	optionsInnerContainer: {
		flex: 1,
		paddingHorizontal: "4%",
		flexDirection: "row",
		alignItems: "center",
	},
	optionText: {
		paddingLeft: SIZES.base,
		fontFamily: FONTS.semiBold,
		color: COLORS.gray,
		fontSize: SIZES.medium,
	},
	contentContainer: {
		width: "100%",
		alignItems: "center",
		paddingHorizontal: "4%",
		flex: 1,
		backgroundColor: "white",
	},
	statusContainer: {
		width: "100%",
		paddingHorizontal: "4%",
	},
	statusText: {
		fontSize: SIZES.large,
		fontFamily: FONTS.bold,
		color: COLORS.primary,
		letterSpacing: 1,
		paddingVertical: SIZES.base,
	},
	statusOppositeText: {
		fontSize: SIZES.medium,
		fontFamily: FONTS.medium,
		color: COLORS.gray,
	},
	icon: {
		width: 26,
		height: 26,
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
