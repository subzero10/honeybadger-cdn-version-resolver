'use strict';

const { resolveLatest } = require("./cdn-version-resolver.js")

const formatJSONResponse = (response) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

module.exports = {
  latest: async () => {
    return formatJSONResponse({
      version: await resolveLatest(),
    })
  },
}
