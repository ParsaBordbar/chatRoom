const userName = prompt("Enter your name please");
const encodedUserName = encodeURIComponent(userName); 
const socket = new WebSocket(`ws://localhost:4001/${encodedUserName}`);
const input = document.querySelector("input");
const chat = document.querySelector("ul");

let userID = null;


const app = document.getElementById('tittle');
const writer = document.getElementById('welcome-writer');
const typewriter = new Typewriter(app, {
    loop: false,
    onComplete: () => {
        writer.classList.add('hidden');
    }
});
typewriter.typeString(`Hello There "<strong>${decodeURIComponent(userName)}</strong>" 🙋❕`)
    .pauseFor(50)
    .deleteAll()
    .typeString("WELCOME❕👀🥸🫶")
    .deleteAll()
    .pauseFor(20)
    .typeString("You can use <strong>🙃emojis</strong>")
    .pauseFor(20)
    .deleteChars(8)
    .pauseFor(10)
    .typeString("فارسی")
    .pauseFor(10)
    .deleteChars(5)
    .pauseFor(10)
    .typeString("and other <strong>languages</strong> as well.")
    .deleteAll()
    .pauseFor(10)
    .typeString('🗨️ Enjoy Chatting❕')
    .deleteAll()
    .typeString('Be Polite to others❕👀')
    .deleteAll()
    .typeString('Created By <strong>👨‍💻 Parsa Bordbar</strong>')
    .start()


socket.addEventListener('open', () => {
    input.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            if (event.target.value.trim()) {
                socket.send(event.target.value.trim());
                input.value = "";
            }
        }
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.message) {
            const decodedUserID = decodeURIComponent(data.userID); 
            const decodedMessage = decodeURIComponent(data.message); 

            if (userName === decodedUserID) {
                chat.insertAdjacentHTML('beforeend', `<div class="chat chat-start mb-0">
                    <div class="chat-header">
                    You
                    </div>
                    <div class="chat-bubble whitespace-pre-line break-words ">${decodedMessage}</div>
                </div>`);
            } else {
                chat.insertAdjacentHTML('beforeend', `<div class="chat chat-end ">
                    <div class="chat-header">
                    ${decodedUserID}
                    </div>
                    <div class="chat-bubble whitespace-pre-line break-words ">${decodedMessage}</div>
                </div>`);
            }
        }
    });
});
