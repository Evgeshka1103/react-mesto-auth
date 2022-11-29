export default function SignForm(props) {
    return (
        <div className="sign__form" onSubmit={props.onSubmitForm}>
            <div
                className="sign__field">
                <input
                    className="sign__input sign__input_email"
                    name="email"
                    type="email"
                    value={props.email}
                    onChange={props.onEmailChange}
                    placeholder="email"
                    required />

                <span className="sign__input_error" />
            </div>

            <div
                className="sign__field">
                <input
                    className="sign__input sign__input_password"
                    name="password"
                    type="password"
                    value={props.password}
                    onChange={props.onPasswordChange}
                    minlength="6"
                    maxlength="30"
                    placeholder="password"
                    required />

                <span className="sign__input_error" />
            </div>

            <button
                className="sign__button"
                type="submit">{props.button}</button>

        </div>
    );
}
