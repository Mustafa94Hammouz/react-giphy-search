import { authHeader } from '../authHeader/authHeader';

export const userService = {
    login,
    logout,
    getUser,
    fetchGiphy
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('https://reqres.in/api/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('https://reqres.in/api/users/2', requestOptions)
        .then(Response => Response.json())
        .then(response =>{
        // const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }
        }
        return response;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

 function fetchGiphy(search,limit,offset) {
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=c3iixZEYA7vBkBY68lTBR5odgIYet3vN&q=${search}&limit=${limit}&offset=${offset}&rating=G&lang=en`)
        .then(Response => {
            return Response.json()
        })
        .then((json)=>{
            let list = json.data;
            return list;

        });

}