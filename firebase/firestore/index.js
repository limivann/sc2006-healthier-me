// TODO: refactor everything and put into here

import { collection, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export const getFoodHistory = async refs => {
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
		return docSnap.data();
	}
	return null;
};
