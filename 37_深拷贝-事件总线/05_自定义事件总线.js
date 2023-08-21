class EventBus {
    constructor() {
        this.eventMap = {}
    }

    on(eventName, eventCallback, thisArg) {
        let eventFns = this.eventMap[eventName]

        if (!eventFns) {
            eventFns = []
            this.eventMap[eventName] = eventFns
        }

        eventFns.push({
            eventCallback,
            thisArg
        })
    }

    emit(eventName, ...args) {
        let eventCallbacks = this.eventMap[eventName]

        if (!eventCallbacks) return
        eventCallbacks.forEach(handler => {
            handler.eventCallback.apply(handler.thisArg, args)
        })
    }

    off(eventName, eventCallback) {
        let eventCallbacks = this.eventMap[eventName]
        console.log('eventCallbacks', eventCallbacks)

        if (!eventCallbacks) return

        for (let i = 0; i < eventCallbacks.length; i++) {
            let fn = eventCallbacks[i].eventCallback

            if (fn === eventCallback) {
                eventCallbacks.splice(i, 1)
                console.log('eventCallbacks2', eventCallbacks)
            }
        }

        if (eventCallbacks.length === 0) {
            delete this.eventMap[eventName]
        }
    }
}

const eventBus = new EventBus()

function foo1() {
    console.log('abc event 01')
}

function foo2() {
    console.log('abc event 02')
}

eventBus.on('abc', foo1, {name: 'xizhou'})

eventBus.on('abc', foo2, {name: 'xizhou'})

eventBus.off('abc', foo1)


setTimeout(() => {
    eventBus.emit('abc', 123)
}, 3000)
