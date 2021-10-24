const oneDayOnHours = 0.0417;
let days = {
    "sunday": 0,
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6
};

let timeZoneDiff = {
    "colombia": -5
}



let nextDayGoal = (day) => {
    let numberOfDay = days[day];
    let today = new Date();
    let nextDate = today.getDate() + (numberOfDay + 7 - today.getDay()) % 7;
    let dateAux = new Date();
    dateAux.setDate(nextDate);
    dateAux.setHours(24 + timeZoneDiff["colombia"], 0, 0, 0);

    console.log(3224234, nextDate, new Date(), dateAux);
    aux = new Date()
    h = aux.getHours();
    aux.setHours(h + timeZoneDiff["colombia"])
    console.log("actual", aux);

    let timeRemainingToMilliSec = dateAux - aux;


    let milliSecRemainingToDays = timeRemainingToMilliSec/(24 * 60 * 60 * 1000);
    let daysRemaining =  Math.floor(milliSecRemainingToDays);
    let decimalPart = milliSecRemainingToDays - daysRemaining;
    let hoursRemaining  = Math.floor(decimalPart/oneDayOnHours);
    return {days: daysRemaining, hours: hoursRemaining};
}


module.exports = {
    nextDayGoal
}
