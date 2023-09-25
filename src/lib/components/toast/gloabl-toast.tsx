import {ToastQueue, useToastQueue} from '@react-stately/toast';
import ToastRegion, {ToastContent} from './toast-region.tsx';
import ReactDOM from 'react-dom';

export const Toastify = new ToastQueue<ToastContent>({
    maxVisibleToasts: 5,
    // hasExitAnimation: true
});

export function GlobalToastRegion(props: any) {
    let state = useToastQueue(Toastify);

    // Render toast region.
    return state.visibleToasts.length > 0
        ? ReactDOM.createPortal(
            <ToastRegion {...props} state={state} />,
            document.body
        )
        : null;
}
