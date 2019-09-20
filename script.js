// HOURS WORKED 76 hrs
(function (window){
const store         = window.localStorage;
const audioElement  = document.querySelector('#audio');
const body          = document.querySelector('body');
const menuBtn       = document.querySelector('#menu-btn');
const menuWrap      = document.querySelector('#menu-wrap');
const colorMenu     = document.querySelector('#color-modal');
const restartMenu   = document.querySelector('#restart-modal');
const rotateDots    = document.querySelectorAll('.rotate');
const score         = document.querySelector('#score-current');
const bestScore     = document.querySelector('#score-best');
const drawer        = document.querySelector('#drawer');
const board         = document.querySelector('#board');
const boardFills    = [...document.querySelectorAll('#board .fill')];
const cellWidth     = document.querySelector('#board .cell').clientWidth;
const halfCell      = cellWidth / 2;
let shape           = null;
let activeDrag      = false;

// ROTATE VARIBALES
const radius        = board.clientWidth / 2;
let center_x        = board.offsetLeft + radius;
let center_y        = board.offsetTop + radius;
let activeRotate    = false;
let click_degrees;
let degrees;

function initGame(){
    // LOAD GAME AUDIO
    audioElement.load();
    // THE CELLS THAT WHEN THE BOARD IS ROTATED THE CELLS NOW LINE UP WITH
    const rotateFills = [{up: 0, down: 99, right: 9, left: 90},{up: 1, down: 98, right: 19, left: 80},{up: 2, down: 97, right: 29, left: 70},{up: 3, down: 96, right: 39, left: 60},{up: 4, down: 95, right: 49, left: 50},{up: 5, down: 94, right: 59, left: 40},{up: 6, down: 93, right: 69, left: 30},{up: 7, down: 92, right: 79, left: 20},{up: 8, down: 91, right: 89, left: 10},{up: 9, down: 90, right: 99, left: 0},{up: 10, down: 89, right: 8, left: 91},{up: 11, down: 88, right: 18, left: 81},{up: 12, down: 87, right: 28, left: 71},{up: 13, down: 86, right: 38, left: 61},{up: 14, down: 85, right: 48, left: 51},{up: 15, down: 84, right: 58, left: 41},{up: 16, down: 83, right: 68, left: 31},{up: 17, down: 82, right: 78, left: 21},{up: 18, down: 81, right: 88, left: 11},{up: 19, down: 80, right: 98, left: 1},{up: 20, down: 79, right: 7, left: 92},{up: 21, down: 78, right: 17, left: 82},{up: 22, down: 77, right: 27, left: 72},{up: 23, down: 76, right: 37, left: 62},{up: 24, down: 75, right: 47, left: 52},{up: 25, down: 74, right: 57, left: 42},{up: 26, down: 73, right: 67, left: 32},{up: 27, down: 72, right: 77, left: 22},{up: 28, down: 71, right: 87, left: 12},{up: 29, down: 70, right: 97, left: 2},{up: 30, down: 69, right: 6, left: 93},{up: 31, down: 68, right: 16, left: 83},{up: 32, down: 67, right: 26, left: 73},{up: 33, down: 66, right: 36, left: 63},{up: 34, down: 65, right: 46, left: 53},{up: 35, down: 64, right: 56, left: 43},{up: 36, down: 63, right: 66, left: 33},{up: 37, down: 62, right: 76, left: 23},{up: 38, down: 61, right: 86, left: 13},{up: 39, down: 60, right: 96, left: 3},{up: 40, down: 59, right: 5, left: 94},{up: 41, down: 58, right: 15, left: 84},{up: 42, down: 57, right: 25, left: 74},{up: 43, down: 56, right: 35, left: 64},{up: 44, down: 55, right: 45, left: 54},{up: 45, down: 54, right: 55, left: 44},{up: 46, down: 53, right: 65, left: 34},{up: 47, down: 52, right: 75, left: 24},{up: 48, down: 51, right: 85, left: 14},{up: 49, down: 50, right: 95, left: 4},{up: 50, down: 49, right: 4, left: 95},{up: 51, down: 48, right: 14, left: 85},{up: 52, down: 47, right: 24, left: 75},{up: 53, down: 46, right: 34, left: 65},{up: 54, down: 45, right: 44, left: 55},{up: 55, down: 44, right: 54, left: 45},{up: 56, down: 43, right: 64, left: 35},{up: 57, down: 42, right: 74, left: 25},{up: 58, down: 41, right: 84, left: 15},{up: 59, down: 40, right: 94, left: 5},{up: 60, down: 39, right: 3, left: 96},{up: 61, down: 38, right: 13, left: 86},{up: 62, down: 37, right: 23, left: 76},{up: 63, down: 36, right: 33, left: 66},{up: 64, down: 35, right: 43, left: 56},{up: 65, down: 34, right: 53, left: 46},{up: 66, down: 33, right: 63, left: 36},{up: 67, down: 32, right: 73, left: 26},{up: 68, down: 31, right: 83, left: 16},{up: 69, down: 30, right: 93, left: 6},{up: 70, down: 29, right: 2, left: 97},{up: 71, down: 28, right: 12, left: 87},{up: 72, down: 27, right: 22, left: 77},{up: 73, down: 26, right: 32, left: 67},{up: 74, down: 25, right: 42, left: 57},{up: 75, down: 24, right: 52, left: 47},{up: 76, down: 23, right: 62, left: 37},{up: 77, down: 22, right: 72, left: 27},{up: 78, down: 21, right: 82, left: 17},{up: 79, down: 20, right: 92, left: 7},{up: 80, down: 19, right: 1, left: 98},{up: 81, down: 18, right: 11, left: 88},{up: 82, down: 17, right: 21, left: 78},{up: 83, down: 16, right: 31, left: 68},{up: 84, down: 15, right: 41, left: 58},{up: 85, down: 14, right: 51, left: 48},{up: 86, down: 13, right: 61, left: 38},{up: 87, down: 12, right: 71, left: 28},{up: 88, down: 11, right: 81, left: 18},{up: 89, down: 10, right: 91, left: 8},{up: 90, down: 9, right: 0, left: 99},{up: 91, down: 8, right: 10, left: 89},{up: 92, down: 7, right: 20, left: 79},{up: 93, down: 6, right: 30, left: 69},{up: 94, down: 5, right: 40, left: 59},{up: 95, down: 4, right: 50, left: 49},{up: 96, down: 3, right: 60, left: 39},{up: 97, down: 2, right: 70, left: 29},{up: 98, down: 1, right: 80, left: 19},{up: 99, down: 0, right: 90, left: 9}];
    // ATTACHES ROTATE POSITONS OBJECT TO BOARD FILLS ON DOM
    boardFills.forEach((fill, i) => {fill.rotateFills = rotateFills[i];});

    window.addEventListener('resize', e => {debounce(resizeFunc);});

    menuBtn.addEventListener('click', e => {menuWrap.classList.add('show'); playSound('back');});
    menuWrap.addEventListener('click', menuFunctions);

    drawer.addEventListener('touchstart', dragStart);
    drawer.addEventListener('touchmove', drag);
    drawer.addEventListener('touchend', dragEnd);
    drawer.addEventListener('mousedown', dragStart);
    drawer.addEventListener('mousemove', drag);
    drawer.addEventListener('mouseup', dragEnd);


    document.addEventListener('touchstart', rotateStart);
    document.addEventListener('touchmove', rotate);
    document.addEventListener('touchend', rotateEnd);

    document.addEventListener('mousedown', rotateStart);
    document.addEventListener('mousemove', rotate);
    document.addEventListener('mouseup', rotateEnd);

    addStoredData();
    createShapes();
}
function addStoredData(){
    // TESTING
    setStored('power', 2);

    let fills = getStored('fills') || [],
        i = getStored('power'),
        j = fills.length;

    score.innerHTML = getStored('current') || 0;
    bestScore.innerHTML = getStored('best') || 0;

    body.classList.toggle('mute', getStored('mute'));
    body.classList.toggle('night', getStored('night'));
    body.classList.add(getStored('colors'));


    while(i--){
        rotateDots[i].classList.add('show');
    }
    
    while(j--) {
        const fill = fills[j];
        var bFill = boardFills[fill.pos];

        bFill.setAttribute('data-shape', fill.data.shape);
        bFill.setAttribute('data-size', fill.data.size);
    }
}
function storeFillData(rotate){
    const fills = rotate || [];

    if(!rotate) {
        boardFills.forEach((fill,i) =>{
            if(fill.dataset.shape) fills.push({pos: i, data: fill.dataset});
        });
    }
    setStored('fills', fills);
}
function restartGame(){
    shape = null;

    rotateDots.forEach(dot =>{dot.classList.remove('show');});
    boardFills.forEach(fill =>{ 
        fill.removeAttribute('data-shape');
        fill.removeAttribute('data-size');
        fill.removeAttribute('data-newest');
    });

    setStored('current', 0);
    setStored('power', 0);
    setStored('shapes', []);
    setStored('fills', []);

    score.innerHTML = 0;

    animateDrawer(false);
    createShapes();
}

function gameOver(){
    setTimeout(() => {
        menuWrap.classList.add('show');
        document.querySelector('#game-over').classList.add('show');
        document.querySelector('#game-over-score').innerHTML = getStored('current');
    
        if(getStored('current') === getStored('best')){
            document.querySelector('#high-score').classList.add('show');
        }
    }, 500);
}


function rotateStart(e) {
    if(getStored('power')){
        const target = e.target.parentElement;
        // IF CELL OR FILL
        if(target === board || target.parentElement === board){
            activeRotate = true;

            if (e.type === 'touchstart') {
                // deviceLog.innerHTML = 'touchstart';
                click_degrees = get_degrees(e.touches[0].pageX, e.touches[0].pageY);
            } else {
                click_degrees = get_degrees(e.pageX, e.pageY);
            }
            board.classList.add('rotating');
        }
    }
}

function rotate(e) {
    if(activeRotate){
        if (e.type === 'touchmove') {
            
            degrees = get_degrees(e.touches[0].pageX, e.touches[0].pageY) - click_degrees;
        } else {
            degrees = get_degrees(e.pageX, e.pageY) - click_degrees;
        }
        debounce(setRotate(degrees));
        // setRotate(degrees);
    }
}

function rotateEnd(e) {
    if(activeRotate){
        // if(e.type === 'touchend'){
        //     deviceLog.innerHTML = 'touchend';
        // }
        degrees = Math.round(degrees / 90) * 90;

        setRotate(degrees);

        if(degrees === -90){
            board.dataset.side = 'left';
        } else if(degrees === 90){
            board.dataset.side = 'right';
        } else if(degrees === -180 || degrees === 180){
            board.dataset.side = 'down';
        } else {
            board.dataset.side = 'up';
        }
        board.classList.remove('rotating');
        board.addEventListener('transitionend', fillsToNewPosition);
    }
    activeRotate = false;
}
function setRotate(deg) {
    board.style.transform = `rotate(${deg}deg)`;
}
function get_degrees(mouse_x, mouse_y) {
    const radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    const degrees = Math.round((radians * (180 / Math.PI) * -1) + 100);

    return degrees;
}

function dragStart(e) {
    if (!e.target.matches('.trigger')) return;

    activeDrag = true;
    // this is the item we are interacting with
    shape = e.target.parentElement;

    if (!shape.xOffset) {
        shape.xOffset = 0;
        shape.yOffset = 0;
    }
    if (e.type === 'touchstart') {
        shape.initialX = e.touches[0].clientX - shape.xOffset;
        shape.initialY = e.touches[0].clientY - shape.yOffset;
    } else {
        shape.initialX = e.clientX - shape.xOffset;
        shape.initialY = e.clientY - shape.yOffset;

    }
    setTranslate(0, 0, true);
    scaleFills(true);
    
}
function drag(e) {
    if (activeDrag) {
        shape.classList.add('active');

        if (e.type === 'touchmove') {
            e.preventDefault();

            shape.currentX = e.touches[0].clientX - shape.initialX;
            shape.currentY = e.touches[0].clientY - shape.initialY;
        } else {
            shape.currentX = e.clientX - shape.initialX;
            shape.currentY = e.clientY - shape.initialY;
        }

        // Holds Current Position
        shape.xOffset = shape.currentX;
        shape.yOffset = shape.currentY;

        setTranslate(shape.currentX, shape.currentY, true);
        scaleFills(true);
    }
}

function dragEnd(e) {
    activeDrag = false;

    scaleFills(false);
    shape.classList.remove('active');

    if(onBoard() && fitInPlace()){
        // SHIFT THE SHAPE TO POSITION DIRECTLY OVER BOARD FILLS
        const bRect = boardFills[onBoardPlacement()].getBoundingClientRect();
        const rect  = shape.getBoundingClientRect();
        const newX  = (shape.currentX - (rect.left - bRect.left)) - 2; // ACOUNTS FOR SLIGHT MARGIN DIFFERENCES
        const newY  = (shape.currentY - (rect.top - bRect.top)) - 2; // ACOUNTS FOR SLIGHT MARGIN DIFFERENCES

        shape.addEventListener('transitionend', shapeToBoard);
        setTranslate(newX, newY, true);

        playSound('placed');
    } else {
        shape.initialX = shape.initialY = shape.xOffset = shape.yOffset = 0;

        setTranslate(0, 0, false);
        shape = null;

        playSound('drop');
    }
}


function createShapes(){
    const shapes = [
        {shape: 'sq',rotate: [''],size: [{length: 9,width: 3,check: { '': [0, 1, 2, 10, 11, 12, 20, 21, 22] }}]},
        {shape: 'line',rotate: ['', 'left'],size: [{ length: 2, width: 2, check: { '': [0, 1], left: [0, 10] } },{ length: 3, width: 3, check: { '': [0, 1, 2], left: [0, 10, 20] } },{length: 4,width: 4,check: { '': [0, 1, 2, 3], left: [0, 10, 20, 30] }},{length: 5,width: 5,check: { '': [0, 1, 2, 3, 4], left: [0, 10, 20, 30, 40] }}]},
        {shape: 'corner',rotate: ['', 'left', 'right', 'down'],size: [{length: 3,width: 2,ghost: 1,check: {'': [0, 10, 11],left: [1, 10, 11],right: [0, 1, 10],down: [0, 1, 11]}},{length: 5,width: 3,ghost: 4,check: {'': [0, 10, 20, 21, 22],left: [2, 12, 20, 21, 22],right: [0, 1, 2, 10, 20],down: [0, 1, 2, 12, 22]}}]}
    ];
    const allShapeData = [];
    const storedShapes = getStored('shapes') || [];
    let i              = storedShapes.length ? storedShapes.length : 3;
    // CLEAR ANY OLD DATA
    drawer.innerHTML = '';

    while (i--) {
        const props        = storedShapes[i] || {};

        if(!(storedShapes.length)){
            const sh       = shapes[randomize(shapes.length)];

            props.shape    = sh.shape;
            props.size     = sh.size[randomize(sh.size.length)];
            props.rotate   = sh.rotate[randomize(sh.rotate.length)];
            props.width    = props.shape === 'line' && props.rotate === 'left' ? 1 : props.size.width;
            props.ghost    = props.size.ghost || 0;
            props.check    = props.size.check[props.rotate];
        }
        
        const fills        = '<div class="fill"></div>'.repeat(props.size.length);
        const ghosts       = '<div class="ghost"></div>'.repeat(props.ghost);
        const markup       = 
            `<div class="shape" data-shape="${props.shape}" data-size="${props.size.width}" data-rotate="${props.rotate}" data-check="${props.check}">
                ${fills}
                ${ghosts}
                <div class="trigger"></div>
            </div>`;

        drawer.innerHTML += markup;

        allShapeData.push(props);
    }

    setStored('shapes', allShapeData);
    animateDrawer(true);
}

function checkForSpace(e){
    if(e) drawer.removeEventListener('transitionend', checkForSpace);

    const shapes = getStored('shapes');

    let isSpace  = false;

    // SO THAT OLD BOARD FILLS DONT HAVE NEWEST POTENTIALLY SCREWING WITH THE CASCADE
    boardFills.forEach(fill => {fill.removeAttribute('data-newest');});

    for (let i = 0; i < shapes.length; i++) {
        if(isSpace) break;

        const sh = shapes[i];
        // SPLITS THE STRING INTO ARRAY OF NUMBERS
        let fills = sh.check;
        let j = 0;
        while(!isSpace){
            j++;
            if(j > 300){ throw 'INFINITE LOOP!'; }

            // CREATES ARRAY OF THE SPECIFIC BOARD FILLS TO BE CHECKED
            const bFills = fills.map(fill => {return boardFills[fill];});
            // CHECKS SPECIFIC BOARD FILLS FOR SHAPE DATA (I.E. ALREADY FILLED) RETURNS BOOL (IF NONE = TRUE)
            const notFilled = bFills.every(fill => {return !(fill.dataset.shape);});

            // IF NO SHAPE DATA THEN THERE IS SPACE FOR THE CURRENT SHAPES
            if(notFilled){
                // THERE IS SPACE AND WILL BREAK WHILE LOOP
                isSpace = !isSpace;
                // console.log('isSpace = ' + isSpace);
            // IF END OF BOARD BREAK WHILE FOR THIS SHAPE
            } else if (fills.some(num => {return num === 99;})){
                break;
            // IF CORNER & RIGHT END OF BOARD BREAK WHILE FOR THIS SHAPE
            } else if (sh.shape === 'corner' && sh.rotate === 'right'){
                // FOR THE LARGE AND SMALL CORNERS RESPECTIVELY
                const fill = Number(sh.size.width) === 3 ? 97 : 98;

                if(fills.some(num => {return num === fill;})){break;}
            } 
            // IF AT END OF LINE JUMP TO THE NEXT LINE
            const endOfLine = fills.some(num => {return num % 10 === 9;});
            const jump = endOfLine ? Number(sh.size.width) : 1;

            fills = fills.map(num => {return num + jump;});
        }
    }

    if(!isSpace){
        if(getStored('power')) {
            mustRotate(true);
        } else {
            gameOver();
        }   
    } else {
        // CLEARS THE MUST ROTATE DOTS WHEN A NEW SIDE THAT FITS PIECES IS FOUND
        mustRotate(false);
    }
    return isSpace;
}

function mustRotate(add){
    rotateDots.forEach(dot =>{dot.classList.toggle('mustRotate', add);});
    // console.log('mustRotate');
}
function fillsToNewPosition(){
    const side = board.dataset.side;
    const newFillData = [];
    let power = getStored('power');
    
    board.removeEventListener('transitionend', fillsToNewPosition);
    // deviceLog.innerHTML = side;
    if(side === 'up') return;

    // UPDATE DOTS AND ABILITY TO ROTATE
    rotateDots[--power].classList.remove('show');
    setStored('power', power);

    // WHEN BOARD SNAPS BACK TO ORIGINAL POSITION IT WON'T ANIMATE
    board.classList.add('transEnd');

    for (let i = 0; i < boardFills.length; i++) {
        const fill = boardFills[i];

        if(fill.dataset.shape !== undefined){
            newFillData.push({
                pos: fill.rotateFills[side],
                data: {shape: fill.dataset.shape, size: fill.dataset.size}
            });

            fill.removeAttribute('data-shape');
            fill.removeAttribute('data-size');
        }
    }

    for (let i = 0; i < newFillData.length; i++) {
        const fill = newFillData[i];

        boardFills[fill.pos].dataset.shape = fill.data.shape;
        boardFills[fill.pos].dataset.size = fill.data.size;

    }

    storeFillData(newFillData);
    setRotate(0);
    // REMOVES TOO FAST WITOUT SETTIMEOUT AND TRANSITIONS BACK TO DEFAULT POSITION
    setTimeout(()=> {
        board.classList.remove('transEnd');
    }, 10);
    
    checkForSpace();
}

function onBoardPlacement(){
    const rect  = shape.getBoundingClientRect();
    const bRect = board.getBoundingClientRect();
    const row   = Math.round((rect.left - bRect.left) / cellWidth); 
    const col   = Math.round((rect.top - bRect.top) / cellWidth);
    
    // return toNumber(col,row);
    return +(col+''+row);
}
function onBoard(){
    const rect  = shape.getBoundingClientRect();
    const bRect = board.getBoundingClientRect();

    if(rect.top + halfCell > bRect.top){
        if(rect.left + halfCell > bRect.left){
            if(rect.bottom - halfCell < bRect.bottom) {
                if(rect.right - halfCell < bRect.right){
                    return true;
                }
            }
        }
    }
    // if((rect.top + halfCell > bRect.top) && (rect.left + halfCell > bRect.left) && (rect.bottom - halfCell < bRect.bottom) && (rect.right - halfCell < bRect.right)){
    //     return true;        
    // }
}
function fitInPlace(){
    // GETS SHAPE.CHECK DATA THAT SPECIFIES THE BOARD FILLS TO CHECK. SECOND MAP UPDATES THEM ALL TO THE CURRENT POSITION
    const pos         = onBoardPlacement();
    const check       = shape.dataset.check.split(',').map(Number).map(num => {return pos + num;});
    const noShapeData = check.map(num => {return boardFills[num];}).every(fill => {return !(fill.dataset.shape);});
    // UPDATES CHECK WITH NEW POSITION
    if(noShapeData){shape.dataset.check = `${check}`;}

    return noShapeData;
}
function shapeToBoard(){
    // GETS SHAPE.CHECK DATA CONVERTS IT TO ARRAY OF NUMBERS AND MAP RETURNS ARRAY OF THOSE BOARD FILLS
    const bFills = shape.dataset.check.split(',').map(Number).map(num => {return boardFills[num];});
    const shapes = getStored('shapes');
    // FILLS APPROPIATE BOARD FILLS WITH DATA
    bFills.forEach(fill => {
        fill.dataset.shape = shape.dataset.shape;
        fill.dataset.size = shape.dataset.size;
        fill.dataset.newest = true;
    });

    // FIND SHAPE IN STORED SHAPES AND REMOVE IT (SHOULDN'T USE FOR EACH BECAUSE IT'LL REMOVE ALL)
    for (let i = 0; i < shapes.length; i++) {
        const sh = shapes[i];
        if(sh.shape === shape.dataset.shape && sh.size.width === Number(shape.dataset.size) && sh.rotate === shape.dataset.rotate){
            shapes.splice(i,1);
            break;
        }
    }

    setStored('shapes', shapes);
    
    shape.classList.add('dead');
    shape.removeEventListener('transitionend', shapeToBoard);
    shape = null;

    newScore(bFills.length);
    isTen();
        
}
function isTen() {
    const linesOfTen = [];
    let i = 0, j = 0;

    const isArrayOfTen = arrayOfTen => {
        if (arrayOfTen.every(fill => fill.dataset.shape)) linesOfTen.push(arrayOfTen);
    };
    // CHECK HORIZONTAL
    while (i < 10) {
        const arrayOfTen = boardFills.slice(i * 10, ((i + 1) * 10));

        isArrayOfTen(arrayOfTen);
        i++;
    }
    // CHECK VERTICAL
    while (j < 10) {
        const arrayOfTen = boardFills.filter((e,i) => (i % 10) === j);

        isArrayOfTen(arrayOfTen);
        j++;
    }

    if(linesOfTen.length){
        const power = getStored('power') || 0;
        // UPDATE POWERUPS AND DONT ADD MORE IF FULL ALREADY, ONLY ADD POWERUP IF 4 OR MORE LINES CLEARED
        if(power < 3 && linesOfTen.length >= 4){
            rotateDots[power].classList.add('show');
            setStored('power', power + 1);
        }

        cascadeFills(linesOfTen);
        newScore(linesOfTen.length * 10);

    } else {
        storeFillData();

        if(getStored('shapes').length){
            checkForSpace();
        } else {
            animateDrawer(false);
            createShapes();
        }
        
    }
}
function cascadeFills(lines){
    // FILLS NEED TO BE REARRANGED SO THAT THEY CASCADE IN ORDER FROM WHERE THE SHAPE COMPLETED THE LINE
    for (let i = 0; i < lines.length; i++) {
        let j              = 0;
        const firstLine    = lines[i];
        // SPLITS THE LINE IN TWO AT THE POINT WHERE THE SHAPE COMPLETED IT
        const newest       = firstLine.findIndex(fill => { return fill.dataset.newest;}) + 1;
        const secondLine   = firstLine.splice(newest, 10);
        const newLineOfTen = !(secondLine.length) ? firstLine.reverse() : rearrangeLine(firstLine,secondLine);
        const intervalId   = setInterval(function() {
            const fill = newLineOfTen[j];
            if(j < newLineOfTen.length) {
                fill.classList.add('transition');
                fill.addEventListener('transitionend', function(){return removeFillInfo(fill,j);});
                // playSound('c'+j);
                j++;
            } else {
                if(getStored('shapes').length){
                    checkForSpace();
                } else {
                    animateDrawer(false);
                    createShapes();
                }
                clearInterval(intervalId);
            }
        }, 100);
    }

    playSound('c0-9');

    function rearrangeLine(firstLine,secondLine){
        const lineOfTen = firstLine.reverse()
             .reduce((lineOfTen,fill,i) => {
                 const secFill = secondLine[i];
 
                 lineOfTen.push(fill);
                 // IF FIRST LINE IS LONGER THAT SENCOND THIS PREVENTS UNDEFINED FROM BEING ADDED TO ARRAY
                 if(secFill){lineOfTen.push(secFill);}
                 // IF AT LAST INDEX OF FIRST LINE BUT THERE IS MORE IN SECOND LINE SLICE FROM AFTER THE 
                 // CURRENT ITERATOR AND SPREAD THE RESULTING ARRAY INTO LINE OF TEN ARRAY
                 if(i === firstLine.length - 1 && i < secondLine.length){
                     lineOfTen.push(...secondLine.slice(i+1,10));
                 }
 
                 return lineOfTen;
                 }, []);
 
         return lineOfTen;
     }
     function removeFillInfo(fill,last){
 
         fill.classList.remove('transition');
         fill.removeAttribute('data-shape');
         fill.removeAttribute('data-size');
         fill.removeAttribute('data-newest');
         fill.removeEventListener('transitionend', removeFillInfo);
 
         // DONE HERE AFTER THE LAST ONE BECAUSE WILL LEAVE SOME BEHIND IN THE ELSE STATEMENT IN INTERVAL
         if(last >= 9) storeFillData();
     }
}

function animateDrawer(slideIn){
    if(slideIn){
        setTimeout(()=>{
            drawer.classList.add('slide');
            playSound('woosh');
        }, 300);
        drawer.addEventListener('transitionend', checkForSpace);
        
    } else {
        drawer.classList.remove('slide');
    }
    return slideIn;
}

function setTranslate(xPos, yPos, notMouseup) {
    shape.style.transform = notMouseup ? `translate3d(${xPos}px, ${yPos}px, 0)` : '';
}
function scaleFills(notMouseup){
    shape.childNodes.forEach(node => {
        if(node.classList && node.classList.contains('fill')){
            if(notMouseup){
                node.style.transform = `matrix(0.9, 0, 0, 0.9, 0, 0)`;
            } else {
                node.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
            }
        }
    });
}
function playSound(name){
    if(getStored('mute')) return;

    audioElement.src = `sounds/${name}.mp3`;

    audioElement.play();
}

function newScore(num){
    let currentScore = getStored('current') || 0,
        best         = getStored('best') || 0,
        newScore     = currentScore + num,
        newBest      = newScore > best,
        inter        = setInterval(updateScore, 80);
        
    setStored('current', newScore);
    if(newBest) setStored('best', newScore);

    function updateScore(){
        score.innerHTML = ++currentScore;

        if(newBest) {
            bestScore.innerHTML = currentScore;
        }

        if(!(--num)){
            clearInterval(inter);
        }
        
    }
}
function resizeFunc(){
    center_x      = board.offsetLeft + radius;
    center_y      = board.offsetTop + radius;
}

// MENU FUNCTIONS
function menuFunctions(e){
    const target = e.target;
    const id = target.id;

    if(id === 'menu-wrap'){
        if(colorMenu.classList.contains('show') || restartMenu.classList.contains('show')){
            colorMenu.classList.remove('show');
            restartMenu.classList.remove('show');
        } else {
            target.classList.remove('show');
        }

    } else if(id === 'restart'){
        restartMenu.classList.add('show');

    } else if(id === 'confirm-restart' || id === 'reset'){
        restartMenu.classList.remove('show');
        menuWrap.classList.remove('show');
        rotateDots.forEach(dot =>{dot.classList.remove('mustRotate');});
        restartGame();

    } else if(id === 'cancel-restart'){
        restartMenu.classList.remove('show');

    } else if(id === 'night'){
        setStored('night', body.classList.toggle(id));

    } else if(id === 'colorBlind'){
        body.classList.toggle(id);

    } else if(id === 'sound') {
        const mute = getStored('mute');
        body.classList.toggle('mute', !(mute));

        setStored('mute', !(mute));

    } else if(id === 'color-mode'){
        colorMenu.classList.add('show');

    } else if(target.classList.contains('color')){
        body.classList.remove('classic','dark','earth');
        body.classList.add(id);
        setStored('colors', id);

    }

    playSound('back');
}

// UTILITY FUNCTIONS //
function getStored(key){
    return JSON.parse(store.getItem(key));
}
function setStored(key, val) {
    store.setItem(key,JSON.stringify(val));
}

function randomize(min,max){
    const mn = max ? min : 0;
    const mx = max || min;
    return Math.floor(Math.random() * (mx - mn) + mn);
}
// function toNumber(a,b){
//     return +(a + '' + b);
// }

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}

initGame();

}(window));





