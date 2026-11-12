
# Akshu Env Guard

A lightweight, zero-dependency Node.js package for validating required environment variables.

## Overview

Akshu Env Guard helps developers validate environment variables before starting their Node.js applications.

Backend applications commonly depend on environment variables such as:

- PORT
- DATABASE_URL
- JWT_SECRET
- API_KEY

If these variables are missing or empty, applications may fail unexpectedly.

Akshu Env Guard identifies missing variables and provides clear error messages.

## Features

- Validates required environment variables.
- Detects missing variables.
- Detects empty and whitespace-only values.
- Supports custom environment objects.
- Returns validated configuration.
- Provides a custom error class.
- Zero external dependencies.
- Supports Node.js 18 and above.

## Installation

Install the package using NPM:

```bash
npm install akshu-env-guard
```

## Basic Usage

Import the package:

```javascript
const { checkEnv } = require("akshu-env-guard");
```

Validate environment variables:

```javascript
const config = checkEnv([
    "PORT",
    "DATABASE_URL",
    "JWT_SECRET"
]);

console.log(config);
```

The function checks the actual process environment by default.

## Example Output

When all required variables exist:

```javascript
{
    PORT: "3000",
    DATABASE_URL: "postgres://localhost/db",
    JWT_SECRET: "my-secret"
}
```

When a variable is missing:

```text
MissingEnvError:
Missing required environment variables: DATABASE_URL
```

## API Documentation

### checkEnv(requiredKeys, env)

Validates the required environment variables.

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| requiredKeys | Array | Names of required environment variables |
| env | Object | Environment object (optional, defaults to process.env) |

**Returns**

An object containing the validated environment variables.

**Throws**

- `TypeError`: When the arguments are invalid.
- `MissingEnvError`: When required variables are missing or empty.

### MissingEnvError

A custom error class for missing environment variables.

**Properties**

- `name`: Error name.
- `message`: Error description.
- `missingKeys`: Array containing missing variable names.

## Custom Environment Example

You can provide your own environment object instead of using process.env.

```javascript
const { checkEnv } = require("akshu-env-guard");

const config = checkEnv(
    ["PORT", "API_KEY"],
    {
        PORT: "5000",
        API_KEY: "12345"
    }
);

console.log(config);
```

## Error Handling Example

```javascript
const {
    checkEnv,
    MissingEnvError
} = require("akshu-env-guard");

try {
    const config = checkEnv([
        "PORT",
        "DATABASE_URL"
    ]);

    console.log(config);
} catch (error) {
    if (error instanceof MissingEnvError) {
        console.error("Missing variables:", error.missingKeys);
    } else {
        console.error(error.message);
    }
}
```

## Running Tests

Clone the repository:

```bash
git clone https://github.com/paliwalakansha39/akshu-env-guard.git
```

Navigate to the project:

```bash
cd akshu-env-guard
```

Run the test suite:

```bash
npm test
```

## Limitations

- Validates variable presence, not the correctness of values.
- Does not load variables from `.env` files.
- Does not automatically modify `process.env`.
- Does not validate database connections.
- Requires Node.js 18 or above.
- Uses CommonJS module syntax.

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Add appropriate test cases.
5. Submit a pull request.

## License

This project is licensed under the MIT License.
