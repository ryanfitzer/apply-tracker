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
                    <span className="align-super text-xs">
                        &#x1F517;
                    </span>
                </a>
            ) : (
                text
            )}
        </>
    );

};

export default Link;