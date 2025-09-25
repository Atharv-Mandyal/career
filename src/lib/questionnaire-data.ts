
export type Question = {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
};

export type Test = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export const tests: Test[] = [
  {
    id: "logical-reasoning",
    title: "Logical Reasoning",
    description: "Assess your problem-solving and critical thinking abilities through a series of puzzles and challenges.",
    questions: [
      {
        questionText: "Which number should come next in the series? 1, 2, 4, 8, 16, ?",
        options: ["24", "32", "30", "36"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
        options: ["Yes", "No", "Cannot be determined"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "A is the brother of B. B is the brother of C. C is the father of D. How is D related to A?",
        options: ["Brother", "Son", "Nephew/Niece", "Cannot be determined"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "If 'CAT' is coded as '3120', what is the code for 'DOG'?",
        options: ["4157", "4158", "4159", "4156"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "A man walks 5 km south and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?",
        options: ["West", "South", "North-East", "South-West"],
        correctAnswerIndex: 3,
      },
    ],
  },
  {
    id: "verbal-ability",
    title: "Verbal Ability",
    description: "Evaluate your language comprehension, vocabulary, and communication skills.",
    questions: [
      {
        questionText: "Which word is an antonym for 'benevolent'?",
        options: ["Kind", "Malevolent", "Generous", "Friendly"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "Choose the correct sentence: ",
        options: [
          "The dog wagged it's tail.",
          "The dog wagged its tail.",
          "The dogs wagged it's tail.",
          "The dogs wagged its' tail.",
        ],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is the synonym of 'ephemeral'?",
        options: ["Permanent", "Eternal", "Transient", "Long-lasting"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "Complete the analogy: Pen is to poet as ___ is to baker.",
        options: ["Oven", "Flour", "Bread", "Rolling pin"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Identify the figure of speech: 'The wind whispered through the trees.'",
        options: ["Metaphor", "Simile", "Personification", "Hyperbole"],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: "quantitative-aptitude",
    title: "Quantitative Aptitude",
    description: "Test your numerical ability and mathematical skills with our quantitative assessment.",
    questions: [
      {
        questionText: "What is 15% of 300?",
        options: ["45", "50", "30", "60"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "If a train travels at 60 km/h, how far will it travel in 2.5 hours?",
        options: ["120 km", "150 km", "180 km", "100 km"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "The sum of two numbers is 25 and their difference is 5. What are the numbers?",
        options: ["10 and 15", "12 and 13", "5 and 20", "8 and 17"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "What is the next prime number after 13?",
        options: ["15", "17", "19", "16"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "A box contains 5 red balls and 3 blue balls. What is the probability of picking a red ball?",
        options: ["3/8", "5/8", "1/2", "5/3"],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    id: "technical-skills-python",
    title: "Technical Skills: Python",
    description: "Measure your proficiency in Python programming with practical coding challenges.",
    questions: [
      {
        questionText: "What will be the output of the following code? `print(type([]))`",
        options: ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'set'>"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "Which of the following is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correctAnswerIndex: 1,
      },
      {
        questionText: "What is the correct way to write a single-line comment in Python?",
        options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->"],
        correctAnswerIndex: 2,
      },
      {
        questionText: "What does the `len()` function do?",
        options: ["Returns the number of items in an object", "Returns the largest value", "Converts to lowercase", "Sorts the list"],
        correctAnswerIndex: 0,
      },
      {
        questionText: "How do you create a dictionary in Python?",
        options: ["`{}` or `dict()`", "`[]` or `list()`", "`()` or `tuple()`", "`<>`"],
        correctAnswerIndex: 0,
      },
    ],
  },
];
