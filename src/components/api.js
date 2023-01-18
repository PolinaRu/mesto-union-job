const config = {
    url: 'https://nomoreparties.co/v1/plus-cohort-18',
    headers: {
        authorization: '761944ff-ca64-4e82-a14c-fe8b959c12ae',
        'Content-Type': 'application/json'
    }
};
function request (url, options) {
    return fetch(url, options).then(checkRes);
}

const checkRes = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

const getInitialCards = () => {
    return request(`${config.url}/cards`, {
        headers: config.headers
    })
};

const getUser = () => {
    return request(`${config.url}/users/me`, {
        headers: config.headers
    })
};

const editProfileAvatar = (ava) => {
    return request(`${config.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: ava
        })
    })
};

const editProfile = (title, subtitle) => {
    return request(`${config.url}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: title,
            about: subtitle
        })
    })
};

const postNewElement = (name, link) => {
    return request(`${config.url}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
};

const deleteMyElement = (elementId) => {
    return request(`${config.url}/cards/${elementId}`, {
        method: 'DELETE',
        headers: config.headers
    })
};

const putLike = (elementId) => {
    return request(`${config.url}/cards/likes/${elementId}`, {
        method: 'PUT',
        headers: config.headers
    })
};

const unputLike = (elementId) => {
    return request(`${config.url}/cards/likes/${elementId}`, {
        method: 'DELETE',
        headers: config.headers
    })
};

export { getInitialCards, getUser, editProfileAvatar, editProfile, postNewElement, deleteMyElement, putLike, unputLike }
