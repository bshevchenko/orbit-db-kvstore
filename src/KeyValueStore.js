'use strict'

const Store         = require('orbit-db-store')
const KeyValueIndex = require('./KeyValueIndex')

class KeyValueStore extends Store {
  constructor(ipfs, id, dbname, options) {
    let opts = Object.assign({}, { Index: KeyValueIndex })
    Object.assign(opts, options)
    super(ipfs, id, dbname, opts)
  }

  get(key) {
    return this._index.get(key)
  }

  set(key, data) {
    this.put(key, data)
  }

  put(key, data) {
    return this._addOperation({
      op: 'PUT',
      key: key,
      value: data,
      meta: {
        ts: new Date().getTime()
      }
    })
  }

  del(key) {
    return this._addOperation({
      op: 'DEL',
      key: key,
      value: null,
      meta: {
        ts: new Date().getTime()
      }
    })
  }
}

module.exports = KeyValueStore
