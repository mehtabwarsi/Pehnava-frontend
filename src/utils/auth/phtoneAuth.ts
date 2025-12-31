import {
    signInWithPhoneNumber,
    RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../firebase";

export const sendOtp = async (phone: string) => {
    if (!phone || phone.length !== 10) {
        throw new Error("Invalid phone number");
    }

    // 🔑 Create reCAPTCHA once
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible",
            }
        );
    }

    const appVerifier = window.recaptchaVerifier;

    // ✅ MUST be E.164 format
    const fullPhone = `+91${phone}`;

    const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhone,
        appVerifier
    );

    return confirmationResult;
};

