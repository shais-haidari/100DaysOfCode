let [millisecond, second, minute, hour] = [0, 0, 0, 0];
let timeRef = document.querySelector(".time");
let int = null;

document.getElementById("start").addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
}
);

document.getElementById("stop").addEventListener("click", () => {
    clearInterval(int);
}
);

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(int);
    [millisecond, second, minute, hour] = [0, 0, 0, 0];
    timeRef.innerHTML = "00:00:00:00";
}
);

function displayTimer() {
    millisecond++;
    if (millisecond >= 100) {
        millisecond = 0;
        second++;
    }
    if (second >= 60) {
        second = 0;
        minute++;
    }
    if (minute >= 60) {
        minute = 0;
        hour++;
    }

    let h = hour < 10 ? "0" + hour : hour;
    let m = minute < 10 ? "0" + minute : minute;
    let s = second < 10 ? "0" + second : second;
    let ms = millisecond < 10 ? "0" + millisecond : millisecond;

    timeRef.innerHTML = `${h}:${m}:${s}:${ms}`;
    timeRef.style.fontSize = "3rem";
    timeRef.style.color = "black";
    timeRef.style.textAlign = "center";
    timeRef.style.fontFamily = 'Courier New', Courier, monospace;
    ;
}

// Add event listeners for the buttons
document.getElementById("start").addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
}
);
