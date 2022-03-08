const tmi = require('tmi.js');
require('dotenv').config();

const searchForBlogPost = require('./commands/blog');
const listCommands = require('./commands/commands');
const hintAboutPolls = require('./commands/poll');
const searchForStream = require('./commands/stream');
const shoutOut = require('./commands/so');

const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
	},
	channels: [process.env.TWITCH_BROADCASTER_USERNAME],
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	}
});

client.connect();

function say(...args) {
	client.say(process.env.TWITCH_BROADCASTER_USERNAME, ...args);
}

/**
 * @callback Command
 * @param {import('tmi.js').Client} client - Twitch chat client
 * @param {string} command - triggered command
 * @param {string} body - message body after the command
 */

/** @type {Object<string, Command>} */
const commands = {
	// Simple call-and-response commands
	discord: () => say('Looking for inclusive web development communities online? Join the Lunch Dev Discord (https://discord.gg/lunchdev) and the Frontend Horse Discord (https://frontend.horse/chat)!'),
	theme: () => say('The VS Code theme is Night Mind, by @b1mind! Check it out at https://marketplace.visualstudio.com/items?itemName=b1m1nd.night-mind'),
	twitter: () => say('Follow Some Antics on Twitter at https://twitter.com/SomeAnticsDev'),
	uses: () => say(`Check out Ben's whole setup at https://benmyers.dev/uses/!`),
	youtube: () => say(`Catch up with previous streams at https://someantics.dev/youtube!`),

	// More complicated commands
	blog: searchForBlogPost,
	commands: listCommands,
	stream: searchForStream
};

/** @type {Object<string, Command>} */
const moderatorCommands = {
	// Simple call-and-response commands
	frontendhorse: () => say('Join the Frontend Horse Discord! https://frontend.horse/chat'),
	lunchdev: () => say('Join the Lunch Dev Discord server! https://discord.gg/lunchdev'),
	merch: () => say('somean3Logo Check out the Some Antics merch store! https://someantics.dev/merch (use code TUNA for 15% this week!) somean3Logo'),
	reactpodcast: () => say('Join the Lunch Dev Discord server! https://discord.gg/lunchdev'),

	// More complicated commands
	shoutout: shoutOut,
	so: shoutOut
};

/** @type {Object<string, Command>} */
const broadcasterCommands = {
	poll: hintAboutPolls
};

const COMMAND_REGEX = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

client.on('message', (ircChannel, tags, message, self) => {
	// console.log(`${tags['display-name']}: ${message}`);
	const isBot = tags.username.toLowerCase() === process.env.TWITCH_BOT_USERNAME;
	if (isBot) return;

	const channel = ircChannel.toLowerCase().replace('#', '');
	const isBroadcaster = tags.username.toLowerCase() === channel;
	const isMod = isBroadcaster || tags.mod;
	// console.log({isBroadcaster, isMod, channel})
	
	if (message.startsWith('!')) {
		const [raw, command, body] = message.match(COMMAND_REGEX);
		const noop = () => {};

		const executeCommand = 
			(isBroadcaster && broadcasterCommands[command]) ||
			(isMod && moderatorCommands[command]) ||
			commands[command] ||
			noop;

		executeCommand(client, command, body);
	}
});