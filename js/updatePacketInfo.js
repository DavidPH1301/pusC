/*** 
    Name: updateArticle(stype, sstype)
    Description: search for the HTML text to be placed in the grid by indexing the array with stype and sstype  
***/ 

function updateArticle(stype, sstype) 
{
  /* TODO: get the packet info from the [stype,sstype] element */ 
  if ((stype === 1) && (sstype === 1)) {
    document.getElementById("packet-name").innerHTML = 'TM(1,1): Successful acceptance verification report';
    document.getElementById("packet-apid").innerHTML = 'General_OBDH';
    document.getElementById("packet-desc").innerHTML = 'This packet reports successful acceptance of a TC packet. If the TC packet does not have a secondary header (i.e. the secondary header flag in the CCSDS header is 0), the TC PUS header fields in this packet are set to 0.';      
  } else if ((stype === 1) && (sstype === 2)) {
    document.getElementById("packet-name").innerHTML = 'TM(1,2): Failed acceptance verification report';
    document.getElementById("packet-apid").innerHTML = 'General_OBDH';
    document.getElementById("packet-desc").innerHTML = 'This packet reports failed acceptance of a TC packet.';
  }
  else {
    var text = 'this is the packet of type ' + stype + ' and subtype ' + sstype;
    document.getElementById("packet-name").innerHTML = text;
    document.getElementById("packet-apid").innerHTML = '';
    document.getElementById("packet-desc").innerHTML = '';
  }
}