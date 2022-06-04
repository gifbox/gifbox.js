# gifbox.js

Node and Web API wrapper for the GIFBox API.

## Installation

    npm i gifbox.js
    # or
    yarn add gifbox.js

## Usage

Getting started is as simple as installing the package and authorizing using a token, existing account or creating a new account.

For example, to log in with an existing session token:

```ts
import { Client } from "gifbox.js"

const client = new Client()

await client.loginBearer("QsHk90j8qhtNWJFEeAiwgRTHARtqfrPrxcCNoZB15HHxN1ipqL-QIANACSKncrJI")
```

## Documentation

A generated API reference for this package is available at **https://js.gifbox.me**.

## License

gifbox.js uses the MIT license. See the LICENSE file for more information.