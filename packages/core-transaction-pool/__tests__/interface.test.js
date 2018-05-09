'use strict'

const app = require('./__support__/setup')
const { dummy1, dummy2 } = require('./__fixtures__/transactions')

let poolInterface

beforeAll(async (done) => {
  const container = await app.setUp()
  await container.resolvePlugin('blockchain').start()

  poolInterface = new (require('../lib/interface'))({ enabled: false })

  done()
})

afterAll(async (done) => {
  await app.tearDown()

  done()
})

describe('TransactionPoolInterface Interface', () => {
  it('should be an object', async () => {
    await expect(poolInterface).toBeObject()
  })

  describe('driver', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.driver).toBeFunction()
    })
  })

  describe('getPoolSize', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.getPoolSize).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.getPoolSize()).rejects.toThrowError('Method [getPoolSize] not implemented!')
    })
  })

  describe('addTransaction', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.addTransaction).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.addTransaction()).rejects.toThrowError('Method [addTransaction] not implemented!')
    })
  })

  describe('removeTransaction', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.removeTransaction).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.removeTransaction()).rejects.toThrowError('Method [removeTransaction] not implemented!')
    })
  })

  describe('removeTransactions', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.removeTransactions).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.removeTransactions()).rejects.toThrowError('Method [removeTransactions] not implemented!')
    })
  })

  describe('getTransaction', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.getTransaction).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.getTransaction()).rejects.toThrowError('Method [getTransaction] not implemented!')
    })
  })

  describe('getTransactions', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.getTransactions).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.getTransactions()).rejects.toThrowError('Method [getTransactions] not implemented!')
    })
  })

  describe('getTransactionsForForging', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.getTransactionsForForging).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.getTransactionsForForging()).rejects.toThrowError('Method [getTransactionsForForging] not implemented!')
    })
  })

  describe('hasExceededMaxTransactions', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.hasExceededMaxTransactions).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.hasExceededMaxTransactions()).rejects.toThrowError('Method [hasExceededMaxTransactions] not implemented!')
    })
  })

  describe('getPublicKeyById', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.getPublicKeyById).toBeFunction()
    })

    it('should throw an exception', async () => {
      await expect(poolInterface.getPublicKeyById()).rejects.toThrowError('Method [getPublicKeyById] not implemented!')
    })
  })

  describe('determineExceededTransactions', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.determineExceededTransactions).toBeFunction()
    })

    it('should have 2 acceptable / 0 excess transactions', async () => {
      poolInterface.hasExceededMaxTransactions = jest.fn(pass => false)

      const ids = await poolInterface.determineExceededTransactions([dummy1, dummy2])

      await expect(ids).toBeObject()
      await expect(ids).toHaveProperty('acceptable')
      await expect(ids.acceptable).toHaveLength(2)
      await expect(ids).toHaveProperty('excess')
      await expect(ids.excess).toHaveLength(0)
    })

    it('should have 0 acceptable / 2 excess transactions', async () => {
      poolInterface.hasExceededMaxTransactions = jest.fn(pass => true)

      const ids = await poolInterface.determineExceededTransactions([dummy1, dummy2])

      await expect(ids).toBeObject()
      await expect(ids).toHaveProperty('acceptable')
      await expect(ids.acceptable).toHaveLength(0)
      await expect(ids).toHaveProperty('excess')
      await expect(ids.excess).toHaveLength(2)
    })
  })

  describe('verifyTransaction', async () => {
    it('should be a function', async () => {
      await expect(poolInterface.verifyTransaction).toBeFunction()
    })

    it('should be truthy if can apply', async () => {
      await expect(await poolInterface.verifyTransaction(dummy1)).toBeTruthy()
    })

    it('should be fasly if can not apply', async () => {
      await expect(await poolInterface.verifyTransaction(dummy2)).toBeFalsy()
    })
  })
})