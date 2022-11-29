import logo from '../images/logo.svg';

import {Route, Switch, Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Логотип" />
            <Switch>
                <Route path="/sign-in">
                    <Link 
                    to="/sign-up" 
                    className="header__link">
                    Регистрация
                    </Link>
                </Route>
                <Route path="/sign-up">
                    <Link 
                    to="/sign-in" 
                    className="header__link">
                    Войти
                    </Link>
                </Route>
                <Route path="/">
                    <div className="header__block-user">
                        <p className="header__email">{props.email}</p>
                        <Link 
                        to="/sign-in" 
                        className="header__link" 
                        onClick={props.onLogout}>
                        Выйти
                        </Link>
                    </div>
                </Route>
            </Switch>
        </header>
    );
} 