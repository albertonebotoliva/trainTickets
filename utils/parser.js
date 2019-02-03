const cheerio = require('cheerio');
const parser = require('./parser/index');

function loadParser(html) { return cheerio.load(html) }
function createBase($) {
    return Object.assign({}, { $ }, {
        dates: parser.base.parseDatesBase($),
        trains: parser.base.parseTrainsBase($),
        product: parser.base.parseProductBase($),
        passengers: parser.base.parsePassengerBase($)
    });
}

function getOutput(base) {
    return {
        status: "ok",
        result: {
            trips: [{
                code: parser.trips.parseTripsCode(base),
                name: parser.trips.parseTripsName(base),
                details: {
                    price: parser.trips.parseDetailsPrice(base),
                    roundTrips: parser.trips.parseRoundTrips(base)
                }
            }],
            custom: {
                prices: parser.prices.parsePrices(base)
            }
        }
    }
}

module.exports = { loadParser, createBase, getOutput }