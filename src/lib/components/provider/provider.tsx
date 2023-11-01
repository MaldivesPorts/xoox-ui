import type {ModalProviderProps} from '@react-aria/overlays';
import {OverlayProvider} from '@react-aria/overlays';
import {RouterProvider} from "@react-aria/utils";
import {I18nProvider, I18nProviderProps} from '@react-aria/i18n';
import {GlobalToastRegion} from '../toast/gloabl-toast';

export interface XooxUIProviderProps extends Omit<ModalProviderProps, "children"> {
    children: React.ReactNode;
    locale?: I18nProviderProps["locale"];
    navigate?: (path: string) => void;
}

const XooxUIProvider: React.FC<XooxUIProviderProps> = ({
                                                           children,
                                                           locale = "en-US",
                                                           navigate,
                                                           ...otherProps
                                                       }) => {

    let contents = children;

    if (navigate) {
        contents = <RouterProvider navigate={navigate}>{contents}</RouterProvider>;
    }
    return (
        <I18nProvider locale={locale}>
            <OverlayProvider {...otherProps}>
                <>
                    <GlobalToastRegion/>
                    {contents}
                </>
            </OverlayProvider>
        </I18nProvider>
    );
};

XooxUIProvider.displayName = "XooxUI.XooxUIProvider";
export default XooxUIProvider;
