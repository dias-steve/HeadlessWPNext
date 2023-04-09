/*=============================================
=       Single Product Components      =
=============================================*/
/**
 * All the components
 */

//Components
import OptionVariableSelector from "./OptionVariationSelector/OptionVariationCustomView/OptionVariationCustomView";
import GalleryProduct from "./Gallery/Gallery";
import ProductDescriptionCustom from "./ProductDescription/ProductDescriptionCustom/ProductDescriptionCustom";
import { TitleContainer } from "./ProductTitle/ProdudtTitleContainer";
import { PriceContainer } from "./ProductPrice/ProductPrice";
import ProductInfo from "./ProductInfo/ProductInfo";
import UpSellProductCustom  from "./UpSellProduct/UpSellProductCustom/UpSellProductCustom";

/**
 * Single product Components
 */
const SingleProduct = {
    OptionVariableSelector,
    Gallery: GalleryProduct,
    Description: ProductDescriptionCustom,
    Title:TitleContainer,
    Price: PriceContainer,
    ProductInfo: ProductInfo,
    UpSellProductList: UpSellProductCustom
}

export default SingleProduct;