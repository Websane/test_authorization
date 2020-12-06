export function AuthButton({ handleClickOut, handleClick, token }) {
    let text
    let handle
    let label

    if (token) {
        text = 'Выйти';
        handle = handleClickOut;
        label = 'кнопка отмены авторизации';
    } else {
        text = 'Авторизация';
        handle = handleClick
        label = 'кнопка входа в форму авторизации';
    }
        return (
            <button
                className="header__button"
                onClick={handle}
                aria-label={label}
            >
                {text}
            </button>
        )
}