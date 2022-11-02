export const calculateBmi = (weight, height) => {
	const bmi = weight / Math.pow(height / 100, 2);
	return bmi.toFixed(2);
};

export const calculateCaloriesNeeded = (isMale, weight, height, age) => {
	let tempBmr = 0;
	if (isMale) {
		tempBmr = 66.5 + 13.75 * weight + 5.003 * height - 6.775 * age;
	} else {
		tempBmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
	}
	return Math.round(tempBmr);
};

export const calculateTotalCaloriesConsumed = (breakfast, lunch, dinner) => {
	let total = 0;
	breakfast.forEach(meal => {
		total += meal.totalCalories;
	});
	lunch.forEach(meal => {
		total += meal.totalCalories;
	});
	dinner.forEach(meal => {
		total += meal.totalCalories;
	});
	return Math.round(total);
};

export const calculateRemainingCalories = (baseGoal, food, exercise) => {
	const remaining = Math.round(baseGoal - food + exercise);
	return remaining >= 0 ? remaining : 0;
};
