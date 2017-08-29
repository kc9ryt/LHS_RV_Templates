// ID of the Google Spreadsheet
 var spreadsheetID = "174doAYUkzYtsFthat-6kMziPGl1xK2aKvDh3xU3oOBc";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
// make JSON call to Google Data API
$.getJSON(url, function(data) {

  // set global html variable
  var html = '';

  // build table headings
  //html += '<table cellpadding=10 cellspacing=0 border=1>';
  
  // loop to build html output for each row
  var entry = data.feed.entry;
  /**
  ** Change to descending order
  ** for (var i = entry.length - 1; i >= 0; i -= 1) {
   */
  for (var i = 0; i < 19; i++) {
    //html += '<tr>';
    html += '<div style="text-align: center; color: red;">'
    html += entry[i]['gsx$title']['$t'];
    html += '</div>'
    html += '<p>'
    html += entry[i]['gsx$message']['$t'];
    html += '</p>'
    //html += '</tr>';
  }
  //html += '</table>';

  // output html
  $('.content').html(html);
});