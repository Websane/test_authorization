export function List({ data }) {
    return(
        <ol className="users__list">
            {data.map(item =>
            <li className="users__item" key={item.id}>
                <span className="users__name">{item.username}</span>
                <span className="users__id">id/{item.id}</span>
                {item.is_active &&
                    <>
                    <span className="users__online isActive"/>
                    <small className="users__small">online</small>
                    </>
                }
                {!(item.is_active) &&
                    <>
                    <span className="users__offline isActive" />
                    <small className="users__small">offline</small>
                    </>
                }
            </li>
            )}
        </ol>
    )
}