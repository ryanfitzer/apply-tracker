const gistFetch = async (
    gist_id: string,
    access_token: string,
    method: string = "GET",
    body?: BodyInit
) => {
    const init: RequestInit = {
        method,
        headers: {
            Authorization: `Bearer ${access_token}`,
            "X-GitHub-Api-Version": "2022-11-28"
        },
        body
    };

    const response = await fetch(
        `https://api.github.com/gists/${gist_id}`,
        init
    );

    if (!response.ok) {
        throw new Error(`GET Response status: ${response.status}`);
    }

    return await response.json();
};

export default gistFetch;
