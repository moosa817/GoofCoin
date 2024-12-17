import MyNav from "../components/navbar";
import { LoginContext } from "../components/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { config } from "../config"; // Importing the API URL configuration
import { DangerAlert, SuccessAlert } from "../components/alerts";
import LoginModal from "../components/auth/LoginModal"
import { ModalContext } from "../components/ModalsContext";
import GoogleSignIn from '../components/auth/GoogleSign';


const Reset = () => {
    const { isLogin } = useContext(LoginContext);
    const { openModal, closeModal } = useContext(ModalContext);

    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Step management
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [canResendCode, setCanResendCode] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [success, setSuccess] = useState(null);
    const [BluredEmail, setBluredEmail] = useState("");

    const [n, setN] = useState(0);

    useEffect(() => {
        if (isLogin) {
            return <Navigate to="/dashboard" />;
        }

        closeModal();
    }, [isLogin]);

    // Handle resend timer countdown
    useEffect(() => {
        if (!canResendCode && resendTimer > 0) {
            const timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (resendTimer === 0) {
            setCanResendCode(true);
            setResendTimer(60); // Reset timer for next resend
        }
    }, [canResendCode, resendTimer]);


    const handleSendCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${config.API_URL}/api/reset-password/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setBluredEmail(data.email);
                setStep(2);
                setCanResendCode(false); // Disable resend button
                setResendTimer(60); // Start countdown
            } else {
                setError(data.error || "Something went wrong. Please try again.");
                setN((prev) => prev + 1); // Increment the key to re-render the alert
            }
        } catch (error) {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${config.API_URL}/api/reset-password/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setStep(3);
            } else {
                setError(data.error || "Invalid verification code.");
                setN((prev) => prev + 1); // Increment the key to re-render the alert
            }
        } catch (error) {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };



    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setN((prev) => prev + 1); // Increment the key to re-render the alert
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${config.API_URL}/api/reset-password/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code, new_password: newPassword }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setStep(1);
                setEmail("");
                setCode("");
                setNewPassword("");
                setConfirmPassword("");
                setError(null);
                setBluredEmail("");
                setCanResendCode(false);
                setResendTimer(60);
                alert("Password reset successful!");
                setSuccess("Password reset successful. You can now login with your new password.");
                openModal();
                navigate("/")

            } else {
                setError(data.error || "Failed to reset password.");
                setN((prev) => prev + 1); // Increment the key to re-render the alert
            }
        } catch (error) {
            setError("Network error. Please try again.");
            setN((prev) => prev + 1); // Increment the key to re-render the alert
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <MyNav />
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-[90%] sm:w-full max-w-md p-6 rounded-lg shadow-md bg-[#3b4691]">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        {step === 1 && "Reset Password"}
                        {step === 2 && "Enter Verification Code"}
                        {step === 3 && "Set New Password"}
                    </h2>

                    {/* Display error message if any */}
                    {error && <DangerAlert msg={error} n={n} />}
                    {success && <SuccessAlert msg={success} />}

                    {/* Step 1: Email Form */}
                    {step === 1 && (
                        <form onSubmit={handleSendCode} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Email Address or Username
                                </label>
                                <input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    placeholder="Enter Email Address"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isLoading ? "Sending..." : "Send Verification Code"}
                            </button>

                        </form>
                    )}

                    {/* Step 2: Code Verification */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyCode} className="space-y-4">
                            <div>
                                {BluredEmail && <div className="text-gray-400 text-sm">Code sent to {BluredEmail}</div>}
                                <label
                                    htmlFor="code"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                                    placeholder="Enter Code"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isLoading ? "Verifying..." : "Verify Code"}
                            </button>
                            {/* resend button */}
                            <button
                                type="button"
                                disabled={!canResendCode}
                                onClick={handleSendCode}
                                className={`w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 ${!canResendCode ? "opacity-50 cursor-not-allowed" : ""
                                    }`}>Resend</button>
                            <div className="mt-2 text-gray-400 text-sm">
                                {canResendCode
                                    ? `You can resend the code if needed.`
                                    : `You can resend in ${resendTimer} seconds.`}
                            </div>
                            <div className="mt-2 text-gray-400 text-sm">Check your spam folder</div>
                        </form>

                    )}

                    {/* Step 3: Reset Password Form */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="newPassword"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                                    placeholder="Enter New Password"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                                    placeholder="Confirm New Password"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <LoginModal />
            <GoogleSignIn showButton={false} />

        </>
    );
};

export default Reset;
