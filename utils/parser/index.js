const moment = require('moment');
const extractDate = /[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}/g;
const formatDate = /(\d{2})\/(\d{2})\/(\d{4})/;
//Parse Base
module.exports.base = {
    parseDatesBase: $ => $('.pnr-summary').text().match(extractDate),
    parseTrainsBase: $ => $('.product-details'),
    parseProductBase: $ => $('.product-header'),
    parsePassengerBase: $ => $('.digital-box-cell').eq(0).find($('.passengers'))
}

//Parse roundTrips
module.exports.roundTrips = {
    parseType: ($, i, trains) => trains.eq(i).find($('.travel-way')).text().trim(),
    parseDepartureTime: ($, i, trains) => trains.eq(i).find($('.origin-destination-hour.segment-departure')).text().trim(),
    parseDepartureStation: ($, i, trains) => trains.eq(i).find($('.origin-destination-station.segment-departure')).text().trim(),
    parseArrivalTime: ($, i, trains) => trains.eq(i).find($('.origin-destination-hour.segment-arrival')).text().trim(),
    parseArrivalStation: ($, i, trains) => trains.eq(i).find($('.origin-destination-station.segment-arrival')).text().trim(),
    parseTrainType: ($, i, trains) => trains.eq(i).find($('.segment')).eq(0).text().trim(),
    parseNumber: ($, i, trains) => trains.eq(i).find($('.segment')).eq(1).text().trim(),
    parsePassengers: ($, i, passengers) => {
        const output = [];
        for (let j = 0; j < passengers.length; j++) {
            output.push({
                type: passengers.eq(i).find($('.fare-name')).eq(j).text(),
                age: passengers.eq(i).find($('.typology')).eq(j).text().match(/\(.*\)/g)[0],
            })
        }
        return output;
    }
}

//Parse trips
module.exports.trips = {
    parseDetailsPrice: ({ $ }) => parseFloat($('.very-important').text().replace(',', '.')),
    parseTripsCode: ({ $ }) => $('.pnr-ref > .pnr-info').eq(2).text().trim(),
    parseTripsName: ({ $ }) => $('.name').text().split(' ')[2],
    parseRoundTrips: ({ $, trains, passengers, dates }) => {
        const output = [];
        for (let i = 0; i < trains.length; i++) {
            output.push({
                type: module.exports.roundTrips.parseType($, i, trains),
                date: moment.utc(new Date(dates[i].replace(formatDate, '$3-$2-$1'))).format("YYYY-MM-DD HH:mm:ss Z"),
                trains: [
                    {
                        departureTime: module.exports.roundTrips.parseDepartureTime($, i, trains),
                        departureStation: module.exports.roundTrips.parseDepartureStation($, i, trains),
                        arrivalTime: module.exports.roundTrips.parseArrivalTime($, i, trains),
                        arrivalStation: module.exports.roundTrips.parseArrivalStation($, i, trains),
                        type: module.exports.roundTrips.parseTrainType($, i, trains),
                        number: module.exports.roundTrips.parseNumber($, i, trains),
                        passengers: module.exports.roundTrips.parsePassengers($, i, passengers)
                    }
                ]
            })
        }
        return output;
    }
}

module.exports.prices = {
    parsePrices: ({ $, product }) => {
        const output = []
        for (let i = 0; i < product.length; i++) {
            output.push({
                value: parseFloat(product.eq(i).find($('td')).last().text().replace(',', '.'))
            });
        }
        return output;
    }
}