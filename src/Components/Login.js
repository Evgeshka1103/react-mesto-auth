import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import SignForm from './SignForm';

export default function Login({ onLogin, onInfoToolTipWithErr }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const resetForm = useCallback(() => {
        setEmail('');
        setPassword('');
    }, []);

    function handleEmailChange(e) {
        setEmail(e.target.value);
    };

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin({ email, password })
            .then(resetForm)
            .then(() => {
                history.push('/');
            })
            .catch(() => {
                onInfoToolTipWithErr();
            })
    };

    return (
        <div className="sign">

            <h2 className="sign__title">Вход</h2>

            <SignForm
                onEmailChange={handleEmailChange}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleSubmit}
                email={email}
                password={password}
                button="Войти"
            />

        </div>
    );
}
