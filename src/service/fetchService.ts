import superagent from 'superagent';
import { Buffer } from 'buffer';
import { z } from 'zod';

const username = 'user';
const password = 'password';
const credentials = Buffer.from(`${username}:${password}`).toString('base64');
const authHeader = `Basic ${credentials}`;

export function fetchService() {
    async function getQuery<T>(path: string, schema: z.ZodType<T>): Promise<T> {
        return await superagent
            .get(`http://localhost:8080/api${path}`)
            .set('Authorization', authHeader)
            .then((res) => res.body)
            .then((res) => schema.parse(res));
    }

    async function postQuery<T extends object, U>(path: string, body: T, schema: z.ZodType<U>): Promise<U> {
        return await superagent
            .post(`http://localhost:8080/api${path}`)
            .send(body)
            .set('Authorization', authHeader)
            .then((res) => res.body)
            .then((res) => schema.parse(res));
    }

    async function putQuery<T extends object, U>(path: string, body: T, schema: z.ZodType<U>): Promise<U> {
        return await superagent
            .put(`http://localhost:8080/api${path}`)
            .send(body)
            .set('Authorization', authHeader)
            .then((res) => res.body)
            .then((res) => schema.parse(res));
    }

    return { getQuery, postQuery, putQuery };
}
