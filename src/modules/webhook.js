'use strict';

import request from 'request';

const token = process.env.FB_PAGE_ACCESS_TOKEN;

let sendMessage = (messageData, sender) => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
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
	let match;
	match = message.match(/Generic/i);
	if (match) {
		sendGenericMessage(sender);
		return;
	}
	sendTextMessage("Text received, echo: " + text.substring(0, 200), sender)
}

let handlePost = (req, res) => {
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

exports.handlePost = handlePost;