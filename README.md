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
