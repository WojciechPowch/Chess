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
    }
    
    getDecision(board, params) {
        this._board = board;
        
        if (params.firstMoove && this.color == 'white') {
            return this.firstMoove();
        }
        
        var possible = [];
        
        for (var i = 1; i <= 8; i++) {
            for (var j = 97; j <= 104; j++) {
                var key = String.fromCharCode(j);
                
                
            }
        }
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
            case 'bishop' :
                var rool = (a, b) => {
                    return a == b ;
                };
                return rool;
            
            default:
                return undefined;
        }
    }
    
    getPossiblePositions(figure) {
        var range = this.getRange(figure.getName());
        var currentPosition = figure.getPosition();
        var virtualPosition = [];
        
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
                virtualPosition[i].lit[0] = increminateLitPosition(currentPosition, item);
                virtualPosition[i].lit[1] = decreminateLitPosition(currentPosition, item);
            }
        });
        
        
    }
    
    increminateLitPosition(a, b) {
        
        var calculate = a.lit.charCodeAt(0) + b.lit.charCodeAt(0);
        
        if (sum <= 104) {
            return String.fromCharCode(a.lit.charCodeAt(0) + b.lit.charCodeAt(0));
        } else {
            return 'h';
        }
    }
    
    decreminateLitPosition(a, b) {
        var calculate = a.lit.charCodeAt(0) - b.lit.charCodeAt(0);
        
        if (calculate >= 97) {
            return String.fromCharCode(a.lit.charCodeAt(0) + b.lit.charCodeAt(0));
        } else {
            return 'a';
        }
    }
}

window.onload = function() {
    var _board = new Board();
    
}
