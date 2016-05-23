## Redux Persist Transform Immutable
Add immutable support to redux-persist. **NOTE** this handles immutable state on a per-reducer basis, but does not provide support for top level immutable state.

### Usage
```js
import { compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
const reducer = combineReducers(reducers)
const store = compose(autoRehydrate(), createStore)(reducer)

persistStore(store, {transforms: [immutableTransform()]})
```

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

### Avoiding conflicts with non-Immutable objects

By default, `redux-persist-immutable-transform` will attempt to serialize and deserialize *all* passed objects using `transit-immutable-js`. This can pose a problem if you are also using, for example, plain string objects in your state, because the deserialization will see a regular (non-JSON) string and try to parse it into an object, but will fail. You can utilize the `config` object passed to the constructor to either whitelist or blacklist entries that should or should not be treated by the transformer.

Example state object:

```js
state = {
  username: 'john',
  imageUri: 'images/profilePic.png',
  friends: Immutable.List([ ... ])
}
```

Set up the transformer to ignore the string-based state properties:

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
