 // Retrieve the XML content from the query parameter
 const urlParams = new URLSearchParams(window.location.search);
 const xml = urlParams.get('xml');

 // Display the XML content
 document.getElementById('xmlContent').textContent = decodeURIComponent(xml);