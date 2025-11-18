import { useState } from "react";
import { cognitoForgotPassword, cognitoConfirmForgotPassword } from "../api/cognitoAuth";

export default function PasswordReset() {
    const [step, setStep] = useState(1); // 1 = request code, 2 = reset password
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            await cognitoForgotPassword(username);
            setStep(2);
            setMessage("Confirmation code sent to your email.");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to send code.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            await cognitoConfirmForgotPassword(username, code, newPassword);
            setMessage("Password successfully reset! You can now log in.");
            setStep(1);
            setUsername("");
            setCode("");
            setNewPassword("");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to reset password.");
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 px-6 py-12">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10">
                <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

                {message && <p className="mb-4 text-green-600">{message}</p>}
                {error && <p className="mb-4 text-red-600">{error}</p>}

                {step === 1 && (
                    <form onSubmit={handleRequestCode} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username or Email</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full border-b-2 border-gray-300 py-3 outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                        >
                            Send Reset Code
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirmation Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                className="w-full border-b-2 border-gray-300 py-3 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full border-b-2 border-gray-300 py-3 outline-none"
                            />
                        </div>ß

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
