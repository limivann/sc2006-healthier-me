import { Layout } from "@ui-kitten/components";
import { Image, Platform, SafeAreaView, Text } from "react-native";
import { COLORS, assets, SIZES } from "../../constants";
import NavbarIcons from "./NavbarIcons";

const NAVBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const Navbar = () => {
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
				<NavbarIcons icon={assets.homeIcon} />
				<NavbarIcons icon={assets.profileIcon} />
				<NavbarIcons icon={assets.addIcon} />
				<NavbarIcons icon={assets.navigateIcon} />
				<NavbarIcons icon={assets.settingsIcon} />
			</SafeAreaView>
		</Layout>
	);
};

export default Navbar;
