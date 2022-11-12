import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

export const createUser = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		return { user, error: null };
	} catch (error) {
		const errorCode = error.code;
		let errorMessage;
		switch (errorCode) {
			case "auth/email-already-in-use":
				errorMessage = "Email already in use";
				break;
			case "auth/weak-password":
				errorMessage =
					"Password must have minimum of eight characters, at least one letter and one number";
				break;
			case "auth/invalid-email":
				errorMessage = "Invalid email";
				break;
			default:
				errorMessage = "Something went wrong";
				break;
		}
		return { error: errorMessage };
	}
};

export const signInUser = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		return { user, error: null };
	} catch (error) {
		const errorCode = error.code;
		let errorMessage;
		switch (errorCode) {
			case "auth/wrong-password":
				errorMessage = "Wrong password";
				break;
			case "auth/user-not-found":
				errorMessage = "User not found";
				break;
			default:
				errorMessage = "Something went wrong";
				break;
		}
		return { error: errorMessage };
	}
};

export const updateUserName = async newName => {
	try {
		// TODO: check newName
		if (!newName) {
			return { error: "new name cannot be empty", success: false };
		}
		const updatedUser = await updateProfile(auth.currentUser, {
			displayName: newName,
		});
		return { success: true };
	} catch (error) {
		const errorCode = error.code;
		return { error: errorCode, success: false };
	}
};

export const verifyEmail = async () => {
	try {
		console.log("sending");
		console.log(auth);
		const verificationEmail = await sendEmailVerification(auth.currentUser);
		console.log(verificationEmail);
		console.log("verify");
		return { success: true };
	} catch (error) {
		const errorCode = error.code;
		return { error: errorCode, success: false };
	}
};

export const resetPasswordEmail = async email => {
	try {
		// TODO: check if user is verified or not
		const passwordReset = await sendPasswordResetEmail(auth, email);
		// password reset email sent
		return { success: true };
	} catch (error) {
		const errorCode = error.code;
		return { error: errorCode, success: false };
	}
};

export const signOutUser = async () => {
	//  assume user is logged in
	try {
		await signOut(auth);
		return { success: true };
	} catch (error) {
		const errorCode = error.code;
		return { error: errorCode, success: false };
	}
};
