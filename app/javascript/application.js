// Import Rails UJS (Unobtrusive JavaScript)
import Rails from "@rails/ujs";

// Import other JavaScript libraries or modules
import * as ActiveStorage from "@rails/activestorage";
import Turbolinks from "turbolinks";
import "channels";

// Initialize Rails UJS
Rails.start();
Turbolinks.start();
ActiveStorage.start();

// Include custom JavaScript files
import "bootstrap";
import "../stylesheets/application";
import "controllers";

// You can add more custom JavaScript here

// Example: Adding an event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello from application.js!");
});