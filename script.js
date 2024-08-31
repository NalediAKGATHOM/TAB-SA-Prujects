document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded and running');

    // Contact Form Submission Alert
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            contactForm.innerHTML = '<p>Your message has been sent!</p>';
        });
    }

    // Search Bar Input Event Listener
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (event) => {
            const query = event.target.value;
            console.log('Search query:', query);
            // Implement search or filter functionality here
        });
    }

    // Initialize Slick Carousel
    if (typeof $ !== 'undefined' && $('.gallery-carousel').length) {
        $('.gallery-carousel').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
            ]
        });
    }

    // General Function to Setup Quiz
    function setupQuiz({ formId, questions, resultDivId, submitBtnId }) {
        const quizForm = document.getElementById(formId);
        const resultDiv = document.getElementById(resultDivId);
        const submitBtn = document.getElementById(submitBtnId);

        if (quizForm && submitBtn) {
            quizForm.innerHTML = questions.map((q, index) => `
                <div class="question">
                    <p>${index + 1}. ${q.question}</p>
                    ${q.answers.map((a, i) => `
                        <label>
                            <input type="radio" name="${formId}-q${index}" value="${i}" />
                            ${a}
                        </label>
                    `).join('')}
                </div>
            `).join('');

            submitBtn.addEventListener('click', (event) => {
                event.preventDefault();
                const score = questions.reduce((acc, q, index) => {
                    const selectedAnswer = document.querySelector(`input[name="${formId}-q${index}"]:checked`);
                    return acc + (selectedAnswer && parseInt(selectedAnswer.value) === q.correct ? 1 : 0);
                }, 0);

                resultDiv.textContent = score < questions.length / 2
                    ? "Now you see why you need TABSA to help you. We are the future of this country, especially during loadshedding stages in South Africa."
                    : "You are the best and have gained more knowledge about solar panels!";
            });
        } else {
            console.error(`Quiz form (${formId}) or submit button (${submitBtnId}) not found.`);
        }
    }

    // Define Quiz Questions
    const solarQuizQuestions = [
        { question: "Why is solar installation important during loadshedding?", answers: ["It provides a reliable power source when the grid is down.", "It increases electricity bills.", "It requires no maintenance.", "It is a temporary solution."], correct: 0 },
        { question: "What is one benefit of using solar panels in South Africa?", answers: ["Reduces dependency on the national grid.", "Requires frequent battery replacements.", "Increases energy costs.", "Is not environmentally friendly."], correct: 0 }
    ];

    const generalQuizQuestions = [
        { question: "What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
        { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
        { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 1 },
        { question: "Who wrote 'To Kill a Mockingbird'?", answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "J.K. Rowling"], correct: 0 }
    ];

    // Setup Quizzes
    setupQuiz({ formId: 'solar-quiz-form', questions: solarQuizQuestions, resultDivId: 'solar-quiz-result', submitBtnId: 'solar-quiz-submit-btn' });
    setupQuiz({ formId: 'general-quiz-form', questions: generalQuizQuestions, resultDivId: 'general-quiz-result', submitBtnId: 'general-quiz-submit-btn' });

    // Handle 10 Questions Quiz Submission
    function handleQuizSubmission(formId, correctAnswersArray, resultDivId, submitBtnId) {
        const quizForm = document.getElementById(formId);
        const resultDiv = document.getElementById(resultDivId);
        const submitBtn = document.getElementById(submitBtnId);

        if (quizForm && resultDiv && submitBtn) {
            submitBtn.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default form submission

                const totalQuestions = correctAnswersArray.length;
                let correctAnswersCount = 0;

                for (let i = 1; i <= totalQuestions; i++) {
                    const userAnswer = document.querySelector(`input[name="q${i}"]:checked`);
                    if (userAnswer && userAnswer.value === correctAnswersArray[i - 1]) {
                        correctAnswersCount++;
                    }
                }

                resultDiv.innerHTML = `
                    <div class="${correctAnswersCount === totalQuestions ? 'winner' : 'loser'}">
                        <div class="message">
                            ${correctAnswersCount === totalQuestions ? 'Congratulations! You won the quiz!' : 'Sorry, you lost. Better luck next time!'}
                        </div>
                    </div>
                    Your score is ${correctAnswersCount} out of ${totalQuestions}.
                `;
            });
        } else {
            console.error(`Quiz form (${formId}), result div (${resultDivId}), or submit button (${submitBtnId}) not found.`);
        }
    }

    // Define correct answers for the 10 Questions Quiz
    const correctAnswersArray = [
        'a', 'a', 'a', 'b', 'b', 'a', 'a', 'a', 'a', 'a' // Adjust as per correct answers
    ];

    handleQuizSubmission('quiz-form', correctAnswersArray, 'quiz-result', 'submit-quiz');

    // Open Chatbot Function (Placeholder)
    function openChatbot() {
        alert('Chatbot functionality is not yet implemented.');
    }
});










