import { Layout, Text } from "@ui-kitten/components";
import { Image, StyleSheet } from "react-native";
import { FONTS, SIZES } from "../constants";

const HomePageIcon = ({ source, title, data }) => {
	return (
		<Layout style={[styles.container]}>
			<Image source={source} style={[styles.image]} />
			<Layout>
				<Text style={[styles.title]}>{title}</Text>
				<Text style={[styles.data]}>{data}</Text>
			</Layout>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: SIZES.base,
	},

	image: {
		resizeMode: "contain",
		width: 40,
		height: 40,
		marginRight: 15,
	},
	title: { fontFamily: FONTS.regular, fontSize: SIZES.font },
	data: { fontFamily: FONTS.bold, fontSize: SIZES.regular },
});
export default HomePageIcon;
