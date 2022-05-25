import test from "ava"
import { Client, ClientUser } from "../dist/index.js"

const baseURL = process.env.GIFBOX_TEST_BASE || "http://localhost:5000"
const token = process.env.GIFBOX_TEST_TOKEN || "QsHk90j8qhtNWJFEeAiwgRTHARtqfrPrxcCNoZB15HHxN1ipqL-QIANACSKncrJI"

test("new client creates client", t => {
    const client = new Client({
        baseURL
    })
    t.true(client instanceof Client)
})

test("token is `null` by default", t => {
    const client = new Client({
        baseURL
    })
    t.is(client.token, null)
})

test("can log in with bearer token, sets token", async t => {
    const client = new Client({
        baseURL
    })
    await client.loginBearer(token)
    t.is(client.token, token)
})

test("can log in with bearer token, sets client user", async t => {
    const client = new Client({
        baseURL
    })
    await client.loginBearer(token)
    t.true(client.user instanceof ClientUser)
})

test("delete current session", async t => {
    const client = new Client({
        baseURL
    })
    await client.loginBearer(token)

    await client.logout()

    t.true(true)
})