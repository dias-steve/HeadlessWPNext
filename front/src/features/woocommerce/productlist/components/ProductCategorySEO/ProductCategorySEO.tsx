import useTraductor from '@/features/multiLang/hooks/useTraductor'
import { IStore } from '@/redux/rootReducer'
import Head from 'next/head'
import React from 'react'
import { useSelector } from 'react-redux'

//Mapstates
const mapState = (state: IStore) => ({
    category : state.productlist.category_page_info,
    settings: state.settings
})

function ProductCategorySEO() {
    const {category: {description}, settings:{webSiteConfig:{name_site}}} = useSelector(mapState)
    const {getTextStringTraduction} = useTraductor()
    const categoryTitle = description&&  description !== '' ? getTextStringTraduction(description) : getTextStringTraduction('FR=Liste de produits|EN=Products List')
  return (
    <>
        <Head>
            <title>{name_site} - {categoryTitle}</title>
        </Head>
    </>
  )
}

export default ProductCategorySEO
