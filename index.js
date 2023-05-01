import fs from 'node:fs';
import axios from 'axios';
import fetch from 'node-fetch';
import parser from 'node-html-parser';

if (!fs.existsSync('memes')) {
  fs.mkdirSync('memes');
}
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const data = await response.text();
const body = parser.parse(data).querySelectorAll('img');

async function download(url, filepath) {
  const response1 = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response1.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath));
  });
}
function format(n) {
  return (n < 10 ? '0' : '') + n;
}
for (let i = 0; i < 10; i++) {
  const imageUrl = body[i].getAttribute('src');
  const imageName = `memes/${format(i + 1)}.jpg`;
  await download(imageUrl, imageName);
}
