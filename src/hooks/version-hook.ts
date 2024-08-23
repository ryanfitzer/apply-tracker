import { useMemo, useState } from "react";

const useVersion = () => {
    const [versionData, setVersionData] = useState("");
    const [loadingVersionData, setLoadingVersionData] = useState(true);

    useMemo(async () => {
        try {
            const response = await fetch("./version.json");
            const data = await response.json();
            setVersionData(data?.version);
            setLoadingVersionData(false);
        } catch (e) {
            // Do nothing for now
            setLoadingVersionData(false);
        }
    }, []);

    return [versionData, loadingVersionData];
};

export default useVersion;
