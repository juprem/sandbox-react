import superagent from 'superagent';
import { Buffer } from 'buffer'

const username = 'user';
const password = 'password';
const credentials = Buffer.from(`${username}:${password}`).toString('base64');
const authHeader = `Basic ${credentials}`;
export function fetchService() {
    async function getQuery(path: string) {
        return await superagent
            .get(`http://localhost:8080/api${path}`)
            .set('Authorization', authHeader)
            .then(res => res.body)
    }

    return { getQuery };
}
