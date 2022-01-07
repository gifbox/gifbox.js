import test from "ava"
import { Client } from "../dist/index.js"

test("unimplemented class throws error", t => {
    t.throws(() => {
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        const _client = new Client()
    })
})