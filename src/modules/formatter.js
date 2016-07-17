'use strict';

const baseWebUrl = "http://www.battlecomics.co.kr";
const baseFbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u='

let formatInGenericTemplate = elements => {
	return {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": elements
			}
		}
	};
}

let formatSuggestion = (message) => {
	return {
		text: message,
		quick_replies: [{
			content_type: "text",
			title: "인기 웹툰",
			payload: "popular_webtoon"
		}, {
			content_type: "text",
			title: "신규 웹툰",
			payload: "new_webtoon"
		}, {
			content_type: "text",
			title: "인기 페이퍼",
			payload: "popular_paper"
		}, {
			content_type: "text",
			title: "인기 일러스트",
			payload: "popular_illust"
		}, {
			content_type: "text",
			title: "인기 게시글",
			payload: "popular_board"
		}]
	};
};

let formatWebtoons = webtoons => {
	let elements = [];
	let webtoonsUrl = baseWebUrl + "/webtoons/"

	webtoons.forEach((webtoon, index, array) => {
		let webtoonUrl = webtoonsUrl + webtoon.id;
		let shareOnFacebookUrl = baseFbShareUrl + webtoonUrl;
		let buttons = [{
			type: "web_url",
			url: webtoonUrl,
			title: "바로 보기"
		}, {
			type: "web_url",
			url: shareOnFacebookUrl,
			title: "공유하기"
		}];
		// if (index === array.length - 1){
		// 	buttons.push({
		// 		"type": "web_url",
		// 		"url": webtoonsUrl,
		// 		"title": "더 보기"
		// 	});
		// }
		let jsonData = {
			title: webtoon.name,
			subtitle: webtoon.description,
			item_url: webtoonUrl,
			image_url: webtoon.image,
			buttons: buttons
		};
		elements.push(jsonData);
	});
	return formatInGenericTemplate(elements);
};

let formatPapers = papers => {
	let elements = [];
	papers.forEach(paper => {
		let itemUrl = baseWebUrl + '/users/' + paper.fk_user_id + '/page/items/' + paper.id;
		let buttons = [{
			type: "web_url",
			url: itemUrl,
			title: "바로 보기"
		}];
		let jsonData = {
			title: paper.title,
			subtitle: paper.user_name,
			item_url: itemUrl,
			buttons: buttons
		};
		elements.push(jsonData);
	});
	return formatInGenericTemplate(elements);
};

let formatIllusts = illusts => {
	let elements = [];
	illusts.forEach(illust => {
		let illustUrl = baseWebUrl + "/fanarts/" + illust.id
		let buttons = [{
			type: "web_url",
			url: illustUrl,
			title: "바로 보기"
		}];
		let jsonData = {
			title: illust.title,
			subtitle: illust.name,
			item_url: illustUrl,
			image_url: illust.thumbnail,
			buttons: buttons
		};
		elements.push(jsonData);
	});
	return formatInGenericTemplate(elements);
}

let formatBoardItems = boardItems => {
	let elements = [];
	boardItems.forEach(boardItem => {
		let boardItemUrl = baseWebUrl + "/boards/" + boardItem.fk_board_group_type_id + "/posts/" + boardItem.id;
		let buttons = [{
			type: "web_url",
			url: boardItemUrl,
			title: "바로 보기"
		}];
		let jsonData = {
			title: boardItem.title,
			subtitle: boardItem.name,
			item_url: boardItemUrl,
			image_url: boardItem.thumbnail,
			buttons: buttons
		};
		elements.push(jsonData);
	});
	return formatInGenericTemplate(elements);
};

let formatIntro = () => {
	let elements = [];
	let buttons = [{
		type: "web_url",
		url: baseWebUrl,
		title: "배틀코믹스 놀러가기"
	}, {
		type: "postback",
		payload: "start_chatting",
		title: "리오와 채팅하기"
	}];
	let jsonData = {
		title: "배틀코믹스",
		subtitle: "부담없이 즐기는 무료 웹툰, 배틀코믹스",
		item_url: baseWebUrl,
		image_url: "https://scontent.xx.fbcdn.net/v/t1.0-9/12540749_1136466519699990_7159314286917384260_n.jpg?oh=7e064d8bfa3cf65bab82676b88e70aef&oe=582BE3D0",
		buttons: buttons
	};
	elements.push(jsonData);
	return formatInGenericTemplate(elements);
};

exports.formatWebtoons = formatWebtoons;
exports.formatPapers = formatPapers;
exports.formatIllusts = formatIllusts;
exports.formatBoardItems = formatBoardItems;
exports.formatIntro = formatIntro;
exports.formatSuggestion = formatSuggestion;