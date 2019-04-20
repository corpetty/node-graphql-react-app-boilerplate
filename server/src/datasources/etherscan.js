const { RESTDataSource } = require('apollo-datasource-rest')

class EtherscanAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.etherscan.io/'
  }

  async getBalance(address) {
    // TODO: Make this better
    const url = `api?module=account&action=balance&address=${address}&tag=latest&apikey=Q486RNHQ57TX46ADWAIEFRQ1RMB2ABS7TG`
    const response = await this.get(url)
    return response.result
  }

}

module.exports = EtherscanAPI