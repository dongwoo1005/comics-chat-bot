'use strict';

import request from 'request';
import battlecomics from './battlecomics';
import formatter from './formatter';

const access_token = process.env.FB_PAGE_ACCESS_TOKEN;
const verify_token = process.env.FB_VERIFY_TOKEN;

let greetFirstTimeUserInteraction = () => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: {access_token: access_token},
        method: 'POST',
        json: {
            "setting_type": "greeting",
            "greeting": {
            	"text": "Welcome to Battle Comics"
            }
        }
	}, (error, response) => {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

let sendMessage = (messageData, sender) => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: access_token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
	}, (error, response) => {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

let sendTextMessage = (text, sender) => {
    let messageData = { text: text };
    sendMessage(messageData, sender);
};

let sendGenericMessage = (sender) => {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }]
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }]
                }]
            }
        }
    };
    sendMessage(messageData, sender);
};

let respondMessage = (message, sender) => {
	let text = message.replace(/ /g, '');

	let match;
	match = text.match(/Generic/i);
	if (match) {
		sendGenericMessage(sender);
		return;
	}

	match = text.match(/인기웹툰/);
	if (match) {
		battlecomics.getPopularWebtoons().then(webtoons => {
			sendTextMessage('현재 실시간 인기 웹툰입니다.', sender);
			sendMessage(formatter.formatWebtoons(webtoons), sender);
		});
		return;
	}

	match = text.match(/인기페이퍼/);
	if (match) {
		battlecomics.getPopularPapers().then(papers => {
			sendTextMessage('배틀코믹스 인기 페이퍼입니다.', sender);
			sendMessage(formatter.formatPapers(papers), sender);
		});
		return;
	}

	match = text.match(/인기일러/);
	if (match) {
		battlecomics.getPopularIllusts().then(illusts => {
			sendTextMessage('배틀코믹스 인기 일러스트입니다.', sender);
			sendMessage(formatter.formatIllusts(illusts), sender);
		});
		return;
	}

	sendTextMessage('Text received, echo: ' + message.substring(0, 200), sender)
}

let handleGet = (req, res) => {
	if (req.query['hub.verify_token'] === verify_token) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
}

let handlePost = (req, res) => {
	greetFirstTimeUserInteraction();

	let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i];
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            respondMessage(event.message.text, sender);
        } else if (event.postback) {
            let text = JSON.stringify(event.postback);
            sendTextMessage("Postback received: "+text.substring(0, 200), sender)
        }
    }
    res.sendStatus(200)
}

exports.handleGet = handleGet;
exports.handlePost = handlePost;
