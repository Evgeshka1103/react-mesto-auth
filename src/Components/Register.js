import { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SignForm from './SignForm';

export default function Register({ onRegister, onInfoToolTipWithErr, onInfoToolTipWithSuccess }) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    };

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    };

    const resetForm = useCallback(() => {
        setEmail('');
        setPassword('');
    }, []);

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister({ email, password })
            .then(resetForm)
            .then(() => {
                history.push('/sign-in');
                onInfoToolTipWithSuccess();
            })
            .catch(() => {
                onInfoToolTipWithErr();
            })
    };

    return (
        <div className="sign">

            <h2 className="sign__title">Регистрация</h2>

            <SignForm
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
                onSubmit={handleSubmit}
                email={email}
                password={password}
                button="Зарегистрироваться"
            />
            
            <div className="sign__register">
                <p>Уже зарегистрированы?</p>
                <Link 
                to="sign-in" 
                className="sign__login_link"> 
                Войти
                </Link>
            </div>

        </div>
    );
}