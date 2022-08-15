const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span a"),
timeTreatment = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button"),
tempoSelect = document.querySelector("select");


let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

//funcao apresentacao do tempo selecionado na tela do jogo
function novoTempo(){
    var timeSelect = document.getElementById("selecionatempo").selectedIndex;
    switch (timeSelect) {
        case 1:
            maxTime = 60;
            timeTreatment.textContent = " segundos";
            resetGame();
        break
        case 2:
            maxTime = 120;
            timeTreatment.textContent = " segundos";
            resetGame();
        break
        case 3:
            maxTime = 300;
            timeTreatment.textContent = " segundos";
            resetGame();
        break
        case 4:
            maxTime = 420;
            timeTreatment.textContent = " segundos";
            resetGame();
        break
        case 5:
            maxTime = 6000;
            timeTreatment.textContent = " segundos";
            resetGame();
        break
        case 6:
            maxTime = Infinity;
            resetGame();
            timeTag.textContent = "Infinito"
            timeTreatment.textContent = "";
        break
    }
}

//funcao para selecao de um paragrafo aleatorio no array paragraphs ou captura do texto digitado e separacao dos caracteres em um arrey com a funcao split usando o separador "" para dividilos entre palavras
function randomParagraph() {

    saveText();
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

//funcao para verificar se o caractere digitado é o correto, baseado na posicao de charIndex, e adicionar na div de cada caracter se o mesmo foi digitado corretamente ou incorretamente
function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) { //iniciar o contador e checagem do tempo para o fim do game
        if(!isTyping){
            timer = setInterval(initTimer, 1000);    
            isTyping = true;
        }
        if(typedChar == null){                      //fazer a remocao do caractere errado apagado
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){  //remove da div a tag incorrect
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        } else {
            if(characters[charIndex].innerText === typedChar) {     //se o caractere for o correto é adiciona na div correct
                characters[charIndex].classList.add("correct");
            } else {                                                //se o caractere for o incorreto é adiciona na div incorrect e adicionado um mistakes para apresentar os erros na tela
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;                                            //pular para proxima letra
        }
    
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    }else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
