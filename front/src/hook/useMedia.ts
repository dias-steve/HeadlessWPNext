/*=============================================
=        USE MEDIA             =
=============================================*/
/**
 * Checks the match of the screen size with the media query specified
 */

//Libraries
import React, { useEffect, useState } from 'react';

/**
 * Checks the match of the screen size with the media query specified
 * @param query media query specified: exemple: "(max-width: 768px)"
 * @returns 
 */
export const useMedia = (query : string) => {
    let [matches, setMatches] = useState(
        window.matchMedia(query).matches
    )

    useEffect(() => {
        let media = window.matchMedia(query);
        if(media.matches !== matches){
            setMatches(media.matches)
        }

        let listener = () => setMatches(media.matches)
        media.addEventListener("change",listener);
        return () => media.removeEventListener("change",listener);

    }, [query])

    return matches
}