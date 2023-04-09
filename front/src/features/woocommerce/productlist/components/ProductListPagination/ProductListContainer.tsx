import { IStore } from "@/redux/rootReducer";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  setCurrentPageStart,
  setNextPageStart,
  setPrevPageStart,
} from "../../redux/productList.reducer";
import useTraductor from "@/features/multiLang/hooks/useTraductor";

const mapState = (state: IStore) => ({
  productList: state.productlist,
});
export const withProductListPaginationContainer = (
  NumberBtn: FC<{
    label: string | number;
    checked: boolean;
    onClick: () => void;
  }>,
  NextBtn: FC<{ onClick: () => void, label: string }>,
  PrevBtn: FC<{ onClick: () => void, label: string}>
) => {
  return function Container() {
    const { productList } = useSelector(mapState);
    const { currentPage, maxPage } = productList;
    const dispatch = useDispatch();
    const {getTextStringTraduction} = useTraductor()
    const regenerateBtn = () => {
      let tablLabel = [];
      if (maxPage) {
        for (let i = 1; i <= maxPage; i++) {
          tablLabel.push(i);
        }
      }

      return tablLabel;
    };

    const showPrev = currentPage !== null ? currentPage > 1 : false;
    const showNext =
      currentPage !== null && maxPage !== null ? currentPage < maxPage : false;

    return (
      <>{maxPage && maxPage > 1 && <>
        {showPrev && (
          <PrevBtn
            onClick={() => {
              dispatch(setPrevPageStart());
            }}

            label={getTextStringTraduction('FR=Précédent|EN=Previous')}
          />
        )}
        {regenerateBtn().map((labelBtn) => {
          const onClick = () => {
            dispatch(setCurrentPageStart(labelBtn));
          };

          const ischecked: boolean = Number(labelBtn) === Number(currentPage);
          return (
            <NumberBtn
              key={uuidv4()}
              label={labelBtn}
              onClick={onClick}
              checked={ischecked}
            />
          );
        })}
        {showNext && (
          <NextBtn
            onClick={() => {
              dispatch(setNextPageStart());
            }}
            label={getTextStringTraduction('FR=Suivant|EN=Next')}
          />
        )}
     </>} </>
    );
  } 
};
