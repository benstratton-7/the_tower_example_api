var sheet = SpreadsheetApp.openById("INSERT_SHEET_ID_HERE").getSheetByName('import');

function doGet(e) {
  var RealTime = e.parameter.RTime;
  var Waves = e.parameter.WaveNum;
  var CoinTotal = e.parameter.CoinsTotal;
  var Tier = e.parameter.Tiernum;
  var Cells = e.parameter.Cells;

  var coins = separateString(CoinTotal);
  var time1 = getTimeString(RealTime, 'm');
  var time2 = convertToTime(time1);
  var cells1 = separateString(Cells);

  var dt = Utilities.formatDate(new Date(), "GMT-5", "yyyy-MM-dd'T'HH:mm:ss");

  sheet.appendRow([dt, time2, Waves, coins.numbers, coins.letter, Tier, cells1.numbers, cells1.letter]);
  return('Completed!')
}

//seperates the CoinTotal's numbers and its accompanying letter (M(million), B(billion), etc)
function separateString(inputString) {
  var numbers = inputString.match(/[\d.]+/g).join('');
  var letter = inputString.match(/[a-zA-Z]$/)[0];
  return {
    numbers: numbers,
    letter: letter
  };
}

//removes everything after a given letter in the input string (in our case 'm' for minutes)
//returns the time in the format [h"h" m"m"] eg [5h 45m]
function getTimeString(inputString, letter){
    var index = inputString.indexOf(letter);
    if (index !== -1) {
        return inputString.substring(0, index + 1);
    }
    return inputString;
}

//turns our time string into a sheets recognizable time string
function convertToTime(inputString) {
  var parts = inputString.split(' ');
  var hours = parseInt(parts[0].replace('h', ''));
  var minutes = parseInt(parts[1].replace('m', ''));
  var time = new Date();
  time.setHours(hours);
  time.setMinutes(minutes);
  time.setSeconds(0);
  return Utilities.formatDate(time, Session.getScriptTimeZone(), "HH:mm:ss");
}