
////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////
// instance of the XML request
var xmlhttp;
  

////////////////////////////////////////////////////////////////////////
// LISTENER
////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize XML once DOM is ready
    loadXMLDoc();

    // 2. Setup Resizer
    const resizer = document.getElementById('resizer');
    const sidebar = document.getElementById('sidebar');

    if (!resizer || !sidebar) return;

    let isResizing = false;

    resizer.addEventListener("mousedown", (e) => {
        isResizing = true;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;
        let newWidth = e.clientX;
        if (newWidth >= 150 && newWidth <= 600) {
            sidebar.style.width = `${newWidth}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = "default";
            document.body.style.userSelect = "auto";
        }
    });
});

////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////

// LOAD XML DOCUMENT:
//  - load the XML info from file into the XML request object
function loadXMLDoc() 
{
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "xml/tmtcicd.xml", false);
  xmlhttp.send();
  var xmlDoc = xmlhttp.responseXML;

  document.getElementById("packet-name").innerHTML = '<strong>PACKET: </strong>' + 'none';
  document.getElementById("packet-desc").innerHTML = '<strong>DESCRIPTION: </strong>' + 'none';
 
  resetParameterContent();  
}

// TABS UPDATE
//  - udpate when chaging tab
function showTab(tabId, button) {

    document.querySelectorAll('.tab-content')
        .forEach(tab => tab.classList.remove('active'));

    document.querySelectorAll('.tab-button')
        .forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId)
        .classList.add('active');

    if (button) {
        // Si el clic viene directamente del botón del tab-bar
        button.classList.add('active');
    } else {
        // Si la llamada viene desde updateArticle('tab3'), busca el botón del DOM
        const targetButton = document.querySelector(`.tab-button[onclick*="${tabId}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
    }
}

// RESIZE SIDEBAR
//  - resize the side bar
const resizer = document.getElementById('resizer');
const sidebar = document.getElementById('sidebar');

let isResizing = false;

// 1. Detect mouse press on the resizer
resizer.addEventListener("mousedown", (e) => {
    isResizing = true;
    document.body.style.cursor = "col-resize"; // Keeps the resizer cursor active
    document.body.style.userSelect = "none";   // Prevents text selection while dragging
});
// 2. Adjust sidebar width as the mouse moves
document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    
    // Set sidebar width based on the current horizontal mouse position
    let newWidth = e.clientX;

    // Optional bounds: keep sidebar between 150px and 600px
    if (newWidth >= 150 && newWidth <= 600) {
        sidebar.style.width = `${newWidth}px`;
    }
});
// 3. Stop resizing when mouse click is released
document.addEventListener("mouseup", () => {
    if (isResizing) {
        isResizing = false;
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
    }
});


// UPDATE ARTICLE:
//  - this is the function called when a packet link is clicked in the sidebar
function updateArticle(type, stype) 
{
  if (!xmlhttp || !xmlhttp.responseXML) {
      console.error("El archivo XML no ha sido cargado.");
      return;
  }

  var xmlDoc = xmlhttp.responseXML;
  var pktList = xmlDoc.getElementsByTagName("packet");
  var found = false;

  // iterate for each packet found
  for (var i = 0; i< pktList.length; i++) 
  {
    var pktType = pktList[i].getElementsByTagName("type")[0].childNodes[0].nodeValue; 
    var pktSubtype = pktList[i].getElementsByTagName("stype")[0].childNodes[0].nodeValue; 

    if ((pktType == type)&&(pktSubtype == stype))
    {  
      document.getElementById("packet-name").innerHTML = '<strong>PACKET: </strong>' + pktList[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
      document.getElementById("packet-desc").innerHTML = '<strong>DESCRIPTION: </strong>' + pktList[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;      
      found = true;
      break;
    } // end if
} // end for

  if (!found) {
      document.getElementById("packet-name").innerHTML = '<strong>PACKET: </strong>Not found';
      document.getElementById("packet-desc").innerHTML = '<strong>DESCRIPTION: </strong>Not found';
  }

  // Change to tab3 ("PUS messages") when clicking the sidebar
  showTab('tab3');
}
