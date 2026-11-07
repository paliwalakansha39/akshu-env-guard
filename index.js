
function checkEnv(requiredKeys, env = process.env) {
    if (!Array.isArray(requiredKeys)) {
        throw new TypeError("requiredKeys must be an array");
    }

    if (requiredKeys.length === 0) {
        throw new TypeError("requiredKeys cannot be empty");
    }


    if (!env || typeof env !== "object" || Array.isArray(env)) {
        throw new TypeError("env must be an object");
    }

    for (const key of requiredKeys) {
        if (typeof key !== "string" || key.trim() === "") {
            throw new TypeError(
                "Every environment key must be a non-empty string"
            );
        }
    }

    const missingKeys = requiredKeys.filter((key) => {
        const value = env[key];

        return (
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "")
        );
    });

    if (missingKeys.length > 0) {
        throw new MissingEnvError(missingKeys);
    }

    const config = {};

    for (const key of requiredKeys) {
        config[key] = env[key];
    }

    return config;
}

module.exports = {
    checkEnv,
    MissingEnvError
};
