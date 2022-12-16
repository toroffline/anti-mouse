const robot = require("robotjs");
const readline = require("readline");

let enableConsole = true;

function log(str) {
  enableConsole && console.log(str);
}

function moveUp() {
  log(arguments.callee.name);
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x, mousePos.y - 10);
}

function moveDown() {
  log(arguments.callee.name);
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x, mousePos.y + 10);
}

function moveLeft() {
  console.log(arguments.callee.name);
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x - 10, mousePos.y);
}

function moveRight() {
  log(arguments.callee.name);
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x + 10, mousePos.y);
}

function moveLeftUp() {
  log(arguments.callee.name);
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x - 10, mousePos.y - 10);
}

function moveLeftDown() {
  log(arguments.callee.name);
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x - 10, mousePos.y + 10);
}

function moveRightUp() {
  log(arguments.callee.name);
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x + 10, mousePos.y - 10);
}

function moveRightDown() {
  log(arguments.callee.name);
  const mousePos = robot.getMousePos();
  robot.moveMouse(mousePos.x + 10, mousePos.y + 10);
}

function handleMoveMouse(keys) {
  if (keys.length == 1) {
    const key = keys[0];
    switch (key) {
      case "k":
        moveUp();
        break;
      case "j":
        moveDown();
        break;
      case "h":
        moveLeft();
        break;
      case "l":
        moveRight();
        break;
    }
  } else if (keys.length === 2) {
    if (keys.includes("h") && keys.includes("j")) {
      moveLeftDown();
    }
  }
}

function pushIfAbsent(arr, item) {
  const isNotIncluded = arr.findIndex((a) => item == a) == -1;
  isNotIncluded && arr.push(item);
}

function listenKeyboardEvent() {
  let keys = [];
  process.stdin.setRawMode(true);
  readline.emitKeypressEvents(process.stdin);

  process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") {
      process.exit();
    } else if (str === "h" || str === "j" || str === "k" || str === "l") {
      pushIfAbsent(keys, str);
    }

    if (keys && keys.length > 0) {
      handleMoveMouse(str);
    }

    keys.length = 0;
  });
}

function main() {
  listenKeyboardEvent();
}

main();
