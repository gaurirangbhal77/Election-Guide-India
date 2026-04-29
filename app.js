/**
 * Election Guide India - Core Application Logic
 * Managed by ElectionApp object for better organization and security.
 */

/**
 * @fileoverview ElectionApp - A secure, accessible, and high-performance 
 * educational application for the Indian Electoral process.
 * @version 2.0.0
 */

const ElectionApp = {
    /**
     * @namespace state
     * @description Application state management.
     */
    state: {
        progress: 0,
        currentCardIndex: 0,
        currentQuizIndex: 0,
        flashcardsInitialized: false,
        quizInitialized: false,
        activeTab: 'home'
    },

    /**
     * @namespace data
     * @description Static content for flashcards, quizzes, and chat responses.
     */
    data: {
        flashcards: [
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
        ],
        quiz: [
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
                explanation: "The maximum strength of the House envisaged by the Constitution is 552."
            },
            {
                question: "Elections in India for Parliament and State Legislatures are conducted on the basis of:",
                options: ["Single Transferable Vote", "Proportional Representation", "Universal Adult Franchise", "Limited Suffrage"],
                correct: 2,
                explanation: "Article 326 of the Constitution provides that the elections shall be on the basis of adult suffrage."
            }
        ],
        responses: {
            'evm': "EVM stands for Electronic Voting Machine. They were introduced to replace paper ballots, making counting faster and reducing electoral fraud. They are robust, standalone machines not connected to any network.",
            'nota': "NOTA means 'None Of The Above'. It gives you the option to reject all candidates in your constituency, allowing you to participate in democracy even if you don't support any candidate.",
            'age': "The minimum voting age in India is 18 years, established by the 61st Amendment Act in 1988. Any citizen aged 18 or above can enroll in the electoral roll.",
            'process': "The Indian election process is a journey: 1. Delimitation (setting boundaries), 2. Electoral Rolls (voter lists), 3. Announcement & MCC, 4. Nominations, 5. Scrutiny, 6. Campaigning, 7. Polling, 8. Counting and Results. Which step would you like me to explain in detail?",
            'delimitation': "Delimitation is the act of redrawing boundaries of Lok Sabha and State Assembly seats based on population, handled by the Delimitation Commission.",
            'mcc': "The Model Code of Conduct (MCC) is a set of guidelines by ECI to ensure free and fair elections, preventing the ruling party from gaining unfair advantages.",
            'nomination': "Candidates must file their nomination papers with a Returning Officer (RO). They must provide an affidavit disclosing assets, educational qualifications, and criminal records (if any).",
            'scrutiny': "The Returning Officer checks the nomination papers for validity. Candidates whose papers are found incorrect or incomplete are disqualified.",
            'campaigning': "Candidates get time to reach voters. This ends 48 hours before the polling day, which is known as the 'silence period'.",
            'polling': "On Polling Day, voters go to designated stations to cast their vote securely using EVMs and verify their vote via VVPAT.",
            'counting': "Counting of votes is done at centralized centers under strict security. The VVPAT slips can be verified against the EVM count if needed.",
            'results': "Once counting is finished, the Returning Officer declares the winner and submits the result to the Election Commission of India."
        }
    },

    /**
     * @property {Object} el
     * @description Cache for DOM elements to optimize lookups.
     */
    el: {},

    /**
     * Initializes the application.
     * @public
     */
    init() {
        try {
            this.cacheElements();
            this.loadProgress();
            this.bindEvents();
            this.updateProgressBar(0);
            console.info("ElectionApp: Version 2.0.0 initialized successfully.");
        } catch (error) {
            console.error("ElectionApp: Initialization failed:", error);
        }
    },

    /**
     * Sanitizes input strings to prevent XSS.
     * @param {string} str - The raw input string.
     * @returns {string} The sanitized string.
     * @private
     */
    sanitize(str) {
        if (typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * Persists application state to localStorage.
     * @private
     */
    saveProgress() {
        const stateToSave = {
            progress: this.state.progress,
            currentCardIndex: this.state.currentCardIndex,
            currentQuizIndex: this.state.currentQuizIndex
        };
        localStorage.setItem('election_app_progress', JSON.stringify(stateToSave));
    },

    /**
     * Loads application state from localStorage.
     * @private
     */
    loadProgress() {
        const saved = localStorage.getItem('election_app_progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.state.progress = parsed.progress || 0;
                this.state.currentCardIndex = parsed.currentCardIndex || 0;
                this.state.currentQuizIndex = parsed.currentQuizIndex || 0;
            } catch (e) {
                console.warn("ElectionApp: Failed to parse saved progress.");
            }
        }
    },

    /**
     * Caches DOM elements into the 'el' property.
     * @private
     * @throws {Error} If critical elements are missing.
     */
    cacheElements() {
        this.el = {
            screens: document.querySelectorAll('.screen'),
            navBtns: document.querySelectorAll('.nav-btn'),
            actionCards: document.querySelectorAll('.action-card'),
            progressWrapper: document.getElementById('progress-wrapper'),
            progressBar: document.getElementById('overall-progress'),
            progressText: document.getElementById('progress-text'),
            flashcardContainer: document.getElementById('flashcard-container'),
            cardCounter: document.getElementById('card-counter'),
            prevCardBtn: document.getElementById('prev-card-btn'),
            nextCardBtn: document.getElementById('next-card-btn'),
            quizContainer: document.getElementById('quiz-container'),
            chatMessages: document.getElementById('chat-messages'),
            chatInput: document.getElementById('chat-input'),
            sendChatBtn: document.getElementById('send-chat-btn')
        };

        // Validation for critical UI components
        if (!this.el.progressWrapper || !this.el.quizContainer) {
            throw new Error("Critical UI elements missing from DOM.");
        }
    },

    /**
     * Binds event listeners to interactive elements.
     * @private
     */
    bindEvents() {
        // Core Navigation
        this.el.navBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.target));
        });

        // Home Screen Shortcuts
        this.el.actionCards.forEach(card => {
            card.addEventListener('click', () => this.switchTab(card.dataset.nav));
        });

        // Flashcard Controls
        if (this.el.prevCardBtn) {
            this.el.prevCardBtn.addEventListener('click', () => this.prevCard());
        }
        if (this.el.nextCardBtn) {
            this.el.nextCardBtn.addEventListener('click', () => this.nextCard());
        }

        // Chat Interaction
        if (this.el.sendChatBtn) {
            this.el.sendChatBtn.addEventListener('click', () => this.sendMessage());
        }
        if (this.el.chatInput) {
            this.el.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    },

    /**
     * Switches between application screens.
     * @param {string} tabId - The ID of the screen to activate.
     */
    switchTab(tabId) {
        try {
            if (!tabId || typeof tabId !== 'string') return;

            // Reset UI states
            this.el.screens.forEach(screen => screen.classList.remove('active'));

            // Update navigation UI
            this.el.navBtns.forEach(btn => {
                const isActive = btn.dataset.target === tabId;
                btn.classList.toggle('active', isActive);
                if (isActive) {
                    btn.setAttribute('aria-current', 'page');
                } else {
                    btn.removeAttribute('aria-current');
                }
            });

            // Activate target screen
            const targetScreen = document.getElementById(`screen-${tabId}`);
            if (targetScreen) {
                targetScreen.classList.add('active');
                this.state.activeTab = tabId;

                // Manage focus for accessibility - ensured target is focusable
                targetScreen.setAttribute('tabindex', '-1');
                requestAnimationFrame(() => targetScreen.focus());
            }

            // Lazy initialization of heavy modules
            if (tabId === 'flashcards' && !this.state.flashcardsInitialized) this.initFlashcards();
            if (tabId === 'quiz' && !this.state.quizInitialized) this.initQuiz();
        } catch (error) {
            console.error("ElectionApp: Error during tab switch:", error);
        }
    },

    /**
     * Updates the application-wide progress indicator.
     * @param {number} amount - Percentage amount to increment.
     */
    updateProgressBar(amount) {
        try {
            const val = typeof amount === 'number' ? amount : 0;
            this.state.progress = Math.min(100, Math.max(0, this.state.progress + val));

            const { progressBar, progressWrapper, progressText } = this.el;

            if (progressBar) progressBar.style.width = `${this.state.progress}%`;
            if (progressWrapper) progressWrapper.setAttribute('aria-valuenow', this.state.progress.toString());
            if (progressText) progressText.textContent = `${this.state.progress}%`;

            this.saveProgress();
        } catch (error) {
            console.warn("ElectionApp: Progress update failed.");
        }
    },

    /**
     * Initializes the flashcard module.
     * @private
     */
    initFlashcards() {
        this.renderCard();
        this.state.flashcardsInitialized = true;
        this.updateProgressBar(10);
    },

    /**
     * Renders the current flashcard to the DOM.
     * @private
     */
    renderCard() {
        const { flashcardContainer, cardCounter } = this.el;
        if (!flashcardContainer) return;

        // Data Validation & Fallback UI
        const cardData = this.data.flashcards[this.state.currentCardIndex];
        if (!cardData || !cardData.front || !cardData.back) {
            flashcardContainer.innerHTML = '<div class="glass-card" style="padding:20px; text-align:center;">No learning data available.</div>';
            return;
        }

        const fragment = document.createDocumentFragment();

        const card = document.createElement('div');
        card.className = 'flashcard';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0'); // Improved keyboard nav
        card.setAttribute('aria-label', `Flashcard: ${cardData.front}. Press Enter or Click to flip.`);

        const toggleFlip = () => card.classList.toggle('flipped');
        card.addEventListener('click', toggleFlip);
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') toggleFlip(); });

        card.appendChild(this.createCardFace('Term', cardData.front, 'card-front'));
        card.appendChild(this.createCardFace('Definition', cardData.back, 'card-back'));

        fragment.appendChild(card);

        flashcardContainer.textContent = '';
        flashcardContainer.appendChild(fragment);

        if (cardCounter) {
            cardCounter.textContent = `${this.state.currentCardIndex + 1} / ${this.data.flashcards.length}`;
        }
    },

    /**
     * Helper to create a card face element.
     * @param {string} title - The face title.
     * @param {string} content - The main content.
     * @param {string} className - Additional CSS class.
     * @returns {HTMLElement} The face element.
     */
    createCardFace(title, content, className) {
        const face = document.createElement('div');
        face.className = `card-face ${className}`;

        const h3 = document.createElement('h3');
        h3.textContent = title || '';

        const p = document.createElement('p');
        p.textContent = content || '';

        const hint = document.createElement('div');
        hint.className = 'card-hint';
        hint.textContent = 'Tap or Space to flip';

        face.append(h3, p, hint);
        return face;
    },

    /**
     * Navigates to the next flashcard.
     */
    nextCard() {
        try {
            if (this.state.currentCardIndex < this.data.flashcards.length - 1) {
                this.state.currentCardIndex++;
                this.renderCard();
                this.saveProgress();
            }
        } catch (e) { console.error("Error in nextCard"); }
    },

    /**
     * Navigates to the previous flashcard.
     */
    prevCard() {
        try {
            if (this.state.currentCardIndex > 0) {
                this.state.currentCardIndex--;
                this.renderCard();
                this.saveProgress();
            }
        } catch (e) { console.error("Error in prevCard"); }
    },

    /**
     * Initializes the quiz module.
     * @private
     */
    initQuiz() {
        this.renderQuiz();
        this.state.quizInitialized = true;
    },

    /**
     * Renders the current quiz question.
     * @private
     */
    renderQuiz() {
        const { quizContainer } = this.el;
        if (!quizContainer) return;

        quizContainer.textContent = '';
        const fragment = document.createDocumentFragment();

        if (this.state.currentQuizIndex >= this.data.quiz.length) {
            this.renderQuizCompletion(fragment);
            quizContainer.appendChild(fragment);
            return;
        }

        // Data Validation & Fallback UI
        const q = this.data.quiz[this.state.currentQuizIndex];
        if (!q || !q.question || !q.options) {
            quizContainer.innerHTML = '<div class="glass-card" style="padding:20px; text-align:center;">Quiz content missing.</div>';
            return;
        }

        const questionHeader = document.createElement('div');
        questionHeader.className = 'quiz-question';
        questionHeader.textContent = `Question ${this.state.currentQuizIndex + 1} of ${this.data.quiz.length}: ${q.question}`;

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.setAttribute('aria-label', `Option: ${opt}`);
            btn.addEventListener('click', () => this.handleQuizSelection(index));
            optionsDiv.appendChild(btn);
        });

        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'quiz-feedback';
        feedbackDiv.id = 'quiz-feedback';
        feedbackDiv.setAttribute('aria-live', 'polite');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary';
        nextBtn.id = 'next-quiz-btn';
        nextBtn.style.display = 'none';
        nextBtn.style.marginTop = '24px';
        nextBtn.style.width = '100%';
        nextBtn.textContent = 'Continue';
        nextBtn.addEventListener('click', () => {
            this.state.currentQuizIndex++;
            this.renderQuiz();
        });

        fragment.append(questionHeader, optionsDiv, feedbackDiv, nextBtn);
        quizContainer.appendChild(fragment);
    },

    /**
     * Processes the user's quiz answer.
     * @param {number} selectedIndex - The index of the selected option.
     */
    handleQuizSelection(selectedIndex) {
        try {
            const q = this.data.quiz[this.state.currentQuizIndex];
            if (!q) return;

            const options = this.el.quizContainer.querySelectorAll('.option-btn');
            const feedback = document.getElementById('quiz-feedback');
            const nextBtn = document.getElementById('next-quiz-btn');

            if (!feedback || !options.length) return;

            options.forEach(opt => opt.style.pointerEvents = 'none');
            feedback.textContent = '';

            const resultText = document.createElement('strong');
            const explanationText = document.createElement('div');
            explanationText.style.marginTop = '8px';
            explanationText.textContent = q.explanation || '';

            if (selectedIndex === q.correct) {
                options[selectedIndex].classList.add('correct');
                resultText.textContent = 'Correct Answer! ✅';
                this.updateProgressBar(5);
            } else {
                options[selectedIndex].classList.add('wrong');
                if (options[q.correct]) options[q.correct].classList.add('correct');
                resultText.textContent = 'Not quite. ❌';
            }

            feedback.append(resultText, explanationText);
            feedback.classList.add('show');
            if (nextBtn) nextBtn.style.display = 'block';
            this.saveProgress();
        } catch (e) { console.error("Error handling quiz selection."); }
    },

    /**
     * Renders the quiz results screen.
     * @param {DocumentFragment} fragment - The fragment to append UI to.
     */
    renderQuizCompletion(fragment) {
        const wrapper = document.createElement('div');
        wrapper.style.textAlign = 'center';
        wrapper.style.padding = '24px 0';

        const h3 = document.createElement('h2'); // Proper hierarchy
        h3.style.color = 'var(--saffron)';
        h3.style.fontSize = '24px';
        h3.style.marginBottom = '16px';
        h3.textContent = 'Knowledge Check Complete! 🇮🇳';

        const p = document.createElement('p');
        p.style.color = 'var(--text-primary)';
        p.textContent = 'Excellent effort! You are well on your way to becoming an informed voter.';

        const restartBtn = document.createElement('button');
        restartBtn.className = 'btn btn-primary';
        restartBtn.style.marginTop = '32px';
        restartBtn.textContent = 'Restart Quiz';
        restartBtn.addEventListener('click', () => {
            this.state.currentQuizIndex = 0;
            this.renderQuiz();
        });

        wrapper.append(h3, p, restartBtn);
        fragment.appendChild(wrapper);
        this.updateProgressBar(20);
    },

    /**
     * Handles sending a chat message.
     */
    sendMessage() {
        try {
            const input = this.el.chatInput;
            const text = input ? input.value.trim() : '';
            if (!text) return;

            this.appendMessage('user', text);
            input.value = '';

            // Simulated AI processing delay
            setTimeout(() => {
                const response = this.computeBotResponse(text);
                this.appendMessage('bot', response);
            }, 600);
        } catch (e) { console.warn("Chat failed to send."); }
    },

    /**
     * Appends a message to the chat interface.
     * @param {string} role - 'user' or 'bot'.
     * @param {string} text - Message content.
     */
    appendMessage(role, text) {
        try {
            const { chatMessages } = this.el;
            if (!chatMessages) return;

            const msg = document.createElement('div');
            msg.className = `message ${role}-message`;
            msg.textContent = text;

            chatMessages.appendChild(msg);
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        } catch (e) { /* silent fail for logs */ }
    },

    /**
     * Logic to determine the bot's response based on keywords.
     * @param {string} input - The user's query.
     * @returns {string} The computed response.
     */
    computeBotResponse(input) {
        try {
            const query = input.toLowerCase();

            // Use word boundaries for more accurate matching
            const match = Object.entries(this.data.responses).find(([key]) => {
                const regex = new RegExp(`\\b${key}\\b`, 'i');
                return regex.test(query);
            });

            return match ? match[1] : "I can help with topics like 'EVM', 'NOTA', 'voting age', or the 'election process'. Could you specify your query?";
        } catch (e) { return "I'm having trouble processing that right now."; }
    }
};

// Application entry point
document.addEventListener('DOMContentLoaded', () => {
    ElectionApp.init();
});
