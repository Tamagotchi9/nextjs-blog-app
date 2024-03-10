export interface Article {
    id: string;
    user_id: string;
    title: string;
    content: string;
    date: Date;
    image_url: string;
}

export interface ArticlesList {
    id: string;
    user_id: string;
    title: string;
    content: string;
    date: Date;
    image_url: string;
    author: string;
}

export interface Topic {
   id?: string;
   name: string;
}
