class HYCache {
    constructor(local = true) {
        this.storage = local ? localStorage : sessionStorage
    }

    setItem(key, value) {
        if (value) {
            this.storage.setItem(key, JSON.stringify(value))
        }
    }

    getItem(key) {
        let value = this.storage.getItem(key)
        if (value) {
            value = JSON.parse(value)

            return value
        }
    }

    removeItem(key) {
        this.storage.remove(key)
    }

    clear() {
        this.storage.clear()
    }

    key(index) {
        return this.storage.key(index)
    }

    getLength() {
        return this.storage.length
    }
}

const localCache = new HYCache()
const sessionCache = new HYCache(false)

export {
    localCache,
    sessionCache
}