'use strict';

let formatWebtoons = webtoons => {
	let elements = [];
	let webtoonsUrl = "http://www.battlecomics.co.kr/webtoons/"
	webtoons.forEach((webtoon, index, array) => {
		let webtoonUrl = webtoonsUrl + webtoon.id;
		if (index === array.length - 1){
			elements.push({
				title: webtoon.name,
				subtitle: webtoon.writer,
				"item_url": webtoonUrl,
				"image_url": webtoon.image,
				"buttons": [{
					"type": "web_url",
					"url": webtoonUrl,
					"title": "바로 보기"
				}, {
					"type": "web_url",
					"url": webtoonsUrl,
					"title": "더 보기"
				}]
			});
		} else {
			elements.push({
				title: webtoon.name,
				subtitle: webtoon.writer,
				"item_url": webtoonUrl,
				"image_url": webtoon.image,
				"buttons": [{
					"type": "web_url",
					"url": webtoonUrl,
					"title": "바로 보기"
				}]
			});
		}
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