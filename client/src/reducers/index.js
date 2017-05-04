import * as actions from '../actions/index'


const nbaState = {

	savedTweets: []
	
}


export const nbaStateReducer = (state=nbaState, action) => {
	if(action.type === actions.SAVE_TWEET){
		const tweet = action.tweet
		console.log("Tweet", tweet)
		state.savedTweets = [...state.savedTweets, tweet]
		return Object.assign({}, state)
	}
}