declare module 'redux-persist-transform-immutable' {
    import {Transform} from 'redux-persist/es/types'
    import {TransformConfig} from 'redux-persist/es/createTransform'

    export default function<HSS, ESS, S = any, RS = any>(config?: TransformConfig): Transform<HSS, ESS, S, RS>
}
