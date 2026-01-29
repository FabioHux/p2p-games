import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { v4 as uuidv4 } from "uuid"
import wrtc from "wrtc"

console.log("Hello via Bun!");

const ydoc = new Y.Doc();
const name = uuidv4();

const provider = new WebrtcProvider(
    "test-room",
    ydoc,
    {
        password: "ThisIsMySuperSecretPassword",
        signaling: ['ws://localhost:4444'],
        // signaling: ['wss://stupid-donkeys-listen.loca.lt'],
        peerOpts: {
            wrtc: wrtc
        }
    }
)

provider.on("synced", () => {
    console.log("synced as" + name)
})

console.log(`Joining as ${name}`)
// Shared map of characters
const characters = ydoc.getArray('messages') as Y.Array<string>;

// Listen for changes
characters.observe(event => {
    //console.log("Received change!")
    console.log(characters.toArray().join(""));
});

process.stdin.on('data', (data: Buffer<ArrayBuffer>) => {
    //console.log(data.toLocaleString())
    characters.push([`${name}: ${data.toLocaleString()}`])
})