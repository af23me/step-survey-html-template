const name = document.getElementById('name');
const phone = document.getElementById('phone');
const introContainer = document.getElementById('introContainer');
const surveyContainer = document.getElementById('surveyContainer');
const finishContainer = document.getElementById('finishContainer');
const surveyQuestion = document.getElementById('surveyQuestion');
const questionsList = document.getElementById('questionsList');
const startSurveyButton = document.getElementById('startSurvey');
const nextQuestionButton = document.getElementById('nextQuestion');
const errorContainer = document.getElementById('errorContainer');

// incoming survey data
const surveyQuestionsData = [
  {
    description: "How often you use such surveys?",
    answers: [
      "Often",
      "Not really"
    ]
  },
  {
    description: "Please tell your expirience using this form",
    answers: [
      "Really cool",
      "Should be improved"
    ]
  }
];

let surveyQuestionIndex = 0;

// ourput survey structure
const surveyOutput = {
  name: null,
  phone: null,
  answers: {}
};

startSurveyButton.addEventListener('click', (e) => {
  // validate user data
  if (name.value === "" || phone.value === "") {
    touchErrorContainer(["Please validate your form for empty fields."]);
    return;
  }

  // fill user data
  surveyOutput['name'] = name.value;
  surveyOutput['phone'] = phone.value;
  introContainer.style.display = 'none';
  surveyContainer.style.display = 'block';
  printNextQuestion(0);
});

nextQuestionButton.addEventListener('click', (e) => {
  saveAnswerAndPrintNextQuestion();
});

const saveAnswerAndPrintNextQuestion = () => {
  const questionNumber = surveyQuestionIndex + 1;
  const isLastQuestion = questionNumber === surveyQuestionsData.length;
  const question = surveyQuestionsData[surveyQuestionIndex];
  const answerItem = document.querySelector('input[name="answer"]:checked');

  // validate user data
  if (answerItem === null) {
    touchErrorContainer(["Please choose answer from the list."]);
    return false;
  }

  // save result
  surveyOutput['answers'][questionNumber] = question.answers[answerItem.value];

  touchErrorContainer([]);

  if (isLastQuestion) {
    surveyContainer.style.display = 'none';
    finishContainer.style.display = 'block';
    console.log(surveyOutput);
  } else {
    printNextQuestion(questionNumber);
  }
};

const printNextQuestion = (questionIndex) => {

  const question = surveyQuestionsData[questionIndex];

  // prepare next question data
  const questionsString = question.answers
  .map((answer, index) => {
      return `<label class="answer-item"><input type="radio" name="answer" value="${index}"><span>${answer}</span></label>`;
  })
  .join('');

  questionsList.innerHTML = questionsString;
  surveyQuestion.innerHTML = question.description;

  surveyQuestionIndex = questionIndex;
};

const touchErrorContainer = (errorData) => {

  // prepare error data
  const errorString = errorData
  .map((item) => {
      return `<li>${item}</li>`;
  })
  .join('');

  errorContainer.innerHTML = errorString;
};

