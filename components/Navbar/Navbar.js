import { Layout } from "@ui-kitten/components";
import { Image, Platform, SafeAreaView, Text } from "react-native";
import { COLORS, assets, SIZES } from "../../constants";
import NavbarIcons from "./NavbarIcons";

const NAVBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

// 1 - 5, if index == 1 - home is fill etc
const Navbar = ({ id }) => {
	return (
		<Layout
			style={{
				position: "absolute",
				bottom: 0,
				backgroundColor: COLORS.primary,
				width: "100%",
				borderTopLeftRadius: SIZES.large,
				borderTopRightRadius: SIZES.large,
			}}
		>
			<SafeAreaView
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-around",
					paddingHorizontal: SIZES.extraLarge,
					alignItems: "center",
				}}
			>
				<NavbarIcons iconName="home" fill={id === 1} />
				<NavbarIcons iconName="person" fill={id === 2} />
				<NavbarIcons iconName="plus-square" fill={id === 3} />
				<NavbarIcons iconName="compass" fill={id === 4} />
				<NavbarIcons iconName="settings-2" fill={id === 5} />
			</SafeAreaView>
		</Layout>
	);
};

export default Navbar;
