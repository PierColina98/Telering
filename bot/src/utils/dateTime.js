const luxon = require("luxon");

const toEcuadorDateTime = date => {
    const input = (date instanceof Date) ? date.toISOString() : date;
    const ec_date = luxon.DateTime.fromISO(input).setZone("America/Guayaquil");
    return ec_date.toLocaleString(luxon.DateTime.DATETIME_FULL);
}
module.exports.toEcuadorDateTime = toEcuadorDateTime;

const ecuadorDateTimeNow = () => toEcuadorDateTime(new Date()); //April 11, 2022, 12:21 PM GMT-5
module.exports.ecuadorDateTimeNow = ecuadorDateTimeNow;

const ecuadorIsoString = (date = null, withTime = false) => {
    //helper
    const addZeroToNumber = num => num > 9 ? num + "" : `0${num}`;

    const d = date === null && !(date instanceof Date)
    ? new Date()
    : date;

    const ec_date = luxon.DateTime.fromISO(d.toISOString()).setZone("America/Guayaquil");

    const day = addZeroToNumber(ec_date.day);
    const month = addZeroToNumber(ec_date.month);
    const year = ec_date.year;
    const hour = addZeroToNumber(ec_date.hour);
    const minute = addZeroToNumber(ec_date.minute);
    const second = addZeroToNumber(ec_date.second);

    return withTime ? `${year}-${month}-${day} ${hour}:${minute}:${second}` : `${year}-${month}-${day}`;
}
module.exports.ecuadorIsoString = ecuadorIsoString;