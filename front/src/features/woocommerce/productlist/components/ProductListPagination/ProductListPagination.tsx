import { FC } from "react";
import { withProductListPaginationContainer } from "./ProductListContainer";
import { BtnNext, BtnNumber, BtnPrev } from "@/components/molecules/Pagination/Pagination";



export default withProductListPaginationContainer(BtnNumber , BtnNext , BtnPrev)
