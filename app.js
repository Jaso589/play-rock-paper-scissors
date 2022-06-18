const $paper = document.getElementById('paper'),
    $scissor = document.getElementById('scissors'),
    $rock = document.getElementById('rock'),
    $btnRules = document.querySelector('.btn-rules'),
    $closeCover = document.querySelector('.close-cover'),
    $playAgain = document.getElementById('play-again'),
    $userImg = document.getElementById('userImg'),
    $machineImg = document.getElementById('machineImg'),
    $userOptions = document.querySelector('.userOptions'),
    $result = document.querySelector('.results'),
    $resultText = document.querySelector('.result-text'),
    $btnAgain = document.querySelector('.btnAgain'),
    $points = document.querySelector('.score-number'),
    $backWin = document.querySelector('.win');

    const ROCK = 'rock',
        PAPER = 'paper',
        SCISSORS = 'scissors';
    
    var i = 0;
    
    $paper.addEventListener('click', ()=>{
        play(PAPER)
        
        $result.classList.add('flex')
        $userOptions.classList.add('none')
        setTimeout(function(){
            $btnAgain.classList.add('block')
        },3000)
    })
    $scissor.addEventListener('click', ()=>{
        play(SCISSORS)
        $result.classList.add('flex')
        $userOptions.classList.add('none')
        setTimeout(function(){
            $btnAgain.classList.add('block')
        },3000)
    })
    $rock.addEventListener('click', ()=>{
        play(ROCK)
        $result.classList.add('flex')
        $userOptions.classList.add('none')
        setTimeout(function(){
            $btnAgain.classList.add('block')
        },2100)
    })
    $btnAgain.addEventListener('click', ()=>{
        $result.classList.remove('flex')
        $userOptions.classList.remove('none')
        $btnAgain.classList.remove('block')
        $resultText.innerHTML = '';
    })
    document.addEventListener('click', ()=>{    
        $points.innerHTML = `${i}`
    })
    function play(option){
        $userImg.innerHTML = `
        <h2>YOU PICKED</h2>
        <div class="item-results ${option}"><img src="./images/icon-${option.toLowerCase()}.svg" alt=""></div>
        `
        
        const interval = setInterval(function(){
            const machineOption = calMachineOption();
            $machineImg.innerHTML= `
            <h2>THE HOUSE PICKED</h2>
            <div class="wait-machine"></div>
            <div class="item-results none ${machineOption}"  ><img src="./images/icon-${machineOption.toLowerCase()}.svg" alt=""></div>
            `
           
        },200)


        setTimeout(function(){

            clearInterval(interval)
            const machineOption = calMachineOption();
            const result = calcResult(option, machineOption);

            $machineImg.innerHTML= `
            <h2>THE HOUSE PICKED</h2>
            <div class="wait-machine"></div>
            
            <div class="item-results none ${machineOption}"  ><img src="./images/icon-${machineOption.toLowerCase()}.svg" alt=""></div>
            
            ${result === 'LOST' ? "<div class='win'</div>": ''}
            
            `
            
           
            switch(result){
                case 'TIE':
                    $resultText.innerHTML = `YOU HAVE TIED`;
                    break;
                case 'WIN':
                    $resultText.innerHTML = `YOU WIN`;
                    i++;
                    $userImg.innerHTML += `${result === 'WIN' ? "<div class='win'</div>": ''}`
                    break;
                case 'LOST':
                    $resultText.innerHTML = `YOU LOSE`;
                    i--;
                    if(i < 0) i = 0;
                    break;
            }

        },2000)
        
        
    }
    function calMachineOption(){
        const number = Math.floor(Math.random() * 3);

        switch(number){
            case 0:
                return ROCK;
            case 1:
                return PAPER;
            case 2:
                return SCISSORS;
        }
    }
    function calcResult(option, machineOption){
        if(option === machineOption){
            return 'TIE';
        }else if (option === ROCK){
            if(machineOption === PAPER) return 'LOST';
            if(machineOption === SCISSORS) return 'WIN';
        }else if(option === PAPER){
            if(machineOption === SCISSORS) return 'LOST';
            if(machineOption === ROCK) return 'WIN';
        }else if(option === SCISSORS){
            if(machineOption === ROCK) return 'LOST';
            if(machineOption === PAPER) return 'WIN'
        }
    }
