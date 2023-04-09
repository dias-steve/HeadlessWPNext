import usePage from '@/hook/usePage';
import { IInitialData } from '@/utils/initializePage.utils';
import React from 'react'

function Initializer({

    intialData,
  }: {
  
    intialData: IInitialData;
  }) {
    usePage(intialData, false, true);
  return (
    <>
    </>
  )
}

export default Initializer
