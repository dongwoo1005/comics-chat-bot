'use strict';

import messenger from './messenger';

const verify_token = process.env.FB_VERIFY_TOKEN;

let handleGet = (req, res) => {
	if (req.query['hub.verify_token'] === verify_token) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
}

let handlePost = (req, res) => {
	let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i];
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            messenger.respondMessage(event.message.text, sender);
        } else if (event.postback) {
            // let text = JSON.stringify(event.postback);
            // sendTextMessage("Postback received: "+text.substring(0, 200), sender)
            let payload = event.postback.payload
            if (payload === "get_started") {
            	messenger.sendIntroMessage(sender);
            } else if (payload === "start_chatting") {
				messenger.sendGreetAndSuggestion(sender);
            } else if (payload === "popular_webtoon") {
            	messenger.sendPopularWebtoons(sender);
            } else if (payload === "new_webtoon") {
            	messenger.sendNewWebtoons(sender);
            } else if (payload === "popular_paper") {
            	messenger.sendPopularPapers(sender);
            } else if (payload === "popular_illust") {
            	messenger.sendPopularIllusts(sender);
            } else if (payload === "popular_board") {
            	messenger.sendPopularBoardItems(sender);
            }
        }
    }
    res.sendStatus(200)
}

exports.handleGet = handleGet;
exports.handlePost = handlePost;
