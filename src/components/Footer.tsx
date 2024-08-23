import useVersion from "../hooks/version-hook";

const Footer = () => {
    const [versionData, loadingVersionData] = useVersion();


    return (<footer className="h-10 px-4">
        <p className="text-xs">
            {
                !loadingVersionData && <>Version: {versionData}</>
            }
            {
                loadingVersionData && <>Loading...</>
            }
        </p>
    </footer>);
};

export default Footer;