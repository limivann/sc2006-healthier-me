import { auth, db } from "../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const createFoodLabel = async data => {
	const { name, calories } = data;
	// check required fields
	if (name === "" || calories == null) {
		return { success: false, error: "Please fill in all fields" };
	}
	// check length of name >=3 and <= 30
	if (!(name.length >= 3 && name.length <= 30)) {
		return { success: false, error: "Length of name must be within 3 to 30" };
	}
	// check if calories is numeric
	if (isNaN(calories)) {
		return { success: false, error: "Calories must be a number" };
	}

	// check if calories > 0 and < 10000
	if (!(calories > 0 && calories < 10000)) {
		return {
			success: false,
			error: "Calories must be greater than 0 and less than 10000",
		};
	}
	// check if the food label already exists
	const personalFoodLabelRef = collection(
		db,
		"users",
		auth.currentUser.uid,
		"personalFoodLabel"
	);
	const q = query(personalFoodLabelRef, where("name", "==", name));
	const querySnapshot = await getDocs(q);
	if (querySnapshot.size > 0) {
		return { success: false, error: "Food name already taken" };
	}
	// okay to add
	const docRef = await addDoc(personalFoodLabelRef, data);
	return { success: true, docId: docRef.id };
};

const getFoodLabels = async () => {
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
		return { success: true, data: tempData };
	} catch (error) {
		console.log(error);
		return { success: false, error };
	}
};

export const PersonalFoodLabelController = {
	createFoodLabel,
	getFoodLabels,
};
