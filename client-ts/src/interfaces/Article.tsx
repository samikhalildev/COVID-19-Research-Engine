export interface Article {
    paper_id: string;
    title: string;
    summary: string;
    authors: Array<string>;
    abstract: Array<Text>;
    body: Array<Text>;
}

export interface Text {
    text: string; 
    section: string;
}
