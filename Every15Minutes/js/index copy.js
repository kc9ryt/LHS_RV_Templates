// ID of the Google Spreadsheet
 var spreadsheetID = "1-K9P-AGVbGjy9kF0cectWUfmVQ5yGRr3x8glyaaSz-8";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
// make JSON call to Google Data API
$.getJSON(url, function(data) {

  // set global html variable
  var html = '';

  // build table headings
  html += '<table cellpadding=10 cellspacing=0 border=1>';
  html += '<tr>';
  html += '<th>Name</th>';
  html += '<th>Age</th>';
  html += '<th>Obituary</th>';
  html += '<th>Image</th>';
  html += '</tr>';
  
  // loop to build html output for each row
  var entry = data.feed.entry;
  /**
  ** Change to descending order
  ** for (var i = entry.length - 1; i >= 0; i -= 1) {
   */
  for (var i = 0; i < entry.length; i++) {
    html += '<tr>';
    html += '<td>' + entry[i]['gsx$studentname']['$t'] + '</td>';
    html += '<td>' + entry[i]['gsx$age']['$t'] + '</td>';
    html += '<td>' + entry[i]['gsx$obituary']['$t'] + '</td>';
    html += '<td>' + entry[i]['gsx$image']['$t'] + '</td>';
    html += '</tr>';
  }
  html += '</table>';

  // output html
  $('.name').html(html);
});