function checkEnv(requiredKeys, env = process.env) {

    if (!Array.isArray(requiredKeys)) {
        throw new TypeError("requiredKeys must be an array");
    }

    if (requiredKeys.length === 0) {
        throw new TypeError("requiredKeys cannot be empty");
    }

    if (!env || typeof env !== "object") {
        throw new TypeError("env must be an object");
    }

}