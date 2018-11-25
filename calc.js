let n0 = 0,
    n1 = 0,
    op = '',
    dot = false,
    r = 0;

class Display {
    constructor() {
        this._screen = document.getElementById('screen');
        this._minScreeen = document.getElementById('minscreen');
    }
    show(v) {
        this._screen.innerText += v;
    }

    prev(v) {
        this._minScreeen.innerText = v;
    }
    reset() {
        this._screen.innerText = '';
        this._minScreeen.innerText = '';
    }
}
const Dpy = new Display();

function addDot() {
    dot = true;
    Dpy.show('.');
}
function addValue(v) {
    Dpy.show(v);
    if (op.length == 0) {
        if (dot) {
            n0 = parseFloat(`${n0}.${v}`);
            dot = false;
        } else {
            n0 = parseFloat(`${n0}${v}`);
        }
    } else {
        if (dot) {
            n1 = parseFloat(`${n1}.${v}`);
            dot = false;
        } else {
            n1 = parseFloat(`${n1}${v}`);
        }
        prewCalc();
    }
}

function prewCalc() {
    r = calc(op);
    if (r != false) {
        Dpy.prev(r);
    }
}

function calc(op) {
    switch (op) {
        case '+':
            return (n0 + n1);
            break;
        case '-':
            return (n0 - n1);
            break;
        case '/':
            return (n0 / n1);
            break
        case 'x':
            return (n0 * n1);
            break
        default:
            Dpy.prev('Operação desconhecida.');
            return false;
            break;
    }
}
function result() {
    r = calc(op);
    n0 = r;
    n1 = 0;
    op = '';
    Dpy.reset();
    Dpy.show(r);
}
function del() {
    if (n1 > 0) {
        v = n1.toString();
        if (v.length == 1) {
            n1 = 0;
            Dpy.reset();
            Dpy.show(`${n0}${op}`);
        } else {
            nv = v.substring(-1, v.length - 1);
            n1 = nv;
            Dpy.reset();
            Dpy.show(`${n0}${op}${n1}`);
        }
    } else if (op.length > 0) {
        op = '';
        Dpy.reset();
        Dpy.show(`${n0}`);
    } else {
        v = n0.toString();
        if (v.length == 1) {
            n0 = 0;
            Dpy.reset();
        } else {
            nv = v.substring(-1, v.length - 1);
            n0 = nv;
            Dpy.reset();
            Dpy.show(`${n0}`);
        }
    }
}
function addOp(v) {
    if (op.length > 0) {
        r = calc(op);
        op = '';
        n1 = 0;
        n0 = r;
        Dpy.reset();
        Dpy.show(`${r}`);
    }
    op = v;
    Dpy.show(v);
}

// Registra o service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./pwa-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        }, function (error) {
            console.error(error);
        });
}