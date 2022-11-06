import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const fetchData = async () => {
	const userDocRef = doc(db, "users", auth.currentUser.uid);
	const docSnap = await getDoc(userDocRef);
	let temp = {
		displayName: "",
		age: 1,
		email: "",
		height: 1,
		weight: 1,
		gender: "",
		activityLevel: "",
	};
	if (docSnap.exists()) {
		const user = docSnap.data();
		temp = {
			displayName: user.displayName,
			age: +user.age,
			email: user.email,
			height: user.height,
			weight: user.weight,
			gender: user.gender,
			activityLevel: user.activityLevel,
		};
		return temp;
	}
	return temp;
};

const updateData = async newData => {
	try {
		const userDocRef = doc(db, "users", auth.currentUser.uid);
		await setDoc(userDocRef, newData, { merge: true });
		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
};

export const UserController = {
	fetchData,
	updateData,
};
