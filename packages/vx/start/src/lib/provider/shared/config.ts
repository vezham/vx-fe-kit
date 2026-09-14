import { type Props } from './types'

// vx-bot/NOTE: export const preConfig = ({ name, version, store = true }: Props) => {
export const preConfig = ({ store = true }: Props) => {
  if (store) {
    // vx-bot/NOTE: defineStore({ pretext: name, version })
  }
}

// vx-bot/NOTE: export const config = ({ worker = true, axios = true, ...props }: Props) => {
export const config = ({ worker = true, axios = true }: Props) => {
  if (worker) {
    // vx-bot/NOTE: defineWorker({})
  }
  if (axios) {
    // vx-bot/NOTE: defineAxios(props)
  }
}
