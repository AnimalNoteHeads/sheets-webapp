System.register([], function(exports_1) {
    var Note;
    return {
        setters:[],
        execute: function() {
            Note = (function () {
                function Note(value, rhythm) {
                    this.value = value;
                    this.rhythm = rhythm;
                    this.editing = false;
                    this.filler = false;
                }
                Note.prototype.getLength = function () {
                    if (this.value === '|') {
                        return 20;
                    }
                    return {
                        '2': 100,
                        '4': 50,
                        '8': 25
                    }[this.rhythm];
                };
                Note.prototype.getBeats = function () {
                    if (this.value === '|') {
                        return 0;
                    }
                    return {
                        '2': 4,
                        '4': 2,
                        '8': 1
                    }[this.rhythm];
                };
                Note.prototype.isReal = function () {
                    return '|r'.indexOf(this.value) === -1;
                };
                Note.prototype.isUp = function () {
                    if (!this.isReal()) {
                        return null;
                    }
                    return {
                        "a": true,
                        "b": true,
                        "c'": true,
                        "d'": true,
                        "e'": true,
                        "f'": true,
                        "g'": true,
                        "a'": true,
                        "b'": true,
                        "c''": false,
                        "d''": false,
                        "e''": false,
                        "f''": false,
                        "g''": false,
                        "a''": false,
                        "b''": false,
                        "c'''": false
                    }[this.value];
                };
                Note.prototype.getHeight = function () {
                    if (!this.isReal()) {
                        return 0;
                    }
                    return {
                        "a": 45,
                        "b": 40,
                        "c'": 35,
                        "d'": 30,
                        "e'": 25,
                        "f'": 20,
                        "g'": 15,
                        "a'": 10,
                        "b'": 5,
                        "c''": 0,
                        "d''": -5,
                        "e''": -10,
                        "f''": -15,
                        "g''": -20,
                        "a''": -25,
                        "b''": -30,
                        "c'''": -35
                    }[this.value];
                };
                Note.prototype.getLedgers = function () {
                    if (!this.ledgers) {
                        if (!this.isReal()) {
                            this.ledgers = [];
                        }
                        else {
                            this.ledgers = {
                                "a": [-10, 0],
                                "b": [-5],
                                "c'": [0],
                                "d'": [],
                                "e'": [],
                                "f'": [],
                                "g'": [],
                                "a'": [],
                                "b'": [],
                                "c''": [],
                                "d''": [],
                                "e''": [],
                                "f''": [],
                                "g''": [],
                                "a''": [0],
                                "b''": [5],
                                "c'''": [0, 10]
                            }[this.value];
                        }
                    }
                    return this.ledgers;
                };
                Note.prototype.edit = function () {
                    this.editing = true;
                };
                Note.prototype.setValue = function (newValue) {
                    this.editing = false;
                    this.value = newValue;
                };
                Note.prototype.setRhythm = function (newRhythm) {
                    this.editing = false;
                    this.rhythm = newRhythm;
                };
                Note.prototype.toString = function () {
                    return this.value + this.rhythm;
                };
                Note.fromString = function (s, defaultRhythm) {
                    var value = s.match(/^\D+/)[0];
                    var rhythmMatch = s.match(/\d+$/);
                    var rhythm = rhythmMatch ? rhythmMatch[0] : defaultRhythm;
                    return new Note(value, rhythm);
                };
                Note.RHYTHM_HALF = "2";
                Note.RHYTHM_QUARTER = "4";
                Note.RHYTHM_EIGHTH = "8";
                return Note;
            })();
            exports_1("Note", Note);
        }
    }
});
//# sourceMappingURL=note.js.map