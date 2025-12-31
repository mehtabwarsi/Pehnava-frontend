import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OtpVerifyPage = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        // Only allow digits
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace to move to previous input
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);

        // Focus last filled input or next empty
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleVerify = () => {
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
            console.log("Verifying OTP:", otpValue);
            // Add your OTP verification logic here
            navigate("/");
        }
    };

    const handleResend = () => {
        if (canResend) {
            setTimer(30);
            setCanResend(false);
            setOtp(new Array(6).fill(""));
            inputRefs.current[0]?.focus();
            console.log("OTP Resent");
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
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
                        alt="OTP Verification"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60" />

                    <div className="absolute bottom-10 left-8 right-8 text-white">
                        <h3 className="text-3xl font-bold mb-2">Secure Access</h3>
                        <p className="text-lg opacity-90">We've sent a verification code to your mobile number.</p>
                    </div>
                </div>

                {/* RIGHT SIDE - OTP FORM */}
                <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/login")}
                        className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-1.5 sm:gap-2 text-pehnava-slate hover:text-pehnava-primary transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs sm:text-sm font-semibold">Back</span>
                    </button>

                    {/* Header */}
                    <div className="mb-6 sm:mb-8 md:mb-10 mt-10 sm:mt-8 md:mt-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-pehnava-charcoal mb-2">Verify OTP</h2>
                        <p className="text-pehnava-slate text-xs sm:text-sm">
                            Enter the 6-digit code sent to <span className="font-bold text-pehnava-charcoal">+91 98765 43210</span>
                        </p>
                    </div>

                    {/* OTP Input */}
                    <div className="mb-6">
                        <div className="flex gap-1.5 sm:gap-2 md:gap-3 justify-center" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; return; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl md:text-2xl font-bold border-2 border-pehnava-border rounded-md sm:rounded-lg
                                             focus:outline-none focus:border-pehnava-primary focus:ring-2 focus:ring-pehnava-primary/20
                                             transition-all bg-pehnava-offWhite text-pehnava-charcoal"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        {/* Timer / Resend */}
                        <div className="mt-3 sm:mt-4 text-center">
                            {canResend ? (
                                <button
                                    onClick={handleResend}
                                    className="text-pehnava-primary font-bold text-xs sm:text-sm hover:underline transition-all"
                                >
                                    Resend OTP
                                </button>
                            ) : (
                                <p className="text-pehnava-slate text-xs sm:text-sm">
                                    Resend OTP in <span className="font-bold text-pehnava-charcoal">{timer}s</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={otp.join("").length !== 6}
                        className="w-full bg-pehnava-accent hover:bg-pehnava-accentDark text-white font-bold py-3 sm:py-3.5 rounded-sm shadow-md 
                                 hover:shadow-lg transition-all uppercase tracking-wide cursor-pointer text-xs sm:text-sm active:scale-[0.98]
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        Verify & Continue
                    </button>

                    {/* Help Text */}
                    <p className="text-xs text-pehnava-slate mt-6 text-center leading-relaxed">
                        Didn't receive the code? Check your SMS or try{" "}
                        <span className="text-pehnava-primary font-bold cursor-pointer">requesting a new one</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OtpVerifyPage;