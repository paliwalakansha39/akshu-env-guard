
const test = require("node:test");
const assert = require("node:assert");

const {
    checkEnv,
    MissingEnvError
} = require("../index");

// Test 1: All environment variables exist
test("should return configuration when all variables exist", () => {
    const env = {
        PORT: "3000",
        DATABASE_URL: "postgres://localhost/db"
    };

    const result = checkEnv(
        ["PORT", "DATABASE_URL"],
        env
    );

    assert.deepStrictEqual(result, env);
});

// Test 2: Missing environment variable
test("should throw error when a variable is missing", () => {
    const env = {
        PORT: "3000"
    };

    assert.throws(
        () => checkEnv(["PORT", "DATABASE_URL"], env),
        MissingEnvError
    );
});

// Test 3: Empty environment variable
test("should detect empty environment variables", () => {
    const env = {
        PORT: "3000",
        JWT_SECRET: ""
    };

    assert.throws(
        () => checkEnv(["PORT", "JWT_SECRET"], env),
        MissingEnvError
    );
});

// Test 4: Multiple missing variables
test("should identify all missing variables", () => {
    const env = {
        PORT: "3000"
    };

    assert.throws(
        () => checkEnv(
            ["DATABASE_URL", "JWT_SECRET"],
            env
        ),
        (error) => {
            assert.deepStrictEqual(
                error.missingKeys,
                ["DATABASE_URL", "JWT_SECRET"]
            );

            return true;
        }
    );
});

// Test 5: Invalid requiredKeys input
test("should reject invalid requiredKeys input", () => {
    assert.throws(
        () => checkEnv("PORT", {}),
        TypeError
    );
});

// Test 6: Empty requiredKeys array
test("should reject an empty requiredKeys array", () => {
    assert.throws(
        () => checkEnv([], {}),
        TypeError
    );
});

// Test 7: Whitespace-only environment variable
test("should detect whitespace-only variables", () => {
    const env = {
        PORT: "   "
    };

    assert.throws(
        () => checkEnv(["PORT"], env),
        MissingEnvError
    );
});

// Test 8: Invalid environment object
test("should reject invalid environment objects", () => {
    assert.throws(
        () => checkEnv(["PORT"], null),
        TypeError
    );
});

// Test 9: Custom error should contain missing keys
test("should provide missing keys in custom error", () => {
    const env = {};

    assert.throws(
        () => checkEnv(["PORT", "JWT_SECRET"], env),
        (error) => {
            assert.strictEqual(
                error.name,
                "MissingEnvError"
            );

            assert.deepStrictEqual(
                error.missingKeys,
                ["PORT", "JWT_SECRET"]
            );

            return true;
        }
    );
});

// Test 10: Zero and false should be accepted as values
test("should accept zero and false as valid values", () => {
    const env = {
        PORT: 0,
        FEATURE_ENABLED: false
    };

    const result = checkEnv(
        ["PORT", "FEATURE_ENABLED"],
        env
    );

    assert.deepStrictEqual(result, env);
});
