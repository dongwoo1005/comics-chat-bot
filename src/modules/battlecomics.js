'use strict';

import request from 'request';

const isLive = true
const apiEndpoint = isLive ? 'http://api.battlecomics.co.kr/lulu/v1' : 'http://dev.api.battlecomics.co.kr/lulu/v1'

let getPopularWebtoons = () => {
	return new Promise((resolve, reject) => {
		let url = apiEndpoint + '/webtoons/hot';
		request(url, (error, response, body) => {
			if (error) {
				console.log('Error getting popular webtoons: ', error);
				reject("getPopularWebtoons error");
			} else if (response.statusCode == 200) {
				console.log('status 200 getting popular webtoons: ', body);
				let webtoons = JSON.parse(body).data.webtoons;
				resolve(webtoons);
			}
		});
	});
};

let getPopularPapers = () => {
	return new Promise((resolve, reject) => {
		let url = apiEndpoint + '/items/hot';
		let queryString = {limit: 10};
		request({
			url: url,
			qs: queryString,
			method: 'GET'
		}, (error, response, body) => {
			if (error) {
				console.log('Error getting popular papers: ', error);
				reject("getPopularPapers error");
			} else if (response.statusCode == 200) {
				console.log('status 200 getting popular papers: ', body);
				let papers = JSON.parse(body).data.items;
				resolve(papers);
			}
		});
	});
};

let getPopularIllusts = () => {
	return new Promise((resolve, reject) => {
		let url = apiEndpoint + '/illusts/hot';
		request(url, (error, response, body) => {
			if (error) {
				console.log('Error getting popular illusts: ', error);
				reject("getPopularIllusts error");
			} else if (response.statusCode == 200) {
				console.log('status 200 getting popular illusts: ', body);
				let illusts = JSON.parse(body).data.illusts;
				resolve(illusts);
			}
		});
	});
};

let getPopularBoardItems = () => {
	return new Promise((resolve, reject) => {
		let url = apiEndpoint + '/boards/hot';
		request(url, (error, response, body) => {
			if (error) {
				console.log('Error getting popular board items: ', error);
				reject("getPopularBoardItems error");
			} else if (response.statusCode == 200) {
				console.log('status 200 getting popular board items: ', body);
				let boardItems = JSON.parse(body).data.boards;
				resolve(boardItems);
			}
		});
	});
}

exports.getPopularWebtoons = getPopularWebtoons
exports.getPopularPapers = getPopularPapers
exports.getPopularIllusts = getPopularIllusts
exports.getPopularBoardItems = getPopularBoardItems