export const calculateBmi = (weight, height) => {
	const bmi = weight / Math.pow(height / 100, 2);
	return bmi.toFixed(2);
};

export const calculateCaloriesNeeded = (gender, weight, height, age) => {
	let tempBmr = 0;
	if (gender === "male") {
		tempBmr = 66.5 + 13.75 * weight + 5.003 * height - 6.775 * age;
	} else {
		tempBmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
	}
	return tempBmr;
};
