import { StyleSheet, Text } from "react-native";
import { Layout } from "@ui-kitten/components";
import { COLORS, FONTS, SIZES } from "../constants";
import AddButton from "./AddButton";

const PersonalFoodLabelBar = ({ data, onPressAdd }) => {
	return (
		<Layout style={styles.content}>
			<Layout style={styles.container}>
				<Layout style={styles.foodLabelLeft}>
					<Text style={styles.foodLabelNameText}>{data.name}</Text>
					<Text style={styles.foodLabelCalText}>{`${data.calories} kcal`}</Text>
				</Layout>
				<Layout style={styles.foodLabelRight}>
					<AddButton color={COLORS.primary} onPress={onPressAdd} />
				</Layout>
			</Layout>
		</Layout>
	);
};
export default PersonalFoodLabelBar;

const styles = StyleSheet.create({
	content: {
		marginVertical: SIZES.base,
		backgroundColor: "#ececec",
		marginHorizontal: SIZES.medium,
		borderRadius: 10,
	},
	container: {
		paddingVertical: SIZES.small,
		paddingHorizontal: SIZES.small,
		backgroundColor: "transparent",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	foodLabelLeft: {
		backgroundColor: "transparent",
	},
	foodLabelNameText: {
		color: "black",
		fontFamily: FONTS.medium,
		fontSize: SIZES.medium,
	},
	foodLabelCalText: {
		color: COLORS.gray,
		fontFamily: FONTS.regular,
		fontSize: SIZES.font,
	},
	foodLabelRight: {
		backgroundColor: "transparent",
	},
});
