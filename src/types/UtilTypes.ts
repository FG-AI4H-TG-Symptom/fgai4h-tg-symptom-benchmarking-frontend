export type Loading<T> = { loading: true } | ({ loading: false } & T)
