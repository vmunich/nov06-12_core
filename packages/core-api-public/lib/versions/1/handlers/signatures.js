'use strict';

const blockchainManager = require('@arkecosystem/core-plugin-manager').get('blockchain')
const state = blockchainManager.getState()
const config = require('@arkecosystem/core-plugin-manager').get('config')
const utils = require('../utils')

/**
 * [fee description]
 * @type {Object}
 */
exports.fee = {
  handler: (request, h) => {
    return utils.respondWith({
      fee: config.getConstants(state.lastBlock.data.height).fees.secondsignature
    })
  }
}