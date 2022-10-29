import { useEffect, useState } from "react";
import {
	Layout,
	Text,
	Select,
	SelectItem,
	Tab,
	TabBar,
	Spinner,
	Autocomplete,
	AutocompleteItem,
	Icon,
} from "@ui-kitten/components";
import {
	Image,
	StyleSheet,
	FlatList,
	SafeAreaView,
	Keyboard,
	Platform,
	TouchableOpacity,
} from "react-native";
import {
	FocusedStatusBar,
	SearchBar,
	CustomButton,
	PersonalFoodLabelBar,
	ResultsFoodLabel,
} from "../components";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { searchFood } from "../services";

const movies = [
	{ title: "Star Wars" },
	{ title: "Back to the Future" },
	{ title: "The Matrix" },
	{ title: "Inception" },
	{ title: "Interstellar" },
];

const showEvent = Platform.select({
	android: "keyboardDidShow",
	default: "keyboardWillShow",
});

const hideEvent = Platform.select({
	android: "keyboardDidHide",
	default: "keyboardWillHide",
});

const filter = (item, query) =>
	item.title.toLowerCase().includes(query.toLowerCase());

const AllTabScreen = ({ navigation }) => {
	// autocomplete
	const [value, setValue] = useState(null);
	const [data, setData] = useState(movies);
	const [placement, setPlacement] = useState("bottom");

	const [isAddLoading, setIsAddLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
	const [loadingSearch, setLoadingSearch] = useState(true);

	useEffect(() => {
		// auto complete
		const keyboardShowListener = Keyboard.addListener(showEvent, () => {
			setPlacement("bottom");
		});

		const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
			setPlacement("bottom");
		});

		return () => {
			keyboardShowListener.remove();
			keyboardHideListener.remove();
		};
	}, []);

	const handleSearch = async () => {
		if (value == null) {
			return;
		}
		setIsSearchBarVisible(false);
		const data = await searchFood(value);
		setResults(data);
		setLoadingSearch(false);
	};

	const onSelect = index => {
		setValue(movies[index].title);
	};

	const onChangeText = query => {
		setValue(query);
		setData(movies.filter(item => filter(item, query)));
	};

	const renderOption = (item, index) => (
		<AutocompleteItem key={index} title={item.title} />
	);

	const renderIcon = props => (
		<TouchableOpacity onPress={() => handleSearch()}>
			<Icon {...props} name="search-outline" />
		</TouchableOpacity>
	);

	return (
		<Layout
			style={{
				alignItems: "center",
				width: "100%",
				flex: 1,
			}}
		>
			{isSearchBarVisible ? (
				<Layout
					style={{
						width: "100%",
						paddingHorizontal: "5%",
					}}
				>
					<Text style={styles.queryText}>What are you having today?</Text>
					<Autocomplete
						placeholder="Search for a food"
						value={value}
						placement={placement}
						onChangeText={onChangeText}
						onSelect={onSelect}
						style={styles.autocomplete}
						accessoryRight={renderIcon}
					>
						{data.map(renderOption)}
					</Autocomplete>
				</Layout>
			) : (
				<Layout style={styles.resultsContainer}>
					<Text style={styles.resultsText}>Search Results</Text>
					{!loadingSearch ? (
						<>
							<Layout style={{ width: "100%", flex: 1 }}>
								{results.length != 0 && <ResultsFoodLabel data={results[0]} />}
							</Layout>

							<Layout style={styles.buttonContainer}>
								<Text style={styles.notText}>Not what you looking for?</Text>
								<CustomButton
									text={"Try again"}
									backgroundColor={COLORS.gray}
									onPress={() => {}}
								/>
								{!isAddLoading ? (
									<CustomButton
										text={"Create personal food label"}
										backgroundColor={COLORS.primary}
										onPress={() => navigation.navigate("CreateFoodLabelPage")}
									/>
								) : (
									<CustomButton backgroundColor={COLORS.lightPrimary} flex={1}>
										<Spinner status="basic" size="small" />
									</CustomButton>
								)}
							</Layout>
						</>
					) : (
						<Layout style={styles.spinner}>
							<Spinner status="primary" size="giant" />
						</Layout>
					)}
				</Layout>
			)}

			{/* <Layout style={{ width: "100%", marginTop: "15%" }}>
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
				</Layout> */}
		</Layout>
	);
};

const MyPersonalFoodLabelTab = ({ data, navigation }) => {
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
					</Layout>
				</Layout>
			)}
			<Layout style={styles.recordContainer}>
				<CustomButton
					text={"Create Personal Food Label"}
					backgroundColor={COLORS.primary}
					onPress={() => navigation.navigate("CreateFoodLabelPage")}
				/>
			</Layout>
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
						<MyPersonalFoodLabelTab
							data={personalFoodLabelData}
							navigation={navigation}
						/>
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
	queryText: {
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.large,
		paddingVertical: SIZES.medium,
	},
	autocomplete: {},
	resultsContainer: {
		width: "100%",
		paddingHorizontal: "5%",
		paddingVertical: SIZES.extraLarge,
		flex: 1,
	},
	resultsText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.medium,
	},
	idvContainer: {
		paddingVertical: SIZES.base,
	},
	buttonContainer: {
		marginTop: "auto",
		paddingTop: SIZES.base,
	},
	notText: {
		fontFamily: FONTS.medium,
		paddingBottom: SIZES.small,
		textAlign: "center",
		fontSize: SIZES.font,
		color: COLORS.error,
	},
	spinner: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
export default RecordScreen;
