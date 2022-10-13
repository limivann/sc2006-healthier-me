import {
	StyleSheet,
	View,
	StatusBar,
	Platform,
	SafeAreaView,
} from "react-native";

const FocusedStatusBar = ({ backgroundColor, ...props }) => {
	return (
		<View style={[styles.statusBar, { backgroundColor }]}>
			<SafeAreaView>
				<StatusBar translucent backgroundColor={backgroundColor} {...props} />
			</SafeAreaView>
		</View>
	);
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
	statusBar: {
		height: STATUSBAR_HEIGHT,
		zIndex: 2,
	},
});

export default FocusedStatusBar;
