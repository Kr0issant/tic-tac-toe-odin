var chance = "cross";
var move = 0;

const winMasks = [448, 56, 7, 292, 146, 73, 273, 84];
var boxes = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];

const docBoxes = document.querySelectorAll(".tic-box");
docBoxes.forEach((box) => {
    box.addEventListener("click", ticClick);
});

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);

function ticClick(e) {
    if (e.target.innerHTML !== "") { return; }

    boxes[e.target.id] = chance;

    if (chance === "cross") {
        e.target.innerHTML = '<img src="./assets/cross.png">';

        chance = "circle";
    } else {
        e.target.innerHTML = '<img src="./assets/circle.png">';

        chance = "cross";
    }
    
    move++;
    let victor = checkWin();

    console.log(victor);
}

function checkWin() {
    if (move === 9) {
        return "tie";
    }

    let victor = "";
    let lastChance = (chance == "cross" ? "circle" : "cross");
    
    let gameMask = parseInt(boxes.join("").replaceAll(lastChance, "1").replaceAll(chance, "0"), 2);
    console.log(gameMask);

    winMasks.forEach(win => {
        if ((gameMask & win) == win) {
            victor = lastChance;
        }
    });

    return victor;
}

function reset() {
    for (i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML = "";
        boxes[i] = "0";
    }
    move = 0;
    chance = "cross";
}