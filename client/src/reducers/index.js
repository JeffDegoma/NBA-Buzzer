import * as actions from '../actions/index';


const nbaState = {
	savedTweets: [],
	twitterTweets: [],
	twitterUsers: null
}

export const nbaStateReducer = (state = nbaState, action) => {

	if(action.type === actions.SAVE_TWEET) {
		const tweet = action.tweet;
		return {
			...state, 
			savedTweets: tweet
		};
	}

	if(action.type === actions.DELETE_TWEET) {
		const tweets = action.tweets;
		return {
			...state,
			savedTweets: tweets
		};
	}

	if(action.type === actions.GET_FAVORITE_TWEETS) {
		const tweets = action.tweets;
		return {
			...state,
			savedTweets: tweets
		};
	}

	if(action.type === actions.GET_SEEDED_TWEETS) {
		const tweets = action.tweets;
		state.twitterTweets = [...tweets];
		return Object.assign({}, state);
	}

	if(action.type === actions.GET_USERS) {
		const users = action.users;
		state.twitterUsers = [...users];
		return {
			...state,
			twitterUsers: users
		}
	}

	return state;

}