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

var TOP_DOWN = [
  {
    title: "What subject are you discussing?",
    fieldName: 'discussed_subject',
    hint: "e.g. q4 new expansion plans"
  },
  {
    title: "What question are you answering in your reader's mind?",
    fieldName: 'question_in_reader_mind',
    hint: "e.g. which age segment should we market our diapers to?"
  },
  {
    title: "What's the answer?",
    fieldName: 'answer',
    hint: ""
  },
];


var SCQA_PROMPTS = [
  {
    title: "What are the uncontroversial, unambiguous, and relevant facts?",
    fieldName: 'situation',
    hint: "e.g. watches are critical to our growth. 15% of sales. gateway to jewelry and shoes.",
    multiline: true
  },
  {
    title: "What change must we respond to?",
    fieldName: 'complication',
    hint: "e.g. repeat purchases are 10% since last month."
  },
  {
    title: "What's the key question in the reader's mind?",
    fieldName: 'question',
    hint: "e.g. How do we respond to this 10% drop?"
  },
  {
    title: "What's the answer?",
    fieldName: 'answer',
    hint: "e.g. Test (1) Increase cross-marketing and (2) price-promo to lapsed buyers."
  },
];


/**
 * Build a card to prompt the user for SCQA structure
 *
 * @return {Card}
 */
function buildSCQAPromptsCard() {

  var card = CardService.newCardBuilder();
  var cardSection = CardService.newCardSection().setHeader('SCQA');
  for (var i=0; i < SCQA_PROMPTS.length; i++) {
    var prompt = SCQA_PROMPTS[i];
    cardSection.addWidget(
      CardService.newTextInput()
        .setTitle(prompt.title)
        .setFieldName(prompt.fieldName)
        .setHint(prompt.hint)
        .setMultiline(!!prompt.multiline)
    );
  }

  cardSection.addWidget(
    CardService.newTextButton()
      .setText('insert into email')
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName('insertSCQAToEmail')
      )
  );

  return card.addSection(cardSection).build();
}


function formatEmail(formInput) {
  return "" + formInput.situation + '<br/><br/><br/>'
    + formInput.complication + '<br/><br/>'
    + formInput.question + '<br/><br/>'
    + formInput.answer;
}

/**
 * inserts the SCQA into the body of the email.
 *
 * @param {event} e The incoming event object.
 * @return {UpdateDraftActionResponse}
 */
function insertSCQAToEmail(e) {
  var response = CardService.newUpdateDraftActionResponseBuilder()
      .setUpdateDraftBodyAction(
        CardService.newUpdateDraftBodyAction()
          .addUpdateContent(
            formatEmail(e.formInput),
            CardService.ContentType.MUTABLE_HTML)
          .setUpdateType(
            CardService.UpdateDraftBodyType.IN_PLACE_INSERT))
      .build();
  return response;
}
