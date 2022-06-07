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
    t.true(client.clientUser instanceof ClientUser)
})

test("modifySelf updates client user", async t => {
    const client = new Client({
        baseURL
    })
    await client.loginBearer(token)

    const random = Math.floor(Math.random() * 512 + 512).toString(16)

    await client.modifySelf({
        description: random
    })

    t.is(client.clientUser.description, random)
})

test("search", async t => {
    const client = new Client({
        baseURL
    })
    await client.loginBearer(token)

    const hits = await client.post.searchPosts("rot", 10, 0)
    console.log("Took", hits.tookMs, "ms,", hits.numHitsApprox ? "Approximately" : "Exactly", hits.numHits, "hits:", hits.hits)

    t.true(true)
})