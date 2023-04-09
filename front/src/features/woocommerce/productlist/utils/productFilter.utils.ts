import { ICategoryJSON } from "../types";

export const getProductCatByParentId = (parentID: number, listCatorieFlat: ICategoryJSON[]) : ICategoryJSON[]=> {
    return listCatorieFlat.filter((category) => {
       return Number(category.parent) === Number(parentID)
    })
}

export const getCategoryInfoByID = (categoryID: number, listCatorieFlat: ICategoryJSON[]) : ICategoryJSON | null=> {
    const categoriesListFound = listCatorieFlat.filter((category) => {
        return Number(category.term_id) === Number(categoryID)
     })

    if(categoriesListFound.length > 0) {
        return categoriesListFound[0]
    }

    return null
}