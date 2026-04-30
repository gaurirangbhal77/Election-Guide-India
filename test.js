'use strict';

// Simple functional tests

function testProgress() {
    const before = ElectionApp.state.progress;
    ElectionApp.updateProgressBar(10);

    if (ElectionApp.state.progress === before + 10) {
        console.log("✅ Progress Test Passed");
    } else {
        console.error("❌ Progress Test Failed");
    }
}

function testSanitize() {
    const input = "<script>alert(1)</script>";
    const output = ElectionApp.sanitizeInput(input);

    if (!output.includes("<script>")) {
        console.log("✅ Sanitize Test Passed");
    } else {
        console.error("❌ Sanitize Test Failed");
    }
}

function testQuizLogic() {
    const q = ElectionApp.data.quiz[0];
    if (q.correct === 1) {
        console.log("✅ Quiz logic valid");
    } else {
        console.error("❌ Quiz logic invalid");
    }
}

function testChatResponse() {
    const res = ElectionApp.computeBotResponse("What is EVM?");
    if (res.toLowerCase().includes("electronic voting")) {
        console.log("✅ Chat Test Passed");
    } else {
        console.error("❌ Chat Test Failed");
    }
}

testProgress();
testSanitize();
testQuizLogic();
testChatResponse();
