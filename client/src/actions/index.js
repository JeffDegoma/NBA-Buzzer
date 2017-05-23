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
    .then(data => {
        dispatch(saveTweet(data));
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
