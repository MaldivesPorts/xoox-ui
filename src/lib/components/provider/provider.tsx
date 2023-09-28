import type {ModalProviderProps} from "@react-aria/overlays";
import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
import {OverlayProvider} from "@react-aria/overlays";
import {GlobalToastRegion} from '../toast/gloabl-toast';

export interface XooxUIProviderProps extends Omit<ModalProviderProps, "children"> {
    children: React.ReactNode;
    locale?: I18nProviderProps["locale"];
}

const XooxUIProvider: React.FC<XooxUIProviderProps> = ({
                                                                  children,
                                                                  locale = "en-US",
                                                                  ...otherProps
                                                              }) => {
    return (
        <I18nProvider locale={locale}>
            <OverlayProvider {...otherProps}>
                <>
                    <GlobalToastRegion/>
                    {children}
                </>
            </OverlayProvider>
        </I18nProvider>
    );
};

XooxUIProvider.displayName = "XooxUI.XooxUIProvider";
export default XooxUIProvider;
