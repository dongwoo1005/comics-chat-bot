'use strict';

import request from 'request';

const isLive = true
const api_endpoint = isLive ? 'http://api.battlecomics.co.kr/lulu/v1' : 'http://dev.api.battlecomics.co.kr/lulu/v1'

let getPopularWebtoons = () => {
	return new Promise((resolve, reject) => {
		let url = api_endpoint + '/webtoons/hot';
		request(url, (error, response, body) => {
			if (error) {
				console.log('Error getting popular webtoons: ', error);
				reject("getPopularWebtoons error");
			} else if (response.statusCode == 200) {
				let webtoons = JSON.parse(body).data.webtoons;
				console.log('getPopularWebtoons status 200: ', webtoons[0].name);
				resolve(webtoons);
			}
		});
	});
};

exports.getPopularWebtoons = getPopularWebtoons