'use strict';

let handleGet = (req, res) => {
	res.send('Hello world, I am a chat bot!');
}

exports.handleGet = handleGet;