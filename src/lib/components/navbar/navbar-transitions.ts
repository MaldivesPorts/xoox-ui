import {TRANSITION_EASINGS} from "../../utilities/framer-transitions";
import {Variants} from "framer-motion";

export const hideOnScrollVariants: Variants = {
  visible: {
    y: 0,
    transition: {
      ease: TRANSITION_EASINGS.easeOut,
    },
  },
  hidden: {
    y: "-100%",
    transition: {
      ease: TRANSITION_EASINGS.easeIn,
    },
  },
};
