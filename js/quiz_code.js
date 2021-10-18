window.onload = function() {
    let result = {};
    let step = 0;
    let questions = document.querySelector('.question');
    let answerResult = document.querySelector('.answer');
    let dots = document.querySelector('.dots');
    let indicator = document.querySelector('.indicator');
    let number = document.querySelector('.numbers');

    

   for (let i = 0; i < quiz.length; i++) {
      let dot = document.createElement('div');
      dot.classList.add('dot');
      dots.appendChild(dot);
   }
   
   let dot = document.querySelectorAll('.dot');
   

    function showQuestion(questionNumber) {
        questions.innerHTML = quiz[step]['q'];
        dot[step].classList.add('active');
        number.innerHTML = `${step + 1}/${quiz.length}`;
        let answer = '';
        for (let key in quiz[step]['a']) {
            answer += `<li data-v='${key}' class="answer-variant">${quiz[step]['a'][key]}</li>`
        }
        answerResult.innerHTML = answer;
    }

    document.onclick = function(event) {
        event.stopPropagation();
        if (event.target.classList.contains('answer-variant') && step < quiz.length) {

            if (result[event.target.dataset.v] != undefined) {
                result[event.target.dataset.v]++;
            } else {
                result[event.target.dataset.v] = 0;
            }
            step++;
            dot[step - 1].classList.remove('active');
            if (step == quiz.length) {
               questions.style.display = 'none';
               answerResult.style.display = 'none';
               indicator.style.display = 'none';
                showResult();
            } else {
                showQuestion(step);
            }
        }
       
    }

   
    function showResult() {
        let key = Object.keys(result).reduce(function(a,b) {
            return result[a] > result[b] ? a : b;
        })

        let div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = answers[key]['description'];
        document.querySelector('main').appendChild(div);

        let img = document.createElement('img');
        img.classList.add('result-img');
        img.src = `images/${answers[key]['image']}`;
        document.querySelector('main').appendChild(img);

        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('result-button-div');
        document.querySelector('main').appendChild(buttonDiv);

        let button = document.createElement('button');
        button.classList.add('result-button');
        button.innerHTML = 'Пройти ещё раз';
        buttonDiv.appendChild(button);

        button.onclick = function() {
            div.remove();
            img.remove();
            questions.style.display = 'block';
            answerResult.style.display = 'block';
            indicator.style.display = 'flex';
            step = 0;
            result = {};
            button.remove();
            showQuestion(step);
        }
    }

   

    showQuestion(step);
}
