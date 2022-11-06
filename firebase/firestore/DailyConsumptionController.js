import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const getFoodHistory = async refs => {
	if (refs == null) {
		return [];
	}
	const temp = [];
	for (const ref of refs) {
		const userConsumption = await getSingleDoc(ref);
		temp.push(userConsumption);
	}
	return temp;
};

const getSingleDoc = async ref => {
	const docSnap = await getDoc(ref);
	if (docSnap.exists()) {
		return {
			id: docSnap.id,
			...docSnap.data(),
		};
	}
	return null;
};

const getDailyConsumption = async day => {
	const userDailyConsumptionRef = doc(
		db,
		"users",
		auth.currentUser.uid,
		"userDailyConsumption",
		day
	);
	const docSnap = await getDoc(userDailyConsumptionRef);
	let results = {
		breakfast: [],
		lunch: [],
		dinner: [],
	};
	if (docSnap.exists()) {
		let breakfastTemp = await getFoodHistory(docSnap.data()?.breakfast);
		let lunchTemp = await getFoodHistory(docSnap.data()?.lunch);
		let dinnerTemp = await getFoodHistory(docSnap.data()?.dinner);

		results = {
			breakfast: breakfastTemp,
			lunch: lunchTemp,
			dinner: dinnerTemp,
		};
		return results;
	} else {
		return results;
	}
};

const addDailyConsumption = async (data, day, currentMeal) => {
	try {
		// create user consumption reference first
		const userConsumptionRef = collection(
			db,
			"users",
			auth.currentUser.uid,
			"userConsumption"
		);

		const docRef = await addDoc(userConsumptionRef, data, currentMeal);
		// add to daily consumption of user
		const userDailyConsumptionRef = doc(
			db,
			"users",
			auth.currentUser.uid,
			"userDailyConsumption",
			day
		);

		const docSnap = await getDoc(userDailyConsumptionRef);
		if (!docSnap.exists()) {
			await setDoc(userDailyConsumptionRef, {
				breakfast: [],
				lunch: [],
				dinner: [],
			});
		}
		if (currentMeal == "Breakfast") {
			await updateDoc(userDailyConsumptionRef, {
				breakfast: arrayUnion(docRef),
			});
		} else if (currentMeal == "Lunch") {
			await updateDoc(userDailyConsumptionRef, {
				lunch: arrayUnion(docRef),
			});
		} else {
			await updateDoc(userDailyConsumptionRef, {
				dinner: arrayUnion(docRef),
			});
		}
		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
};

const removeDailyConsumption = async (
	consumptionId,
	dailyConsumptionId,
	meal
) => {
	try {
		// delete user daily consumption first
		const userConsumptionRef = doc(
			db,
			"users",
			auth.currentUser.uid,
			"userConsumption",
			consumptionId
		);
		const userDailyConsumptionRef = doc(
			db,
			"users",
			auth.currentUser.uid,
			"userDailyConsumption",
			dailyConsumptionId
		);
		if (meal === "Breakfast") {
			await updateDoc(userDailyConsumptionRef, {
				breakfast: arrayRemove(userConsumptionRef),
			});
		} else if (meal === "Lunch") {
			await updateDoc(userDailyConsumptionRef, {
				lunch: arrayRemove(userConsumptionRef),
			});
		} else {
			await updateDoc(userDailyConsumptionRef, {
				dinner: arrayRemove(userConsumptionRef),
			});
		}
		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false, error };
	}
};

export const DailyConsumptionController = {
	getDailyConsumption,
	addDailyConsumption,
	removeDailyConsumption,
};
