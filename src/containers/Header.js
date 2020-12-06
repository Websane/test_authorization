import { useHistory, useLocation } from "react-router-dom";
import {AuthButton} from "../components/AuthButton";

export function Header() {
    const location = useLocation();

    if (location.pathname === '/') {
        localStorage.removeItem('token');
    }
    //забираем токен из хранилища
    const token = localStorage.getItem('token');

    const history = useHistory();

    function handleClick() {
        history.push('/auth')
    }

    function handleClickOut() {
        //убираем токен из хранилища
        localStorage.removeItem('token');
        history.push('/')
    }

    return(
        <header className="header">
            <div className="header__container container">
                <div className="header__content">
                    <h1 className="header__title">TEST APP</h1>
                    <AuthButton handleClick={handleClick} handleClickOut={handleClickOut} token={token} />
                </div>
            </div>
        </header>
    )
}