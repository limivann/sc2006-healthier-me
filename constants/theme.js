import { Dimensions, Platform } from "react-native";

export const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

export const SCREEN_DIM = {
	width: Dimensions.get("window").width,
	height: Dimensions.get("window").height - APPBAR_HEIGHT,
};

export const COLORS = {
	primary: "#72BE79",
	secondary: "#4D626C",
	lightPrimary: "#95ce9a",
	error: "#F81919",
	white: "#FFF",
	gray: "#707070",
	lightgray: "#DCDCDC",
	lightError: "#fa5e5e",
};

export const SIZES = {
	base: 8,
	small: 12,
	font: 14,
	medium: 16,
	large: 18,
	extraLarge: 24,
};

export const FONTS = {
	bold: "InterBold",
	semiBold: "InterSemiBold",
	medium: "InterMedium",
	regular: "InterRegular",
	light: "InterLight",
};

export const SHADOWS = {
	light: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	medium: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,
	},
	dark: {
		shadowColor: COLORS.gray,
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowOpacity: 0.41,
		shadowRadius: 9.11,

		elevation: 14,
	},
};
