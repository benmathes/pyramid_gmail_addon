// [START apps_script_gmail_quick_start]
/**
 * Returns the array of cards that should be rendered for the current
 * e-mail thread. The name of this function is specified in the
 * manifest 'onTriggerFunction' field, indicating that this function
 * runs every time the add-on is started.
 *
 * @param {Object} e The data provided by the Gmail UI.
 * @return {Card[]}
 */
function interactivePyramid(e) {
  // Activate temporary Gmail add-on scopes.
  var accessToken = e.messageMetadata.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  var messageId = e.messageMetadata.messageId;
  var message = GmailApp.getMessageById(messageId);

  // old sample code.
  //// Get user and thread labels as arrays to enable quick sorting and indexing.
  //var threadLabels = message.getThread().getLabels();
  //var labels = getLabelArray(GmailApp.getUserLabels());
  //var labelsInUse = getLabelArray(threadLabels);
  //
  //// Create a section for that contains all user Labels.
  //
  //// Construct the Minto Question form:
  //
  //
  //// Create a checkbox group for user labels that are added to prior section.
  //var checkboxGroup = CardService.newSelectionInput()
  //  .setType(CardService.SelectionInputType.CHECK_BOX)
  //  .setFieldName('labels')
  //  .setOnChangeAction(CardService.newAction().setFunctionName('toggleLabel'));
  //
  //// Add checkbox with name and selected value for each User Label.
  //for(var i = 0; i < labels.length; i++) {
  //  checkboxGroup.addItem(labels[i], labels[i], labelsInUse.indexOf(labels[i])!= -1);
  //}
  //
  //// Add the checkbox group to the section.
  //section.addWidget(checkboxGroup);


  var promptSection = CardService.newCardSection();

  // Build the main card after adding the section.
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader())
    .setTitle('SCQA Builder')
    .addSection(promptSection)
    .build();

  return [card];
}

/**
 * Updates the labels on the current thread based on
 * user selections. Runs via the OnChangeAction for
 * each CHECK_BOX created.
 *
 * @param {Object} e The data provided by the Gmail UI.
*/
function toggleLabel(e){
  //var selected = e.formInputs.labels;
  //
  //// Activate temporary Gmail add-on scopes.
  //var accessToken = e.messageMetadata.accessToken;
  //GmailApp.setCurrentMessageAccessToken(accessToken);
  //
  //var messageId = e.messageMetadata.messageId;
  //var message = GmailApp.getMessageById(messageId);
  //var thread = message.getThread();
  //
  //if (selected != null){
  //   for each (var label in GmailApp.getUserLabels()) {
  //     if(selected.indexOf(label.getName()) != -1){
  //        thread.addLabel(label);
  //     }
  //     else {
  //       thread.removeLabel(label);
  //     }
  //   }
  //}
  //else {
  //  for each (var label in GmailApp.getUserLabels()) {
  //    thread.removeLabel(label);
  //  }
  //}
}

/**
 * Converts an GmailLabel object to a array of strings.
 * Used for easy sorting and to determine if a value exists.
 *
 * @param {labelsObjects} A GmailLabel object array.
 * @return {lables[]} An array of labels names as strings.
*/
function getLabelArray(labelsObjects){
  var labels = [];
  for(var i = 0; i < labelsObjects.length; i++) {
    labels[i] = labelsObjects[i].getName();
  }
  labels.sort();
  return labels;
}

// [END apps_script_gmail_quick_start]
