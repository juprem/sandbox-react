import { firstQuestion } from './r';

const numberString = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const parse = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
]);

function parseNumber(word: string) {
    let number: number[] = [];
    const result = [...word].reduce((prev, next) => {
        if (Number(next)) {
            number.push(Number(next));
            return '';
        }
        const current = prev + next;
        if (numberString.includes(current)) {
            number.push(parse.get(current)!);
            return '';
        }
        if (current.length > 4) {
            return current.slice(1, current.length);
        }
        return current;
    }, '');

    console.log(result);

    return number;
}

function getFirstAndLastNumber(word: string) {
    const letter = parseNumber(word);
    return letter[0].toString() + letter[letter.length - 1].toString();
}

export const a = firstQuestion
    .split('\n')
    .filter((val) => val !== '')
    .map(getFirstAndLastNumber)
    .reduce((prev, curr) => {
        return prev + Number(curr);
    }, 0);
