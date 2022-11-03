import { Layout, Input, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../constants";

const SearchBar = ({ onSearch, placeholder }) => {
	const SearchIcon = props => <Icon {...props} name="search-outline" />;
	return (
		<Layout style={styles.container}>
			<Input
				style={styles.input}
				placeholder={placeholder}
				onChangeText={value => onSearch(value)}
				accessoryLeft={SearchIcon}
			/>
		</Layout>
	);
};
const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "transparent",
	},
	input: {
		borderRadius: SIZES.large,
		borderColor: COLORS.primary,
		...SHADOWS.light,
	},
});

export default SearchBar;
