/*=============================================
=        NAV Prentational Components                     =
=============================================*/
/**
 * Main Navigator of the website
 */


//Components
import NavDeskop from "./NavDesktop/NavDesktop";
import NavMobile from "./NavMobile/NavMobile";
import withContainer from "./NavContainer/NavContainer";
import { breakpoint } from "@/styles/breakpoints";


export default withContainer(NavMobile, NavDeskop, breakpoint.mobile);
