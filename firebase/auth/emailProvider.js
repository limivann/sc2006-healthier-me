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
		switch (error) {
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
		return { error: errorCode };
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
		const verificationEmail = await sendEmailVerification(auth.currentUser);
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
	} catch (error) {
		const errorCode = error.code;
		return { error: errorCode, success: false };
	}
};
