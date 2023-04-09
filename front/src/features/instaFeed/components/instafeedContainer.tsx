/*=============================================
=        Instafeed Container   =
=============================================*/

/**
 *
 */
import React, { FC, ReactNode } from "react";

/*=============================================
=        TYPES  =
=============================================*/
export interface IPostInstagramProps {
  src: string;
  alt: string;
  permalink: string;
  key: string | number;
}

export interface InstagramFeedWrapperProps {
  children: ReactNode;
}


/*=============================================
=        Instafeed Container   =
=============================================*/
/**
 * InstagramFeed Container
 * @param LoadingInstagramView View to display when loading
 * @param ErrorView view to display when error
 * @param ImageInstagramView view to display for post image instagram
 * @param VideoInstagramView view to display for post video instagram
 * @param InstagramFeedWrapper view wich wrappe all the post
 * @param counter Number of post to display
 * @param token token od the instgram account
 * @param postList list of posts from the state
 * @returns
 */

export const withInstagramFeedContainer = (
  LoadingInstagramView: FC,
  ErrorView: FC,
  ImageInstagramView: FC<IPostInstagramProps>,
  VideoInstagramView: FC<IPostInstagramProps>,
  InstagramFeedWrapper: FC<InstagramFeedWrapperProps>,
  counter: number,
  token: string,
  postList: { url: string }[]
) => {
  return function Container() {
    return (
      <>
        <InstagramFeedWrapper>
          {postList.slice(0, counter).map((item, index) => {
            return (
              <ImageInstagramView
                key={index}
                src={item.url}
                alt="description"
                permalink={"/"}
              />
            );
          })}
        </InstagramFeedWrapper>
      </>
    );
  };
};

export default withInstagramFeedContainer;
