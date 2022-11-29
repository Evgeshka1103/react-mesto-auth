import '../App.css';
import { useState, useEffect } from 'react';
import '../App.css';
import api from '../utils/Api';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';


import * as sign from '../utils/Sign';

import err from '../images/err.png';
import success from '../images/success.png';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Popups from './Popups';

import { CurrentUserContext } from '../Context/CurrentUserContext';

export default function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] = useState(false);

    const [isInfoToolTipWithErr, setIsInfoToolTipWithErr] = useState(false);
    const [isInfoToolTipWithSuccess, setIsInfoToolTipWithSuccess] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const history = useHistory();

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardClick(selectedCard) {
        setSelectedCard(selectedCard);
        setIsImagePopupOpen(true);
    };

    function handleDeleteClick(selectedCard) {
        setSelectedCard(selectedCard);
        setIsPopupWithConfirmationOpen(true);
    };

    function handleInfoToolTipWithSuccess() {
        setIsInfoToolTipWithSuccess(true);
    };

    function handleInfoToolTipWithErr() {
        setIsInfoToolTipWithErr(true);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsPopupWithConfirmationOpen(false);

        setIsInfoToolTipWithSuccess(false);
        setIsInfoToolTipWithErr(false);

        setSelectedCard({});
    };

    function handleUpdateUser(data) {
        api.patchUserInfoData(data)
            .then(userData => setCurrentUser(userData))
        closeAllPopups()
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleUpdateAvatar(data) {
        api.patchUserAvatarData(data)
            .then(userData => setCurrentUser(userData))
        closeAllPopups()
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleAddPlaceSubmit(data) {
        api.postUserCardData(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(element => element._id === currentUser._id);
        api.changeLikeStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((element) => element._id === card._id ? newCard : element));
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    };

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((element) => element._id !== card._id && element));
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    };

    function onRegister({ email, password }) {
        return sign.register(email, password)
            .then((res) => {
                return res;
            })
    };

    function onLogin({ email, password }) {
        return sign.login(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    setLoggedIn(true);
                    setEmail(email);
                    setPassword(password);
                }
            })
    };

    function onCheckToken(jwt) {
        return sign.checkToken(jwt)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setEmail(res.data.email);

                }
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    };

    function onLogout() {
        localStorage.removeItem('jwt');
    };

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            onCheckToken(jwt);
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([userData, cardsData]) => {
                    setCurrentUser(userData);
                    setCards(cardsData);
                    history.push('/');
                })
                .catch(err => console.log(`Ошибка: ${err}`));
        }
    }, [loggedIn]);

    return (

        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>

                <Header
                    onLogout={onLogout}
                    email={email} />

                <Switch>

                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddCard={handleAddPlaceClick}
                        onCardDelete={handleDeleteClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        cards={cards}
                    />

                    <Route exact path="/">
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="sign-in" />}
                    </Route>

                    <Route path="/sign-up">
                        <Register
                            onRegister={onRegister}
                            onInfoToolTipWithErr={handleInfoToolTipWithErr}
                            onInfoToolTipWithSuccess={handleInfoToolTipWithSuccess}
                        />
                    </Route>

                    <Route path="/sign-in">
                        <Login
                            onLogin={onLogin}
                            onInfoToolTipWithErr={handleInfoToolTipWithErr}
                        />
                    </Route>

                    



                </Switch>

                <Footer />

                <Popups onEscClose={closeAllPopups} />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                    isOpen={isImagePopupOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    card={selectedCard}
                />

                <PopupWithConfirmation
                    isOpen={isPopupWithConfirmationOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    onSubmitDelete={handleCardDelete}
                    card={selectedCard}
                />

                <InfoTooltip
                    isOpen={isInfoToolTipWithErr}
                    onClose={closeAllPopups}
                    image={err}
                    text="Что-то пошло не так! Попробуйте ещё раз."
                />

                <InfoTooltip
                    isOpen={isInfoToolTipWithSuccess}
                    onClose={closeAllPopups}
                    image={success}
                    text="Вы успешно зарегистрировались!"
                />
            </CurrentUserContext.Provider>
        </div>

    );
}