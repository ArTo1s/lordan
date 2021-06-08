class MessageSender {

    send(data){
        window.parent.postMessage(data, "*")
    }
}

export {MessageSender} 