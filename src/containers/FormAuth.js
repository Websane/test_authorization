import React, {useState, useRef, useEffect, useCallback} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

import {Error} from "../components/Error";
import {Loading} from "../components/Loading";

export function FormAuth () {
    const firstRender = useRef(true);
    //значения введенных логина и праоля
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    //проверка элемента на использование
    const [touched, setTouched] = useState(false);
    //валидация логина и пароля
    const [loginError, setLoginError] = useState('');
    const [passError, setPassError] = useState('');
    //обработчики загрузки и ошибки
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();
    //обработчик изменений в поле логина
    const handleChangeLogin = (ev) => {
        setTouched(true);
        setLogin(ev.target.value);
    }
    //обработчик изменений в поле пароля
    const handleChangePass = (ev) => {
        setTouched(true);
        setPass(ev.target.value);
    }
    //валидация логина
    const validateLogin = useCallback(() =>{
        if (login.length < 2) return 'Введите минимум 2 символа';
        if (login.length > 15) return 'Слишком длинное имя';
        return '';
    }, [login])
    //валидация пароля
    const validatePass = useCallback(() =>{
        if (pass.length < 5) return 'Введите минимум 5 символов';
        return '';
    }, [pass])

    useEffect(() => {
        //не используем валидацию при первом рендере
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (login) {
            setLoginError(validateLogin());
        }
        if (pass) {
            setPassError(validatePass());
        }
    }, [login, pass, validateLogin, validatePass])

    //обработчик отправки формы
    const handleSubmit = (ev) => {
        ev.preventDefault();
        //валидация
        setTouched(true);
        setLoginError(validateLogin());
        setPassError(validatePass());
        const loginValid = !validateLogin();
        const passValid = !validatePass();
        if (!loginValid || !passValid)  return;
        //отправка данных формы на сервер
        setLoading(true);
        axios.post('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/',
            {
                username: login,
                password: pass,
            }
        )
            .then(response => {
                localStorage.setItem('token', response.data['token']);
                console.log(response)
                // document.cookie = `token=${response.data['token']}; samesite=strict`;
                setLoading(false);
                history.push('/private');
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setError('Ошибка авторизации');
                setLogin('');
                setPass('');
            });
    }

    return (
        <section className="auth">
            <div className="container auth__container">
                <form className="auth__form" onSubmit={handleSubmit}>
                    <label className="auth__input">
                        Имя пользователя:
                        <input
                            className="auth__login input"
                            type="text"
                            value={login}
                            onInput={handleChangeLogin}
                            autoFocus={true}
                            aria-invalid={loginError ? 'true' : undefined}
                        />
                        {touched && loginError && <Error error={loginError} />}
                    </label>
                    <label className="auth__input">
                        Пароль:
                        <input
                            className="auth_password input"
                            type="password"
                            value={pass}
                            onInput={handleChangePass}
                            aria-invalid={passError ? 'true' : undefined}
                        />
                        {touched && passError && <Error error={passError} />}
                    </label>

                    {!loading &&
                        <button
                            className="auth__button"
                            type="submit"
                            aria-label="кнопка отправки введенных данных"
                        >
                            Войти
                        </button>
                    }

                    {loading && <Loading />}

                    {error && !loading && <Error error={error} />}
                </form>
            </div>
        </section>
    )
}