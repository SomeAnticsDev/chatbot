/**
 * @typedef {Object} ThemeCredit
 * @property {string} name - theme name
 * @property {string} author - theme creator
 * @property {string} url - VS Code Marketplace link for theme
 */

/** @type {ThemeCredit} */
const nightMind = {
	name: 'Night Mind',
	author: '@b1mind',
	url: 'https://marketplace.visualstudio.com/items?itemName=b1m1nd.night-mind'
};

/** @type {ThemeCredit} */
const auraDark = {
	name: 'Aura Dark (Soft Text)',
	author: 'Dalton Menezes',
	url: 'https://marketplace.visualstudio.com/items?itemName=DaltonMenezes.aura-theme'
};

/**
 * Command to send out the current VS Code theme
 * 
 * @param {import('tmi.js').Client} client - Twitch chat client
 * @param {'theme'} command - triggered command
 * @param {string} body - message body after the command
 */
module.exports = function theme(client, command, body) {
	const currentTheme = auraDark;
	const credit = `The VS Code theme is ${currentTheme.name} by ${currentTheme.author}! Check it out at ${currentTheme.url}`;
	
	client.say(
		process.env.TWITCH_BROADCASTER_USERNAME,
		credit
	);
}