
////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////
// instance of the XML request
var xmlhttp;
  
////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////
// function updateArticle:
//  - load the XML info from file into the XML request object
function loadXMLDoc() 
{
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "xml/tmtcicd.xml", false);
  xmlhttp.send();
  var xmlDoc = xmlhttp.responseXML;

  document.getElementById("packet-name").innerHTML = '<strong>NAME: </strong>' + 'none';
  document.getElementById("packet-apid").innerHTML = '<strong>APIDs: </strong>' + 'none';
  document.getElementById("packet-desc").innerHTML = '<strong>DESCRIPTION: </strong>' + 'none';
 
  resetParameterContent();  
}

// function updateArticle:
//  - this is the function called when a packet link is clicked in the navigator section
function updateArticle(type, stype) 
{
  var xmlDoc = xmlhttp.responseXML;
  var pktList = xmlDoc.getElementsByTagName("packet");
  
  // iterate for each packet found
  for (var i = 0; i< pktList.length; i++) 
  {
    var pktType = pktList[i].getElementsByTagName("type")[0].childNodes[0].nodeValue; 
    var pktSubtype = pktList[i].getElementsByTagName("stype")[0].childNodes[0].nodeValue; 

    if ((pktType == type)&&(pktSubtype == stype))
    {  
      document.getElementById("packet-name").innerHTML = '<strong>NAME: </strong>' + pktList[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
      document.getElementById("packet-apid").innerHTML = '<strong>APIDs: </strong>' + pktList[i].getElementsByTagName("apids")[0].childNodes[0].nodeValue;
      document.getElementById("packet-desc").innerHTML = '<strong>DESCRIPTION: </strong>' + pktList[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
      
      // TODO: here check the number of parameters and add a row for each. This is the case of no parameters (none)
      resetParameterContent();
      var pktParams = pktList[i].getElementsByTagName("parameter");
      for (var j = 0; j< pktParams.length; j++) {
        var pName = "param" + (j+1) + "-name";
        var pType = "param" + (j+1) + "-type";
        var pLen = "param" + (j+1) + "-length";
        var pDesc = "param" + (j+1) + "-desc";
        document.getElementById(pName).innerHTML = pktParams[j].getElementsByTagName("param-name")[0].childNodes[0].nodeValue;
        document.getElementById(pType).innerHTML = pktParams[j].getElementsByTagName("param-type")[0].childNodes[0].nodeValue;
        document.getElementById(pLen).innerHTML = pktParams[j].getElementsByTagName("param-len")[0].childNodes[0].nodeValue;
        document.getElementById(pDesc).innerHTML = pktParams[j].getElementsByTagName("param-desc")[0].childNodes[0].nodeValue;
      }
    } // end if
  } // end for
  document.getElementById("params-header").innerHTML = txt;
}

// function showPacketTags:
// get all the information from the XML DOM and display it
function showPacketTags() 
{ 
    var xmlDoc = xmlhttp.responseXML;
    var txt = "<b>TMTC ICD: </b>";
    var pktList = xmlDoc.getElementsByTagName("packet");

    // iterate for each packet found
    for (i = 0; i< pktList.length; i++) {
      txt += "<br>[" + pktList[i].getAttribute("category") + "- ";
      txt += pktList[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + ", ";
      txt += pktList[i].getElementsByTagName("apids")[0].childNodes[0].nodeValue + ", ";
      txt += pktList[i].getElementsByTagName("type")[0].childNodes[0].nodeValue + ", ";
      txt += pktList[i].getElementsByTagName("stype")[0].childNodes[0].nodeValue + ", ";
      txt += pktList[i].getElementsByTagName("description")[0].childNodes[0].nodeValue + ", ";
      txt += showParameterTags(pktList[i].getElementsByTagName("param-name"));
      txt += "] <br>";
    }
    document.getElementById("params-header").innerHTML = txt;
}

// function showParameterTags:
// generic function to show the nodeVaue of each element of a list
function showParameterTags(list) 
{ 
    var txt = "{";

    if (list.length == 0)
    {  txt += "none"; } else {
      // iterate for each tag found
      var i;
      for (i = 0; i< list.length; i++) {
       txt += list[i].childNodes[0].nodeValue;
        if (i < list.length-1)
          {txt += ", ";}
      }
    } // end if 
    txt += "}";

    return txt;
}

// function addParamRow:
//  - adds a new row in the parameter section with the corresponding data
function addParamRow(paramName, paramType, paramLength, paramDesc) 
{ 
  var emptyName = document.createElement('div');
  var emptyType = document.createElement('div');
  var emptyLength = document.createElement('div');
  var emptyDesc = document.createElement('div');
  
  emptyName.innerHTML = paramName;
  emptyName.className = "grid-cell cell-NewParamName";
  document.getElementById("paramtable").append(emptyName);

  emptyType.innerHTML = paramType;
  emptyType.className = "grid-cell cell-NewParamType";
  document.getElementById("paramtable").append(emptyType);

  emptyLength.innerHTML = paramLength;
  emptyLength.className = "grid-cell cell-NewParamLength";
  document.getElementById("paramtable").append(emptyLength);

  emptyDesc.innerHTML = paramDesc;
  emptyDesc.className = "grid-cell cell-NewParamDescription";
  document.getElementById("paramtable").append(emptyDesc);
}

// function resetParameterContent:
//  - reset the content of all parameters to 'none' 
function resetParameterContent() 
{ 
  document.getElementById("param1-name").innerHTML = "none";
  document.getElementById("param1-type").innerHTML = "none";
  document.getElementById("param1-length").innerHTML = "none";
  document.getElementById("param1-desc").innerHTML = "none";
  document.getElementById("param2-name").innerHTML = "none";
  document.getElementById("param2-type").innerHTML = "none";
  document.getElementById("param2-length").innerHTML = "none";
  document.getElementById("param2-desc").innerHTML = "none";
  document.getElementById("param3-name").innerHTML = "none";
  document.getElementById("param3-type").innerHTML = "none";
  document.getElementById("param3-length").innerHTML = "none";
  document.getElementById("param3-desc").innerHTML = "none";
}

// function deleteParameterRows:
//  - delete all the parameter rows, ready to load the parameters of the next (if any)
function deleteAllParameterRows() 
{ 
    // TODO
}