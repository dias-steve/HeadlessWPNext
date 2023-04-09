import { FC } from "react";

export interface HomeHeroViewProps{

}

export const withContainerHomeHero = (HomeHeroView: FC<HomeHeroViewProps>) => {
    return function Container (){
        return <></>
    }
}