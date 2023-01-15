const config = {
    url: 'https://nomoreparties.co/v1/plus-cohort-18',
    headers: {
        authorization: '761944ff-ca64-4e82-a14c-fe8b959c12ae',
        'Content-Type': 'application/json'
    }
};

const checkRes = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

const getInitialCards = () => {
    return fetch(`${config.url}/cards`, {
        headers: config.headers
    })
        .then(res => checkRes(res))
};

const getUser = () => {
    return fetch(`${config.url}/users/me`, {
        headers: config.headers
    })
        .then(res => checkRes(res))
};

const editProfileAvatar = (ava) => {
    return fetch(`${config.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: ava
        })
    })
        .then(res => checkRes(res))
};

const editProfile = (title, subtitle) => {
    return fetch(`${config.url}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: title,
            about: subtitle
        })
    })
        .then(res => checkRes(res))
};

const postNewElement = (name, link) => {
    return fetch(`${config.url}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => checkRes(res))
};

const deleteMyElement = (elementId) => {
    return fetch(`${config.url}/cards/${elementId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => checkRes(res))
};

const putLike = (elementId) => {
    return fetch(`${config.url}/cards/likes/${elementId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => checkRes(res))
};

const unputLike = (elementId) => {
    return fetch(`${config.url}/cards/likes/${elementId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => checkRes(res))
};

export { getInitialCards, getUser, editProfileAvatar, editProfile, postNewElement, deleteMyElement, putLike, unputLike }
