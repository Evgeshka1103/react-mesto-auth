export default function InfoTooltip(props) {
    return (
        <div className={`popup popup__tooltip ${props.isOpen && 'popup__opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__button-close"
                    type="button" onClick={props.onClose} />
                <img
                    className="popup__tooltip-icon"
                    src={props.image} />
                <h2
                    className="popup__tooltip-text">
                    {props.text}
                </h2>
            </div>
        </div>
    );
}
