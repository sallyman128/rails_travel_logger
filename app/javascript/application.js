import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "controllers"
import "@hotwired/turbo-rails"
import "bootstrap"

// Initialize Rails UJS and ActiveStorage
Rails.start()
ActiveStorage.start()

document.addEventListener('turbo:load', () => {
  const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
  const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    return new bootstrap.Dropdown(dropdownToggleEl)
  })
})