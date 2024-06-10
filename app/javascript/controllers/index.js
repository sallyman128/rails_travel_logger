import { application } from "controllers/application"

import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

import { definitionsFromContext } from "@hotwired/stimulus-loading"
const context = require.context("controllers", true, /_controller\.js$/)
application.load(definitionsFromContext(context))