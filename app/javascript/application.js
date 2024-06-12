import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "controllers"
import "@hotwired/turbo-rails"
import "bootstrap"

// Initialize Rails UJS and ActiveStorage
Rails.start()
ActiveStorage.start()
