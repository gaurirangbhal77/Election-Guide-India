/**
 * Election Guide India - Core Application Logic
 * Managed by ElectionApp object for better organization and security.
 */
'use strict';

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
        quizScore: 0,
        timeLeft: 0,
        quizTimerInterval: null,
        flashcardsInitialized: false,
        quizInitialized: false,
        activeTab: 'home',
        checklist: []
    },

    /**
     * @namespace data
     * @description Static content for flashcards, quizzes, and chat responses.
     */
    data: {
        flashcards: [
            { front: "Chief Election Commissioner (CEC)", back: "The head of the Election Commission of India. Oversees national and state elections ensuring they are free and fair.", video: "https://www.youtube.com/embed/V6dKkY9oIuI" },
            { front: "Delimitation", back: "The process of redrawing the boundaries of Lok Sabha and State Assembly constituencies based on the latest census.", video: "https://www.youtube.com/embed/HI4_aUNcv79" },
            { front: "Returning Officer (RO)", back: "The authority for a constituency responsible for receiving nominations and declaring election results." },
            { front: "Model Code of Conduct (MCC)", back: "Guidelines dictating how political parties and candidates must behave to ensure a level playing field, starting from election announcement.", video: "https://www.youtube.com/embed/R_f_G8-eF9Y" },
            { front: "Presiding Officer", back: "The official in charge of a specific polling station on election day, managing EVMs and maintaining order." },
            { front: "VVPAT", back: "Voter Verifiable Paper Audit Trail. A machine attached to the EVM that prints a paper slip to confirm the voter's choice.", video: "https://www.youtube.com/embed/pCeaUOnv3To" },
            { front: "Electoral Roll", back: "Also known as the voter list, it is a compiled list of all eligible voters in a constituency." },
            { front: "By-election", back: "An election held to fill a political office that has become vacant between regularly scheduled elections." },
            { front: "EVM", back: "Electronic Voting Machine. Used in Indian elections to record votes electronically instead of using paper ballots.", video: "https://www.youtube.com/embed/pCeaUOnv3To" },
            { front: "Universal Adult Suffrage", back: "The right of all adult citizens (18 years and above in India) to vote in elections, regardless of wealth, income, gender, social status, race, or ethnicity.", video: "https://www.youtube.com/embed/GOmnrMSopJG" }
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
            'evm': "EVM stands for Electronic Voting Machine. They were introduced to replace paper ballots, making counting faster and reducing electoral fraud. They are robust, standalone machines not connected to any network. Would you like to know about VVPAT as well?",
            'vvpat': "VVPAT (Voter Verifiable Paper Audit Trail) is a machine attached to the EVM. It prints a slip showing your choice for 7 seconds, allowing you to verify that your vote was cast correctly before it falls into a sealed box.",
            'nota': "NOTA means 'None Of The Above'. It gives you the option to reject all candidates in your constituency. It ensures your participation in democracy even if you don't support any specific candidate.",
            'age': "The minimum voting age in India is 18 years. This was established by the 61st Amendment Act in 1988. Any citizen aged 18 or above can enroll in the electoral roll via Form 6.",
            'process': "The Indian election process follows a strict timeline: 1. Delimitation, 2. Electoral Rolls, 3. Announcement & MCC, 4. Nominations, 5. Scrutiny, 6. Campaigning, 7. Polling, 8. Counting. Which stage shall we dive into?",
            'delimitation': "Delimitation is the redrawing of constituency boundaries based on the latest census to ensure equal representation. This is handled by an independent Delimitation Commission.",
            'mcc': "The Model Code of Conduct (MCC) are guidelines for political parties and candidates during elections. It ensures a level playing field and prevents the use of government machinery for campaigning.",
            'nomination': "Candidates must file nomination papers with the Returning Officer (RO) along with a security deposit and an affidavit disclosing assets, education, and criminal records.",
            'scrutiny': "After the last date for nominations, the Returning Officer examines all papers. Invalid or incomplete nominations are rejected during this critical 'Scrutiny' phase.",
            'campaigning': "Candidates have about two weeks to campaign. Campaigning must stop 48 hours before the conclusion of polling—this is the 'Silence Period'.",
            'polling': "On Polling Day, voters cast their votes at assigned polling stations. Identity is verified using EPIC (Voter ID) or other approved documents before using the EVM.",
            'counting': "Counting of votes is done at designated centers under tight security and in the presence of candidates' agents. The candidate with the most votes in a constituency is declared the winner.",
            'results': "Once the Returning Officer signs the 'Return of Election' (Form 21C), the result is official. The Election Commission then issues a notification constituting the new house."
        },
        checklist: [
            "Check your name in the Electoral Roll (voterportal.eci.gov.in)",
            "Download your Digital Voter ID (e-EPIC)",
            "Find your Polling Station location",
            "Identify the candidates in your constituency",
            "Prepare an approved Photo ID (Aadhar, PAN, Driving License, etc.)",
            "Learn the steps of casting a vote on an EVM",
            "Verify your vote on the VVPAT machine slip"
        ]
    },

    /**
     * @property {Object} el
     * @description Cache for DOM elements to optimize lookups.
     */
    el: {},

    /**
     * Centralized error handler for the application.
     * @param {Error} error - The error object.
     * @param {string} context - Where the error occurred.
     * @private
     */
    handleError(context, error) {
        console.error(`ElectionApp Error in ${context}:`, error);
    },

    /**
     * Initializes the application.
     * @public
     */
    init() {
        try {
            this.cacheElements();
            this.loadProgress();
            this.bindEvents();
            // Initial render without incrementing
            this.updateProgressBar(this.state.progress, true);
            console.info("ElectionApp: Version 2.0.0 initialized successfully.");
        } catch (error) {
            this.handleError('Initialization', error);
        }
    },

    /**
     * Sanitizes input strings to prevent XSS.
     * Escapes &, <, >, ", '
     * @param {string} str - The raw input string.
     * @returns {string} The sanitized string.
     */
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    /**
     * Helper to update element attributes only if they changed (Performance).
     * @param {HTMLElement} el - Target element.
     * @param {string} attr - Attribute name.
     * @param {string} val - New value.
     */
    updateAttribute(el, attr, val) {
        if (el && el.getAttribute(attr) !== val) {
            el.setAttribute(attr, val);
        }
    },

    /**
     * Validates if an index is within the bounds of an array.
     * @param {number} index - Index to check.
     * @param {Array} array - Target array.
     * @returns {boolean}
     */
    isValidIndex(index, array) {
        return Array.isArray(array) && index >= 0 && index < array.length;
    },

    /**
     * Persists application state to localStorage.
     * @private
     */
    saveProgress() {
        const stateToSave = {
            progress: this.state.progress,
            currentCardIndex: this.state.currentCardIndex,
            currentQuizIndex: this.state.currentQuizIndex,
            quizScore: this.state.quizScore,
            checklist: this.state.checklist
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
                this.state.quizScore = parsed.quizScore || 0;
                this.state.checklist = parsed.checklist || [];
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
            sendChatBtn: document.getElementById('send-chat-btn'),
            voterChecklist: document.getElementById('voter-checklist')
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
        // Core Navigation (Event Delegation for Performance)
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav) {
            bottomNav.addEventListener('click', (e) => {
                const btn = e.target.closest('.nav-btn');
                if (btn) this.switchTab(btn.dataset.target);
            });
        }

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

        // Global Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.switchTab('home');
            }
        });

        // Reset Progress
        const resetBtn = document.getElementById('reset-progress-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to reset all progress?")) {
                    localStorage.removeItem('election_app_progress');
                    location.reload();
                }
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
                this.updateAttribute(btn, 'aria-selected', isActive ? 'true' : 'false');
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
            if (tabId === 'checklist') this.renderChecklist();
        } catch (error) {
            console.error("ElectionApp: Error during tab switch:", error);
        }
    },

    /**
     * Updates the application-wide progress indicator.
     * @param {number} amount - Percentage amount.
     * @param {boolean} [isAbsolute=false] - Whether to set the progress absolutely.
     */
    updateProgressBar(amount, isAbsolute = false) {
        try {
            const val = typeof amount === 'number' ? amount : 0;
            if (isAbsolute) {
                this.state.progress = Math.min(100, Math.max(0, val));
            } else {
                this.state.progress = Math.min(100, Math.max(0, this.state.progress + val));
            }

            const { progressBar, progressWrapper, progressText } = this.el;

            if (progressBar && progressBar.getAttribute('width') !== `${this.state.progress}%`) {
                progressBar.setAttribute('width', `${this.state.progress}%`);
            }
            this.updateAttribute(progressWrapper, 'aria-valuenow', this.state.progress.toString());
            
            if (progressText && progressText.textContent !== `${this.state.progress}%`) {
                progressText.textContent = `${this.state.progress}%`;
            }

            this.saveProgress();
        } catch (error) {
            this.handleError('ProgressUpdate', error);
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

        if (!this.isValidIndex(this.state.currentCardIndex, this.data.flashcards)) return;

        // Data Validation & Fallback UI
        const cardData = this.data.flashcards[this.state.currentCardIndex];
        if (!cardData || !cardData.front || !cardData.back) {
            const fallback = document.createElement('div');
            fallback.className = 'glass-card fallback-card';
            fallback.textContent = 'No learning data available.';
            flashcardContainer.appendChild(fallback);
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
        card.addEventListener('keydown', (e) => { 
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip(); 
            }
        });

        card.appendChild(this.createCardFace('Term', cardData.front, 'card-front'));
        card.appendChild(this.createCardFace('Definition', cardData.back, 'card-back', cardData.video));

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
     * @param {string} [videoId] - Optional YouTube video ID.
     * @returns {HTMLElement} The face element.
     */
    createCardFace(title, content, className, videoId) {
        const face = document.createElement('div');
        face.className = `card-face ${className}`;

        const h3 = document.createElement('h3');
        h3.textContent = title || '';

        const p = document.createElement('p');
        p.textContent = content || '';

        face.append(h3, p);

        // Optional Video Support
        if (videoId) {
            const videoBtn = document.createElement('button');
            videoBtn.className = 'btn btn-secondary btn-video';
            videoBtn.textContent = '🎥 Watch Visual Guide';
            videoBtn.setAttribute('aria-label', 'Watch educational video about this term');
            
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';

            videoBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Don't flip card
                const watchUrl = videoId.replace('embed/', 'watch?v=');
                window.open(watchUrl, '_blank');
            });

            face.append(videoBtn, videoContainer);
        }

        const hint = document.createElement('div');
        hint.className = 'card-hint';
        hint.textContent = 'Tap or Space to flip';

        face.appendChild(hint);
        return face;
    },

    /**
     * Lazy loads a YouTube video into a container.
     * @param {HTMLElement} container - Target container.
     * @param {string} videoUrl - Full YouTube Embed URL.
     * @param {HTMLElement} btn - The button that triggered load.
     */
    loadVideo(container, videoUrl, btn) {
        // Security Check: Only allow YouTube embed URLs
        if (!videoUrl || !videoUrl.startsWith('https://www.youtube.com/embed/') || container.classList.contains('show')) return;

        const iframe = document.createElement('iframe');
        iframe.src = `${videoUrl}?autoplay=1`;
        iframe.title = "Election Educational Video";
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', 'true');

        container.appendChild(iframe);
        container.classList.add('show');
        if (btn) btn.classList.add('hide');
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
        } catch (e) { this.handleError("nextCard", e); }
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
        } catch (e) { this.handleError("prevCard", e); }
    },

    /**
     * Starts the quiz timer.
     * @param {number} seconds - Duration in seconds.
     */
    startTimer(seconds) {
        this.stopTimer();
        this.state.timeLeft = seconds;
        this.updateTimerUI();
        this.state.quizTimerInterval = setInterval(() => {
            this.state.timeLeft--;
            this.updateTimerUI();
            if (this.state.timeLeft <= 0) {
                this.stopTimer();
                this.handleTimeUp();
            }
        }, 1000);
    },

    /**
     * Stops the quiz timer.
     */
    stopTimer() {
        if (this.state.quizTimerInterval) {
            clearInterval(this.state.quizTimerInterval);
            this.state.quizTimerInterval = null;
        }
    },

    /**
     * Updates the timer UI.
     */
    updateTimerUI() {
        const timerEl = document.getElementById('quiz-timer');
        if (timerEl) {
            timerEl.textContent = `⏱️ Time Left: ${this.state.timeLeft}s`;
            if (this.state.timeLeft <= 5) {
                timerEl.classList.add('timer-warning');
            } else {
                timerEl.classList.remove('timer-warning');
            }
        }
    },

    /**
     * Handles the scenario when the timer reaches zero.
     */
    handleTimeUp() {
        try {
            const options = this.el.quizContainer.querySelectorAll('.option-btn');
            options.forEach(opt => opt.disabled = true);
            this.updateUIAfterAnswer(-1, false, true);
        } catch (e) { this.handleError("TimeUp", e); }
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
            const fallback = document.createElement('div');
            fallback.className = 'glass-card fallback-card';
            fallback.textContent = 'Quiz content missing.';
            quizContainer.appendChild(fallback);
            return;
        }

        const topBar = document.createElement('div');
        topBar.className = 'quiz-top-bar flex-show';
        topBar.style.justifyContent = 'space-between'; // Wait, need to use classes for CSP compliance
        topBar.style.alignItems = 'center';

        // Wait, better to avoid inline styles to be CSP compliant as per earlier user request!
        topBar.classList.remove('flex-show'); // Just create the div, we'll style it in CSS.
        topBar.className = 'quiz-top-bar';

        const questionHeader = document.createElement('div');
        questionHeader.className = 'quiz-question';
        questionHeader.textContent = `Question ${this.state.currentQuizIndex + 1} of ${this.data.quiz.length}: ${q.question}`;

        const timerDiv = document.createElement('div');
        timerDiv.id = 'quiz-timer';
        timerDiv.className = 'quiz-timer';
        timerDiv.textContent = '⏱️ Time Left: 15s';

        topBar.append(questionHeader, timerDiv);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.setAttribute('aria-label', `Option: ${opt}`);
            btn.addEventListener('click', () => this.handleOptionClick(index));
            optionsDiv.appendChild(btn);
        });

        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'quiz-feedback';
        feedbackDiv.id = 'quiz-feedback';
        feedbackDiv.setAttribute('aria-live', 'polite');

        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary hide';
        nextBtn.id = 'next-quiz-btn';
        nextBtn.textContent = 'Continue';
        nextBtn.addEventListener('click', () => {
            this.state.currentQuizIndex++;
            this.renderQuiz();
        });

        fragment.append(topBar, optionsDiv, feedbackDiv, nextBtn);
        quizContainer.appendChild(fragment);

        this.startTimer(15);
    },

    /**
     * Handles the click event on a quiz option.
     * @param {number} index - The index of the selected option.
     */
    handleOptionClick(index) {
        try {
            this.stopTimer();
            const options = this.el.quizContainer.querySelectorAll('.option-btn');
            options.forEach(opt => opt.disabled = true);

            const isCorrect = this.checkAnswer(index);
            if (isCorrect) {
                this.state.quizScore++;
            }
            this.updateUIAfterAnswer(index, isCorrect);
        } catch (e) { this.handleError("OptionClick", e); }
    },

    /**
     * Checks if the selected answer is correct.
     * @param {number} index - The index of the selected option.
     * @returns {boolean} True if correct, false otherwise.
     */
    checkAnswer(index) {
        const q = this.data.quiz[this.state.currentQuizIndex];
        return q ? index === q.correct : false;
    },

    /**
     * Updates the UI after an answer is selected.
     * @param {number} selectedIndex - The index of the selected option.
     * @param {boolean} isCorrect - Whether the answer was correct.
     */
    updateUIAfterAnswer(selectedIndex, isCorrect, isTimeout = false) {
        const q = this.data.quiz[this.state.currentQuizIndex];
        if (!q) return;

        const options = this.el.quizContainer.querySelectorAll('.option-btn');
        const feedback = this.el.quizContainer.querySelector('#quiz-feedback');
        const nextBtn = document.getElementById('next-quiz-btn');

        if (!feedback || !options.length) return;

        feedback.textContent = '';
        const resultText = document.createElement('div');
        resultText.className = 'quiz-result';
        const explanationText = document.createElement('div');
        explanationText.className = 'quiz-explanation';
        explanationText.textContent = q.explanation || '';

        if (isTimeout) {
            resultText.textContent = "Time's up! ⏰";
            if (options[q.correct]) options[q.correct].classList.add('correct');
        } else if (isCorrect) {
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
        if (nextBtn) {
            nextBtn.classList.remove('hide');
            nextBtn.classList.add('show');
        }
        this.saveProgress();
    },

    /**
     * Renders the quiz results screen.
     * @param {DocumentFragment} fragment - The fragment to append UI to.
     */
    renderQuizCompletion(fragment) {
        const wrapper = document.createElement('div');
        wrapper.className = 'quiz-completion-wrapper';

        const h3 = document.createElement('h2'); // Proper hierarchy
        h3.className = 'completion-title';
        h3.textContent = 'Knowledge Check Complete! 🇮🇳';

        const scoreText = document.createElement('div');
        scoreText.className = 'quiz-score-text';
        const total = this.data.quiz.length;
        const percent = Math.round((this.state.quizScore / total) * 100);
        
        // Sanitize logic naturally applies, but setting innerHTML for strong tags is safe here
        // as we only use primitive numbers from our trusted logic.
        scoreText.innerHTML = `<strong>Your Score: ${this.state.quizScore} / ${total} (${percent}%)</strong>`;

        const p = document.createElement('p');
        p.className = 'completion-text';
        p.textContent = percent >= 80 
            ? 'Excellent effort! You are well on your way to becoming an informed voter.'
            : 'Good try! Keep learning using the flashcards to improve your score.';

        const restartBtn = document.createElement('button');
        restartBtn.className = 'btn btn-primary completion-restart';
        restartBtn.textContent = 'Restart Quiz';
        restartBtn.addEventListener('click', () => {
            this.state.currentQuizIndex = 0;
            this.state.quizScore = 0;
            this.state.progress = Math.max(0, this.state.progress - 20); // Reset completion bonus
            this.updateProgressBar(this.state.progress, true);
            this.renderQuiz();
        });

        wrapper.append(h3, scoreText, p, restartBtn);
        fragment.appendChild(wrapper);
        this.updateProgressBar(20);
    },

    /**
     * Renders the voter readiness checklist.
     * @private
     */
    renderChecklist() {
        const container = this.el.voterChecklist;
        if (!container) return;

        container.textContent = '';
        const fragment = document.createDocumentFragment();

        this.data.checklist.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'checklist-item';
            
            const isChecked = this.state.checklist.includes(index);
            
            const checkbox = document.createElement('div');
            checkbox.className = `checkbox ${isChecked ? 'checked' : ''}`;
            checkbox.setAttribute('role', 'checkbox');
            checkbox.setAttribute('aria-checked', isChecked);
            checkbox.setAttribute('tabindex', '0');

            const label = document.createElement('span');
            label.className = 'checklist-label';
            label.textContent = item;

            const toggle = () => {
                const idx = this.state.checklist.indexOf(index);
                if (idx > -1) {
                    this.state.checklist.splice(idx, 1);
                    checkbox.classList.remove('checked');
                    checkbox.setAttribute('aria-checked', 'false');
                } else {
                    this.state.checklist.push(index);
                    checkbox.classList.add('checked');
                    checkbox.setAttribute('aria-checked', 'true');
                    this.updateProgressBar(2);
                }
                this.saveProgress();
            };

            li.addEventListener('click', toggle);
            checkbox.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle();
                }
            });

            li.append(checkbox, label);
            fragment.appendChild(li);
        });

        container.appendChild(fragment);
    },

    /**
     * Handles sending a chat message.
     */
    sendMessage() {
        try {
            const input = this.el.chatInput;
            const rawText = input ? input.value.trim() : '';
            const text = this.sanitizeInput(rawText);
            
            if (!text || rawText.length > 200) return;

            this.appendMessage('user', text);
            input.value = '';

            // Simulated AI processing delay
            setTimeout(() => {
                const response = this.computeBotResponse(rawText);
                this.appendMessage('bot', response);
            }, 600);
        } catch (e) { this.handleError('ChatSend', e); }
    },

    /**
     * Appends a message to the chat interface.
     * @param {string} role - 'user' or 'bot'.
     * @param {string} text - Message content.
     */
    appendMessage(role, text) {
        const msg = document.createElement('div');
        msg.className = `message ${role}-message`;
        msg.textContent = text; // SAFE (no innerHTML)

        requestAnimationFrame(() => {
            if (this.el.chatMessages) {
                this.el.chatMessages.appendChild(msg);
                this.el.chatMessages.scrollTo({
                    top: this.el.chatMessages.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
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
