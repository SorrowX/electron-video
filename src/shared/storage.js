/**
 * Created by Sorrow.X on 2018/3/30.
 * 本地存储实现, 封装localStorage和sessionStorage
 */

const api = {
    setItem(key, val) {
        if (tip(arguments, 'setItem', 2)) { return }
        this.storage.setItem(key, serialize(val))
        return val
    },

    getItem(key, defaultVal) {
        if (tip(arguments, 'getItem', 1)) { return }
        // 如果没有该key, 则自动设置到缓存中去, 默认值为null
        if (!this.has(key)) {
            return this.setItem(key, defaultVal || null)
        }
        let ret = deserialize(this.storage.getItem(key))
        // 如果有该key,但是值为undefined或者null,则使用默认值且设置到缓存去
        if (defaultVal && (ret === undefined || ret === null)) {
            ret = this.setItem(key, defaultVal)
        }
        return ret
    },

    removeItem(key) {
        if (tip(arguments, 'removeItem', 1)) { return }
        this.storage.removeItem(key)
    },

    clear() {
        this.storage.clear()
    },

    key(index) {
        if (tip(arguments, 'key', 1)) { return }
        this.storage.key(index)
    },

    has(key) {
        if (tip(arguments, 'has', 1)) { return }
        // 使用原生getItem方法,如果没有该key会返回字符串"null"
        return this.storage.getItem(key) !== null
    },

    getAll() {
        let map = Object.create(null)
        this.forEach((key, val) => {
            map[key] = val
        })
        return map
    },

    forEach(callback, ctx) {
        for (let i = 0; i < this.storage.length; i++) {
            let key = this.storage.key(i)
            callback && callback.call(ctx, key, this.getItem(key), i)
        }
    }
}

export let local = Object.assign({
    storage: window.localStorage
}, api)

export let session = Object.assign({
    storage: window.sessionStorage
}, api)

function serialize(val) {
    return JSON.stringify(val)
}

function deserialize(val) {
    try {
        return JSON.parse(val)
    } catch (e) {
        return val === "undefined" ? undefined : val
    }
}

function tip(args, operation, actualNum) {
    if (args.length < actualNum) {
        console.error(
            `Failed to execute '${operation}' on 'store': ${actualNum} arguments required, but only ${args.length} present.`
        )
        return true
    } else {
        return false
    }
}
