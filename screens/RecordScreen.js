import { useState } from "react";
import {
	Layout,
	Text,
	Select,
	SelectItem,
	Input,
	Tab,
	TabBar,
	TabView,
} from "@ui-kitten/components";
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Image,
	Platform,
	StyleSheet,
} from "react-native";
import { FocusedStatusBar, SearchBar, CustomButton } from "../components";
import { COLORS, FONTS, SIZES, assets } from "../constants";

const AllTabScreen = () => {
	return (
		<Layout style={{ alignItems: "center", justifyContent: "center" }}>
			<Layout>
				<Text style={{ fontFamily: FONTS.bold, marginBottom: SIZES.large }}>
					Search Results
				</Text>
			</Layout>
			<Layout style={styles.content}>
				<Image source={assets.magnifierIcon} style={styles.image} />
				<Text
					style={{
						fontFamily: FONTS.bold,
						fontSize: SIZES.extraLarge,
						paddingTop: SIZES.font,
					}}
				>
					No Results Found
				</Text>
				<Text
					style={{
						textAlign: "center",
						color: COLORS.gray,
						fontFamily: FONTS.regular,
						fontSize: SIZES.font,
						marginBottom: SIZES.font,
					}}
				>
					Please check spelling or {"\n"}
					create a personal food label
				</Text>
				<CustomButton
					text={"Create Personal Food Label"}
					backgroundColor={COLORS.primary}
					width="70%"
					borderRadius={SIZES.large}
				/>
			</Layout>
		</Layout>
	);
};

const RecordScreen = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const option = ["Breakfast", "Lunch", "Dinner"];
	const displayValue = option[selectedIndex.row];
	const renderOption = title => (
		<SelectItem key={option.indexOf(title)} title={title} />
	);
	const [searchValue, setSearchValue] = useState("");
	const handleSearch = value => {
		// if (!value.length) return setSearchValue("")
		// const filteredData = data.filter((foodLabel) => foodLabel.name.toLowerCase().includes(value.toLowerCase()));
		// filteredData.length ? setSearchValue(filteredData) : searchValue("")
	};

	const [tabSelectedIndex, setTabSelectedIndex] = useState(0);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.select({
				ios: () => -200,
				android: () => -200,
			})()}
		>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Layout
					style={{
						alignItems: "center",
						height: "100%",
					}}
				>
					<Layout style={styles.select}>
						<Select
							status="primary"
							size="large"
							placeholder="Select a meal"
							selectedIndex={selectedIndex}
							value={displayValue}
							onSelect={index => setSelectedIndex(index)}
						>
							{option.map(renderOption)}
						</Select>
					</Layout>
					<Layout
						style={{
							marginVertical: SIZES.font,
							width: "90%",
						}}
					>
						<SearchBar onSearch={handleSearch} />
					</Layout>
					<Layout style={{ width: "100%" }}>
						<TabBar
							selectedIndex={tabSelectedIndex}
							onSelect={index => setTabSelectedIndex(index)}
						>
							<Tab title="All" />
							<Tab title="My Personal Food Labels" />
						</TabBar>
					</Layout>
					{tabSelectedIndex === 0 ? <AllTabScreen /> : <></>}
				</Layout>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	select: {
		width: "100%",
	},
	content: {
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		resizeMode: "contain",
		height: "40%",
	},
});
export default RecordScreen;
