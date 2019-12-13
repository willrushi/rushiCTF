var _0x29bc = [
    'fillStyle',
    'font',
    '25px\x20Arial',
    'textAlign',
    'fillText',
    'You\x20lost\x20:(\x20Press\x20space\x20to\x20try\x20again.',
    'TIME\x20LEFT:\x20',
    '50px\x20Arial',
    'center',
    'myCanvas',
    'getContext',
    'width',
    'colour',
    '#FFFFFF',
    'draw',
    'fillRect',
    'move',
    'down',
    'height',
    'xVel',
    'yVel',
    'start',
    'tick',
    'api',
    'random',
    'lose',
    'win',
    'components',
    'downKey',
    'startTimer',
    'timer',
    'text',
    'player',
    'enemy',
    'ball',
    'push',
    'addEventListener',
    'keydown',
    'keyCode',
    'keyup',
    'upKey',
    'update',
    'checkCollision',
    '_0x195F2B',
    '_0x49F92A',
    'abs',
    'checkGameOver',
    'floor',
    '_0x10F10FAB',
    'forEach',
    '_0x99FA91B',
    'log',
    'Grabbing\x20key...',
    '/key',
    'post',
    'stringify',
    '_0x12F1BB',
    'then',
    'json',
    'response',
    '/time',
    'time',
    'checkWin',
    'Flag:\x20'
];
(function (_0x429ab5, _0xba3092) {
    var _0x2d8373 = function (_0x55dfe2) {
        while (--_0x55dfe2) {
            _0x429ab5['push'](_0x429ab5['shift']());
        }
    };
    _0x2d8373(++_0xba3092);
}(_0x29bc, 0x1c9));
var _0x1c61 = function (_0x16a425, _0x19d48a) {
    _0x16a425 = _0x16a425 - 0x0;
    var _0x4f4b18 = _0x29bc[_0x16a425];
    return _0x4f4b18;
};
const canvas = document['getElementById'](_0x1c61('0x0'));
const ctx = canvas[_0x1c61('0x1')]('2d');
const regex = /[ \n\r\t]/g;
let getTime = () => {
    let _0x2ad816 = new Date();
    return _0x2ad816['getTime']();
};
class Component {
    constructor(_0x5d52f1, _0x42b5dd, _0xb171e4, _0x1c5f5c) {
        this[_0x1c61('0x2')] = _0x5d52f1;
        this['height'] = _0x42b5dd;
        this['x'] = _0xb171e4;
        this['y'] = _0x1c5f5c;
        this[_0x1c61('0x3')] = _0x1c61('0x4');
    }
    [_0x1c61('0x5')]() {
        ctx['fillStyle'] = this[_0x1c61('0x3')];
        ctx[_0x1c61('0x6')](this['x'], this['y'], this[_0x1c61('0x2')], this['height']);
    }
}
class Paddle extends Component {
    constructor(_0x5c11d0, _0x420c42, _0x381fd3, _0x452b12) {
        super(_0x5c11d0, _0x420c42, _0x381fd3, _0x452b12);
    }
    [_0x1c61('0x7')](_0x2fd095) {
        if (_0x2fd095 == 'up') {
            this['y'] += 0xa;
        }
        if (_0x2fd095 == _0x1c61('0x8')) {
            this['y'] -= 0xa;
        }
    }
    ['getHeight']() {
        return this[_0x1c61('0x9')];
    }
}
class Ball extends Component {
    constructor(_0x3d6b49, _0x25a9d7, _0x286d6e, _0x3b048f) {
        super(_0x3d6b49, _0x25a9d7, _0x286d6e, _0x3b048f);
        this[_0x1c61('0xa')] = -0x8;
        this[_0x1c61('0xb')] = 0x8;
    }
    [_0x1c61('0x7')]() {
        this['x'] += this[_0x1c61('0xa')];
        this['y'] += this[_0x1c61('0xb')];
    }
}
class Game {
    constructor() {
        this[_0x1c61('0xc')]();
    }
    [_0x1c61('0xc')]() {
        this[_0x1c61('0xd')] = 0x0;
        this[_0x1c61('0xe')] = Math[_0x1c61('0xf')]();
        this[_0x1c61('0x10')] = ![];
        this[_0x1c61('0x11')] = ![];
        this[_0x1c61('0x12')] = [];
        this['upKey'] = ![];
        this[_0x1c61('0x13')] = ![];
        this[_0x1c61('0x14')] = getTime();
        this[_0x1c61('0x15')] = 0x1e;
        this[_0x1c61('0x16')] = '';
        this[_0x1c61('0x17')] = new Paddle(0x1e, 0xc8, 0x32, canvas[_0x1c61('0x9')] / 0x2 - 0x4b);
        this[_0x1c61('0x18')] = new Paddle(0x1e, 0xc8, canvas[_0x1c61('0x2')] - 0x50, canvas[_0x1c61('0x9')] / 0x2 - 0x4b);
        this[_0x1c61('0x19')] = new Ball(0x1e, 0x1e, canvas[_0x1c61('0x2')] / 0x2, canvas['height'] / 0x2);
        this[_0x1c61('0x12')][_0x1c61('0x1a')](this[_0x1c61('0x17')], this[_0x1c61('0x18')], this['ball']);
        document[_0x1c61('0x1b')](_0x1c61('0x1c'), _0x948b6c => {
            if (_0x948b6c[_0x1c61('0x1d')] == 0x28) {
                this['upKey'] = !![];
            }
            if (_0x948b6c['keyCode'] == 0x26) {
                this[_0x1c61('0x13')] = !![];
            }
        });
        document['addEventListener'](_0x1c61('0x1e'), _0x432180 => {
            if (_0x432180[_0x1c61('0x1d')] == 0x28) {
                this[_0x1c61('0x1f')] = ![];
            }
            if (_0x432180[_0x1c61('0x1d')] == 0x26) {
                this['downKey'] = ![];
            }
        });
        requestAnimationFrame(() => this[_0x1c61('0x20')]());
    }
    [_0x1c61('0x21')]() {
        if (this[_0x1c61('0x19')]['y'] <= 0x0) {
            this['ball']['yVel'] *= -0x1;
        }
        if (this[_0x1c61('0x19')]['y'] + this['ball']['height'] >= canvas[_0x1c61('0x9')]) {
            this[_0x1c61('0x19')][_0x1c61('0xb')] *= -0x1;
        }
        if (this[_0x1c61('0x19')]['x'] < 0x32 + this[_0x1c61('0x17')][_0x1c61('0x2')] / 0x2 + this[_0x1c61('0x19')]['width'] / 0x2 && this['ball']['x'] > this['player'][_0x1c61('0x2')] / 0x2 + this[_0x1c61('0x19')][_0x1c61('0x2')] / 0x2) {
            if (this[_0x1c61('0x19')]['y'] + this[_0x1c61('0x19')][_0x1c61('0x9')] > this['player']['y'] && this[_0x1c61('0x19')]['y'] < this[_0x1c61('0x17')]['y'] + this[_0x1c61('0x17')][_0x1c61('0x9')]) {
                this[_0x1c61('0x19')][_0x1c61('0xa')] *= -1.15;
            }
        }
        if (this['ball']['x'] > canvas[_0x1c61('0x2')] - 0x50 - this['enemy'][_0x1c61('0x2')] / 0x2 - this['ball'][_0x1c61('0x2')] / 0x2) {
            if (this[_0x1c61('0x19')]['y'] + this[_0x1c61('0x19')][_0x1c61('0x9')] > this['enemy']['y'] && this[_0x1c61('0x19')]['y'] < this[_0x1c61('0x18')]['y'] + this[_0x1c61('0x18')][_0x1c61('0x9')]) {
                this[_0x1c61('0x19')][_0x1c61('0xa')] *= -1.15;
            }
        }
    }
    [_0x1c61('0x22')](_0x20559e) {
        return md5(_0x20559e);
    }
    [_0x1c61('0x23')]() {
        if (Math[_0x1c61('0x24')](this[_0x1c61('0x19')][_0x1c61('0xa')]) > 0x3) {
            let _0x4bb1e3 = [
                this[_0x1c61('0xc')],
                this[_0x1c61('0x21')],
                this['checkWin'],
                this[_0x1c61('0x25')],
                this['player']['height'],
                this[_0x1c61('0x18')][_0x1c61('0x9')],
                this[_0x1c61('0x19')][_0x1c61('0x2')],
                this[_0x1c61('0x19')][_0x1c61('0x9')],
                this[_0x1c61('0x20')],
                Math[_0x1c61('0x26')](this[_0x1c61('0x27')])
            ];
            let _0x370d86 = '';
            _0x4bb1e3[_0x1c61('0x28')](_0x16b1ca => {
                _0x370d86 += _0x16b1ca['toString']();
            });
            _0x370d86 = _0x370d86['replace'](regex, '');
            return this[_0x1c61('0x22')](_0x370d86);
        }
    }
    [_0x1c61('0x29')]() {
        console[_0x1c61('0x2a')](_0x1c61('0x2b'));
        return new Promise((_0x526cf3, _0x384319) => {
            fetch(_0x1c61('0x2c'), {
                'method': _0x1c61('0x2d'),
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON[_0x1c61('0x2e')]({ 'key': this[_0x1c61('0x2f')] })
            })[_0x1c61('0x30')](_0x14433c => _0x14433c[_0x1c61('0x31')]())[_0x1c61('0x30')](_0x11c3b6 => {
                _0x526cf3(_0x11c3b6[_0x1c61('0x32')]);
            });
        });
    }
    ['fetchTime']() {
        return new Promise((_0x3652a7, _0x468813) => {
            fetch(_0x1c61('0x33'), {
                'method': _0x1c61('0x2d'),
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON[_0x1c61('0x2e')]({ 'apiKey': this[_0x1c61('0xe')] })
            })[_0x1c61('0x30')](_0x824a4f => _0x824a4f[_0x1c61('0x31')]())[_0x1c61('0x30')](_0x296f41 => {
                _0x3652a7(_0x296f41[_0x1c61('0x34')]);
            });
        });
    }
    [_0x1c61('0x35')]() {
        this['fetchTime']()[_0x1c61('0x30')](_0x5d1e0e => {
            if (_0x5d1e0e < 0x1) {
                this[_0x1c61('0x27')] = _0x5d1e0e;
                this[_0x1c61('0x2f')] = this[_0x1c61('0x23')]();
                this[_0x1c61('0x29')]()[_0x1c61('0x30')](_0x5180f1 => {
                    console[_0x1c61('0x2a')](_0x1c61('0x36') + _0x5180f1);
                    this[_0x1c61('0x11')] = !![];
                    ctx[_0x1c61('0x37')] = _0x1c61('0x4');
                    ctx[_0x1c61('0x38')] = _0x1c61('0x39');
                    ctx[_0x1c61('0x3a')] = 'center';
                    ctx[_0x1c61('0x3b')](_0x5180f1, canvas['width'] / 0x2, canvas[_0x1c61('0x9')] / 0x2);
                });
            }
        });
    }
    [_0x1c61('0x25')]() {
        if (this[_0x1c61('0x19')]['x'] <= 0x0) {
            this[_0x1c61('0x16')] = '';
        }
    }
    ['checkLose']() {
        if (this[_0x1c61('0x19')]['x'] < -0xf) {
            this[_0x1c61('0x10')] = !![];
            ctx[_0x1c61('0x37')] = _0x1c61('0x4');
            ctx[_0x1c61('0x38')] = '50px\x20Arial';
            ctx[_0x1c61('0x3a')] = 'center';
            ctx[_0x1c61('0x3b')](_0x1c61('0x3c'), canvas[_0x1c61('0x2')] / 0x2, canvas[_0x1c61('0x9')] / 0x2);
            document['addEventListener'](_0x1c61('0x1c'), _0x3bfce8 => {
                if (_0x3bfce8[_0x1c61('0x1d')] == 0x20) {
                    location['reload']();
                }
            });
        }
    }
    [_0x1c61('0x20')]() {
        this[_0x1c61('0xd')]++;
        if (this[_0x1c61('0xd')] % 0x3c == 0x0) {
            this[_0x1c61('0x35')]();
        }
        this['checkLose']();
        if (this[_0x1c61('0x10')] === !![]) {
        } else if (this[_0x1c61('0x11')] === ![]) {
            ctx['clearRect'](0x0, 0x0, 0x5dc, 0x320);
            this[_0x1c61('0x15')] = 0x1e - Math[_0x1c61('0x26')]((getTime() - this[_0x1c61('0x14')]) / 0x3e8);
            this[_0x1c61('0x16')] = _0x1c61('0x3d') + this['timer'];
            ctx[_0x1c61('0x37')] = _0x1c61('0x4');
            ctx['font'] = _0x1c61('0x3e');
            ctx[_0x1c61('0x3a')] = _0x1c61('0x3f');
            ctx['fillText'](this[_0x1c61('0x16')], canvas[_0x1c61('0x2')] / 0x2, 0x32);
            this[_0x1c61('0x12')][_0x1c61('0x28')](_0x13cb1f => _0x13cb1f[_0x1c61('0x5')]());
            this[_0x1c61('0x18')]['y'] = this[_0x1c61('0x19')]['y'];
            this[_0x1c61('0x19')][_0x1c61('0x7')]();
            this[_0x1c61('0x21')]();
            if (this[_0x1c61('0x1f')]) {
                this[_0x1c61('0x17')][_0x1c61('0x7')]('up');
            }
            if (this[_0x1c61('0x13')]) {
                this['player']['move'](_0x1c61('0x8'));
            }
            requestAnimationFrame(() => this[_0x1c61('0x20')]());
        }
    }
}
let game = new Game();