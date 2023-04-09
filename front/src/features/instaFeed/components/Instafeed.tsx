/*=============================================
=        IntaFeed Presentationnal components    =
=============================================*/

/**
 * Presentationnal component for display the insta feed
 */

//Styles
import ImageBloc from '@/components/atoms/ImageBloc/ImageBloc';
import styles from './InstaFeed.module.scss';
//Container
import withInstagramFeedContainer, { IPostInstagramProps, InstagramFeedWrapperProps } from './instafeedContainer';





/**
 * Hover Post component View
 * @returns 
 */
export const HoverPost=() => {
    return (                   <div className={styles.instagramIcon}>
        <div className="">
          <span className="icon">
            {/*change your svg icon*/}

            <svg height="18" viewBox="0 0 512 512" width="18">
              <path
                fill="currentColor"
                d="m256 386c-71.683 0-130-58.317-130-130 7.14-172.463 252.886-172.413 260 .001 0 71.682-58.317 129.999-130 129.999zm0-220c-49.626 0-90 40.374-90 90 4.944 119.397 175.074 119.362 180-.001 0-49.625-40.374-89.999-90-89.999zm236 346h-472c-11.046 0-20-8.954-20-20v-472c0-11.046 8.954-20 20-20h472c11.046 0 20 8.954 20 20v472c0 11.046-8.954 20-20 20zm-452-40h432v-432h-432zm372-392c-11.046 0-20 8.954-20 20 0 11.046 8.954 20 20 20 11.046 0 20-8.954 20-20 0-11.046-8.954-20-20-20z"
              />
            </svg>
          </span>
        </div>
      </div>)
}

/**
 * Post component views
 * @param param0 
 * @returns 
 */
export const ImageInstagramView = ({src, alt, permalink}: IPostInstagramProps) => {
    return(
        <div  className={styles.instagramItem}>
 
        {src && alt &&
   
        <ImageBloc
          image={{url: src, alt: alt}}
          objectFit={'cover'}
        />
    
        }


 
</div>
  )
}

/**
 * Video Instagram View
 * @param param0 
 * @returns 
 */
export const VideoInstagramView = ({src, alt, permalink}:IPostInstagramProps) => {
    return (
        <div  className={styles.instagramItem}>
  
    <video className={styles.instagramImg} src={src} ></video> {/*alt={alt} type="video/mp4" */}


    </div>
    )
}

/**
 * Loading Instagram VView
 * @returns 
 */
export const LoadingInstagramView = () => {
    return(
        <div> Loading... </div>
    )
}

/**
 * Error View 
 * @returns 
 */
export const ErrorView = () => {
    return (
        <div>
        <p className="errorMessage"> the access token is not valid</p>
      </div>
    )
}

/**
 * Wrapper of all post intagram
 * @param param0 
 * @returns 
 */
export const InstagramFeedWrapper = ({ children}:  InstagramFeedWrapperProps) =>{
    return (
        <div className={styles.instagramItems}>

            {children}
        </div>
    )
}

export const InstagramFeed =({counter, token, postsList}: {counter:number, token: string, postsList: {url:string}[]}) => {

    const InstragramFeedContainer = withInstagramFeedContainer(
        ErrorView, LoadingInstagramView, ImageInstagramView, VideoInstagramView,
        InstagramFeedWrapper,
        counter,
        token,
        postsList
    )
    return <InstragramFeedContainer />
}

export default InstagramFeed