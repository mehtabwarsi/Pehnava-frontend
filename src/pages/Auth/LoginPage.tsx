import { useState } from "react";
import { isApplePlatform } from "../../utils/platformDetect";
import { loginWithGoogle } from "../../utils/auth/googleLogin";
import { auth } from "../../utils/firebase";
import { loginApi } from "../../services/apiservices";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../utils/auth/phtoneAuth";

const LoginPage = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const navigate = useNavigate();

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only allow digits & max length 10
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobileNumber(value);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const firebaseUser = await loginWithGoogle();
            if (!firebaseUser) return;

            console.log("Firebase user:", JSON.stringify(firebaseUser, null, 2));
            const token = await auth.currentUser?.getIdToken();
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await loginApi(token);

            console.log("Backend response:", JSON.stringify(response, null, 2));
            if (response.success == true) {
                navigate("/")
            }

        } catch (error) {
            console.error("Google login failed:", error);
        }
    };


    const handleSendOtp = async () => {
        try {
            const confirmation = await sendOtp(mobileNumber);
            console.log("Confirmation result:", confirmation);
            // window.confirmationResult = confirmation;
            // navigate("/otp-verify");
        } catch (err) {
            console.error("OTP error:", err);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
            <div id="recaptcha-container"></div>
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            </div>

            <div className="w-full max-w-[95%] sm:max-w-[500px] md:max-w-[800px] lg:max-w-[1000px] h-fit md:h-[600px] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row rounded-lg md:rounded-xl z-10">

                {/* LEFT SIDE - PROMO IMAGE (Hidden on Mobile) */}
                <div className="hidden md:block w-2/5 relative bg-pehnava-primary/5">
                    <img
                        src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
                        alt="Login Promo"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60" />

                    <div className="absolute bottom-10 left-8 right-8 text-white">
                        <h3 className="text-3xl font-bold mb-2">Flat 50% Off</h3>
                        <p className="text-lg opacity-90">On your first order. Join the community today.</p>
                    </div>
                </div>

                {/* RIGHT SIDE - FORM */}
                <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">

                    {/* Header */}
                    <div className="mb-6 sm:mb-8 md:mb-10 mt-2 sm:mt-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-pehnava-charcoal mb-2">Login <span className="text-pehnava-slate mx-1">or</span> Signup</h2>
                        <p className="text-pehnava-slate text-xs sm:text-sm">
                            Get access to your Orders, Wishlist and Recommendations
                        </p>
                    </div>

                    {/* Mobile Input */}
                    <div className="mb-6">
                        <div className="flex border border-pehnava-slate/30 rounded-md overflow-hidden focus-within:border-pehnava-primary focus-within:ring-1 focus-within:ring-pehnava-primary transition-all">
                            <div className="bg-pehnava-offWhite px-2.5 sm:px-3 py-2.5 sm:py-3 border-r border-pehnava-slate/30 flex items-center text-pehnava-charcoal font-medium text-sm sm:text-base">
                                +91
                            </div>
                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={handleMobileChange}
                                placeholder="Mobile Number"
                                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white outline-none text-pehnava-charcoal font-medium placeholder:text-pehnava-slate/50 w-full text-sm sm:text-base"
                            />
                        </div>
                        <p className="text-[10px] sm:text-xs text-pehnava-slate mt-3 sm:mt-4 leading-relaxed">
                            By continuing, I agree to the <span className="text-pehnava-primary font-bold cursor-pointer">Terms of Use</span> & <span className="text-pehnava-primary font-bold cursor-pointer">Privacy Policy</span>
                        </p>
                    </div>

                    {/* Continue Button */}
                    <button onClick={handleSendOtp} className="w-full bg-pehnava-accent hover:bg-pehnava-accentDark text-white font-bold py-3 sm:py-3.5 rounded-sm shadow-md hover:shadow-lg transition-all uppercase tracking-wide cursor-pointer text-xs sm:text-sm active:scale-[0.98]">
                        Continue
                    </button>

                    {/* Social Login Section */}
                    <div className="mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-0">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-pehnava-border/60" />
                            </div>
                            <div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
                                <span className="bg-white px-2 text-pehnava-slate font-semibold tracking-wider">Or Login Using</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
                            <button onClick={handleGoogleLogin}>
                                <SocialIconWrapper icon={<GoogleIcon />} label="Google" />
                            </button>
                            <SocialIconWrapper icon={<FacebookIcon />} label="Facebook" />
                            {isApplePlatform() && (
                                <SocialIconWrapper icon={<AppleIcon />} label="Apple" />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const SocialIconWrapper = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex flex-col items-center gap-1 cursor-pointer group opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 border border-pehnava-border rounded-full flex items-center justify-center p-2.5 bg-white shadow-xs group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <span className="text-[10px] sm:text-xs font-semibold mt-1">{label}</span>
    </div>
);

export default LoginPage;


/* --- ICONS --- */

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 4.6c1.62 0 3.08.56 4.23 1.64l3.18-3.18C17.46 1.16 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-[#1877F2]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const AppleIcon = () => (
    <svg viewBox="0 0 384 512" className="w-full h-full fill-black">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
);