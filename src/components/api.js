export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfileAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  editProfile(title, subtitle) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: subtitle,
      }),
    }).then(this._checkResponse);
  }
  postNewElement(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteMyElement(elementId) {
    return fetch(`${this._url}/cards/${elementId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  putLike(elementId) {
    return fetch(`${this._url}/cards/likes/${elementId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  unputLike(elementId) {
    return fetch(`${this._url}/cards/likes/${elementId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
