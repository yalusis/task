// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Get references to various DOM elements
  const inputElement = document.getElementById('inputElement');
  const addButton = document.querySelector('#firstContainer .submitButton');
  const sortByNameButton = document.querySelectorAll('#fewButton .submitButton')[0];
  const sortByValueButton = document.querySelectorAll('#fewButton .submitButton')[1];
  const deleteButton = document.querySelectorAll('#fewButton .submitButton')[2];
  const showAsXmlButton = document.querySelectorAll('#fewButton .submitButton')[3];
  const nameValueList = document.getElementById('nameValueList');

  // Function to validate and split the input into name-value pair
  function validateAndSplitInput(input) {
    const trimmedInput = input.trim();
    // Regular expression to match the format 'name = value'
    if (!trimmedInput.match(/^[a-zA-Z0-9\s]*=\s*[a-zA-Z0-9\s]*$/)) {
      alert("Invalid name-value pair format. Please use 'name = value'");
      return null;
    }
    //Split the input by name and by value 
    const pair = trimmedInput.split('=');
    return { name: pair[0].trim(), value: pair[1].trim() };
  }

  // Event listener for the add button click
  addButton.addEventListener('click', function() {
    const input = inputElement.value;
    const pair = validateAndSplitInput(input);

    // Check for duplicate pairs
    const duplicatePair = Array.from(nameValueList.children).find(
      (item) => item.textContent.trim() === pair.name + ' = ' + pair.value
    );

    if (duplicatePair) {
      alert("This name-value pair already exists.");
    } else {
      // Create a new list item and append to the list
      const listItem = document.createElement('li');
      listItem.textContent = pair.name + ' = ' + pair.value;
      nameValueList.appendChild(listItem);
    }
    inputElement.value = ''; // Clear the input field after adding
  });

  // Event listener for the sort by name button click
  sortByNameButton.addEventListener('click', function() {
    const items = Array.from(nameValueList.children);
    // Sort the list items alphabetically by name part of the text content
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    nameValueList.innerHTML = ''; // Clear the list
    nameValueList.append(...items); // Append sorted items back to the list
  });

  // Event listener for the sort by value button click
  sortByValueButton.addEventListener('click', function() {
    const items = Array.from(nameValueList.children);
    // Sort the list items alphabetically by value part of the text content
    items.sort((a, b) => {
      const valueA = a.textContent.split('=')[1].trim();
      const valueB = b.textContent.split('=')[1].trim();
      return valueA.localeCompare(valueB);
    });
    nameValueList.innerHTML = ''; // Clear the list
    nameValueList.append(...items); // Append sorted items back to the list
  });

  // Event listener for the delete button click
  deleteButton.addEventListener('click', function() {
    const selectedItems = nameValueList.querySelectorAll('li');
    // Remove all selected items from the list
    selectedItems.forEach((item) => item.remove());
  });

  // Event listener for the show as XML button click
  showAsXmlButton.addEventListener('click', function() {
    let xml = `<data>`;
    const items = Array.from(nameValueList.children);

    // Iterate through each list item and generate XML representation
    items.forEach((item) => {
      const pair = item.textContent.split('=');
      const name = pair[0].trim();
      const value = pair[1].trim();
      xml += `<item name="${name}" value="${value}"/>`;
    });

    xml += `</data>`;
    const encodedXml = encodeURIComponent(xml);
    // Open a new window with the XML data encoded in the URL
    window.open('index2.html?xml=' + encodedXml, '_blank');
  });
});
