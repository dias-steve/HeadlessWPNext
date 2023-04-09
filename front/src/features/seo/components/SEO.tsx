import { ISEO } from '@/utils/initializePage.utils'
import React from 'react'
import { NextSeo } from 'next-seo';
import useTraductor from '@/features/multiLang/hooks/useTraductor';
import { IStore } from '@/redux/rootReducer';
import { useSelector } from 'react-redux';

const mapState = (state: IStore) => ({
    settings: state.settings
})
function SEO({seoData, title}: {seoData?: ISEO, title?: string}) {
      const {getTextStringTraduction} = useTraductor()
      const {settings:{webSiteConfig:{name_site}}} = useSelector(mapState)
    if(seoData){
    const {title_seo, meta_description_seo} = seoData
        return (
            <>
                    {title_seo&&
                    <NextSeo
                        title={name_site+' - '+getTextStringTraduction(title_seo)}
                        description={getTextStringTraduction(meta_description_seo)}
                        />
                    }
            </>
        )
    }else{
        return(
            <>
                    {title &&
                    <NextSeo
                        title={name_site+' - '+getTextStringTraduction(title)}
                    />
                    }
            </>
        )
    }
}

export default SEO
