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

export const validatePassword = newPassword => {
	const minNumberofChars = 8;
	const regularExpression = new RegExp(
		"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
	);
	if (newPassword.length < minNumberofChars) {
		return {
			success: false,
			errorMessage: "Password should be more than 8 characters",
		};
	}
	if (!regularExpression.test(newPassword)) {
		return {
			success: false,
			errorMessage:
				"Password should contain at least one uppecase letter and one lowercase letter and one number",
		};
	}
	return { success: true, errorMessage: "" };
};

export const generateWeek = today => {
	let currentDay = today;
	const weeks = [];
	const { day, dateAsStr } = getDateDetails(currentDay);
	weeks.push({
		id: 7,
		dayOfWeek: day,
		dayOfMonth: dateAsStr,
		isFocused: true,
	});
	for (let i = 0; i < 6; i++) {
		currentDay = new Date(currentDay.valueOf() - 1000 * 60 * 60 * 24);
		const { day, dateAsStr } = getDateDetails(currentDay);
		weeks.push({
			id: 6 - i,
			dayOfWeek: day,
			dayOfMonth: dateAsStr,
			isFocused: false,
		});
	}
	return weeks.reverse();
};

const getDateDetails = date => {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const day = days[date.getDay()];
	const dateAsStr = date.getDate();
	return {
		day,
		dateAsStr,
	};
};
