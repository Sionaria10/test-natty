document.addEventListener('DOMContentLoaded', function() {
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    const toggleButton = document.getElementById('toggleButton');
    const description = document.getElementById('description');
    
    let numeroSecreto;
    let tentativas;
    let modoPalavras = false;
    let palavras = ["maçã", "banana", "cereja", "damasco", "figo", "goiaba", "kiwi", "limão", "manga", "nectarina"];
    let palavraSecreta;

    function iniciarJogo() {
        if (modoPalavras) {
            palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
            description.innerText = "Estou pensando em uma fruta...";
        } else {
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
            description.innerText = "Estou pensando em um número entre 1 e 100...";
        }
        tentativas = 0;
        message.innerText = '';
        guessInput.value = '';
    }

    function verificarPalpite() {
        const palpite = guessInput.value;
        tentativas++;
        if (modoPalavras) {
            if (palpite.toLowerCase() === palavraSecreta) {
                message.innerText = `Parabéns! Você acertou a palavra secreta "${palavraSecreta}" em ${tentativas} tentativas.`;
            } else {
                message.innerText = `Palpite errado. Tente novamente.`;
            }
        } else {
            const palpiteNumero = parseInt(palpite);
            if (isNaN(palpiteNumero)) {
                message.innerText = `Por favor, insira um número válido.`;
                return;
            }
            if (palpiteNumero === numeroSecreto) {
                message.innerText = `Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativas.`;
            } else if (palpiteNumero < numeroSecreto) {
                message.innerText = `Tente um número maior.`;
            } else {
                message.innerText = `Tente um número menor.`;
            }
        }
    }

    guessButton.addEventListener('click', verificarPalpite);
    resetButton.addEventListener('click', iniciarJogo);
    toggleButton.addEventListener('click', function() {
        modoPalavras = !modoPalavras;
        toggleButton.innerText = modoPalavras ? 'Alternar para números' : 'Alternar para palavras';
        iniciarJogo();
    });

    iniciarJogo();
});