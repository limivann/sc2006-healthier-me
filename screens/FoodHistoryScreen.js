import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Layout, Card, Modal, Divider, Spinner } from "@ui-kitten/components";
import {
	BackButton,
	CustomButton,
	FocusedStatusBar,
	HistoryComponent,
} from "../components";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { useState } from "react";
import { DailyConsumptionController } from "../firebase/firestore/DailyConsumptionController";

const FoodHistoryScreen = ({ navigation, route }) => {
	const { data, setHistory, setFood } = route?.params;

	const [modalData, setModalData] = useState({
		foodName: "",
		time: "",
		calories: 0,
		meal: "breakfast",
		servingQuantity: 1,
		servingUnit: "serving",
		dailyConsumptionId: "",
		docId: "",
	});
	const [modalPanelVisible, setModalPanelVisible] = useState(false);
	const handleClose = (data, meal) => {
		if (data) {
			setModalData({
				foodName: data.foodName,
				time: data.time,
				calories: data.totalCalories,
				meal,
				servingQuantity: data.servingQuantity,
				servingUnit: data.servingUnit,
				dailyConsumptionId: data.dailyConsumptionId,
				docId: data.id,
			});
			setModalPanelVisible(true);
		}
	};
	const [isSuccessTextVisible, setIsSuccessTextVisible] = useState(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);

	const handleDeleteConsumption = async () => {
		if (!modalPanelVisible) {
			return;
		}
		setIsDeleteLoading(true);
		const { success, error } =
			await DailyConsumptionController.removeDailyConsumption(
				modalData.docId,
				modalData.dailyConsumptionId,
				modalData.meal
			);
		if (!success) {
			setIsDeleteLoading(false);
			return;
		}
		if (modalData.meal === "Breakfast") {
			setHistory(prev => {
				prev.breakfast = prev.breakfast.filter(
					data => data.id !== modalData.docId
				);
				return prev;
			});
			setFood(prev => Math.round(prev - modalData.calories));
		} else if (modalData.meal === "Lunch") {
			setHistory(prev => {
				prev.lunch = prev.lunch.filter(data => data.id !== modalData.docId);
				return prev;
			});
			setFood(prev => Math.round(prev - modalData.calories));
		} else {
			setHistory(prev => {
				prev.dinner = prev.dinner.filter(data => data.id !== modalData.docId);
				return prev;
			});
			setFood(prev => Math.round(prev - modalData.calories));
		}
		setIsSuccessTextVisible(true);
		setTimeout(() => {
			setIsSuccessTextVisible(false);
			setIsDeleteLoading(false);
			setModalPanelVisible(false);
		}, 1000);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<FocusedStatusBar barStyle="dark-content" backgroundColor="transparent" />
			<Layout style={styles.container}>
				<Layout style={styles.headerContainer}>
					<Text style={styles.header}>Food History</Text>
					<BackButton
						top={"50%"}
						left={4}
						backgroundColor={"transparent"}
						color={COLORS.primary}
						onPress={() => navigation.goBack()}
					/>
				</Layout>
			</Layout>
			<ScrollView contentContainerStyle={styles.historyContainer}>
				<Layout>
					<Text style={styles.title}>Breakfast</Text>
					{data?.breakfast.map((item, index) => {
						return (
							<HistoryComponent
								key={index}
								data={item}
								onPressClose={() => handleClose(item, "Breakfast")}
							/>
						);
					})}
				</Layout>
				<Layout>
					<Text style={styles.title}>Lunch</Text>
					{data?.lunch.map((item, index) => {
						return (
							<HistoryComponent
								key={index}
								data={item}
								onPressClose={() => handleClose(item, "Lunch")}
							/>
						);
					})}
				</Layout>
				<Layout>
					<Text style={styles.title}>Dinner</Text>
					{data?.dinner.map((item, index) => {
						return (
							<HistoryComponent
								key={index}
								data={item}
								onPressClose={() => handleClose(item, "Dinner")}
							/>
						);
					})}
				</Layout>
			</ScrollView>
			<Modal
				visible={isDeleteLoading || modalPanelVisible}
				backdropStyle={styles.backdrop}
				onBackdropPress={() => setModalPanelVisible(false)}
				style={styles.modal}
			>
				<Card disabled={true} style={styles.modalContent}>
					<Layout style={styles.modalTitle}>
						<Text
							style={{
								fontSize: SIZES.large,
								fontFamily: FONTS.medium,
								color: COLORS.error,
								fontFamily: FONTS.semiBold,
							}}
						>
							Confirm Delete Meal?
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
						<Text style={styles.foodNameText}>{modalData.meal}</Text>
						<Text style={styles.leftText}>
							{`Food name: `}
							<Text
								style={styles.rightText}
							>{`${modalData.foodName}, ${modalData.servingQuantity} ${modalData.servingUnit}`}</Text>
						</Text>
						<Text style={styles.leftText}>
							{"Total calories: "}
							<Text
								style={styles.rightText}
							>{`${modalData.calories} kcal`}</Text>
						</Text>
						<Text style={styles.leftText}>
							{"Time: "}
							<Text style={styles.rightText}>{`${modalData.time}`}</Text>
						</Text>
					</Layout>
					{isSuccessTextVisible && (
						<Text style={styles.successMessageText}>
							Meal deleted from daily consumption.
						</Text>
					)}
					<Layout style={styles.addButtonsContainer}>
						<CustomButton
							text={"Cancel"}
							backgroundColor={COLORS.gray}
							flex={1}
							onPress={() => setModalPanelVisible(false)}
						/>
						<Layout style={{ width: "5%" }} />
						{!isDeleteLoading ? (
							<CustomButton
								text={"Delete"}
								backgroundColor={COLORS.error}
								flex={1}
								onPress={() => handleDeleteConsumption()}
							/>
						) : (
							<CustomButton backgroundColor={COLORS.lightError} flex={1}>
								<Spinner status="basic" size="small" />
							</CustomButton>
						)}
					</Layout>
				</Card>
			</Modal>
		</SafeAreaView>
	);
};

export default FoodHistoryScreen;

const styles = StyleSheet.create({
	headerContainer: {
		width: "100%",
		backgroundColor: "#F9F9F9",
		alignItems: "center",
		paddingVertical: "5%",
		...SHADOWS.light,
	},
	header: {
		color: COLORS.primary,
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
	},
	container: {
		alignItems: "center",
	},
	datesContainer: {
		height: 100,
		marginTop: SIZES.extraLarge,
		paddingHorizontal: SIZES.font,
	},
	historyContainer: {
		width: "100%",
		paddingHorizontal: "5%",
		backgroundColor: "white",
	},
	title: {
		fontFamily: FONTS.semiBold,
		fontSize: SIZES.medium,
		paddingHorizontal: SIZES.base,
		paddingVertical: SIZES.base,
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
	successMessageText: {
		fontFamily: FONTS.medium,
		fontSize: SIZES.font,
		color: COLORS.primary,
		paddingBottom: SIZES.small,
	},
	addButtonsContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
	foodNameText: {
		fontFamily: FONTS.bold,
		fontSize: SIZES.large,
		paddingVertical: SIZES.base,
		width: "100%",
	},
});
