/*=============================================
=        PAGE CONTENT CONTAINER              =
=============================================*/
/**
 * Display all the content from a page data
 */
//Lib
import { v4 as uuidv4 } from "uuid";
// utils
import { IPageContentBloc } from "@/utils/initializePage.utils";
// Continer Components
import switchContentBlocManager from "./switchContentBlocManager";
//Type
import { FC } from "react";

/**
 * Cet all Bloc components from a page data
 * @param listContent
 * @returns List of Bloc components
 */
export const withPageContentContainer = (listContent: IPageContentBloc[], gsap: any) => {
  return function Container() {
    return (
      <>
        {listContent.map((pageBloc: IPageContentBloc) => {
          const Bloc: FC = switchContentBlocManager(pageBloc, gsap);
          return <Bloc key={uuidv4()} />;
        })}
      </>
    );
  };
};
