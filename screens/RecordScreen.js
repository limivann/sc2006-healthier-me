import { useEffect, useState } from "react";
import {
	Layout,
	Text,
	Select,
	SelectItem,
	Tab,
	TabBar,
	Spinner,
} from "@ui-kitten/components";
import {
	Image,
	StyleSheet,
	FlatList,
	SafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import {
	FocusedStatusBar,
	SearchBar,
	CustomButton,
	PersonalFoodLabelBar,
} from "../components";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";

const AllTabScreen = ({ navigation }) => {
	const handleSearch = value => {
		// if (!value.length) return setSearchValue("")
		// const filteredData = data.filter((foodLabel) => foodLabel.name.toLowerCase().includes(value.toLowerCase()));
		// filteredData.length ? setSearchValue(filteredData) : searchValue("")
	};
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<Layout style={{ alignItems: "center", width: "100%" }}>
				<Layout
					style={{
						width: "100%",
						paddingHorizontal: "5%",
						marginBottom: SIZES.extraLarge,
					}}
				>
					<SearchBar onSearch={handleSearch} placeholder="Search for a food" />
				</Layout>
				<Layout style={{ width: "100%", marginTop: "15%" }}>
					<Layout style={{ width: "100%" }}>
						<Text
							style={{
								fontFamily: FONTS.bold,
								marginBottom: SIZES.large,
								textAlign: "center",
							}}
						>
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
							paddingHorizontal={SIZES.large}
							borderRadius={SIZES.large}
							onPress={() => navigation.navigate("CreateFoodLabelPage")}
						/>
					</Layout>
				</Layout>
			</Layout>
		</TouchableWithoutFeedback>
	);
};

const MyPersonalFoodLabelTab = ({ data }) => {
	return (
		<Layout style={styles.foodLabelsContainer}>
			{data.length !== 0 ? (
				<FlatList
					data={data}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <PersonalFoodLabelBar data={item} />}
					style={{ width: "100%", flex: 1 }}
				/>
			) : (
				<Layout
					style={{ justifyContent: "center", width: "95%", height: "80%" }}
				>
					<Layout style={styles.content}>
						<Image source={assets.noDataIcon} style={styles.image} />
						<Text
							style={{
								fontFamily: FONTS.bold,
								fontSize: SIZES.extraLarge,
								paddingTop: SIZES.font,
								paddingHorizontal: SIZES.large,
								marginBottom: SIZES.font,
							}}
						>
							Oops, nothing here
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
							Please create a personal food label
						</Text>
						<CustomButton
							text={"Create Personal Food Label"}
							backgroundColor={COLORS.primary}
							width="70%"
							borderRadius={SIZES.large}
						/>
					</Layout>
				</Layout>
			)}
			{data.length !== 0 ? (
				<Layout style={styles.recordContainer}>
					<CustomButton
						text={"Add to consumption"}
						backgroundColor={COLORS.primary}
						onPress={() => {}}
					/>
				</Layout>
			) : (
				<></>
			)}
		</Layout>
	);
};

const RecordScreen = ({ navigation }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const option = ["Breakfast", "Lunch", "Dinner"];
	const displayValue = option[selectedIndex.row];
	const renderOption = title => (
		<SelectItem key={option.indexOf(title)} title={title} />
	);
	const [searchValue, setSearchValue] = useState("");

	const [tabSelectedIndex, setTabSelectedIndex] = useState(0);
	const [personalFoodLabelData, setPersonalFoodLabelData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchFoodLabelData = async () => {
			setIsLoading(true);
			try {
				const personalFoodLabelRef = collection(
					db,
					"users",
					auth.currentUser.uid,
					"personalFoodLabel"
				);
				const q = query(personalFoodLabelRef);
				const querySnapshot = await getDocs(q);
				const tempData = [];
				querySnapshot.forEach(doc => {
					const formattedData = {
						id: doc.id,
						name: doc.data().name,
						calories: doc.data().calories,
					};
					tempData.push(formattedData);
				});
				setPersonalFoodLabelData(tempData);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		fetchFoodLabelData();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FocusedStatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent={true}
			/>

			{!isLoading ? (
				<Layout
					style={{
						alignItems: "center",
						flex: 1,
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

					<Layout style={{ width: "100%" }}>
						<TabBar
							selectedIndex={tabSelectedIndex}
							onSelect={index => setTabSelectedIndex(index)}
						>
							<Tab title="All" />
							<Tab title="My Personal Food Labels" />
						</TabBar>
					</Layout>
					{tabSelectedIndex === 0 ? (
						<AllTabScreen navigation={navigation} />
					) : (
						<MyPersonalFoodLabelTab data={personalFoodLabelData} />
					)}
				</Layout>
			) : (
				<Layout style={styles.spinner}>
					<Spinner status="primary" size="giant" />
				</Layout>
			)}
		</SafeAreaView>
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
	foodLabelsContainer: {
		paddingVertical: SIZES.base,
		alignItems: "center",
		width: "100%",
		flex: 1,
		paddingBottom: 80,
	},
	recordContainer: {
		position: "absolute",
		width: "100%",
		bottom: 0,
		paddingVertical: SIZES.font,
		paddingHorizontal: "10%",
	},
	spinner: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
export default RecordScreen;
