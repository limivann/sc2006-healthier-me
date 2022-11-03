import { Layout } from "@ui-kitten/components";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { FONTS, SIZES } from "../constants";

const FoodItem = ({ data, onPress }) => {
	return (
		<TouchableOpacity
			style={styles.foodContainer}
			onPress={() => onPress(data.id)}
		>
			<Layout style={styles.food}>
				<Image
					source={{ uri: data.foodImg }}
					style={styles.img}
					resizeMode="cover"
				/>
				<Layout style={styles.foodTextContainer}>
					<Text style={styles.foodText}>{data.foodName}</Text>
				</Layout>
			</Layout>
		</TouchableOpacity>
	);
};

export default FoodItem;

const styles = StyleSheet.create({
	foodContainer: {
		width: "50%",
		padding: SIZES.base,
		backgroundColor: "transparent",
	},
	food: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	img: {
		width: "100%",
		height: 150,
		borderRadius: SIZES.large,
		borderColor: "black",
		borderWidth: 1,
	},
	foodText: {
		textAlign: "center",
		fontFamily: FONTS.bold,
		color: "white",
		paddingVertical: 6,
	},
	foodTextContainer: {
		position: "absolute",
		width: "100%",
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		borderBottomLeftRadius: SIZES.large,
		borderBottomRightRadius: SIZES.large,
	},
});
