// --- TAB NAVIGATION ---
function switchTab(tabId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Remove active class from nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show target screen
    document.getElementById(`screen-${tabId}`).classList.add('active');

    // Set active nav button
    const activeBtn = document.querySelector(`.nav-btn[data-target="${tabId}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Init specific tab content if needed
    if (tabId === 'flashcards' && !flashcardsInitialized) initFlashcards();
    if (tabId === 'quiz' && !quizInitialized) initQuiz();
}

// --- GLOBAL PROGRESS ---
let progress = 0;
function updateProgress(amount) {
    progress = Math.min(100, progress + amount);
    document.getElementById('overall-progress').style.width = `${progress}%`;
    document.getElementById('progress-text').innerText = `${progress}%`;
}


// --- FLASHCARDS SYSTEM ---
const flashcardsData = [
    { front: "Chief Election Commissioner (CEC)", back: "The head of the Election Commission of India. Oversees national and state elections ensuring they are free and fair." },
    { front: "Delimitation", back: "The process of redrawing the boundaries of Lok Sabha and State Assembly constituencies based on the latest census." },
    { front: "Returning Officer (RO)", back: "The authority for a constituency responsible for receiving nominations and declaring election results." },
    { front: "Model Code of Conduct (MCC)", back: "Guidelines dictating how political parties and candidates must behave to ensure a level playing field, starting from election announcement." },
    { front: "Presiding Officer", back: "The official in charge of a specific polling station on election day, managing EVMs and maintaining order." },
    { front: "VVPAT", back: "Voter Verifiable Paper Audit Trail. A machine attached to the EVM that prints a paper slip to confirm the voter's choice." },
    { front: "Electoral Roll", back: "Also known as the voter list, it is a compiled list of all eligible voters in a constituency." },
    { front: "By-election", back: "An election held to fill a political office that has become vacant between regularly scheduled elections." },
    { front: "EVM", back: "Electronic Voting Machine. Used in Indian elections to record votes electronically instead of using paper ballots." },
    { front: "Universal Adult Suffrage", back: "The right of all adult citizens (18 years and above in India) to vote in elections, regardless of wealth, income, gender, social status, race, or ethnicity." }
];

let currentCardIndex = 0;
let flashcardsInitialized = false;

function initFlashcards() {
    renderCard();
    flashcardsInitialized = true;
    updateProgress(10);
}

function renderCard() {
    const container = document.getElementById('flashcard-container');
    const cardData = flashcardsData[currentCardIndex];

    container.innerHTML = `
        <div class="flashcard" onclick="this.classList.toggle('flipped')">
            <div class="card-face card-front">
                <h3>Term</h3>
                <p>${cardData.front}</p>
                <div class="card-hint">Tap to flip</div>
            </div>
            <div class="card-face card-back">
                <h3>Definition</h3>
                <p>${cardData.back}</p>
                <div class="card-hint">Tap to flip back</div>
            </div>
        </div>
    `;
    document.getElementById('card-counter').innerText = `${currentCardIndex + 1} / ${flashcardsData.length}`;
}

function nextCard() {
    if (currentCardIndex < flashcardsData.length - 1) {
        currentCardIndex++;
        renderCard();
    }
}

function prevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        renderCard();
    }
}


// --- QUIZ ENGINE ---
const quizData = [
    {
        question: "What is the minimum voting age for a citizen of India?",
        options: ["16 years", "18 years", "21 years", "25 years"],
        correct: 1,
        explanation: "The 61st Amendment Act (1988) lowered the voting age for elections to the Lok Sabha and Legislative Assemblies from 21 years to 18 years."
    },
    {
        question: "Which independent body is responsible for administering elections in India?",
        options: ["Supreme Court", "Parliament", "Election Commission of India", "Ministry of Home Affairs"],
        correct: 2,
        explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India."
    },
    {
        question: "What does 'NOTA' stand for on an electronic voting machine?",
        options: ["No Other To Allow", "None Of The Above", "Name Of The Applicant", "Non-Official Temporary Agent"],
        correct: 1,
        explanation: "NOTA allows voters to express their disapproval of all the candidates contesting the election."
    },
    {
        question: "Who appoints the Chief Election Commissioner of India?",
        options: ["Prime Minister", "Chief Justice of India", "President of India", "Parliament"],
        correct: 2,
        explanation: "The President of India appoints the Chief Election Commissioner and other Election Commissioners."
    },
    {
        question: "What is the maximum number of members in the Lok Sabha as per the Constitution?",
        options: ["543", "545", "550", "552"],
        correct: 3,
        explanation: "The maximum strength of the House envisaged by the Constitution is 552, which is made up by election of upto 530 members to represent the States, upto 20 members to represent the Union Territories and not more than two members of the Anglo-Indian Community to be nominated by the Hon'ble President."
    },
    {
        question: "Elections in India for Parliament and State Legislatures are conducted on the basis of:",
        options: ["Single Transferable Vote", "Proportional Representation", "Universal Adult Franchise", "Limited Suffrage"],
        correct: 2,
        explanation: "Article 326 of the Constitution provides that the elections to the House of the People and to the Legislative Assembly of every State shall be on the basis of adult suffrage."
    }
];

let currentQuizIndex = 0;
let quizInitialized = false;

function initQuiz() {
    renderQuiz();
    quizInitialized = true;
}

function renderQuiz() {
    if (currentQuizIndex >= quizData.length) {
        document.getElementById('quiz-container').innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: var(--secondary); font-size: 24px; margin-bottom: 10px;">Quiz Completed! 🎉</h3>
                <p>You have finished all questions.</p>
                <button class="btn btn-primary" style="margin-top:20px" onclick="currentQuizIndex=0; renderQuiz();">Restart Quiz</button>
            </div>
        `;
        updateProgress(20);
        return;
    }

    const q = quizData[currentQuizIndex];
    let optionsHtml = '';

    q.options.forEach((opt, index) => {
        optionsHtml += `<button class="option-btn" onclick="selectAnswer(${index})">${opt}</button>`;
    });

    document.getElementById('quiz-container').innerHTML = `
        <div class="quiz-question">Question ${currentQuizIndex + 1} of ${quizData.length}:<br><br>${q.question}</div>
        <div class="quiz-options" id="quiz-options">
            ${optionsHtml}
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
        <button class="btn btn-primary" id="next-quiz-btn" style="display:none; margin-top:20px; width:100%;" onclick="nextQuiz()">Next Question</button>
    `;
}

function selectAnswer(selectedIndex) {
    const q = quizData[currentQuizIndex];
    const options = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-quiz-btn');

    // Disable all options
    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (selectedIndex === q.correct) {
        options[selectedIndex].classList.add('correct');
        feedback.innerHTML = `<strong>Correct! ✅</strong><br>${q.explanation}`;
        updateProgress(5);
    } else {
        options[selectedIndex].classList.add('wrong');
        options[q.correct].classList.add('correct');
        feedback.innerHTML = `<strong>Incorrect ❌</strong><br>${q.explanation}`;
    }

    feedback.classList.add('show');
    nextBtn.style.display = 'block';
}

function nextQuiz() {
    currentQuizIndex++;
    renderQuiz();
}


// --- CHAT AI MOCK ---
function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const text = inputField.value.trim();
    if (!text) return;

    const chatMessages = document.getElementById('chat-messages');

    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerText = text;
    chatMessages.appendChild(userMsg);

    inputField.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate Bot response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.innerText = getMockBotResponse(text);
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function getMockBotResponse(input) {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('evm')) {
        return "EVM stands for Electronic Voting Machine. They were introduced to replace paper ballots, making counting faster and reducing electoral fraud.";
    } else if (lowerInput.includes('nota')) {
        return "NOTA means 'None Of The Above'. It gives you the option to reject all candidates in your constituency.";
    } else if (lowerInput.includes('age')) {
        return "The minimum voting age in India is 18 years, established by the 61st Amendment Act in 1988.";
    } else if (lowerInput.includes('process') || lowerInput.includes('steps')) {
        return "The Indian election process involves several key steps:\n1. Delimitation of constituencies\n2. Preparation of Electoral Rolls\n3. Announcement & Model Code of Conduct\n4. Filing Nominations\n5. Scrutiny & withdrawal\n6. Campaigning\n7. Polling Day\n8. Counting of Votes\n\nWhich step would you like to know more about?";
    } else if (lowerInput.includes('delimitation')) {
        return "Delimitation is the act of redrawing boundaries of Lok Sabha and State Assembly seats to represent changes in population. It is done by the Delimitation Commission.";
    } else if (lowerInput.includes('roll') || lowerInput.includes('list')) {
        return "The Electoral Roll is the voter list. It is updated before every election. You must be on this list to cast your vote.";
    } else if (lowerInput.includes('model code') || lowerInput.includes('mcc') || lowerInput.includes('announcement')) {
        return "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission for candidates and political parties to ensure free and fair elections.";
    } else if (lowerInput.includes('nomination')) {
        return "Candidates who wish to contest elections must file nomination papers with the Returning Officer along with a security deposit and an affidavit detailing their assets and criminal records.";
    } else if (lowerInput.includes('campaign')) {
        return "The official campaign period ends 48 hours before polling begins. During this time, parties hold rallies, distribute manifestos, and canvass for votes.";
    } else if (lowerInput.includes('polling')) {
        return "On Polling Day, voters go to their designated polling stations. They verify their identity and cast their vote securely using Electronic Voting Machines (EVMs).";
    } else if (lowerInput.includes('counting')) {
        return "Counting of votes is done under the supervision of the Returning Officer. The candidate with the highest number of valid votes in a constituency is declared the winner.";
    } else {
        return "That's a great question! I can explain the complete 'election process' or answer specific questions about 'EVM', 'NOTA', or 'voting age'. What would you like to know?";
    }
}

// Allow Enter key to send message
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
