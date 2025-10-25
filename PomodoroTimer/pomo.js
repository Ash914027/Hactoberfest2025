const clock = document.getElementById("clock");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const brk = document.getElementById("break");
const title =document.getElementById("title");


let state="pausework"; //stop state means stopped

const pDuration=25*60;
const brkDuration=5*60;
let totalsec = pDuration;

let timerId=null;

function updateTimer(){
    const minutes = Math.floor(totalsec/60).toString().padStart(2,"0");
    const sec = Math.floor(totalsec%60).toString().padStart(2,"0");
    clock.textContent=`${minutes}:${sec}`
    totalsec--;

}
updateTimer();



function starter(){
    if (state == "pausework"){
        state ="work";
        document.body.className = "work";
        //isRunning = true;
        start.textContent = "Pause";
        //totalsec = pDuration;
        title.textContent = "Focus";

        runTimer();

        

    }else if (state == "work"){
        state = "pausework";
        document.body.className = state;
        start.textContent = "Start";
        clearInterval(timerId);
        title.textContent = "Paused";
    }else if (state == "pausebreak"){
        state = "break";
        document.body.className = state;
        start.textContent = "Pause";
        //totalsec = brkDuration;

        title.textContent = "Rest";
        runTimer();
        
    }else if (state == "break"){
        state = "pausebreak";
        start.textContent = "Start";
        document.body.className = state;
        title.textContent = "Paused";
        clearInterval(timerId);
    }else{
        console.log("starter aur state me error hai");
    }
    console.log(`starter : ${state}`);
}

function breaker(){
    if (state == "work" || state == "pausework"){
        state = "pausebreak";
        document.body.className = state;
        brk.textContent = "Work";
        start.textContent = "Start";
        clearInterval(timerId);
        totalsec = brkDuration;
        updateTimer();
       

    }else if(state == "break" || state == "pausebreak"){
        state = "pausework";
        document.body.className = state;
        brk.textContent = "Break";
        start.textContent = "Start";
        clearInterval(timerId);
        totalsec = pDuration;
        updateTimer();
        
    }else{
        console.log("breaker ya state me error hai :(");
    }
    console.log(`breaker : ${state}`);
}

function reseter(){
    if (state == "pausework" || state == "work"){
        state = "pausework";
        document.body.className = "pausework";
        totalsec = pDuration;
        start.textContent = "Start";
        title.textContent = "";
        clearInterval(timerId);
        updateTimer()
    }else if (state == "break" || state == "pausebreak"){
        state = "pausebreak";
        document.body.className = "pausebreak";
        totalsec = brkDuration;
        start.textContent = "Start";
        title.textContent = "";
        clearInterval(timerId);
        updateTimer()
    }
}

function runTimer(){
    timerId = setInterval(() => {
        if (totalsec >= 0){
            // totalsec--;
            updateTimer();
        }else{
            clearInterval(timerId);
            if (state == "work"){
                window.alert("Pomodoro Complete ! Have your break :)");
                state = "break";
                document.body.className = state;
                start.textContent = "Start";
                // runTimer();
                brk.textContent = "Work";
                totalsec = brkDuration;
                updateTimer();

            }else if (state =="break"){
                window.alert("Break over ! Get back to work");
                state = "work";
                document.body.className = state;
                start.textContent = "Start";
                brk.textContent = "Break";
                totalsec = pDuration;
                updateTimer();


            }
        }
    },1000);

}