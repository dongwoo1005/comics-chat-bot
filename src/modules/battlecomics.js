'use strict';

import request from 'request';

let getPopularWebtoons = () => {
	request(
		'http://api.battlecomics.co.kr/lulu/v1/webtoons/hot',
		(error, response, body) => {
			if (error) {
				console.log('Error getting popular webtoons: ', error);
			} else if (response.body.error) {
				console.log('Error: ', response.body.error);
			}
			if (!error && response.statusCode == 200) {
				console.log('body code: ' + JSON.parse(body).code);
			}
		}
	);
}

exports.getPopularWebtoons = getPopularWebtoons