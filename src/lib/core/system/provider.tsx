import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
import {OverlayProvider} from "@react-aria/overlays";
import {GlobalToastRegion} from '../../components/toast';

export interface XooxUIProviderProps {
  children: React.ReactNode;
  locale?: I18nProviderProps["locale"];
}

export const XooxUIProvider: React.FC<XooxUIProviderProps> = ({children, locale = "en"}) => {
  return (
    <I18nProvider locale={locale}>
      <OverlayProvider>
          <>
              {children}
              <GlobalToastRegion/>
          </>
      </OverlayProvider>
    </I18nProvider>
  );
};
