'use strict';

import request from 'request';
import battlecomics from '../../api/battlecomics';
import facebook from '../../api/facebook';
import formatter from './formatter';

const access_token = process.env.FB_PAGE_ACCESS_TOKEN;

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

let sendPopularWebtoons = (sender) => {
	battlecomics.getPopularWebtoons().then(webtoons => {
		sendTextMessage('현재 실시간 인기 웹툰입니다.', sender);
		sendMessage(formatter.formatWebtoons(webtoons), sender);
	});
};

let sendPopularPapers = (sender) => {
	battlecomics.getPopularPapers().then(papers => {
		sendTextMessage('배틀코믹스 인기 페이퍼입니다.', sender);
		sendMessage(formatter.formatPapers(papers), sender);
	});
};

let sendPopularIllusts = (sender) => {
	battlecomics.getPopularIllusts().then(illusts => {
		sendTextMessage('배틀코믹스 인기 일러스트입니다.', sender);
		sendMessage(formatter.formatIllusts(illusts), sender);
	});
};

let sendPopularBoardItems = (sender) => {
	battlecomics.getPopularBoardItems().then(boardItems => {
		sendTextMessage('배틀코믹스 인기 게시글입니다.', sender);
		sendMessage(formatter.formatBoardItems(boardItems), sender);
	});
}

let sendNewWebtoons = (sender) => {
	battlecomics.getNewWebtoons().then(webtoons => {
		sendTextMessage('배틀코믹스 신규 웹툰입니다.', sender);
		sendMessage(formatter.formatWebtoons(webtoons), sender);
	});
}

let sendIntroMessage = (sender) => {
	sendMessage(formatter.formatIntro(), sender);
}

let sendGreetAndSuggestion = (sender) => {
	facebook.getUserInfo(sender).then(userInfo => {
		sendMessage(formatter.formatSuggestion("안녕하세요 반갑습니다, " + userInfo.first_name + "님! 무엇을 보여드릴까요?"), sender);
	}, error => {
		console.log(error);
		sendMessage(formatter.formatSuggestion("안녕하세요 반갑습니다. 무엇을 보여드릴까요?"), sender);
	});
}

let respondMessage = (message, sender) => {
	let text = message.replace(/ /g, '');

	let match;
	match = text.match(/Generic/i);
	if (match) {
		sendGenericMessage(sender);
		return;
	}

	match = text.match(/리오|도와|도움/);
	if (match) {
		sendMessage(formatter.formatSuggestion("무엇을 도와드릴까요?"), sender);
		return;
	}

	match = text.match(/인기웹툰/);
	if (match) {
		sendPopularWebtoons(sender);
		return;
	}

	match = text.match(/신규웹툰|신작/);
	if (match) {
		sendNewWebtoons(sender);
		return;
	}

	match = text.match(/인기페이퍼|페이퍼/);
	if (match) {
		sendPopularPapers(sender);
		return;
	}

	match = text.match(/인기일러|일러/);
	if (match) {
		sendPopularIllusts(sender);
		return;
	}

	match = text.match(/인기게시글|게시글|게시판/);
	if (match) {
		sendPopularBoardItems(sender);
		return;
	}

	sendTextMessage('잘 못알아들었습니다. 원하시는 컨텐츠를 말씀하시거나 리오를 불러주세요 :D', sender);
}

exports.sendPopularWebtoons = sendPopularWebtoons;
exports.sendPopularPapers = sendPopularPapers;
exports.sendPopularIllusts = sendPopularIllusts;
exports.sendPopularBoardItems = sendPopularBoardItems;
exports.sendNewWebtoons = sendNewWebtoons;
exports.respondMessage = respondMessage;
exports.sendIntroMessage = sendIntroMessage;
exports.sendGreetAndSuggestion = sendGreetAndSuggestion;