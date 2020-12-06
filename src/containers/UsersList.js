import React, {useEffect, useState} from "react";
import axios from 'axios';

import {Filter} from "../components/Filter";
import {ButtonSort} from "../components/ButtonSort";
import {List} from "../components/List";
import {Error} from "../components/Error";
import {Loading} from "../components/Loading";

export function UsersList() {
    //проверка элемента на использование
    const [touched, setTouched] = useState(false);
    //данные списка
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    //обработчики загрузки и ошибки
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    //забираем токен из локального хранилища
    const token = localStorage.getItem('token');

    useEffect(() => {
        setLoading(true);
        axios.get('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/',
            {
                headers: {'Authorization': `Token ${token}`}
            })
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError('Для просмотра списка пользователей необходима авторизация');
                setLoading(false);
            })
    }, [token]);
    //обработчик поля поиска пользователя
    const handleChangeSearch = (ev) => {
        setTouched(true);
        let value = ev.target.value;
        let filterData = data.filter(item => item.username.indexOf(value) !== -1);
        setNewData(filterData);
    }
    //функция сортировки массива по id элемента
    function sortData(array) {
        const sorting = array.concat();
        sorting.sort((a, b) => a.id - b.id);
        return sorting;
    }
    //обработчик кнопки сортировки
    const handleClick = () => {
        setData(sortData(data));
        setNewData(sortData(newData));
    }

    return(
        <main className="main">
            <section className="users">
                <div className="users__container container">
                    <div className="users__content">
                        {token &&
                            <>
                                <h2 className="users__title">Приветствуем Вас на нашем сайте!</h2>
                                <Filter handleChangeSearch={handleChangeSearch} />
                                <ButtonSort handleClick={handleClick} />
                            </>
                        }
                        {loading && <Loading />}
                        {error && !loading && <Error error={error} />}

                        {!touched && <List data={data} />}
                        {touched && <List data={newData} />}
                    </div>
                </div>
            </section>
        </main>
    )
}