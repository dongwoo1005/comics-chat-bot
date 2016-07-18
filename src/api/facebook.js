'use strict';

import request from 'request';

const access_token = process.env.FB_PAGE_ACCESS_TOKEN;
const facbookApiEndpoint = 'https://graph.facebook.com/v2.6/';

let getUserInfo = (senderId) => {
	return new Promise((resolve, reject) => {
		let url = facbookApiEndpoint + senderId + '/?fields=first_name,last_name,profile_pic&access_token=' + access_token;
		request(url, (error, response, body) => {
			if (error) {
				console.log('Error getting user info: ', error);
				reject("getUserInfo error");
			} else if (response.statusCode == 200) {
				console.log('status 200 getting user info: ', body);
				let userInfo = JSON.parse(body);
				resolve(userInfo);
			}
		});
	});
}

exports.getUserInfo = getUserInfo;