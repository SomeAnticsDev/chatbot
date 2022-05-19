const {StaticAuthProvider} = require('@twurple/auth');
const {ApiClient} = require('@twurple/api');
// const {ChatClient} = require('@twurple/chat');

const authProvider = new StaticAuthProvider(
	process.env.TWITCH_BOT_CLIENT_ID,
	process.env.TWITCH_OAUTH_TOKEN	
);

const apiClient = new ApiClient({authProvider});
// const chatClient = new ChatClient({
// 	authProvider,
// 	channels: [process.env.TWITCH_BROADCASTER_USERNAME]
// });

module.exports = {
	apiClient,
	// chatClient
};