import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegisterUser }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const email = email;
        const password = password;

        handleRegisterUser(email, password);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleFormSubmit}>

                <div className="auth__field">
                    <input

                        type="email"
                        id="input-email"
                        className="auth__input_email"
                        placeholder="email"
                        value={email}
                        name="email"
                        minlength="8"
                        maxlength="40"
                        onChange={handleEmailChange}
                        required />
                    <span
                        className="error" />
                </div>

                <div className="auth__field">
                    <input
                        type="password"
                        id="input-password"
                        className="auth__input_password"
                        placeholder="password"
                        value={password}
                        name="password"
                        minlength="6"
                        maxlength="40"
                        onChange={handlePasswordChange}
                        required />
                    <span
                        className="error" />
                </div>
                <button
                    type="submit"
                    className="auth__buton">
                    Зарегистрироваться
                </button>
            </form>
            <div className="auth__register">
                <p>Уже зарегистрированы?</p>
                <Link
                    className="auth__login"
                    to="/sing-in">
                    Войти
                </Link>
            </div>
        </div>
    )
}