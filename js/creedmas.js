function checkAnswer() {
    ans = document.getElementById('input-answer').value;
    ans = ans.replaceAll(' ','').replaceAll('-','').toLowerCase();
    correct = document.getElementById('answer').value;
    if (ans == correct) {
        confetti.start()
        setTimeout(function() {
            confetti.stop()
            document.getElementById('clue-box').classList.remove('hidden');            
            document.getElementById('answer-box').classList.add('hidden');            
        }, 3000);
    }
}
