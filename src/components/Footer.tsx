import { useTranslation } from "react-i18next";
import useVersion from "../hooks/version-hook";

const Footer = () => {
    const { t } = useTranslation();
    const [versionData, loadingVersionData] = useVersion();

    return (<footer className="h-10 px-4 flex items-center">
        <p className="text-xs">&copy;2024 MissingSemicolon&nbsp;
            <span data-testid="version" className="text-xs">
                {
                    !loadingVersionData && <>Version: {versionData}</>
                }
                {
                    loadingVersionData && <>{t("loading")}</>
                }
            </span>
        </p>
    </footer>);
};

export default Footer;