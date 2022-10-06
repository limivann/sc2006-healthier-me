import { useIsFocused } from "@react-navigation/core";

import {
	StyleSheet,
	View,
	StatusBar,
	Platform,
	SafeAreaView,
} from "react-native";

const FocusedStatusBar = ({ backgroundColor, ...props }) => {
	const isFocused = useIsFocused();
	return isFocused ? (
		<View style={[styles.statusBar, { backgroundColor }]}>
			<SafeAreaView>
				<StatusBar translucent backgroundColor={backgroundColor} {...props} />
			</SafeAreaView>
		</View>
	) : null;
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
	statusBar: {
		height: STATUSBAR_HEIGHT,
		zIndex: 1,
	},
});

export default FocusedStatusBar;
