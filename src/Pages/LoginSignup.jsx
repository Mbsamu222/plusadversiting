import React, { useState } from 'react';
import './LoginSignup.css'
import Axios from 'axios';


const LoginSignup = () => {
    // State variables for login form
    const [loginEmailOrMobile, setLoginEmailOrMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // State variables for signup form
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupMobile, setSignupMobile] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [gstin, setGstin] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login form submission
        console.log('Login Email/Mobile:', loginEmailOrMobile);
        console.log('Login Password:', loginPassword);
        // Add your login logic here (e.g., send API request)
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (
            !signupName ||
            !signupEmail ||
            !signupPassword ||
            !signupMobile ||
            !agreeTerms
        ) {
            console.error('Please fill in all required fields.');
            return;
        }

        // Additional validation logic (e.g., email format, password strength, etc.) can be added here

        try {
            const response = await Axios.post('http://localhost:4000/register', {
                name: signupName,
                email: signupEmail,
                password: signupPassword,
                mobile: signupMobile,
                companyName,
                gstin,
                agreeTerms,
            });
            console.log(response.data); // Assuming the backend sends a success message
            // Reset form fields after successful registration if needed
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (


        <div className="login-signup-container">
            <div>
                <div className="login-form">
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter mobile number or email"
                                value={loginEmailOrMobile}
                                onChange={(e) => setLoginEmailOrMobile(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="forgot-password">
                                <button type="button">Forgot password</button>
                            </div>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div className="signup-form">
                    <h2>Register</h2>
                    <p>New? Create an Account Below</p>
                    <form onSubmit={handleSignupSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                value={signupName}
                                onChange={(e) => setSignupName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Mobile No"
                                value={signupMobile}
                                onChange={(e) => setSignupMobile(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="GSTIN"
                                value={gstin}
                                onChange={(e) => setGstin(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    required
                                />
                                 I agree with Terms & Conditions
                            </label>
                        </div>
                        <div>
                            <button type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
