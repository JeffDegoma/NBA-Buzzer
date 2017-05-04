import 'isomorphic-fetch'



export const SAVE_TWEET = 'SAVE_TWEET';
export const saveTweet = (tweet)=> ({
	type: SAVE_TWEET,
	tweet
})


export const saveToFavorites = tweetID => dispatch => {
    const url = `/api/favorites/save`;
    return fetch(url,
    {
    	method: 'POST',
    	body: {tweetID}
    	
    }).then(response => {
        if (!response.ok) {
            const error = new Error(response.statusText)
            error.response = response
            throw error;
        }
        return response;
    })
    .then(data =>{
        console.log(data)
        // dispatch(fetchDescriptionSuccess(repository, data.description))
    })
    .catch(error =>
        console.log(error)// dispatch(fetchDescriptionError(repository, error))
    );
};

