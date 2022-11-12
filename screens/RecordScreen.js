import { useEffect, useState } from "react";
import {
	Layout,
	Text,
	Tab,
	TabBar,
	Spinner,
	Autocomplete,
	AutocompleteItem,
	Icon,
	Modal,
	Card,
	Divider,
	IndexPath,
	Select,
	SelectItem,
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
	CustomButton,
	PersonalFoodLabelBar,
	ResultsFoodLabel,
} from "../components";
import { COLORS, FONTS, SIZES, assets, SHADOWS } from "../constants";
import { searchFood } from "../services";
import { FOODSUGGESTIONS } from "../constants/foodSuggestions";
import { DailyConsumptionController } from "../firebase/firestore/DailyConsumptionController";
import { PersonalFoodLabelController } from "../firebase/firestore/PersonalFoodLabelController";

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

const AllTabScreen = ({ navigation, setPersonalFoodLabelData }) => {
	// autocomplete
	const [value, setValue] = useState("");
	const [suggestions, setSuggestions] = useState(FOODSUGGESTIONS);
	const [data, setData] = useState(suggestions);
	const [placement, setPlacement] = useState("bottom");

	const [isAddLoading, setIsAddLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
	const [loadingSearch, setLoadingSearch] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isSuccessTextVisible, setIsSuccessTextVisible] = useState(false);

	const [modalData, setModalData] = useState({
		foodName: "",
		calories: 0,
		quantity: 0,
		unit: "",
	});

	const meal = ["Breakfast", "Lunch", "Dinner"];

	const [mealIndex, setMealIndex] = useState(new IndexPath(0));
	const mealDisplayValue = meal[mealIndex.row];

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
		if (value == null || value == "") {
			return;
		}
		setLoadingSearch(true);
		setIsSearchBarVisible(false);
		const { data, error } = await searchFood(value);
		if (error) {
			resetSearchFrom();
			setHasError(true);
			return;
		}
		setResults(data);
		setHasError(false);
		setLoadingSearch(false);
	};

	const resetSearchFrom = () => {
		setIsSearchBarVisible(true);
		setResults([]);
		setValue("");
	};

	const handleRecordConsumption = async () => {
		setIsAddLoading(true);
		// record into user daily consumption collection
		const today = new Date();
		const day = today.getDate();
		const month = today.getMonth();
		const year = today.getFullYear();
		const todayAsStr = day + "_" + month + "_" + year;
		const hour = today.getHours();
		const minute = today.getMinutes();
		const second = today.getSeconds();
		let currentTime =
			hour.toString().padStart(2, "0") +
			":" +
			minute.toString().padStart(2, "0") +
			":" +
			second.toString().padStart(2, "0");

		const newConsumption = {
			foodName: modalData.foodName,
			totalCalories: modalData.calories,
			servingQuantity: modalData.quantity,
			servingUnit: modalData.unit,
			time: currentTime,
			dailyConsumptionId: todayAsStr,
		};

		const { success } = await DailyConsumptionController.addDailyConsumption(
			newConsumption,
			todayAsStr,
			meal[mealIndex.row]
		);

		if (success) {
			setIsSuccessTextVisible(true);
			setTimeout(() => {
				setIsAddLoading(false);
				setIsSuccessTextVisible(false);
				// close modal
				setAddConsumptionPanelVisible(false);
			}, 2000);
		}
	};

	// modal
	const [addConsumptionPanelVisible, setAddConsumptionPanelVisible] =
		useState(false);

	const handleAdd = data => {
		if (data) {
			setModalData({
				foodName: data.name,
				calories: data.calories,
				quantity: data.servingQuantity,
				unit: data.servingUnit,
			});
			setAddConsumptionPanelVisible(true);
		}
	};

	const renderMealOption = (title, index) => {
		return <SelectItem title={title} key={index} />;
	};
	// autocomplete
	const onSelect = index => {
		const selected = suggestions[index].title;
		setValue(selected);
	};

	const onChangeText = query => {
		setValue(query);
		setSuggestions(FOODSUGGESTIONS.filter(item => filter(item, query)));
		setData(FOODSUGGESTIONS.filter(item => filter(item, query)));
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
					{hasError && (
						<Text style={styles.errorText}>
							Serving quantity must be greater than 0
						</Text>
					)}
					<Layout style={styles.examplesContainer}>
						<Text style={styles.examplesTitle}>Examples: </Text>
						<Text style={styles.examplesText}>- one serving of salad</Text>
						<Text style={styles.examplesText}>
							- chicken rice and ice lemon tea
						</Text>
						<Text style={styles.examplesText}>
							- 1 set of burger and lobster
						</Text>
						<Text style={styles.examplesText}>
							- 2 slices of peanut butter bread and 1 glass of ice coffee
						</Text>
						<Text style={styles.examplesText}>- 1.5 glass of milk</Text>
						<Text style={styles.examplesText}>- 22 fl oz of cappuccino</Text>
						<Text style={styles.examplesText}>- 3 pieces of grilled chicken</Text>
						<Text style={styles.examplesText}>- 2.5 fillet of seabass</Text>
						<Text style={styles.examplesText}>- half serving of lasagna</Text>
						<Text style={styles.examplesText}>- 2 slices of french toast, 4 dumplings and 1 cup of soya milk</Text>
					</Layout>
				</Layout>
			) : (
				<Layout style={styles.resultsContainer}>
					<Text style={styles.resultsText}>
						{`Search Results ${!loadingSearch ? `(${results.length})` : ""}`}
					</Text>
					{!loadingSearch ? (
						<>
							{results.length != 0 ? (
								<>
									<Layout style={{ width: "100%", flex: 1 }}>
										<FlatList
											data={results}
											keyExtractor={item => item.id}
											renderItem={({ item }) => (
												<ResultsFoodLabel
													data={item}
													onPressAdd={() => handleAdd(item)}
												/>
											)}
											style={{ width: "100%", flex: 1 }}
										/>
									</Layout>

									<Layout style={styles.buttonContainer}>
										<Text style={styles.notText}>
											Not what you looking for?
										</Text>
										<CustomButton
											text={"Try again"}
											backgroundColor={COLORS.gray}
											onPress={() => resetSearchFrom()}
										/>

										<CustomButton
											text={"Create personal food label"}
											backgroundColor={COLORS.primary}
											onPress={() =>
												navigation.navigate("CreateFoodLabelPage", {
													setPersonalFoodLabelData,
												})
											}
										/>
									</Layout>
									<Modal
										visible={isAddLoading || addConsumptionPanelVisible}
										backdropStyle={styles.backdrop}
										onBackdropPress={() => setAddConsumptionPanelVisible(false)}
										style={styles.modal}
									>
										<Card disabled={true} style={styles.modalContent}>
											<Layout style={styles.modalTitle}>
												<Text
													style={{
														fontSize: SIZES.large,
														fontFamily: FONTS.medium,
														color: COLORS.primary,
														fontFamily: FONTS.semiBold,
													}}
												>
													Select Meal
												</Text>
											</Layout>
											<Divider />
											<Layout
												style={{
													justifyContent: "center",
													alignItems: "center",
													paddingVertical: SIZES.font,
												}}
											>
												<Select
													style={styles.mealSelect}
													placeholder="Select a meal"
													value={mealDisplayValue}
													selectedIndex={mealIndex}
													onSelect={index => setMealIndex(index)}
												>
													{meal.map(renderMealOption)}
												</Select>
												<Text style={styles.foodNameText}>
													{modalData.foodName}
												</Text>
												<Text style={styles.leftText}>
													{"Total calories: "}
													<Text
														style={styles.rightText}
													>{`${modalData.calories} kcal`}</Text>
												</Text>
												<Text style={styles.leftText}>
													{"Serving quantity: "}
													<Text style={styles.rightText}>
														{modalData.quantity}
													</Text>
												</Text>
												<Text style={styles.leftText}>
													{"Serving unit: "}
													<Text style={styles.rightText}>{modalData.unit}</Text>
												</Text>
											</Layout>
											{isSuccessTextVisible && (
												<Text style={styles.successMessageText}>
													Meal added to daily consumption!
												</Text>
											)}
											<Layout style={styles.addButtonsContainer}>
												<CustomButton
													text={"Cancel"}
													backgroundColor={COLORS.gray}
													flex={1}
													onPress={() => setAddConsumptionPanelVisible(false)}
												/>
												<Layout style={{ width: "5%" }} />
												{!isAddLoading ? (
													<CustomButton
														text={"Add"}
														backgroundColor={COLORS.primary}
														flex={1}
														onPress={() => handleRecordConsumption()}
													/>
												) : (
													<CustomButton
														backgroundColor={COLORS.lightPrimary}
														flex={1}
													>
														<Spinner status="basic" size="small" />
													</CustomButton>
												)}
											</Layout>
										</Card>
									</Modal>
								</>
							) : (
								<Layout style={styles.content}>
									<Image source={assets.magnifierIcon} style={styles.image} />
									<Text
										style={{
											fontFamily: FONTS.bold,
											fontSize: SIZES.extraLarge,
											paddingVertical: SIZES.font,
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
										text={"Try again"}
										backgroundColor={COLORS.gray}
										paddingHorizontal={SIZES.large}
										borderRadius={SIZES.large}
										width="80%"
										onPress={() => resetSearchFrom()}
									/>
									<CustomButton
										text={"Create Personal Food Label"}
										backgroundColor={COLORS.primary}
										paddingHorizontal={SIZES.large}
										borderRadius={SIZES.large}
										width="80%"
										onPress={() =>
											navigation.navigate("CreateFoodLabelPage", {
												setPersonalFoodLabelData,
											})
										}
									/>
								</Layout>
							)}
						</>
					) : (
						<Layout style={styles.spinner}>
							<Spinner status="primary" size="giant" />
						</Layout>
					)}
				</Layout>
			)}
		</Layout>
	);
};

const MyPersonalFoodLabelTab = ({
	data,
	navigation,
	setPersonalFoodLabelData,
}) => {
	const [isAddLoading, setIsAddLoading] = useState(false);
	const [isSuccessTextVisible, setIsSuccessTextVisible] = useState(false);
	const [modalData, setModalData] = useState({
		foodName: "",
		calories: 0,
	});
	const meal = ["Breakfast", "Lunch", "Dinner"];
	const [mealIndex, setMealIndex] = useState(new IndexPath(0));
	const mealDisplayValue = meal[mealIndex.row];
	const renderMealOption = (title, index) => {
		return <SelectItem title={title} key={index} />;
	};

	// modal
	const [addConsumptionPanelVisible, setAddConsumptionPanelVisible] =
		useState(false);

	const handleAdd = data => {
		if (data) {
			setModalData({
				foodName: data.name,
				calories: data.calories,
			});
			setAddConsumptionPanelVisible(true);
		}
	};

	const handleRecordConsumption = async () => {
		setIsAddLoading(true);
		// record into user daily consumption collection
		const today = new Date();
		const day = today.getDate();
		const month = today.getMonth();
		const year = today.getFullYear();
		const todayAsStr = day + "_" + month + "_" + year;
		const hour = today.getHours();
		const minute = today.getMinutes();
		const second = today.getSeconds();
		let currentTime =
			hour.toString().padStart(2, "0") +
			":" +
			minute.toString().padStart(2, "0") +
			":" +
			second.toString().padStart(2, "0");
		const newConsumption = {
			foodName: modalData.foodName,
			totalCalories: modalData.calories,
			servingQuantity: 1,
			servingUnit: "serving",
			time: currentTime,
			dailyConsumptionId: todayAsStr,
		};
		const { success } = await DailyConsumptionController.addDailyConsumption(
			newConsumption,
			todayAsStr,
			meal[mealIndex.row]
		);

		if (success) {
			setIsSuccessTextVisible(true);
			setTimeout(() => {
				setIsAddLoading(false);
				setIsSuccessTextVisible(false);
				// close modal
				setAddConsumptionPanelVisible(false);
			}, 2000);
		}
	};

	return (
		<Layout style={styles.foodLabelsContainer}>
			{data.length !== 0 ? (
				<>
					<FlatList
						data={data}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<PersonalFoodLabelBar
								data={item}
								onPressAdd={() => handleAdd(item)}
							/>
						)}
						style={{ width: "100%", flex: 1 }}
					/>
					<Modal
						visible={isAddLoading || addConsumptionPanelVisible}
						backdropStyle={styles.backdrop}
						onBackdropPress={() => setAddConsumptionPanelVisible(false)}
						style={styles.modal}
					>
						<Card disabled={true} style={styles.modalContent}>
							<Layout style={styles.modalTitle}>
								<Text
									style={{
										fontSize: SIZES.large,
										fontFamily: FONTS.medium,
										color: COLORS.primary,
										fontFamily: FONTS.semiBold,
									}}
								>
									Select Meal
								</Text>
							</Layout>
							<Divider />
							<Layout
								style={{
									justifyContent: "center",
									alignItems: "center",
									paddingVertical: SIZES.font,
								}}
							>
								<Select
									style={styles.mealSelect}
									placeholder="Select a meal"
									value={mealDisplayValue}
									selectedIndex={mealIndex}
									onSelect={index => setMealIndex(index)}
								>
									{meal.map(renderMealOption)}
								</Select>
								<Text style={styles.foodNameText}>{modalData.foodName}</Text>
								<Text style={styles.leftText}>
									{"Total calories: "}
									<Text
										style={styles.rightText}
									>{`${modalData.calories} kcal`}</Text>
								</Text>
							</Layout>
							{isSuccessTextVisible && (
								<Text style={styles.successMessageText}>
									Meal added to daily consumption!
								</Text>
							)}
							<Layout style={styles.addButtonsContainer}>
								<CustomButton
									text={"Cancel"}
									backgroundColor={COLORS.gray}
									flex={1}
									onPress={() => setAddConsumptionPanelVisible(false)}
								/>
								<Layout style={{ width: "5%" }} />
								{!isAddLoading ? (
									<CustomButton
										text={"Add"}
										backgroundColor={COLORS.primary}
										flex={1}
										onPress={() => handleRecordConsumption()}
									/>
								) : (
									<CustomButton backgroundColor={COLORS.lightPrimary} flex={1}>
										<Spinner status="basic" size="small" />
									</CustomButton>
								)}
							</Layout>
						</Card>
					</Modal>
				</>
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
					onPress={() =>
						navigation.navigate("CreateFoodLabelPage", {
							setPersonalFoodLabelData: setPersonalFoodLabelData,
						})
					}
				/>
			</Layout>
		</Layout>
	);
};

const RecordScreen = ({ navigation }) => {
	const [tabSelectedIndex, setTabSelectedIndex] = useState(0);
	const [personalFoodLabelData, setPersonalFoodLabelData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchFoodLabelData = async () => {
			setIsLoading(true);
			const { success, data } =
				await PersonalFoodLabelController.getFoodLabels();
			if (!success) {
				setIsLoading(false);
				return;
			}
			setPersonalFoodLabelData(data);
			setIsLoading(false);
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
					<Layout style={styles.headerContainer}>
						<Text style={styles.header}>Add Daily Consumption</Text>
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
						<AllTabScreen
							navigation={navigation}
							setPersonalFoodLabelData={setPersonalFoodLabelData}
						/>
					) : (
						<MyPersonalFoodLabelTab
							data={personalFoodLabelData}
							navigation={navigation}
							setPersonalFoodLabelData={setPersonalFoodLabelData}
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
	headerContainer: {
		width: "100%",
		backgroundColor: "#F9F9F9",
		alignItems: "center",
		paddingVertical: "5%",
		...SHADOWS.dark,
	},
	header: {
		color: COLORS.primary,
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
	},
	addButtonsContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	foodNameText: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
		paddingVertical: SIZES.base,
		width: "100%",
	},
	leftText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.medium,
		width: "100%",
		paddingVertical: SIZES.base,
	},
	rightText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.medium,
		color: COLORS.gray,
	},
	mealSelect: {
		fontFamily: FONTS.font,
		fontSize: SIZES.medium,
		width: "100%",
		marginBottom: SIZES.base,
	},
	content: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	image: {
		resizeMode: "contain",
		height: 150,
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
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modal: {
		width: "85%",
	},
	modalContent: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
	},
	modalTitle: {
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: SIZES.font,
	},
	examplesTitle: {
		paddingTop: SIZES.font,
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.large,
	},
	examplesText: {
		paddingVertical: 4,
		fontFamily: FONTS.regular,
		fontSize: SIZES.font,
		color: COLORS.gray,
	},
	successMessageText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.font,
		color: COLORS.primary,
		paddingBottom: SIZES.small,
	},
	errorText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.small,
		color: COLORS.error,
		paddingTop: SIZES.base,
	},
});
export default RecordScreen;
