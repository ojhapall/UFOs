// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {
  datetime: "",
  city: "",
  state: "",
  country: "",
  shape: ""
};

// 3. Use this function to update the filters. 
function updateFilters() {

filters = {}; 

  // 4a. Save the element that was changed as a variable.
  // 4b. Save the value that was changed as a variable.
  let date = d3.select("#datetime").property("value");
  let city = d3.select("#city").property("value");
  let state = d3.select("#state").property("value");
  let country = d3.select("#country").property("value");
  let shape = d3.select("#shape").property("value");

  // 4c. Save the id of the filter that was changed as a variable.
  // filters.datetime = date;
  // filters.city = city;
  // filters.state = state;
  // filters.country = country;
  // filters.shape = shape;
  
  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.

  if (date) {
    filters["datetime"]=date;
  }
  if (city){
    filters["city"]=city;
  }
  if (state) {
    filters["state"]=state;
  }
  if (country) {
    filters["country"]=country;
  }
  if (shape) {
    filters["shape"]=shape;
  }
  
    // 6. Call function to apply all filters and rebuild the table
  filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    var filteredData = data;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (var filterKey in filters){
      filteredData = filteredData.filter(row => row[filterKey] === filters[filterKey]);
    }
    
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.select("#datetime").on("change", updateFilters);
  d3.select("#city").on("change", updateFilters);
  d3.select("#state").on("change", updateFilters);
  d3.select("#country").on("change", updateFilters);
  d3.select("#shape").on("change", updateFilters);

  // Build the table when the page loads
  buildTable(tableData);
