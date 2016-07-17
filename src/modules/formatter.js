'use strict';

const baseWebUrl = "http://www.battlecomics.co.kr";

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

let formatWebtoons = webtoons => {
	let elements = [];
	let webtoonsUrl = baseWebUrl + "/webtoons/"
	webtoons.forEach((webtoon, index, array) => {
		let webtoonUrl = webtoonsUrl + webtoon.id;
		let buttons = [{
			type: "web_url",
			url: webtoonUrl,
			title: "바로 보기"
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
			subtitle: webtoon.writer,
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

exports.formatWebtoons = formatWebtoons;
exports.formatPapers = formatPapers;
exports.formatIllusts = formatIllusts;
exports.formatBoardItems = formatBoardItems;