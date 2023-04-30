import { promises as fs } from 'node:fs';
import fetch from 'node-fetch';
import parser from 'node-html-parser';

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const body = await response.text();

const root = await parser.parse(body).querySelectorAll('img');
console.log(root);
