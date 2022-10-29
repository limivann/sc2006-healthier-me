//  put nutritionix api here
export const searchFood = async query => {
	try {
		const data = await searchFoodQuery(query);
		return data.map((result, index) => ({
			id: index,
			name: result?.food_name,
			calories: result?.nf_calories,
			servingQuantity: result?.serving_qty,
			servingUnit: result?.serving_unit,
		}));
	} catch (error) {
		console.log(error);
		return [];
	}
};

const searchFoodQuery = async query => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-app-id": process.env.NUTRITIONIX_APP_ID,
			"x-app-key": process.env.NUTRITIONIX_APP_KEY,
		},
		body: JSON.stringify({
			query: `${query}`,
			timezone: "US/Eastern",
		}),
	};
	try {
		const response = await fetch(
			"https://trackapi.nutritionix.com/v2/natural/nutrients",
			requestOptions
		);
		const data = await response.json();
		return data.foods;
	} catch (error) {
		console.log(error);
	}
};

export const autoComplete = async query => {
	try {
		const data = await autoCompleteQuery(query);
		return data.map(result => ({
			title: result.food_name,
		}));
	} catch (error) {
		console.log(error);
		return [];
	}
};

const autoCompleteQuery = async query => {
	const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${query}?common=true?locale=en_US?self=false`;
	const requestOptions = {
		headers: {
			"x-app-id": process.env.NUTRITIONIX_APP_ID,
			"x-app-key": process.env.NUTRITIONIX_APP_KEY,
		},
	};
	try {
		const response = await fetch(url, requestOptions);
		const data = await response.json();

		return data.common;
	} catch (error) {
		console.log(error);
	}
};
