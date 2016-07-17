'use strict';

let formatWebtoons = webtoons => {
	let elements = [];
	let webtoonPageUrl = "http://www.battlecomics.co.kr/webtoons/"
	webtoons.forEach(webtoon => {
		elements.push({
			title: webtoon.name,
			subtitle: webtoon.writer,
			"image_url": webtoon.image,
			"buttons": [{
				"type": "web_url",
				"url": webtoonPageUrl + webtoon.id,
				"title": "바로 보기"
			}]
		});
	});
	return {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": elements
			}
		}
	};
};

exports.formatWebtoons = formatWebtoons;