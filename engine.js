class Board {
    constructor() {
        this.board = [];
        this.playerColor;
        this.aiColor;
        this.initializeBoard();
        this.initializeFigures();
    }
    
    initializeBoard() {
        console.log("initialize board");

        for (var i = 1; i <= 8; i++) {
            this.board[i] = {
                'a': undefined,
                'b': undefined,
                'c': undefined,
                'd': undefined,
                'e': undefined,
                'f': undefined,
                'g': undefined,
                'h': undefined
            };
        }
    }
    
    initializeFigures() {
        console.log("initialize figures");

        for (var i = 97; i <= 104; i++) {
            var key = String.fromCharCode(i);
            
            var wp = new Pawn("white");
            wp.setPosition(key, 2);
            this.board[2][key] = wp;
            
            var bp = new Pawn("black");
            bp.setPosition(key, 7);
            this.board[7][key] = bp;
        }

        this.board[1]['a'] = new Rook('white');
        this.board[1]['a'].setPosition('a', 1);
    
        this.board[1]['h'] = new Rook('white');
        this.board[1]['h'].setPosition('h', 1);
        
        this.board[1]['b'] = new Knight('white');
        this.board[1]['b'].setPosition('b', 1);
        
        this.board[1]['g'] = new Knight('white');
        this.board[1]['g'].setPosition('g', 1);
        
        this.board[1]['c'] = new Bishop('white');
        this.board[1]['c'].setPosition('c', 1);
        
        this.board[1]['f'] = new Bishop('white');
        this.board[1]['f'].setPosition('f', 1);
        
        this.board[1]['d'] = new Quin('white');
        this.board[1]['d'].setPosition('d', 1);
        
        this.board[1]['e'] = new King('white');
        this.board[1]['e'].setPosition('e', 1);
        
        
        
        this.board[8]['e'] = new King('black');
        this.board[8]['e'].setPosition('e', 8);
        
        this.board[8]['d'] = new Quin('black');
        this.board[8]['d'].setPosition('c', 8);
        
        this.board[8]['c'] = new Bishop('black');
        this.board[8]['c'].setPosition('c', 8);
        
        this.board[8]['f'] = new Bishop('black');
        this.board[8]['f'].setPosition('f', 8);
        
        this.board[8]['b'] = new Knight('black');
        this.board[8]['b'].setPosition('b', 8);
        
        this.board[8]['g'] = new Knight('black');
        this.board[8]['g'].setPosition('g', 8);

        this.board[8]['a'] = new Rook('black');
        this.board[8]['a'].setPosition('a', 8);
    
        this.board[8]['h'] = new Rook('black');
        this.board[8]['h'].setPosition('h', 8);
    }
    
    setPlayerColor(color) {
        this.playerColor = color;
    }
    
    setAiColor(color) {
        this.aiColor = color;
    }
    
    playerMoove(from, to, figure, params = null) {
        if (this.checkRools(from, to, figure, params)) {
            this.board[from.num][from.lit].setPosition(to.lit, to.num);
            this.board[to.num][to.lit] = this.board[from.num][from.lit];
            this.board[from.num][from.lit] = undefined;
        }
    }
    
    checkRools(from, to, figure, params) {
        if (!params) {
            return false;
        }
        switch (figure.getName()) {
            case 'pawn' :
                if (from.lit == to.lit 
                    && params.moove == "forward" 
                    && parms.firstMoove 
                    && Math.abs(to.num - from.num) >= 2) {
                    return true;
                } else if (params.fight 
                        && Math.abs(to.num - from.num) >= 1 
                        && this.getEncodedSubstractChar(to.lit, from.lit) >=1
                        && params.moove == "forward") {
                    return true;
                } else if (from.lit == to.lit 
                        && params.moove == "forward" 
                        && Math.abs(to.num - from.num) >= 1) {
                    return true;
                } else {
                    return false;
                }
            case 'rook' :
                if (from.lit == to.lit) {
                    return true;
                } else if (from.num == to.num) {
                    return true;
                } else {
                    return false;
                }
            case 'knight ' :
                if (Math.abs(from.num - to.num) == 1 
                    && this.getEncodedSubstractChar(from.lit, to.lit) == 2) {
                        
                    return true;
                } else if (Math.abs(from.num - to.num) == 2 
                    && this.getEncodedSubstractChar(from.lit, to.lit) == 1) {
                        
                    return true;
                } else {
                    return false;
                }
            case 'bishop' :
                if (Math.abs(from.num - to.num) == this.getEncodedSubstractChar(from.lit, to.lit)) {
                    return true;
                } else {
                    return false;
                }
            case 'quin' :
                return true;
            case 'king' :
                if (Math.abs(from.num - to.num) == 1 
                    && from.lit == to.lit) {
                        
                        return true;
                } else if (from.num == to.num 
                        && this.getEncodedSubstractChar(from.lit, to.lit) == 1) {
                        
                        return true;    
                } else if (Math.abs(from.num - to.num) == 1 
                        && this.getEncodedSubstractChar(from.lit, to.lit) == 1) {
                    
                    return true;
                } else {
                    return false;
                }
            default :
                return false;
        }
    }
    
    getEncodedSubstractChar(a, b) {
        var _a = a.charCodeAt(0);
        var _b = b.charCodeAt(0);
        
        return Math.abs(_a - _b);
    }
    
}

class Figure {
    constructor(color) {
        this.color = color;
        this.position = {
            lit: undefined,
            num: undefined
        };
        this.alive = true;
    }
    
    getPosition() {
        return this.position;
    }
    
    setPosition(lit, num) {
        this.position.lit = lit;
        this.position.num = num;
    }
    
    getColor() {
        return this.color;
    }
    
    getAlive() {
        return this.alive;
    }
}

class Pawn extends Figure {
    getName() {
        return "pawn";
    }
}

class Rook extends Figure {
    getName() {
        return "rook";
    }
}

class Bishop extends Figure {
    getName() {
        return "bishop";
    }
}

class Knight extends Figure {
    getName() {
        return "knight";
    }
}

class Quin extends Figure {
    getName() {
        return "quin";
    }
}

class King extends Figure {
    getName() {
        return "king";
    }
}

class AI {
    constructor(color) {
        this.color = color;
        this._board;
        this.virtualBoard;
        this._params = {};
        this.mypossible = undefined;
        this.oponentpossible = undefined;

        this.Brain = class Brain {
            constructor(board, figure, oponentPossible) {
                this.board_ = board;
                this.figure = figure;
                this.enemy = oponentPossible;
            }

            analizePosition(lit, num) {
                var key = undefined;
                var enemyPossibleFight = this.enemy.possible_fight[ key ];
            }
        }
    }
    
    getDecision(board, params) {
        this._board = board;
        this._params.fightIterator = 0;
        this._params.virtualColor = undefined;
        
        if (params.firstMoove && this.color == 'white') {
            return this.firstMoove();
        }

        this.asyncFunction(this.iterateBoard(false, this.mypossible)).then(
            this.asyncFunction(this.iterateBoard(false, this.oponentpossible)));


        for (var i = 1; i <= 8; i++) {
            for (var j = 97; j <= 104; j++) {
                var key = String.fromCharCode(j);

                var cell = this._board[i][key];

                if (cell) {
                    if (cell.getColor() == this.color) {
                        var keyInCollection = this.generatePossibleMooveKey(cell);

                        var possibleMooves = this.mypossible.possible[ keyInCollection ];

                        var possibleMoovesFight = this.mypossible.possible_fight[ keyInCollection ];

                        possibleMooves.forEach(function(item, i) {
                            
                        });
                    }
                }
            }
        }

    }

    asyncFunction(variable ,work) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(work)
            }, 100)
        });
    }

    iterateBoard(virtualColor, playerObject) {
        var possible = {};
        for (var i = 1; i <= 8; i++) {
            for (var j = 97; j <= 104; j++) {
                var key = String.fromCharCode(j);
                
                var cell = this._board.board[i][key];

                if (cell) {
                    if (cell.getColor() == this.color) {
                        this._params.fightIterator = 0;
                        var key = this.generatePossibleMooveKey(cell);

                        var positions = this.getPossiblePositions(cell, virtualColor);

                        possible.possible[ key ] = positions.checkedPoints;
                        possible.possible_fight[ key ] = positions.checkedPointsForFight;
                    }
                }
            }
        }

        playerObject = possible;
    }

    generatePossibleMooveKey(cell) {
        var key = "";
        var position = cell.getPosition();

        key += cell.getName();
        key += position.lit.toString();
        key += position.num.toString();

        return key;

    }
    
    firstMoove() {
        var pawnLit = String.fromCharCode(this.getRandomNumber(97, 104));
        
        to = {
            lit: pawnLit,
            num: 5
        }
        
        return to;
    }
    
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    getRange(name, params = {}) {
        switch (name) {
            case 'pawn' :
                
                var ret;
                
                if (params.fight) {
                    ret = [
                        {
                            num: 1,
                            lit: 1
                        }  
                    ];
                } else if (params.firstMoove) {
                    ret = [
                        {
                            num: 2
                        }
                    ];
                } else {
                    ret = [
                        {
                            num: 1
                        }
                    ];
                }
                
                return ret;
            
            case 'rook' :
                var ret = [
                    {
                        num: 8
                    },
                    {
                        lit: 8
                    }
                ];
                
                return ret;
                
            case 'knight' :
                var ret = [
                    {
                        num: 1,
                        lit: 2
                    },
                    {
                        num: 2,
                        lit: 1
                    }
                ];
                
                return ret;
                
            case 'bishop' :
                var ret = [
                    {
                        num: 8,
                        lit: 8
                    }
                ];
                
                return ret;
                
            case 'quin' :
                var ret = [
                    {
                        num: 8
                    },
                    {
                        lit: 8
                    },
                    {
                        num: 8,
                        lit: 8
                    }
                ];
                
                return ret;
                
            case 'king' :
                var ret = [
                    {
                        num: 1
                    },
                    {
                        lit: 1
                    },
                    {
                        num: 1,
                        lit: 1
                    }
                ];
                
                return ret;
        }
    }
    
    extraRools(name, params) {
        switch (name) {
            case 'quin':
                var rool = [];

                rool[0] = (num, lit, forward) => {
                    var point = undefined;
                    if (forward) {
                        point = {
                            num: num += 1,
                            lit: this.increminateLitPosition(lit, 1)
                        };
                    } else {
                        point = {
                            num: num - 1,
                            lit: this.decreminateLitPosition(lit, 1)
                        };
                    }
                    return point;
                }

                rool[1] = (num, lit, forward) => {
                    var point = undefined;

                    if (forward) {
                        point = {
                            num: num += 1,
                            lit: lit
                        };
                    } else {
                        point = {
                            num: num -= 1,
                            lit: lit
                        };
                    }

                    return point;
                };

                rool[2] = (num, lit, forward) => {
                    var point = undefined;

                    if (forward) {
                        point = {
                            num: num,
                            lit: this.increminateLitPosition(lit, 1)
                        };
                    } else {
                        point = {
                            num: num,
                            lit: this.decreminateLitPosition(lit, 1)
                        };
                    }

                    return point;
                };

                return rool;
            case 'pawn':

                var rool = [];

                rool[0] = (lit, num, forward) => {
                    var point = undefined;
                    if (forward) {
                        point = {
                            lit: this.increminateLitPosition(lit, 1),
                            num: num += 1
                        }
                    }
                    return point;
                };

                rool[1] = (lit, num, forward) => {
                    var point = undefined;
                    if (forward) {
                        point = {
                            lit: this.decreminateLitPosition(lit, 1),
                            num: num += 1
                        }
                    }
                    return point;
                };

                rool[2] = (lit, num, forward) => {
                    var point = undefined;
                    if (forward) {
                        point = {
                            lit: lit,
                            num: num += 1
                        }
                    }
                    return point;
                };

                rool[3] = (lit, num, forward) => {
                    var point = undefined;
                    if (forward) {
                        if (this.checkIsFirstPawnMoove(num, lit)) {
                            point = {
                                lit: lit,
                                num: num += 2
                            }
                        }
                    }

                    return point;
                };

                return rool;
            case 'bishop' :
            /**
             * rool ma być tablicą
             * pierwszy element będzie funkją ruchu do przodu
             * drugi element bedzie funkcją ruchu do tyłu
             */
                var rool = [];
                rool[0] = (num, lit, forward) => {
                    var point = undefined;
                    if (forward) {
                        point = {
                            num: num += 1,
                            lit: this.increminateLitPosition(lit, 1)
                        };
                    } else {
                        point = {
                            num: num - 1,
                            lit: this.decreminateLitPosition(lit, 1)
                        };
                    }
                    return point;
                };

                return rool;
            case 'rook':
                var rool = [];

                rool[0] = (num, lit, forward) => {

                    var point = undefined;

                    if (forward) {
                        point = {
                            num: num += 1,
                            lit: lit
                        };
                    } else {
                        point = {
                            num: num -= 1,
                            lit: lit
                        };
                    }

                    return point;
                };

                rool[1] = (num, lit, forward) => {
                    var point = undefined;

                    if (forward) {
                        point = {
                            num: num,
                            lit: this.increminateLitPosition(lit, 1)
                        };
                    } else {
                        point = {
                            num: num,
                            lit: this.decreminateLitPosition(lit, 1)
                        };
                    }

                    return point;
                };

                return rool;

            case 'knight' :
                var rool = [];

                /**
                 * knight posiada 8 możliwości ruchów
                 */

                rool[0] = (num, lit, forward) => {
                    var point = undefined;

                    if (forward) {
                        point = {
                            num: num += 1,
                            lit: this.increminateLitPosition(lit, 2)
                        }
                    } else {
                        point = {
                            num: num += 1,
                            lit: this.decreminateLitPosition(lit, 2)
                        }
                    }

                    return point;
                };

                rool[1] = (num, lit, forward) => {
                    var point = undefined;

                    if (forward) {
                        point = {
                            num: num -= 1,
                            lit: this.increminateLitPosition(lit, 2)
                        }
                    } else {
                        point = {
                            num: num -= 1,
                            lit: this.decreminateLitPosition(lit, 2)
                        }
                    }

                    return point;
                };

                rool[2] = (num, lit, forward) => {
                    var point = undefined;

                    if (forward) {
                        point = {
                            num: num += 2,
                            lit: this.increminateLitPosition(lit, 1)
                        }
                    } else {
                        point = {
                            num: num += 2,
                            lit: this.decreminateLitPosition(lit, 1)
                        }
                    }

                    return point;
                };

                rool[2] = (num, lit, forward) => {
                    var point = undefined;

                    if (forward) {
                        point = {
                            num: num -= 2,
                            lit: this.increminateLitPosition(lit, 1)
                        }
                    } else {
                        point = {
                            num: num -= 2,
                            lit: this.decreminateLitPosition(lit, 1)
                        }
                    }

                    return point;
                };

                return rool;
            default:
                return undefined;
        }
    }

    checkIsFirstPawnMoove(lit, num) {
        var numPosition = 8 - num;
        return numPosition == 1 || numPosition == 6;
    }
    
    getPossiblePositions(figure, virtualColor) {
        var this_ = this;
        var range = this.getRange(figure.getName());//zasięg dla każdej figury
        var currentPosition = figure.getPosition();
        var virtualPosition = [];
        var virtualPositions= {};
        
        /**
         * W tej petli korygujemy pozycje według range i rozmiaru tablicy
         */
        range.forEach(function(item, i) {
            
            virtualPosition[i] = {};
            
            if (item.num) {
                var possibleNum = currentPosition.num + item.num;
                if (possibleNum <= 8) {
                    virtualPosition[i].num[0] = possibleNum;
                } else {
                    virtualPosition[i].num[0] = 8;
                }
                
                possibleNum = currentPosition.num - item.num;
                
                //powinne być wyszczególnione warunki inkreminacji dal piechurów
                //na różnych końcach planszy
                
                if (possibleNum >= 1) {
                    virtualPosition[i].num[1] = possibleNum;
                } else {
                    virtualPosition[i].num[1] = 1;
                }
            }
            
            if (item.lit) {
                virtualPosition[i].lit[0] = this_.increminateLitPosition(currentPosition, item);
                virtualPosition[i].lit[1] = this_.decreminateLitPosition(currentPosition, item);
            }
        });
        
        virtualPositions = this.correctPosition(virtualPosition, currentPosition, figure, virtualColor);

        return virtualPositions;

    }

    //segregator 
    correctPosition(positions, currentPostion, figure, virtualColor) {
        var this_ = this;

        var pocheckedPoints = {
            checkedPoints: [],
            checkedPointsForFight: []
        }

        positions.forEach(function(item, i) {
            var pos = [];

            if (item.num) {
                if (item.num.length == 2) {
                    pos[0] = {num: item.num[0]};
                    pos[1] = {num: item.num[1]};
                } else if (item.num.length == 1) {
                    pos[0] = {num: item.num[0]};
                }
            }

            if (item.lit) {
                if (item.lit.length == 2) {
                    if (pos[0].num) {
                        pos[0].lit = item.lit[0];
                        pos[1].lit = item.lit[1];
                    } else {
                        pos[0] = {lit: item.lit[0]};
                        pos[1] = {lit: item.lit[1]};
                    }
                } else if (item.lit.length == 1) {
                    if (pos[0].num) {
                        pos[0].lit = item.lit;
                    } else {
                        pos[0] = {lit: item.lit[0]};
                    }
                }
            }

            pos.forEach(function(item, i) {

                var specialRools = this_.extraRools(figure.getName());

                if (item.num && item.lit) {

                    checkedPoints = this_.castPoint(item, specialRool, checkedPoints, currentPostion, figure, virtualColor);

                } else if (item.num) {
                    item.lit = currentPostion.lit;

                    checkedPoints = this_.castPoint(item, specialRool, checkedPoints, currentPostion, figure, virtualColor);
                } else if (item.lit) {
                    item.num = currentPostion.num;

                    checkedPoints = this_.castPoint(item, specialRool, checkedPoints, currentPostion, figure, virtualColor);
                }
            });
        });

        return checkedPoints;
    }

    //główna funkcja precyzujące dostępne pozycje dla ruchu
    castPoint(item, specialRools, checkedPoints, currentPosition, figure, virtualColor) {
        var this_ = this;

        if (!specialRools) {
            var endPoint = this.checkDestinyPoint(item.num, item.lit);
            //każdy obiekt musi zawierać specialRools "extraRools"
        } else {
            //kolejna funkcja
            //iteracyjna
            var point = undefined;

            var forwarded = this_.checkIsMooveForward(currentPostion, item);

            if (forwarded) {
                checkedPoints = this.iterateRools(specialRools, checkedPoints, forwarded, currentPosition, item, figure, virtualColor);
            } else {
                checkedPoints = this.iterateRools(specialRools, checkedPoints, forwarded, currentPosition, item, figure, virtualColor);
            }
        }

        return checkedPoints;
    }

    iterateRools(specialRools, checkedPoints, forwarded, currentPosition, item, figure, virtualColor) {

        var this_ = this;

        var point = undefined;

        specialRools.forEach(function(rool, i){
            point = currentPosition;

            point = rool(currentPosition.num, currentPosition.lit, forwarded);

            //ruch tylko w jedną stronę dodatnią na desce;
            //wyodrębnienie ruchów increminacyjnych i dekrementacyjnych
    
            while(point.num <= item.num && point.lit.charCodeAt(0) <= item.lit.charCodeAt(0)) {
                if (!point) {
                    break;
                }

                if (!this_.checkIsLegalPoint(point.num, point.lit)) {
                    break;
                }

                var destiny = this_.checkDestinyPoint(point.num, point.lit, virtualColor);

                if (destiny.canMoove && destiny.fight) { // należy wyodrębnić ruchy do walki
                    checkedPoints.checkedPointsForFight[figure.toString() + this_._params.fightIterator.toString()] = point;
                    this_._params.fightIterator++;
                    break;
                } else if (destiny.canMoove) {
                    checkedPoints.checkedPoints.push(point);
                } else {
                    break;
                }

                point = rool(currentPosition.num, currentPosition.lit, forwarded);

            }
        });

        return checkedPoints;

    }
    
    increminateLitPosition(a, b) {
        
        var calculate = a.lit.charCodeAt(0) + b.lit.charCodeAt(0);
        
        if (sum <= 104) {
            return String.fromCharCode(a.lit.charCodeAt(0) + b.lit.charCodeAt(0));
        } else {
            return 'h';
        }
    }

    increminateLitPosition(lit, number) {
        var current = lit.charCodeAt(0);

        current += number;

        return String.fromCharCode(current);
    }

    decreminateLitPosition(lit, number) {
        var current = lit.charCodeAt(0);

        current -= number;

        return String.fromCharCode(current);
    }
    
    decreminateLitPosition(a, b) {
        var calculate = a.lit.charCodeAt(0) - b.lit.charCodeAt(0);
        
        if (calculate >= 97) {
            return String.fromCharCode(a.lit.charCodeAt(0) + b.lit.charCodeAt(0));
        } else {
            return 'a';
        }
    }

    /**
     * Sprwadzamy punkt docelowy
     */
    checkDestinyPoint(num, lit, virtualColor) {
        var point = this._board.board[num][lit];
        var params = {
            canMoove: false,
            fight: false
        };

        if (point) {
            if (!point.getColor() == this.color && !virtualColor) {
                params.canMoove = true;
                params.fight = true;
            } else if (point.getColor() == this.color && virtualColor) {
                params.canMoove = true;
                params.fight = true;
            }
        } else {
            params.canMoove = true;
        }

        return params;
    }

    checkIsLegalPoint(num, lit) {
        return num <= 8 && num >= 1 && lit.charCodeAt(0) >= 97 && lit.charCodeAt(0) <= 104;
    }

    checkIsMooveForward(currentPosition, pos) {
        return currentPosition.num < pos.num || currentPosition.lit.charCodeAt(0) < currentPosition.lit.charCodeAt(0);
    }

}

window.onload = function() {
    var _board = new Board();
    
}
