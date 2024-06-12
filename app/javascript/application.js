import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
// import "controllers"
import "@hotwired/turbo-rails"
import "bootstrap"
import "./mapbox/map.js"

Rails.start()
ActiveStorage.start()