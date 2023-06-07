// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload'

function disableAnimations(win: Cypress.AUTWindow) {
    const injectedStyleEl = win.document.getElementById('__cy_disable_animations__')
    if (injectedStyleEl) {
        return
    }
    win.document.head.insertAdjacentHTML(
        'beforeend',
        `
    <style id="__cy_disable_animations__">
      *, *::before, *::after { transition: none !important; }
      *, *::before, *::after { animation: none !important; }
    </style>
  `.trim(),
    )
}

Cypress.on('window:before:load', (cyWindow) => {
    disableAnimations(cyWindow)
})
