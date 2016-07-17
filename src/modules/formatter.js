'use strict';

let formatWebtoons = webtoons => {
	let elements = [];
	let webtoonsUrl = "http://www.battlecomics.co.kr/webtoons/"
	webtoons.forEach((webtoon, index, array) => {
		let webtoonUrl = webtoonsUrl + webtoon.id;
		let jsondata = {
			title: webtoon.name,
			subtitle: webtoon.writer,
			"item_url": webtoonUrl,
			"image_url": webtoon.image,
			"buttons": [{
				"type": "web_url",
				"url": webtoonUrl,
				"title": "바로 보기"
			}]
		};
		if (index === array.length - 1){
			jsondata.buttons.push({
				"type": "web_url",
				"url": webtoonsUrls,
				"title": "더 보기"
			});
		}
		elements.push(jsondata);
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