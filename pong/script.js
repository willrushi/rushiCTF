var _0x2612 = [
    'time',
    'Flag:\x20',
    'win',
    'font',
    '25px\x20Arial',
    'textAlign',
    'center',
    'fillText',
    '50px\x20Arial',
    'You\x20lost\x20:(\x20Press\x20space\x20to\x20try\x20again.',
    'addEventListener',
    'reload',
    'lose',
    'clearRect',
    'floor',
    'TIME\x20LEFT:\x20',
    'draw',
    '_0x49F92A',
    'getElementById',
    'myCanvas',
    'getContext',
    'getTime',
    'width',
    'height',
    'colour',
    '#FFFFFF',
    'fillStyle',
    'down',
    'getHeight',
    'yVel',
    'move',
    'xVel',
    'start',
    'tick',
    'api',
    'random',
    'components',
    'startTimer',
    'text',
    'player',
    'enemy',
    'ball',
    'keydown',
    'keyCode',
    'upKey',
    'downKey',
    'keyup',
    'update',
    'checkCollision',
    'checkWin',
    'checkGameOver',
    'timer',
    '_0x195F2B',
    '_0x99FA91B',
    'log',
    'Grabbing\x20key...',
    'post',
    'application/json',
    'stringify',
    '_0x12F1BB',
    'then',
    'json',
    'response',
    'fetchTime'
];
(function (_0x34955c, _0x27af52) {
    var _0x23eb02 = function (_0x461f92) {
        while (--_0x461f92) {
            _0x34955c['push'](_0x34955c['shift']());
        }
    };
    _0x23eb02(++_0x27af52);
}(_0x2612, 0x112));
var _0x39a3 = function (_0x326467, _0x587895) {
    _0x326467 = _0x326467 - 0x0;
    var _0x290f41 = _0x2612[_0x326467];
    return _0x290f41;
};
const canvas = document[_0x39a3('0x0')](_0x39a3('0x1'));
const ctx = canvas[_0x39a3('0x2')]('2d');
let getTime = () => {
    let _0x4ab61e = new Date();
    return _0x4ab61e[_0x39a3('0x3')]();
};
class Component {
    constructor(_0x746237, _0x46384c, _0x484999, _0x15f43c) {
        this[_0x39a3('0x4')] = _0x746237;
        this[_0x39a3('0x5')] = _0x46384c;
        this['x'] = _0x484999;
        this['y'] = _0x15f43c;
        this[_0x39a3('0x6')] = _0x39a3('0x7');
    }
    ['draw']() {
        ctx[_0x39a3('0x8')] = this[_0x39a3('0x6')];
        ctx['fillRect'](this['x'], this['y'], this[_0x39a3('0x4')], this[_0x39a3('0x5')]);
    }
}
class Paddle extends Component {
    constructor(_0x1a5176, _0x19ac53, _0x2de021, _0x38a5a5) {
        super(_0x1a5176, _0x19ac53, _0x2de021, _0x38a5a5);
    }
    ['move'](_0x35de0b) {
        if (_0x35de0b == 'up') {
            this['y'] += 0xa;
        }
        if (_0x35de0b == _0x39a3('0x9')) {
            this['y'] -= 0xa;
        }
    }
    [_0x39a3('0xa')]() {
        return this[_0x39a3('0x5')];
    }
}
class Ball extends Component {
    constructor(_0x3bdaba, _0x574241, _0x1955e4, _0x22675c) {
        super(_0x3bdaba, _0x574241, _0x1955e4, _0x22675c);
        this['xVel'] = -0x8;
        this[_0x39a3('0xb')] = 0x8;
    }
    [_0x39a3('0xc')]() {
        this['x'] += this[_0x39a3('0xd')];
        this['y'] += this['yVel'];
    }
}
class Game {
    constructor() {
        this[_0x39a3('0xe')]();
    }
    [_0x39a3('0xe')]() {
        this[_0x39a3('0xf')] = 0x0;
        this[_0x39a3('0x10')] = Math[_0x39a3('0x11')]();
        this['lose'] = ![];
        this['win'] = ![];
        this[_0x39a3('0x12')] = [];
        this['upKey'] = ![];
        this['downKey'] = ![];
        this[_0x39a3('0x13')] = getTime();
        this['timer'] = 0x1e;
        this[_0x39a3('0x14')] = '';
        this[_0x39a3('0x15')] = new Paddle(0x1e, 0xc8, 0x32, canvas[_0x39a3('0x5')] / 0x2 - 0x4b);
        this[_0x39a3('0x16')] = new Paddle(0x1e, 0xc8, canvas[_0x39a3('0x4')] - 0x50, canvas[_0x39a3('0x5')] / 0x2 - 0x4b);
        this[_0x39a3('0x17')] = new Ball(0x1e, 0x1e, canvas[_0x39a3('0x4')] / 0x2, canvas['height'] / 0x2);
        this[_0x39a3('0x12')]['push'](this[_0x39a3('0x15')], this[_0x39a3('0x16')], this[_0x39a3('0x17')]);
        document['addEventListener'](_0x39a3('0x18'), _0x2ed7ee => {
            if (_0x2ed7ee[_0x39a3('0x19')] == 0x28) {
                this[_0x39a3('0x1a')] = !![];
            }
            if (_0x2ed7ee['keyCode'] == 0x26) {
                this[_0x39a3('0x1b')] = !![];
            }
        });
        document['addEventListener'](_0x39a3('0x1c'), _0x56ba6e => {
            if (_0x56ba6e[_0x39a3('0x19')] == 0x28) {
                this['upKey'] = ![];
            }
            if (_0x56ba6e[_0x39a3('0x19')] == 0x26) {
                this[_0x39a3('0x1b')] = ![];
            }
        });
        requestAnimationFrame(() => this[_0x39a3('0x1d')]());
    }
    [_0x39a3('0x1e')]() {
        if (this[_0x39a3('0x17')]['y'] <= 0x0) {
            this[_0x39a3('0x17')]['yVel'] *= -0x1;
        }
        if (this['ball']['y'] + this[_0x39a3('0x17')][_0x39a3('0x5')] >= canvas[_0x39a3('0x5')]) {
            this[_0x39a3('0x17')][_0x39a3('0xb')] *= -0x1;
        }
        if (this['ball']['x'] < 0x32 + this['player'][_0x39a3('0x4')] / 0x2 + this[_0x39a3('0x17')][_0x39a3('0x4')] / 0x2 && this[_0x39a3('0x17')]['x'] > this['player'][_0x39a3('0x4')] / 0x2 + this[_0x39a3('0x17')][_0x39a3('0x4')] / 0x2) {
            if (this[_0x39a3('0x17')]['y'] + this[_0x39a3('0x17')][_0x39a3('0x5')] > this[_0x39a3('0x15')]['y'] && this[_0x39a3('0x17')]['y'] < this['player']['y'] + this[_0x39a3('0x15')][_0x39a3('0x5')]) {
                this[_0x39a3('0x17')]['xVel'] *= -1.15;
            }
        }
        if (this[_0x39a3('0x17')]['x'] > canvas[_0x39a3('0x4')] - 0x50 - this[_0x39a3('0x16')][_0x39a3('0x4')] / 0x2 - this[_0x39a3('0x17')][_0x39a3('0x4')] / 0x2) {
            if (this['ball']['y'] + this[_0x39a3('0x17')][_0x39a3('0x5')] > this[_0x39a3('0x16')]['y'] && this[_0x39a3('0x17')]['y'] < this[_0x39a3('0x16')]['y'] + this[_0x39a3('0x16')][_0x39a3('0x5')]) {
                this[_0x39a3('0x17')][_0x39a3('0xd')] *= -1.15;
            }
        }
    }
    ['_0x195F2B'](_0x5ee0a5) {
        return md5(_0x5ee0a5);
    }
    ['_0x49F92A']() {
        if (this[_0x39a3('0x17')][_0x39a3('0xd')] > 0x1) {
            let _0x17dfe9 = [
                this[_0x39a3('0xe')],
                this[_0x39a3('0x1e')],
                this[_0x39a3('0x1f')],
                this[_0x39a3('0x20')],
                this[_0x39a3('0x15')][_0x39a3('0xa')](),
                this[_0x39a3('0x16')][_0x39a3('0xa')](),
                this[_0x39a3('0x1d')],
                Math['floor'](this[_0x39a3('0x21')])
            ];
            let _0x583afa = '';
            _0x17dfe9['forEach'](_0x4a55f8 => {
                _0x583afa += _0x4a55f8['toString']();
            });
            return this[_0x39a3('0x22')](_0x583afa);
        }
    }
    [_0x39a3('0x23')]() {
        console[_0x39a3('0x24')](_0x39a3('0x25'));
        return new Promise((_0x2a6072, _0x271945) => {
            fetch('https://quickest-iron.glitch.me/key', {
                'method': _0x39a3('0x26'),
                'headers': { 'Content-Type': _0x39a3('0x27') },
                'body': JSON[_0x39a3('0x28')]({ 'key': this[_0x39a3('0x29')] })
            })[_0x39a3('0x2a')](_0x25094b => _0x25094b[_0x39a3('0x2b')]())[_0x39a3('0x2a')](_0x366d0d => {
                _0x2a6072(_0x366d0d[_0x39a3('0x2c')]);
            });
        });
    }
    [_0x39a3('0x2d')]() {
        return new Promise((_0x2d32a0, _0x2fc234) => {
            fetch('https://quickest-iron.glitch.me/time', {
                'method': _0x39a3('0x26'),
                'headers': { 'Content-Type': _0x39a3('0x27') },
                'body': JSON[_0x39a3('0x28')]({ 'apiKey': this['api'] })
            })['then'](_0x3d81f7 => _0x3d81f7[_0x39a3('0x2b')]())[_0x39a3('0x2a')](_0x3031aa => {
                _0x2d32a0(_0x3031aa[_0x39a3('0x2e')]);
            });
        });
    }
    ['checkWin']() {
        this[_0x39a3('0x2d')]()[_0x39a3('0x2a')](_0x3f9b36 => {
            if (_0x3f9b36 <= 0x1) {
                this[_0x39a3('0x23')]()[_0x39a3('0x2a')](_0x134f1f => {
                    console[_0x39a3('0x24')](_0x39a3('0x2f') + _0x134f1f);
                    this[_0x39a3('0x30')] = !![];
                    ctx[_0x39a3('0x8')] = _0x39a3('0x7');
                    ctx[_0x39a3('0x31')] = _0x39a3('0x32');
                    ctx[_0x39a3('0x33')] = _0x39a3('0x34');
                    ctx[_0x39a3('0x35')](_0x134f1f, canvas[_0x39a3('0x4')] / 0x2, canvas[_0x39a3('0x5')] / 0x2);
                });
            }
        });
    }
    [_0x39a3('0x20')]() {
        if (this[_0x39a3('0x17')]['x'] <= 0x0) {
            this[_0x39a3('0x14')] = '';
        }
    }
    ['checkLose']() {
        if (this[_0x39a3('0x17')]['x'] < -0xf) {
            this['lose'] = !![];
            ctx[_0x39a3('0x8')] = _0x39a3('0x7');
            ctx[_0x39a3('0x31')] = _0x39a3('0x36');
            ctx[_0x39a3('0x33')] = _0x39a3('0x34');
            ctx[_0x39a3('0x35')](_0x39a3('0x37'), canvas['width'] / 0x2, canvas[_0x39a3('0x5')] / 0x2);
            document[_0x39a3('0x38')](_0x39a3('0x18'), _0x322443 => {
                if (_0x322443[_0x39a3('0x19')] == 0x20) {
                    location[_0x39a3('0x39')]();
                }
            });
        }
    }
    [_0x39a3('0x1d')]() {
        this[_0x39a3('0xf')]++;
        if (this[_0x39a3('0xf')] % 0x3c == 0x0) {
            this['checkWin']();
        }
        this['checkLose']();
        if (this[_0x39a3('0x3a')] === !![]) {
        } else if (this[_0x39a3('0x30')] === ![]) {
            ctx[_0x39a3('0x3b')](0x0, 0x0, 0x5dc, 0x320);
            this[_0x39a3('0x21')] = 0x1e - Math[_0x39a3('0x3c')]((getTime() - this[_0x39a3('0x13')]) / 0x3e8);
            this[_0x39a3('0x14')] = _0x39a3('0x3d') + this['timer'];
            ctx['fillStyle'] = _0x39a3('0x7');
            ctx[_0x39a3('0x31')] = _0x39a3('0x36');
            ctx[_0x39a3('0x33')] = _0x39a3('0x34');
            ctx['fillText'](this[_0x39a3('0x14')], canvas[_0x39a3('0x4')] / 0x2, 0x32);
            this[_0x39a3('0x12')]['forEach'](_0x75f253 => _0x75f253[_0x39a3('0x3e')]());
            this['_0x12F1BB'] = this[_0x39a3('0x3f')]();
            this[_0x39a3('0x16')]['y'] = this['ball']['y'];
            this[_0x39a3('0x17')]['move']();
            this[_0x39a3('0x1e')]();
            if (this[_0x39a3('0x1a')]) {
                this[_0x39a3('0x15')][_0x39a3('0xc')]('up');
            }
            if (this[_0x39a3('0x1b')]) {
                this['player'][_0x39a3('0xc')](_0x39a3('0x9'));
            }
            requestAnimationFrame(() => this[_0x39a3('0x1d')]());
        }
    }
}
let game = new Game();