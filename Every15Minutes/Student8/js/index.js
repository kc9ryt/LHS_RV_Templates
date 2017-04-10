// ID of the Google Spreadsheet
 var spreadsheetID = "1-K9P-AGVbGjy9kF0cectWUfmVQ5yGRr3x8glyaaSz-8";
 
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
  for (var i = 7; i < 8; i++) {
    //html += '<tr>';
    html += entry[i]['gsx$studentname']['$t'];
    //html += '</tr>';
  }
  //html += '</table>';

  // output html
  $('.name').html(html);
});

//age
$.getJSON(url, function(data) {

  // set global html variable
  var html = '';

  // build table headings
  html += '<table cellpadding=10 cellspacing=0 border=1>';
  
  // loop to build html output for each row
  var entry = data.feed.entry;
  /**
  ** Change to descending order
  ** for (var i = entry.length - 1; i >= 0; i -= 1) {
   */
  for (var i = 7; i < 8; i++) {
    html += '<tr>';
    html += '<td>' + entry[i]['gsx$age']['$t'] + '</td>';
    html += '</tr>';
  }
  html += '</table>';

  // output html
  $('.age').html(html);
});

//Obituary
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
  for (var i = 7; i < 8; i++) {
    //html += '<tr>';
    html += entry[i]['gsx$obituary']['$t'];
    //html += '</tr>';
  }
  //html += '</table>';

  // output html
  $('.obituary').html(html);
});

//image
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
  for (var i = 7; i < 8; i++) {
    //html += '<tr>';
    html += '<a href="#"><img src="' + entry[i]['gsx$image']['$t'] + '" alt="" /></a>';
    
    //html += '</tr>';
  }
  //html += '</table>';

  // output html
  $('.image').html(html);
});