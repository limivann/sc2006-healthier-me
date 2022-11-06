import { collection, getDoc, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase-config";

const getSingleDoc = async ref => {
	const docSnap = await getDoc(ref);
	if (docSnap.exists()) {
		return docSnap.data();
	}
	return null;
};

const getRestaurants = async refs => {
	const temp = [];
	for (const ref of refs) {
		const restaurants = await getSingleDoc(ref);
		temp.push(restaurants);
	}
	return temp;
};
const fetchDietData = async () => {
	const dietsRef = collection(db, "diets");
	const q = query(dietsRef, limit(8));
	const querySnapshot = await getDocs(q);
	const tempDiets = [];
	querySnapshot.forEach(async doc => {
		const restaurantsRefs = doc.data().restaurants;
		const results = await getRestaurants(restaurantsRefs);
		const formattedDiet = {
			id: doc.id,
			foodName: doc.data().name,
			dietType: doc.data().dietType,
			foodImg: doc.data().imageUrl,
			description: doc.data().description,
			restaurants: [...results],
		};
		tempDiets.push(formattedDiet);
	});

	return tempDiets;
};

export const DietsController = {
	fetchDietData,
};
