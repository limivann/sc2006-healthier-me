import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import { app } from "../firebase-config";

const auth = getAuth(app);
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
		// const errorMessage = error.message;
		return { error: errorCode };
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
		// const errorMessage = error.message;
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

export const sendVerificationEmail = async () => {
	try {
		const verificationEmail = await sendEmailVerification(auth.currentUser);
		return { success: true };
	} catch (error) {
		const errorCode = error.code;
		return { error: errorCode, success: false };
	}
};

export const sendPasswordResetEmail = async email => {
	try {
		const passwordReset = await sendPasswordResetEmail(auth, email);
		// password reset email sent
		return { success: true };
	} catch (error) {
		const errorCode = error.code;
		return { error: errorCode, success: false };
	}
};

export const logoutUser = async () => {
	//  assume user is logged in
	try {
		await signOut(auth);
	} catch (error) {
		const errorCode = error.code;
		return { error: errorCode, success: false };
	}
};
