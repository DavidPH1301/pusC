
// var packet info from the [stype,sstype] element
var packets = new Map([
    [1, new Map([
      [1,['TM(1,1): Succesful acceptance', 'General_OBDH', 'This TM packet reports successful acceptance of a TC packet.']],
      [2,['TM(1,2): Failed acceptance', 'General_OBDH', 'This TM packet reports failed acceptance of a TC packet.']],
      [7,['TM(1,7): Succesful execution', 'General_OBDH', 'This TM packet reports succesful execution']],
      [8,['TM(1,8): Failed execution', 'General_OBDH', 'This TM packet reports failed execution']]
    ])],
    [2, new Map([
      [1,['TC(2,1): Send a command', 'General_OBDH', 'This TC packet sends a command']],
      [2,['TM(2,2): Send a command report', 'General_OBDH', 'This TM packet reports a command report']]
    ])],
    [3, new Map([
      [1,['TC(3,1): Enable/Disable HK', 'General_OBDH', 'This TC packet Enable/Disable HK']],
      [2,['TC(3,2): Config HK', 'General_OBDH', 'This TC packet Config HK']],
      [25,['TM(3,25): HK report', 'General_OBDH', 'This TM packet is a HK report']]
    ])],
    [5, new Map([
      [1,['TM(5,1): Info', 'General_OBDH', 'This TM packet is an Event info']],
      [2,['TM(5,2): Warning', 'General_OBDH', 'This TM packet is an Event warning']],
      [3,['TM(5,3): Critical', 'General_OBDH', 'This TM packet is an Event critical']],
      [4,['TM(5,4): High Critical', 'General_OBDH', 'This TM packet is an Event high critical']]
    ])]
  ]);
 
// function loadXMLDoc:
//  - loads the XML file containing packets info
function loadXMLDoc() 
{
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.open("GET", "xml/tmtcicd.xml", false);
 xmlhttp.send();

 var xmlDoc = xmlhttp.responseXML;
 // TODO: here to go through the XML DOM and fill the packets Map with data from XML
 //alert("XML loading...");  
 document.getElementById("packet-name").innerHTML = '<strong>NAME: </strong>' + xmlDoc.getElementsByTagName("name")[4].childNodes[0].nodeValue;
 document.getElementById("packet-apid").innerHTML = '<strong>APIDs: </strong>' + xmlDoc.getElementsByTagName("apids")[4].childNodes[0].nodeValue;
 document.getElementById("packet-desc").innerHTML = '<strong>DESCRIPTION: </strong>' + xmlDoc.getElementsByTagName("description")[4].childNodes[0].nodeValue;
 //alert("XML loaded!");  
}

// function updateArticle:
//  - this is the function called when a packet link is clicked in the navigator section
function updateArticle(stype, sstype) 
{
  document.getElementById("packet-name").innerHTML = '<strong>NAME: </strong>' + packets.get(stype).get(sstype)[0];
  document.getElementById("packet-apid").innerHTML = '<strong>APIDs: </strong>' + packets.get(stype).get(sstype)[1];
  document.getElementById("packet-desc").innerHTML = '<strong>DESCRIPTION: </strong>' + packets.get(stype).get(sstype)[2];
  addEmptyRow();
}

// function addEmptyRow:
//  - adds an empty row in the parameter section
//  - called by updateArticle
function addEmptyRow() 
{ 
    var emptyName = document.createElement('div');
    var emptyType = document.createElement('div');
    var emptyLength = document.createElement('div');
    var emptyDesc = document.createElement('div');
    
    emptyName.innerHTML = "";
    emptyName.className = "grid-cell cell-NewParamName";
    document.getElementById("paramtable").append(emptyName);

    emptyType.innerHTML = "";
    emptyType.className = "grid-cell cell-NewParamType";
    document.getElementById("paramtable").append(emptyType);

    emptyLength.innerHTML = "";
    emptyLength.className = "grid-cell cell-NewParamLength";
    document.getElementById("paramtable").append(emptyLength);

    emptyDesc.innerHTML = "";
    emptyDesc.className = "grid-cell cell-NewParamDescription";
    document.getElementById("paramtable").append(emptyDesc);
}

// function addParamRow:
//  - adds a new row in the parameter section with the corresponding data
function addParamRow() 
{ 
    // TODO
}

// function deleteParameterRows:
//  - delete all the parameter rows, ready to load the parameters of the next (if any)
function deleteParameterRows() 
{ 
    // TODO
}