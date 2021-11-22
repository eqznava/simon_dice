/*Aqui se obtiene acceso a cada elemento de el documento por su id y se aloja en una constante para
poder trabajar con ello*/

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
    // Este es el mensaje de bienvenida
swal('Bienvenido/a', 'El juego es de 10 niveles', 'info')
    // Se crea la clase juego con sus constructores
class Juego {
    /* Este prototipo utliza el metodo bind que retorna una nueva funcion con los parametros
    nuevos asignados, ademas de generar el un nuevo nivel cada vez que es pasado el nivel actual
    con un retraso de un segundo con el metodo setTimeout,tambien se utilizan las funciones inicializar y
    generarSecuencia por cada nivel*/
    constructor() {
            this.inicializar = this.inicializar.bind(this)
            this.inicializar()
            this.generarSecuencia()
            setTimeout(this.siguienteNivel, 500)
        }
        /*Esta prototipo inicializa el juego con los colores determinados por nosotros, ademas de tambien
        utilizar bind para obtener una funcion con nuevos parametros, y la prototipo toggleBtnEmpezar
        para iniciar el juegos despues de presionar el boton de empezar*/
    inicializar() {
            this.siguienteNivel = this.siguienteNivel.bind(this)
            this.elegirColor = this.elegirColor.bind(this)
            this.toggleBtnEmpezar()
            this.nivel = 1
            this.colores = {
                celeste,
                violeta,
                naranja,
                verde
            }
        }
        /*Esta prototipo oculta el boton de empezar despues de presionarlo*/
    toggleBtnEmpezar() {
            if (btnEmpezar.classList.contains('hide')) {
                btnEmpezar.classList.remove('hide')
            } else {
                btnEmpezar.classList.add('hide')
            }
        }
        /*Esta prototipo genera una secuencia de numeros aleatorios entre 0 y 1 para despues utilizarlos
        con los colores y asi generar la secuencia a seguir por el jugador, ademas de que dicha secuencia de colores sera
        de solo cuatro nuemeros y con la funcion Math.Floor vamos a convertir de un número con decimales en numeros enteros*/
    generarSecuencia() {
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
        }
        /*Esta prototipo inicializa el nivel en 0 y agrega la prototipo de iluminarSecuecncia  y agregar agregarEventosClick*/
    siguienteNivel() {
            this.subnivel = 0
            this.iluminarSecuecncia()
            this.agregarEventosClick()
        }
        /*Aqui se utilizan estas dos prototipo transformarNumeroAColor y transformarColorANumero para poder crear
        la secuencia de iluminacion para el jugador*/
    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(color) {
            switch (color) {
                case 'celeste':
                    return 0
                case 'violeta':
                    return 1
                case 'naranja':
                    return 2
                case 'verde':
                    return 3
            }
        }
        /*Aqui terminan las transformaciones*/

    /*Esta prototipo ilumina la secuencia con un ciclo for utlizando el numero que se le asigne a el parametro nivel
    que en este caso en 1, asi segun sea el nivel seran la cantidad de colores que se iluminan
    con un tiempo entre cada color de 1 segundo*/
    iluminarSecuecncia() {
            for (let i = 0; i < this.nivel; i++) {
                const color = this.transformarNumeroAColor(this.secuencia[i])
                setTimeout(() => this.iluminarColor(color), 1000 * i)
            }
        }
        /*Estas dos funciones sirven para crear el encendido y apagado de los colores
        gracias a el atributo de la classList light con un retraso de 350 milisegundos*/
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color) {
            this.colores[color].classList.remove('light')
        }
        /*****************************************************************************/

    /*Aqui se le agregan los eventos de click a cada color con la prototipo elegir color*/
    agregarEventosClick() {
            this.colores.celeste.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
            this.colores.violeta.addEventListener('click', this.elegirColor)
            this.colores.naranja.addEventListener('click', this.elegirColor)
        }
        /*Se eliminan los eventos de click para no ocumular espacio de memoria */
    eliminarEventosClick() {
            this.colores.celeste.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
            this.colores.violeta.removeEventListener('click', this.elegirColor)
            this.colores.naranja.removeEventListener('click', this.elegirColor)
        }
        /*La primer linea de esta prototipo obtiene el nombre de el color gracias a target y
        lo almacena en una constante que se llama nombreColor y en la siguiente linea lo
        transforma de color a numero y almacena el numero en otra constante llamada numeroColor,
        despues se utiliza una secuencia de if para poder comparar los colores elegidos con los
        de la secuencia si son correctos pasas al siguiente nivel con una espera de 1500 milisegundos
        hasta terminar todos los niveles y mandar el mensaje de que se ah completado el juego,
        de lo contratio mandar un mensaje en donde se indica que ah fallado*/
    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
                if (this.subnivel === this.nivel) {
                    this.nivel++
                        this.eliminarEventosClick()
                    if (this.nivel === (ULTIMO_NIVEL + 1)) {
                        this.ganoElJuego()
                    } else {
                        setTimeout(this.sigNivel(), 500)
                    }
                }
        } else {
            this.perdioElJuego()
        }
    }

    sigNivel() {
        swal('Eres genial !', 'Pasaste al siguiente nivel', 'success')
            .then(this.siguienteNivel)
    }
    ganoElJuego() {
        swal('Eres genial !', 'Felicidades, gracias por jugar mi juego', 'success')
            .then(this.inicializar)
    }

    perdioElJuego() {
        swal('Perdiste', 'intentalo de nuevo', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }
}
/*Aqui es donde todo el juego se inicializa*/
function empezarJuego() {
    window.juego = new Juego()
}