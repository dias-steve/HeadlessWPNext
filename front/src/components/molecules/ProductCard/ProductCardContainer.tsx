/*=============================================
=        PRODUCT CARD CONTAINER          =
=============================================*/
/**
 * Conatiner Component for the display of Product Card
 */

//Libraries
import { FC } from "react";

//Types
import { ProductCardProps, ProductCardSizeTypes } from "../../../features/woocommerce/productlist/types";
import { IImageJSON, IProductJSONAperçu } from "@/features/woocommerce/types";

//Hooks
import useTraductor from "@/features/multiLang/hooks/useTraductor";

/**
 * Container for Product Card components
 * 
 * @param productData Json object containing all product information
 * @param ProductCard Presentationnal component
 * @param cardSize Card size to display
 * @param labelBtn label of btn 'see more' of product Card
 * @returns 
 */
export const withProductCardContainer = (productData: IProductJSONAperçu, ProductCard : FC <ProductCardProps>, cardSize: ProductCardSizeTypes, labelBtn:string) => {
    return function Container(){
        const{price, link, on_sale, product_is_in_stock, regular_price, images_gallery, name, multi_price: {have_multi_price, price_min}, title_displayed, thumbnail, gallery_alt} = productData;
        const {getTextStringTraduction}=useTraductor()
        const from = getTextStringTraduction('FR=à partir de|EN= from ')
        const newPrice = have_multi_price ? from+' '+price_min : price;
        const nameDisplay = title_displayed && title_displayed !== "" ? getTextStringTraduction(title_displayed) : name
     
        const imageGalleryFormated = thumbnail && thumbnail.url && images_gallery && images_gallery[0]?.url ? [images_gallery[0],thumbnail] : null;
        const galleryThumbnailalt = 
            gallery_alt &&
            Array.isArray(gallery_alt) ?
            gallery_alt.reduce<IImageJSON[]>((accumlator,galleryAltItem) => {
                const {thumbnail_apercu} = galleryAltItem
                if (thumbnail_apercu){
                    accumlator.push(thumbnail_apercu)
                }
                return accumlator;
            }, []) : false
        return <ProductCard title={nameDisplay}
        price={newPrice}
        link={link}
        isOnSale = {on_sale}
        isInStock = {product_is_in_stock}
        regularPrice={regular_price}
        imageGallery={imageGalleryFormated  || images_gallery}
        cardSize={cardSize}
        label={getTextStringTraduction(labelBtn)}
        listThumbnailAlt={galleryThumbnailalt}
        />
    }
}
