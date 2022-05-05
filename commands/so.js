const twitchApi = require('../utils/twitch');

/** @type {Object<string, {name: string, additionalMessage?: string}>} */
const extraDetails = {
	'5t3phdev': {
		name: 'Steph',
		additionalMessage: `Steph's streams are a great place to learn about CSS, Eleventy, and more!`
	},
	ajcwebdev: {
		name: 'Anthony'
	},
	b1mind: {
		name: 'Brent'
	},
	baldbeardedbuilder: {
		name: 'Michael'
	},
	bholmesdev: {
		name: 'Ben',
		additionalMessage: 'Ben is streaming his work on Astro!'
	},
	bryanlrobinson: {
		name: 'Bryan'
	},
	buildingbedrocklayout: {
		name: 'Travis',
		additionalMessage: `Travis is streaming his progress building out the Bedrock Layout component library.`
	},
	coderpad: {
		name: 'CoderPad',
		additionalMessage: 'Corbin interviews awesome folks from around web development!'
	},
	crutchcorn: {
		name: 'Corbin',
		additionalMessage: `They're working on the Framework Field Guide, a book about React, Angular, and Vue!`
	},
	fimion: {
		name: 'Alex'
	},
	finitesingularity: {
		name: 'Mark',
	},
	genericmikechen: {
		name: 'Mike',
		additionalMessage: `Mike's practice frontend dev interviews are a great resource for any frontend devs looking for their next job!`
	},
	geometricjim: {
		name: 'Jim',
		additionalMessage: `Jim's streams are an invaluable resources for learning accessibility tips.`
	},
	jlengstorf: {
		name: 'Jason',
		additionalMessage: `Jason's show Learn With Jason is a great way to learn more about building for the Jamstack!`
	},
	joshuakgoldberg: {
		name: 'Josh'
	},
	kevinpowellcss: {
		name: 'Kevin',
		additionalMessage: `Kevin's streams about CSS and more are incredibly informative.`
	},
	lunchdev: {
		name: 'Chan',
	},
	mannimoki: {
		name: 'Manny',
	},
	martine_dowden: {
		name: 'Martine'
	},
	maxcellw: {
		name: 'Prince',
	},
	peruvianidol: {
		name: 'Mike',
		additionalMessage: `Mike holds office hours for CSS, Eleventy, and more each Friday.`
	},
	toefrog: {
		name: 'Chris',
	},
	trostcodes: {
		name: 'Alex',
		additionalMessage: `Alex's Frontend Horse streams, featuring guests from around web development and web design, are a great way to dive into creative coding!`
	},
	whitep4nth3r: {
		name: 'Salma',
		additionalMessage: `Salma's streams are jam-packed with Jamstack knowledge and more!`
	}
};

/**
 * Command to shout out a fellow streamer
 * 
 * @param {import('tmi.js').Client} client - Twitch chat client
 * @param {'shoutout' | 'so'} command - triggered command
 * @param {string} body - message body after the command
 */
 module.exports = async function shoutOut(client, command, body) {
	try {
		if (!body) return;

		let [username] = body.split(' ');
		username = username.replace('@', '');
		const user = await twitchApi.users.getUserByName(username);
		const channel = await twitchApi.channels.getChannelInfo(user.id);

		const displayName = user?.displayName;
		const url = `https://twitch.tv/${displayName}`;
		const streamerDetails = extraDetails[username.toLowerCase()];
		const firstName = streamerDetails?.name || `@${displayName}`;
		
		const sentences = [
			`Go check out @${displayName} at ${url}!`
		];

		if (streamerDetails?.additionalMessage) {
			sentences.push(streamerDetails.additionalMessage);
		}

		// User has a recent enough stream with a holdover title
		if (channel?.title) {
			sentences.push(`${firstName}'s most recent stream was "${channel.title}"`);
		}

		const message = sentences.join(' ');
		client.say(process.env.TWITCH_BROADCASTER_USERNAME, message);
	} catch (err) {
		console.error({err});
	}
}