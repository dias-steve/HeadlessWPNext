import { IProductJSON } from "@/features/woocommerce/types";


export interface ISortPayload {
    key: string;
    isASC: boolean | null
}

export interface productPageProps{
    product: any;
}

export interface ISingleProductFetchResult{
    data:{
        result: IProductJSON[]
    }
}

