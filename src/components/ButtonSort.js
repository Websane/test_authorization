export function ButtonSort({ handleClick }) {
    return (
        <button
            className="users__button"
            onClick={handleClick}
            aria-label="кнопка сортировки"
        >
            Отсортировать
        </button>
    )
}