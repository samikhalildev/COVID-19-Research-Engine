import { Article } from '../../interfaces/Article';

export const getSnippet = (article: Article) => {
    let snippet: string;

    if (article.summary.length) {
        snippet = article.summary;

    } else if (article.abstract.length > 0) {
        snippet = article.abstract[0]['text'];

    } else {
        snippet = article.body[0]['text'];
    }

    snippet = splitByWords(snippet, 30);
    return snippet
}

export const splitByWords = (snippet: string, len: number) => {
    let words = snippet.split(' ');

    if (words.length > len) {
        let cutOff = snippet.indexOf(words.slice(len).join(' ')) - 1;
        snippet = snippet.substring(0, cutOff) + '...';
    }
    return snippet;
}

export const splitBySentence = (snippet: string) => {
    let sentences = snippet.split('. ')
    if (sentences.length > 2) {
        let cutOff = snippet.indexOf(sentences[sentences.length - 1]) - 1;
        snippet = snippet.substring(0, cutOff);
        snippet += '..'
    }
    return snippet;
}