import { StyleSheet, Text } from "react-native";
import { Layout } from "@ui-kitten/components";
import { COLORS, FONTS, SIZES } from "../constants";
import CloseButton from "./CloseButton";

const HistoryComponent = ({ data, onPressClose }) => {
	return (
		<Layout style={styles.container}>
			<Layout style={styles.timeContainer}>
				<Text style={styles.time}>{data.time}</Text>
			</Layout>
			<Layout style={styles.foodContainer}>
				<Layout style={styles.left}>
					<Text style={styles.foodTitle}>{data.foodName}</Text>
					<Text style={styles.foodDescription}>
						{`${data.totalCalories} kcal, ${data.servingQuantity} ${data.servingUnit}`}
					</Text>
				</Layout>
				<Layout style={styles.right}>
					<CloseButton color={COLORS.primary} onPress={onPressClose} />
				</Layout>
			</Layout>
		</Layout>
	);
};

export default HistoryComponent;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: SIZES.medium,
	},
	foodContainer: {
		width: "100%",
		padding: SIZES.base,
		backgroundColor: "#f5f5f5",
		borderRadius: 10,
		borderTopLeftRadius: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	left: {
		backgroundColor: "transparent",
	},
	foodTitle: {
		color: "black",
		fontFamily: FONTS.medium,
		fontSize: SIZES.medium,
		paddingVertical: 2,
	},
	foodDescription: {
		color: COLORS.gray,
		fontFamily: FONTS.regular,
		fontSize: SIZES.font,
	},
	timeContainer: {
		backgroundColor: "#f5f5f5",
		maxWidth: 85,
		paddingHorizontal: SIZES.base,
		paddingVertical: 4,
		justifyContent: "center",
		alignItems: "center",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	time: {
		fontFamily: FONTS.medium,
		color: COLORS.primary,
		fontSize: SIZES.font,
	},
	right: {
		backgroundColor: "transparent",
	},
});
