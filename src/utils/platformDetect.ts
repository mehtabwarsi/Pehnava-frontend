const isApplePlatform = () => {
    if (typeof navigator === "undefined") return false;
    return /Macintosh|iPhone|iPad|iPod/.test(navigator.userAgent);
};

const isWindowsPlatform = () => {
    if (typeof navigator === "undefined") return false;
    return /Windows/.test(navigator.userAgent);
};

const isMobilePlatform = () => {
    if (typeof navigator === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(navigator.userAgent);
};

export { isApplePlatform, isWindowsPlatform, isMobilePlatform };
