import { Layout, Spinner } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const LoadingPage = () => {
	return (
		<Layout style={styles.spinner}>
			<Spinner status="primary" size="giant" />
		</Layout>
	);
};

export default LoadingPage;

const styles = StyleSheet.create({
	spinner: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
