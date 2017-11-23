import 'isomorphic-fetch';
import * as Cookies from 'js-cookie';


export const SAVE_TWEET = 'SAVE_TWEET';
export const saveTweet = tweet=> ({
	type: SAVE_TWEET,
	tweet
});

export const DELETE_TWEET = 'DELETE_TWEET';
export const deleteTweet = tweets=> ({
    type: DELETE_TWEET,
    tweets
});


export const GET_FAVORITE_TWEETS = 'GET_FAVORITE_TWEETS';
export const getFavoriteTweets = tweets => ({
    type: GET_FAVORITE_TWEETS,
    tweets
});

export const GET_SEEDED_TWEETS = 'GET_SEEDED_TWEETS';
export const getSeededTweets = tweets => ({
    type: GET_SEEDED_TWEETS,
    tweets
});

export const GET_USER = 'GET_USER';
export const getUser = user => ({
    type: GET_USER,
    user
});


export const saveToFavorites = tweet => dispatch => {

    const url = '/api/favorites/save';
    const accessToken = Cookies.get('accessToken');

    return fetch(url, {
        method: 'POST',
    	body: JSON.stringify({tweet}),
        headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
        }	
    })
    .then(response => {
        if (!response.ok) {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        return response.json();
    })
    .then(tweets => {
        dispatch(saveTweet(tweets));
    })
    .catch(error => {
        console.log(error);
    });
};

export const deleteFromFavorites = tweet => dispatch => {

    const url = '/api/favorites/delete';
    const accessToken = Cookies.get('accessToken');

    return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({tweet}),
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            const error = new Error(res.statusText);
            error.res = res;
            throw error;
        }
        return res.json();
    })
    .then(data =>{
        dispatch(deleteTweet(data));
    })
    .catch(error => {
        console.log(error);
    });
};

export const fetchFavoriteTweets = () => dispatch => {

    const url = '/api/favorites';
    const accessToken = Cookies.get('accessToken');

    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => {
        if (!res.ok) {
            const error = new Error(res.statusText);
            error.res = res;
            throw error;           
        }
        return res.json();
    })
    .then(favoriteTweets => {
        dispatch(getFavoriteTweets(favoriteTweets));
    })
    .catch(error => {
        console.log(error);
    });
}

export const fetchSeedTweets = () => dispatch => {

    const url = '/api/twitter';
    const accessToken = Cookies.get('accessToken');

    return fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => {
        if (!res.ok) {
            const error = new Error(res.statusText);
            error.res = res;
            throw error;
        }
        return res.json();
    })
    .then(seededTweets => {
        dispatch(getSeededTweets(seededTweets));
    })
    .catch(error => {
        console.log(error);
    });

}

export const fetchUser = () => dispatch => {

    const url = '/api/me';
    const accessToken = Cookies.get('accessToken')


    if (accessToken) {
        return fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => {
            if (!res.ok) {
                if (res.status !== 401) {
                    // Unauthorized, clear the cookie and go to
                    // the login page
                    Cookies.remove('accessToken');
                    return;
                }
                throw new Error("ERROR!!", res.statusText);
            }
            return res.json();
        })
        .then(currentUser => {
           dispatch(getUser(currentUser))
        })
        .catch(error => {
        console.log(error);
        });
    }else{
        dispatch(getUser(null))
    }
}


export const modalLogin = (email, password) => dispatch => {

    const url = '/api/login/me';
    const user = {email, password}

    return fetch(url, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(user)
    })
    .then(res => {
        if (!res.ok) {
            if (res.status !== 401) {
                const error = new Error(res.statusText);
                error.res = res;
                throw error;
            }
            throw new Error("ERROR!!", res.statusText);
        }
        return res.json()
    })
    .then(currentUser => {
        Cookies.set('accessToken', currentUser.local.email);
        dispatch(getUser(currentUser))
    })
    .catch(error => {
        console.log(error);
    });

}





