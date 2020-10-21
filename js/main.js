document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const root = document.querySelector('.root')

    function renderWelcomeForm() {
        fetch('html/welcome.form.html')
        .then(resp => resp.text())
        .then(html => {
            root.innerHTML = html
            document.querySelector('.form-welcome').addEventListener('submit', getColorInput)
        })
        .catch(exc => root.innerHTML = exc)
    }
    renderWelcomeForm();

    function getColorInput() {
        let color = document.querySelector('#inp-color').value
        createStyles(color)
        initializeBoard()
    }

    function createStyles(color) {
        let styleEl = document.createElement('style');  
        document.head.appendChild(styleEl);      
        styleEl.sheet.insertRule(`  .bg-switch { 
                                        background-color: ${color}; 
                                        animation: pulse .3s; 
                                    .border-switch { 
                                        border: 1px solid ${color}; 
                                        animation: pulse .9s;
                                    .grid-switch {
                                        width: 90vw;
                                        height: 180vw;
                                        margin: 0; 
                                        display: grid;
                                        grid-template-columns: repeat(10, 1fr);   
                                        grid-template-rows: repeat(20, 1fr); 
                                    }`, 0); 
    }

    function setBoardStyle() {
        root.innerHTML = '';
        root.classList.toggle('board')
        root.classList.toggle('grid-switch')
        root.classList.toggle('border-switch')
        root.classList.toggle('grid-switch')
        document.body.classList.toggle('bg-switch')
        root.classList.toggle('bg-black')
    }

    function initializeBoard() {
        setBoardStyle()
        root.classList.toggle('welcome')
        if(root.classList.contains('bg-black')) {
            root.classList.remove('bg-black')
        }
        for(let i=0; i<50; i++) {
            let square = document.createElement('div')
            square.classList.add('square')
            square.setAttribute('data-id', i)
            square.classList.add(`square-${i}`)
            square.classList.add('square-size')
            root.appendChild(square)
        }
        let squares = document.querySelectorAll('.square')
        for(let sq of squares) {
            sq.addEventListener('click', () => {
                setColor(sq)
            })
        }
    }

    function setColor(sq) {
        let id = sq.dataset.id
        if(!getStatusBoard()) {
            document.querySelector(`.square-${id}`).classList.toggle(`bg-switch`)
        } else {
//            setTimeout(getWinnerAlert, 5000)
            getWinnerAlert()
        }
    }

    function getStatusBoard() {
        let count = 1
        let squares = document.querySelectorAll('.square')
        for(let sq of squares) {
            if(sq.classList.contains('bg-switch')) {
                count++
            }
        }
        return count == 50
    }

    function getWinnerAlert() {
        setBoardStyle()
        let img = document.createElement('img')
        img.src = 'https://t3.ftcdn.net/jpg/03/14/56/66/360_F_314566645_UNHlYyGK2EVdGQ8MoNw95vvH44yknrc7.jpg'
        img.id = 'resetGame'
        root.appendChild(img)
        document.getElementById('resetGame').addEventListener('click', initializeBoard)
    }
    
    
    /**
     * Agregar una regla de hoja de estilos al documento (sin embargo, una mejor práctica puede ser
     * cambiar las clases dinamicamente, así se mantiene la información de estilo en
     * hojas de estilo genuinas (evitando agregar elementos extras al DOM))
     * Note que se necesita una matriz para las declaraciones y reglas ya que ECMAScript 
     * no proporciona un orden de iteración predecible y como CSS  
     * depende del orden(i.e., es cascada); aquellos sin necesidad de
     * reglas en cascada podrían construir una API basada en objetos de acceso más amigable.
     * @param {Matriz} reglas. Acepta una matriz de  declaraciones JSON-encoded
     * 
     * @example 
     * */
    /*
    let rules = addStylesheetRules(
        [
            ['h2', // Acepta un segundo argumento como una matriz de matrices
                ['color', 'red'],
                ['background-color', 'green', true] // 'true' para reglas !important
            ], 
            ['.myClass', 
                ['background-color', 'yellow']
            ]
        ]
    )
    
    function addStylesheetRules (decls) {
        let styleEl = document.createElement('style');
        document.head.appendChild(styleEl);
        let s = styleEl.sheet;

        for (let i=0, rl = rules.length; i < rl; i++) {
            let j = 1, rule = rules[i], selector = decls[0], propStr = '';
        // Si el segundo argumento de una regla es una matriz de matrices, corrijamos nuestras variables.
        if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
            rule = rule[1];
            j = 0;
        }
        for (let pl=rule.length; j < pl; j++) {
            let prop = rule[j];
            propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
        }
        s.insertRule(selector + '{' + propStr + '}', s.cssRules.length);
        }
    }
    */










})