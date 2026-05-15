
import { Context } from './Context'


class NekosiaNekoError extends Error {

  isNekosiaNekoError = true

  sdk = 'NekosiaNeko'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NekosiaNekoError
}

