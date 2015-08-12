## Redux Persist Immutable
Add immutable support to redux-persist

### Usage
```js
import { compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import reduxPersistImmutable from 'reduxPersistImmutable'
const reducer = combineReducers(reducers)
const store = compose(autoRehydrate(), createStore)(reducer)
persistStore(store, {transforms: [reduxPersistImmutable]})
```
