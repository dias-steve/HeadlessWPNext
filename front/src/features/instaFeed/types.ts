export interface IPostInstagram {
    caption: string;
    id: number;
    media_type: "IMAGE" | 'CAROUSEL_ALBUM' | 'VIDEO';
    media_url: string;
    permalink: string;
}