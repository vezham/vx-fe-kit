import { type Props } from './types'

// export const preConfig = ({ name, version, store = true }: Props) => {
export const preConfig = ({ store = true }: Props) => {
  if (store) {
    // defineStore({ pretext: name, version })
  }
}

// export const config = ({ worker = true, axios = true, ...props }: Props) => {
export const config = ({ worker = true, axios = true }: Props) => {
  if (worker) {
    // defineWorker({})
  }
  if (axios) {
    // defineAxios(props)
  }
}
