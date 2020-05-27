export const getUrlTilSoknad = (soknadId: string, stegId: string | undefined) => {
    const baseUrl = `/soknader/${soknadId}`;
    return stegId
        ? `${baseUrl}/${stegId}`
        : baseUrl;
};


