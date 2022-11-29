import { useEffect, useCallback } from 'react';


export default function Popups(props) {
    const handleEsc = useCallback((evt) => {
        if (evt.key === 'Escape') {
            props.onEscClose();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [handleEsc]);
}