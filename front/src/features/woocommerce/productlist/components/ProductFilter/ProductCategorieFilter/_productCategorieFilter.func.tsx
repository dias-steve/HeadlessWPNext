import React, {FC, ReactNode, useEffect, useMemo, useState} from "react";
import {
  addCategoryToFilter,
  removeCategoryToFilter
} from "../../../redux/productList.reducer"
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { BtnProps, FilterContainerProps, ICategoryJSON, ProductCategorieFilterContainerProps, WrapperProps } from "./../../../types";
import { IStore } from "@/redux/rootReducer";
import useTraductor from "@/features/multiLang/hooks/useTraductor";

const mapState = (state: IStore) => ({
  filter: state.productlist.filter,
  categoriesData: state.productlist.product_categories_selected
});

/*===================================================================
=            FONCTIONAL CONTAINER COMPONENT FILTER CATEGORY        =
====================================================================*/

export function withContainer(BtnViewComponent : FC<BtnProps>, WrapperListCategorie: FC<{children: ReactNode, isItWillChange: boolean}>) {
  /**
   *
   *
   * Container filter
   * @param {*} category
   * @returns
   */
  const FilterBtnContainer = ({ categoryJSON } : FilterContainerProps) => {

    const category : ICategoryJSON = categoryJSON;
    const dispatch = useDispatch();
    const { filter } = useSelector(mapState);
    const { name, term_id, parent } = category;
    const checked = filter.isValueIncludeInTaxonomy('product_cat',Number(term_id));
    const {getTextStringTraduction} = useTraductor();
    const handleClick = async (e : any) => {
      if (!checked) {
        dispatch(addCategoryToFilter({idCategory:term_id, idParent: parent}));
      } else {
        dispatch(removeCategoryToFilter(term_id));
      }
    };

    return (
      <BtnViewComponent
        handleClick={handleClick}
        label={getTextStringTraduction(name)}
        checked={checked}
      />
    );
  };

  
  const BtnAll = () => {
    const { categoriesData} = useSelector(mapState);
    const { listCategoriesSelected} =  categoriesData;
    if(listCategoriesSelected.length> 0 && listCategoriesSelected[0].parent !== 0){
      const idParent = listCategoriesSelected[0].parent
      const categoryAll : ICategoryJSON = {
        term_id:idParent,
        name:'FR=Tout|EN=All',
        taxonomy: 'product_cat',
        parent: 0,
        have_childs: false,
        parent_name: null,
        thumbnail:{url:false, alt:false},
        description: ""
      }
      return (<FilterBtnContainer key={uuidv4()} categoryJSON={categoryAll} />)
  }else{
    return(<></>)
  }}

  /**
   *
   * Return Principal
   */

  return function ProductCategorieFilterContainer() {
    const { categoriesData} = useSelector(mapState);
    const { listCategoriesSelected} =  categoriesData;


    const [listCategories , setListCategories] = useState(listCategoriesSelected)
    const [itWillChange, setItWillChange] = useState(false)

    const listCategoriesSelectedmemo = useMemo(() => {
      return listCategoriesSelected
    },[ listCategoriesSelected])
    useEffect(() => {

      setItWillChange(true);
      setTimeout(() => {
        setListCategories( listCategoriesSelectedmemo )
        setItWillChange(false);
      },500)

    },[ listCategoriesSelectedmemo ] )
    return (
      <WrapperListCategorie isItWillChange={itWillChange}>
        <BtnAll/>
        {listCategories.map((category : ICategoryJSON) => {
          return <FilterBtnContainer key={uuidv4()} categoryJSON={category} />;
        })}
      </WrapperListCategorie>
    );

  }}
