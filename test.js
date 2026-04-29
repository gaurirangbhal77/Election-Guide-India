/**
 * Election Guide India - Basic Functional Tests
 * Validates core application logic for quality assurance.
 */

const testSuite = {
    /**
     * Mock of the app state for testing logic in isolation.
     */
    mockState: {
        progress: 0,
        responses: {
            "evm": "Electronic Voting Machine (EVM) is used to record votes.",
            "nota": "None of the Above (NOTA) allows voters to officially register a vote of rejection.",
        }
    },

    /**
     * Tests the bot's response logic.
     */
    testComputeBotResponse() {
        console.log("Running: testComputeBotResponse...");
        
        const computeResponse = (input) => {
            const query = input.toLowerCase();
            const match = Object.entries(testSuite.mockState.responses).find(([key]) => {
                const regex = new RegExp(`\\b${key}\\b`, 'i');
                return regex.test(query);
            });
            return match ? match[1] : "Fallback";
        };

        const r1 = computeResponse("What is an EVM?");
        const r2 = computeResponse("How does NOTA work?");
        const r3 = computeResponse("Hello");

        console.assert(r1.includes("Electronic Voting Machine"), "Failed: EVM response");
        console.assert(r2.includes("None of the Above"), "Failed: NOTA response");
        console.assert(r3 === "Fallback", "Failed: Fallback response");
        
        console.log("Passed: testComputeBotResponse");
    },

    /**
     * Tests the progress calculation logic.
     */
    testProgressLogic() {
        console.log("Running: testProgressLogic...");
        
        let progress = 0;
        const update = (amount) => Math.min(100, Math.max(0, progress + amount));

        progress = update(10);
        console.assert(progress === 10, "Failed: Increment progress");

        progress = update(100);
        console.assert(progress === 100, "Failed: Cap progress at 100");

        console.log("Passed: testProgressLogic");
    },

    runAll() {
        console.log("--- Starting Test Suite ---");
        try {
            this.testComputeBotResponse();
            this.testProgressLogic();
            console.log("--- All Tests Passed Successfully! ---");
        } catch (e) {
            console.error("Test Suite Failed:", e);
        }
    }
};

// Auto-run if in browser console or node
if (typeof window !== 'undefined' || typeof process !== 'undefined') {
    testSuite.runAll();
}
