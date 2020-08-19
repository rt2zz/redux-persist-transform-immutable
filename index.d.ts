declare module 'redux-persist-transform-immutable' {
    import { Record } from 'immutable'
    import { Transform } from 'redux-persist/es/types'

    interface Config {
        records: Record[]
    }

    export default function<HSS, ESS, S = any, RS = any>(config?: Config): Transform<HSS, ESS, S, RS>
}
