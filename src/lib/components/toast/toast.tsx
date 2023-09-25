import {useToast, UseToastProps} from './use-toast';
import {CloseIcon} from '../../utilities/shared-icons';
import {CheckCircleIcon} from '../../utilities/shared-icons/check-circle.tsx';
import { motion } from 'framer-motion';
import {TRANSITION_VARIANTS} from '../../utilities/framer-transitions';

const Toast = (props: UseToastProps) => {

    const {
        content,
        getToastProps,
        getIconProps,
        getTitleProps,
        getDescriptionProps,
        getDismissButtonProps,
        getCloseButtonProps,
        getActionButtonProps
    } = useToast(props);

    const {
        title,
        description,
        showActionButton,
        actionButtonTitle = 'Yes',
        showDismissButton,
        dismissButtonTitle = 'Dismiss'
    } = content.content;

    return (
        // @ts-ignore
        <motion.div
            animate="enter"
            {...getToastProps()}
            exit="exit"
            initial="exit"
            variants={TRANSITION_VARIANTS.scaleFadeIn}
        >
        {/*<div {...getToastProps()}>*/}
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon {...getIconProps}/>
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p {...getTitleProps}>{title}</p>
                        {
                            description &&
                            <p {...getDescriptionProps}>{description}</p>
                        }
                        <div className="mt-3 flex space-x-7">
                            {
                                showActionButton &&
                                <button {...getActionButtonProps()}>
                                    {actionButtonTitle}
                                </button>
                            }
                            {
                                showDismissButton &&
                                <button {...getDismissButtonProps()}>
                                    {dismissButtonTitle}
                                </button>
                            }

                        </div>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                        <button {...getCloseButtonProps()}>
                            <span className="sr-only">Close</span>
                            <CloseIcon/>
                        </button>
                    </div>
                </div>
            </div>
        {/*</div>*/}
        </motion.div>
    )
};

export default Toast;
