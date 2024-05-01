# ErPriority

ErPriority is an application for sorting patients in the emergency department. It uses Angular v.16 for its user interface and strives to meet the design principles of the Google Material Design. ErPriority is still under development and not yet feature-complete. However, the following things are already working:

  * Loging In and Loging Out functionality.
  * Viewing a list of patients.
  * Adding patietns, editing patients, adding triage, editing triage, deleting patients (it only sends HTTP requests, but doesn't change the actual state of the application. I'm currently working on this).
  * Searching for patients using first name, second name or ID number commonly known as PESEL in Poland.

# Installation Instructions

In order to make it work as expected please install Wiremock. Use the following command `npx wiremock`. To launch project locally use `ng serve` command and don't forget to run Wiremock by writting thie command `npm run start-wiremock`.
