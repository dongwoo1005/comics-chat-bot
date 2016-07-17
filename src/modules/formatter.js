'use strict';

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
	let webtoonsUrl = "http://www.battlecomics.co.kr/webtoons/"
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
		let itemUrl = 'http://www.battlecomics.co.kr/users/' + paper.fk_user_id + '/page/items/' + paper.id;
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

exports.formatWebtoons = formatWebtoons;
exports.formatPapers = formatPapers;