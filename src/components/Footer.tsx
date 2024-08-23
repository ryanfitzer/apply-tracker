import { useTranslation } from "react-i18next";
import useVersion from "../hooks/version-hook";

const Footer = () => {
    const { t } = useTranslation();
    const [versionData, loadingVersionData] = useVersion();

    return (<footer className="h-10 px-4">
        <p data-testid="version" className="text-xs">
            {
                !loadingVersionData && <>Version: {versionData}</>
            }
            {
                loadingVersionData && <>{t("loading")}</>
            }
        </p>
    </footer>);
};

export default Footer;