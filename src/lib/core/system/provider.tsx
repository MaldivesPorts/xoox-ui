import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
import {OverlayProvider} from "@react-aria/overlays";

export interface MplUIProviderProps {
  children: React.ReactNode;
  locale?: I18nProviderProps["locale"];
}

export const MplUIProvider: React.FC<MplUIProviderProps> = ({children, locale = "en"}) => {
  return (
    <I18nProvider locale={locale}>
      <OverlayProvider>{children}</OverlayProvider>
    </I18nProvider>
  );
};
