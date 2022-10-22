import { StyleSheet, Text } from "react-native";
import { Layout } from "@ui-kitten/components";
import { COLORS, FONTS, SIZES } from "../constants";
import AddButton from "./AddButton";

const PersonalFoodLabelBar = () => {
	return (
		<Layout style={styles.content}>
			<Layout style={styles.container}>
				<Layout style={styles.foodLabelLeft}>
					<Text style={styles.foodLabelNameText}>
						Chicken Breast, raw, with skin
					</Text>
					<Text style={styles.foodLabelCalText}>195 cal, 113g</Text>
				</Layout>
				<Layout style={styles.foodLabelRight}>
					<AddButton color={COLORS.primary} />
				</Layout>
			</Layout>
		</Layout>
	);
};
export default PersonalFoodLabelBar;

const styles = StyleSheet.create({
	content: {
		marginHorizontal: "5%",
		marginVertical: SIZES.base,
		backgroundColor: "#ececec",
		borderRadius: 10,
	},
	container: {
		paddingVertical: SIZES.small,
		paddingHorizontal: SIZES.small,
		backgroundColor: "transparent",
		flexDirection: "row",
		justifyContent: "space-between",
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
