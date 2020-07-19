import { Text } from '../interfaces/Text';

export class Article {
    paper_id: string;
    title: string;
    summary: string;
    authors: Array<string>;
    abstract: Array<Text>;
    body: Array<Text>;

    constructor(paper_id: string, title: string, summary: string, authors: Array<string>, abstract: Array<Text>, body: Array<Text>) {
        this.paper_id = paper_id;
        this.title = title;
        this.summary = summary;
        this.authors = authors;
        this.abstract = abstract;
        this.body = body;
    }

    getId(): string {
        return this.paper_id;
    }

    getTitle(): string {
        return this.title;
    }

    hasSummary(): boolean {
        return this.summary.length > 0;
    }

    getSummary(): string {
        return this.summary;
    }

    hasAbstract(): boolean {
        return this.abstract.length > 0;
    }

    getAuthors(): string {
        if (this.authors.length < 1)
            return '';
            
        return 'Authors: ' + this.authors.join(', ');
    }

    previewSnippet() {
        let snippet: any;

        if (this.hasSummary()) {
            snippet = this.summary;
    
        } else if (this.hasAbstract()) {
            snippet = this.abstract[0]['text'];
    
        } else {
            snippet = this.body[0]['text'];
        }
    
        snippet = this.splitByWords(snippet, 30);
        return snippet
    }

    wordsCount(text: string): number {
        return text.trim().length > 0 ? text.trim().split(' ').length : 0
    }

    splitByWords(snippet: string, len: number) {
        let words = snippet.split(' ');

        if (words.length > len) {
            let cutOff = snippet.indexOf(words.slice(len).join(' ')) - 1;
            snippet = snippet.substring(0, cutOff) + '...';
        }
        return snippet;
    }

    splitBySentence(snippet: string) {
        let sentences = snippet.split('. ')
        if (sentences.length > 2) {
            let cutOff = snippet.indexOf(sentences[sentences.length - 1]) - 1;
            snippet = snippet.substring(0, cutOff);
            snippet += '..'
        }
        return snippet;
    }

    isKeywordInText (text: string, keyword: string) {
        let i = -1;
        let arr = [];
        keyword = keyword.toLowerCase()

        while((i=text.indexOf(keyword,i+1)) >= 0) {
            arr.push(i)
        }

        return arr;
    }
}