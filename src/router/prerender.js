import { Router } from 'express';
import { createClient } from 'redis';
import puppeteer from 'puppeteer';

import { Prerender } from '../model/_index';

const router = Router();

router.get('/yada', async (req, res) => {
	console.log('====================prerender/yada');

	let html = 'yada';

	let isFetchHtml = false;

	const redisClient = createClient();
	let url = null;

	if (req.query.url) {
		url = req.query.url;

		await redisClient.connect();
		html = await redisClient.get(url);

		if (html) {
			console.log('redis cache');
		} else {
			const prerenderItem = await Prerender.findOne({ where: { url } });
			if (prerenderItem) {
				console.log('read from db');
				html = prerenderItem.html;
				console.log('insert to redis');
				redisClient.set(url, html);
			} else {
				isFetchHtml = true;
			}
		}
	}

	if (isFetchHtml) {
		html = await new Promise(resolve => {
			const fetchHtml = async () => {
				console.log('pupeteer fetch');

				// for windows
				// const browser = await puppeteer.launch();

				// for ubuntu
				const browser = await puppeteer.launch({
					executablePath: '/usr/bin/chromium-browser',
					args: ['--no-sandbox', '--disable-setuid-sandbox'],
				});

				const page = await browser.newPage();
				await page.goto(req.query.url, {
					waitUntil: 'networkidle2',
				});
				html = await page.content();

				// insert to redis
				console.log('insert to redis');
				redisClient.set(url, html);

				// insert to db
				console.log('insert to db');
				let prerenderItem = await Prerender.findOne({
					where: { url },
				});
				if (!prerenderItem) {
					prerenderItem = Prerender.build();
				}
				prerenderItem.url = url;
				prerenderItem.html = html;
				prerenderItem.save();

				return html;
			};
			resolve(fetchHtml());
		});
	}

	console.log('send html');
	res.send(html);
});

export default router;
