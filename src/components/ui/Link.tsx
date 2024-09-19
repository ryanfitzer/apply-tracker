import { ExternalLinkIcon } from "@radix-ui/react-icons";

const Link = ({ text, link }) => {
    return (
        <>
            {link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    {text}
                    <span className="align-bottom text-xs pl-1">
                        <ExternalLinkIcon className="inline-block" />
                    </span>
                </a>
            ) : (
                text
            )}
        </>
    );

};

export default Link;