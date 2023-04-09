export interface ILookbook {
    gallery:{url: string, alt: string}[],
    id: number,
    label_main_btn_lookbook: string | false,
    link: string | false,
    link_main_btn_lookbook: string | false,
    thumbnail: { url: string| false, alt: string | false },
    title: string | false,
    title_displayed: string | false,
    seo: any
}