# Redux Persist Transform Immutable
Add immutable sub-reducer support to redux-persist.

**NOTE** this handles immutable state on a per-reducer basis. If your top level state is an immutable map, this module will not work.

## Breaking Change
v5 changes from `transitjs` to `remotedev-serialize`. For existing projects that upgrade to v5, all persisted data will be lost upon the initial persist. **note** It is possible to write an upgrade via a custom transform that supports both formats - if you do write one please PR!

### Usage with Redux Persist
```js
import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage
}

const reducer = combineReducers(reducers)
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)

persistStore(store)
```

#### Config
For config, please refer to [redux-persist's docs](https://github.com/rt2zz/redux-persist/blob/master/docs/api.md#type-persistconfig).

### Usage with Records
By default, immutable [`Record`s](https://facebook.github.io/immutable-js/docs/#/Record) will be persisted and restored as `Map`s, because the library has no way of knowing what your `Record` constructor looks like. To change this behavior and allow a `Record` to be persisted and restored as a `Record` instance, you'll need to do two things:

1. Add a name attribute to your record (this is the second argument to a `Record`'s constructor).
2. Pass your `Record` constructor to the transformer's `withRecords()` function to generate a transformer capable of serializing and deserializing the record.

Minimal example:
```js
import { compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'

const reducer = combineReducers(reducers)
const store = compose(autoRehydrate(), createStore)(reducer)

const MyRecord = Record({
  foo: 'null'
}, 'MyRecord') // <- Be sure to add a name field to your record

persistStore(
  store,
  {
    transforms: [immutableTransform({records: [MyRecord]})]
  }
)

```

### Avoiding Unnecessary Serialization

By default, `redux-persist-immutable-transform` will serialize and deserialize *all* passed objects using `transit-immutable-js`. If you are concerned about performance, you can either whitelist or blacklist reducer that you know are not immutable.

Example state object:

```js
state = {
  username: 'john',
  imageUri: 'images/profilePic.png',
  friends: Immutable.List([ ... ])
}
```

Set up the transformer to ignore the string-based reducer keys:

```js
persistStore(store, {
  transforms: [immutableTransform({
    blacklist: ['username', 'imageUri']
  })]
})

/* OR */

persistStore(store, {
  transforms: [immutableTransform({
    whitelist: ['friends']
  })]
})
```
