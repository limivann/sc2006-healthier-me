import { Text, Layout } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";

const DateComponent = ({ date, onPress }) => {
	const { id, dayOfWeek, dayOfMonth, isFocused } = date;

	return (
		<TouchableOpacity
			onPress={() => {
				onPress(id);
			}}
			style={{
				alignItems: "center",
				marginHorizontal: 6,
			}}
		>
			<Layout
				style={{
					justifyContent: "center",
					height: "80%",
					backgroundColor: isFocused ? COLORS.primary : "#f1f3fa",
					borderRadius: SIZES.base,
					paddingVertical: SIZES.base,
					paddingHorizontal: SIZES.large,
					...SHADOWS.light,
				}}
			>
				<Text
					style={{
						fontFamily: FONTS.regular,
						fontSize: SIZES.small,
						marginBottom: SIZES.base,
						textAlign: "center",
						color: isFocused ? "white" : "black",
					}}
				>
					{dayOfWeek}
				</Text>
				<Text
					style={{
						fontFamily: FONTS.bold,
						fontSize: SIZES.large,
						textAlign: "center",
						color: isFocused ? "white" : "black",
					}}
				>
					{dayOfMonth}
				</Text>
			</Layout>
		</TouchableOpacity>
	);
};
export default DateComponent;
