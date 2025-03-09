// Flashcard data
const aiFlashcards = [
    {
      question: "What is artificial intelligence (AI)?",
      answer: "The capability of computational systems to perform tasks typically associated with human intelligence, such as learning, reasoning, problem-solving, perception, and decision-making.",
      id: 0
    },
    {
      question: "What are some high-profile applications of AI?",
      answer: "Advanced web search engines (Google Search), recommendation systems (YouTube, Amazon, Netflix), virtual assistants (Google Assistant, Siri, Alexa), autonomous vehicles (Waymo), generative tools (ChatGPT, AI art), and superhuman game play (chess, Go).",
      id: 1
    },
    {
      question: "What are the traditional goals/subfields of AI research?",
      answer: "Learning, reasoning, knowledge representation, planning, natural language processing, perception, and support for robotics. Artificial general intelligence is among the field's long-term goals.",
      id: 2
    },
    {
      question: "When and where was AI founded as an academic discipline?",
      answer: "AI was founded at a workshop at Dartmouth College in 1956, where the leaders of AI research in the 1960s gathered and established the field.",
      id: 3
    },
    {
      question: "What are \"AI winters\"?",
      answer: "Periods of disappointment and loss of funding that followed cycles of optimism throughout AI's history. Major AI winters occurred after 1974 when governments cut funding, and again in the late 1980s after the collapse of the Lisp Machine market.",
      id: 4
    },
    {
      question: "What is machine learning?",
      answer: "The study of programs that can improve their performance on a given task automatically. Major types include supervised learning, unsupervised learning, reinforcement learning, and deep learning.",
      id: 5
    },
    {
      question: "What is deep learning and when did it become dominant?",
      answer: "Deep learning uses multiple layers of artificial neurons to progressively extract higher-level features from raw input. It began to dominate AI research and industry benchmarks in 2012.",
      id: 6
    },
    {
      question: "What is knowledge representation in AI?",
      answer: "The field concerned with how to formally represent knowledge in a form that a computer system can utilize. It includes ontologies, knowledge bases, and methods to represent objects, properties, and relations.",
      id: 7
    },
    {
      question: "What is Natural Language Processing (NLP)?",
      answer: "The field that allows programs to read, write, and communicate in human languages. It includes speech recognition, machine translation, information extraction, and more recently, large language models like GPT.",
      id: 8
    },
    {
      question: "What are GPT models?",
      answer: "Large language models that generate text based on semantic relationships between words. They are pretrained on large text corpora and can generate human-like text by predicting the next token.",
      id: 9
    },
    {
      question: "What is an artificial neural network?",
      answer: "A collection of interconnected nodes or artificial neurons loosely modeling the neurons in a biological brain. They learn to model complex relationships between inputs and outputs and find patterns in data.",
      id: 10
    },
    {
      question: "What is algorithmic bias in AI systems?",
      answer: "When AI systems make unfair or discriminatory decisions because they have learned from biased data. This can cause harm in applications like medicine, finance, recruitment, and policing.",
      id: 11
    },
    {
      question: "What is the transparency problem in AI?",
      answer: "Many AI systems are so complex that their designers cannot explain how they reach decisions. This \"black box\" problem makes it difficult to verify if a program is operating correctly.",
      id: 12
    },
    {
      question: "What privacy concerns are associated with AI?",
      answer: "AI requires large amounts of data, raising concerns about surveillance and unauthorized access. AI-powered devices continuously collect personal information including online activity, geolocation, video, and audio.",
      id: 13
    },
    {
      question: "Why do some experts consider AI an existential risk?",
      answer: "Some experts argue that superintelligent AI could become so powerful that humanity might irreversibly lose control of it. Even without human-like sentience, an AI might choose actions harmful to humanity.",
      id: 14
    },
    {
      question: "What is AI safety research?",
      answer: "The field focused on ensuring that artificial intelligence systems remain safe and beneficial to humans. It includes developing systems that are aligned with human values and can explain their decisions.",
      id: 15
    },
    {
      question: "How is AI used in healthcare?",
      answer: "AI is used for diagnosis and treatment, processing medical imaging, integrating big data, drug discovery, understanding protein structures, and accelerating research in fields like finding treatments for diseases.",
      id: 16
    },
    {
      question: "How might AI affect employment?",
      answer: "Unlike previous automation, AI may affect many middle-class and white-collar jobs. Estimates of job displacement vary widely, from 9% to 47% of jobs at \"high risk\" of automation.",
      id: 17
    },
    {
      question: "What is Artificial General Intelligence (AGI)?",
      answer: "The hypothetical ability of an AI system to understand, learn, and apply knowledge across a wide range of tasks at a level equal to or exceeding human capabilities.",
      id: 18
    },
    {
      question: "How is AI being regulated globally?",
      answer: "AI regulation is rapidly expanding, with many countries adopting dedicated AI strategies. International efforts include the Global Partnership on Artificial Intelligence, the AI Safety Summit, and the UN's advisory body on AI governance.",
      id: 19
    }
  ];
  
  // State variables
  let flashcards = [...aiFlashcards];
  let currentCardIndex = 0;
  let showAnswer = false;
  let shuffleMode = false;
  let studyMode = 'all'; // 'all', 'marked', 'unmarked'
  let markedCards = {};
  
  // DOM elements
  const flashcardElement = document.getElementById('flashcard');
  const questionContainer = document.getElementById('question-container');
  const answerContainer = document.getElementById('answer-container');
  const questionElement = document.getElementById('question');
  const answerElement = document.getElementById('answer');
  const currentCardElement = document.getElementById('current-card');
  const totalCardsElement = document.getElementById('total-cards');
  const markedCountElement = document.getElementById('marked-count');
  const remainingCountElement = document.getElementById('remaining-count');
  const markButton = document.getElementById('mark');
  
  // Button elements
  const allCardsButton = document.getElementById('all-cards');
  const markedOnlyButton = document.getElementById('marked-only');
  const unmarkedOnlyButton = document.getElementById('unmarked-only');
  const shuffleButton = document.getElementById('shuffle');
  const resetButton = document.getElementById('reset');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  
  // Initialize the app
  function init() {
    updateStats();
    displayCard();
    
    // Add event listeners
    flashcardElement.addEventListener('click', flipCard);
    prevButton.addEventListener('click', goToPrevCard);
    nextButton.addEventListener('click', goToNextCard);
    markButton.addEventListener('click', toggleMarked);
    
    allCardsButton.addEventListener('click', () => changeStudyMode('all'));
    markedOnlyButton.addEventListener('click', () => changeStudyMode('marked'));
    unmarkedOnlyButton.addEventListener('click', () => changeStudyMode('unmarked'));
    
    shuffleButton.addEventListener('click', toggleShuffle);
    resetButton.addEventListener('click', resetProgress);
  }
  
  // Display the current card
  function displayCard() {
    const filteredCards = getFilteredCards();
    if (filteredCards.length === 0) {
      questionElement.textContent = 'No cards available in this mode';
      answerElement.textContent = '';
      updateStats();
      return;
    }
    
    // Ensure the current index is valid
    if (currentCardIndex >= filteredCards.length) {
      currentCardIndex = 0;
    }
    
    const currentCard = filteredCards[currentCardIndex];
    
    // Update the card content
    questionElement.textContent = currentCard.question;
    answerElement.textContent = currentCard.answer;
    
    // Show question, hide answer
    showAnswer = false;
    questionContainer.classList.add('visible');
    questionContainer.classList.remove('hidden');
    answerContainer.classList.add('hidden');
    answerContainer.classList.remove('visible');
    flashcardElement.classList.remove('flipped');
    
    // Update counter display
    currentCardElement.textContent = currentCardIndex + 1;
    totalCardsElement.textContent = filteredCards.length;
    
    // Update mark button
    if (markedCards[currentCard.id]) {
      markButton.classList.add('marked');
      markButton.textContent = 'Unmark Card';
    } else {
      markButton.classList.remove('marked');
      markButton.textContent = 'Mark Card';
    }
  }
  
  // Flip the card
  function flipCard() {
    showAnswer = !showAnswer;
    
    if (showAnswer) {
      questionContainer.classList.remove('visible');
      questionContainer.classList.add('hidden');
      answerContainer.classList.remove('hidden');
      answerContainer.classList.add('visible');
      flashcardElement.classList.add('flipped');
    } else {
      questionContainer.classList.add('visible');
      questionContainer.classList.remove('hidden');
      answerContainer.classList.add('hidden');
      answerContainer.classList.remove('visible');
      flashcardElement.classList.remove('flipped');
    }
  }
  
  // Go to next card
  function goToNextCard() {
    const filteredCards = getFilteredCards();
    if (filteredCards.length === 0) return;
    
    if (currentCardIndex < filteredCards.length - 1) {
      currentCardIndex++;
    } else {
      currentCardIndex = 0;
    }
    
    displayCard();
  }
  
  // Go to previous card
  function goToPrevCard() {
    const filteredCards = getFilteredCards();
    if (filteredCards.length === 0) return;
    
    if (currentCardIndex > 0) {
      currentCardIndex--;
    } else {
      currentCardIndex = filteredCards.length - 1;
    }
    
    displayCard();
  }
  
  // Toggle card marked state
  function toggleMarked() {
    const filteredCards = getFilteredCards();
    if (filteredCards.length === 0) return;
    
    const currentCard = filteredCards[currentCardIndex];
    markedCards[currentCard.id] = !markedCards[currentCard.id];
    
    displayCard();
    updateStats();
  }
  
  // Change study mode
  function changeStudyMode(mode) {
    // Remove active class from all mode buttons
    allCardsButton.classList.remove('active');
    markedOnlyButton.classList.remove('active');
    unmarkedOnlyButton.classList.remove('active');
    
    studyMode = mode;
    currentCardIndex = 0;
    
    // Add active class to selected button
    if (mode === 'all') {
      allCardsButton.classList.add('active');
    } else if (mode === 'marked') {
      markedOnlyButton.classList.add('active');
    } else if (mode === 'unmarked') {
      unmarkedOnlyButton.classList.add('active');
    }
    
    displayCard();
  }
  
  // Toggle shuffle mode
  function toggleShuffle() {
    shuffleMode = !shuffleMode;
    
    if (shuffleMode) {
      shuffleButton.classList.add('active');
      shuffleButton.textContent = 'Sequential';
    } else {
      shuffleButton.classList.remove('active');
      shuffleButton.textContent = 'Shuffle';
    }
    
    currentCardIndex = 0;
    displayCard();
  }
  
  // Reset progress
  function resetProgress() {
    markedCards = {};
    currentCardIndex = 0;
    displayCard();
    updateStats();
  }
  
  // Get filtered cards based on study mode and shuffle setting
  function getFilteredCards() {
    // Filter by study mode
    let filtered = [...flashcards];
    
    if (studyMode === 'marked') {
      filtered = filtered.filter(card => markedCards[card.id]);
    } else if (studyMode === 'unmarked') {
      filtered = filtered.filter(card => !markedCards[card.id]);
    }
    
    // Apply shuffle if needed
    if (shuffleMode) {
      // Fisher-Yates shuffle algorithm
      const shuffled = [...filtered];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    return filtered;
  }
  
  // Update statistics
  function updateStats() {
    const markedCount = Object.values(markedCards).filter(Boolean).length;
    
    markedCountElement.textContent = markedCount;
    remainingCountElement.textContent = flashcards.length - markedCount;
  }
  
  // Initialize the app when the page loads
  window.addEventListener('DOMContentLoaded', init);