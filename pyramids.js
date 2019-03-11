/**
 * Compose trigger function that fires when the compose action is
 * selected. Builds and returns a compose UI for inserting images.
 *
 * @param {event} e The compose trigger event object. Not used in
 *         this example.
 * @return {Card[]}
 */
function getSCQAPromptsUI(e) {
  return [buildSCQAPromptsCard()];
}

/**
 * Build a card to display images from a third-party source.
 *
 * @return {Card}
 */
function buildSCQAPromptsCard() {
  // Get a list of image URLs to display in the UI.
  // This function is not shown in this example.

  var card = CardService.newCardBuilder();
  var cardSection = CardService.newCardSection().setHeader('SCQA');
  cardSection.addWidget(
    CardService.newTextInput()
      .setTitle("What subject are you discussing?")
      .setFieldName('1_discussed_subject')
      .setHint("e.g. q4 new expansion plans")
  );

  cardSection.addWidget(
    CardService.newTextButton()
      .setText('insert as email')
      .setOnClickAction(CardService.newAction()
                        .setFunctionName('insertSCQAToEmail'))
  );


  return card.addSection(cardSection).build();
}

/**
 * Adds an image to the current draft email when the image is clicked
 * in the compose UI. The image is inserted at the current cursor
 * location. If any content of the email draft is currently selected,
 * it is deleted and replaced with the image.
 *
 * Note: this is not the compose action, but rather an action taken
 * when the user interacts with the compose action's corresponding UI.
 *
 * @param {event} e The incoming event object.
 * @return {UpdateDraftActionResponse}
 */
function insertSCQAToEmail(e) {
  var imageUrl = e.parameters.url;
  var response = CardService.newUpdateDraftActionResponseBuilder()
      .setUpdateDraftBodyAction(
        CardService.newUpdateDraftBodyAction()
          .addUpdateContent(
            imageHtmlContent,
            CardService.ContentType.HTML)
          .setUpdateType(
            CardService.UpdateDraftBodyType.IN_PLACE_INSERT))
      .build();
  return response;
}
