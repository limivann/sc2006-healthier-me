import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase-config";

const fetchRestaurantData = async () => {
	const restaurantRef = collection(db, "restaurants");
	const q = query(restaurantRef, limit(8));
	const querySnapshot = await getDocs(q);
	const tempRestaurants = [];
	querySnapshot.forEach(async doc => {
		const formattedRestaurant = {
			id: doc.id,
			title: doc.data().name,
			shortDesc: doc.data().shortDescription,
			longDesc: doc.data().longDescription,
			rating: doc.data().rating,
			locationUrl: doc.data().locationUrl,
			openingTime: "7.00 am ~ 9.00 pm",
			status: true,
			isDineInAvail: true,
			isTakeawayAvail: true,
			imageUrl: doc.data().imageUrl,
			locationUrl: doc.data().locationUrl,
		};
		tempRestaurants.push(formattedRestaurant);
	});
	return tempRestaurants;
};

export const RestaurantController = {
	fetchRestaurantData,
};
