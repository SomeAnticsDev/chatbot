/**
 * Provide a hint for how to vote whenever a poll starts.
 * 
 * @param {import('tmi.js').Client} client - Twitch chat client
 * @param {'poll'} command - triggered command
 * @param {string} body - message body after the command
 */
 module.exports = function poll(client, command, body) {
	if (!body.includes('[')) {
		return;
	}

	try {
		const start = body.indexOf('[') + 1;
		const end = body.indexOf(']');
		const bracketedOptions = body.substring(start, end);
		const options = bracketedOptions
			.split(',')
			.map(option => option.trim());

		const [firstOption, secondOption] = options;

		const optionAwareHint = (options.length > 2) ?
			`To vote for an option, send "!vote 1" for ${firstOption}, "!vote 2" for ${secondOption}, and so forth!` :
			`To vote for an option, send "!vote 1" for ${firstOption} or "!vote 2" for ${secondOption}!`

		client.say(
			process.env.TWITCH_BROADCASTER_USERNAME,
			`A poll has started! ${optionAwareHint}`
	);
	} catch (e) {
		console.error(e);
	}
}