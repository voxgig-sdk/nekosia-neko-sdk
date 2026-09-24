
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NekosiaNekoSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NekosiaNekoSDK.test()
    equal(testsdk instanceof NekosiaNekoSDK, true,
      'NekosiaNekoSDK.test() must return a client synchronously')
  })

})
