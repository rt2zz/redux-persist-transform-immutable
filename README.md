## Redux Persist Immutable
Add immutable support to redux-persist.

**Note:** redux-persist-immutable works with nested immutable data at the reducer level. It does **not** if the entire state atom is one immutable map.

### Usage
```js
import { compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import reduxPersistImmutable from 'reduxPersistImmutable'
const reducer = combineReducers(reducers)
const store = compose(autoRehydrate(), createStore)(reducer)
persistStore(store, {transforms: [reduxPersistImmutable]})
```
