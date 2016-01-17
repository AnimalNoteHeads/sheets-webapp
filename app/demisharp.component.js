System.register(['angular2/core', './note'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, note_1;
    var Demisharp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (note_1_1) {
                note_1 = note_1_1;
            }],
        execute: function() {
            Demisharp = (function () {
                function Demisharp() {
                    this.sheetChange = new core_1.EventEmitter();
                    this.width = 500;
                    this.height = 0;
                    this.Note = note_1.Note;
                    this.staves = [];
                    this.keys = {
                        'c \\major': { '#': [], 'b': [] },
                        'g \\major': { '#': [0], 'b': [] },
                        'd \\major': { '#': [0, 3], 'b': [] },
                        'a \\major': { '#': [0, 3, -1], 'b': [] },
                        'e \\major': { '#': [0, 3, -1, 2], 'b': [] },
                        'b \\major': { '#': [0, 3, -1, 2, 5], 'b': [] },
                        'f \\major': { '#': [], 'b': [4] },
                        'c \\minor': { '#': [], 'b': [4, 1, 5] },
                        'g \\minor': { '#': [], 'b': [4, 1] },
                        'd \\minor': { '#': [], 'b': [4] },
                        'a \\minor': { '#': [], 'b': [] },
                        'e \\minor': { '#': [0], 'b': [] },
                        'b \\minor': { '#': [0, 3], 'b': [] },
                        'f \\minor': { '#': [], 'b': [4, 1, 5, 2] },
                    };
                    this.sharps = [];
                    this.flats = [];
                }
                Demisharp.prototype.recalculate = function (fromImport) {
                    this.staves = [];
                    var stave = [];
                    var pos = 0;
                    var beat = 0;
                    var measures = 0;
                    var note;
                    var index = 0;
                    var fill = function () {
                        // check for skipped beats
                        if (beat != 8) {
                            // insert dummy rests
                            var rest;
                            if (beat % 2 === 1) {
                                rest = new note_1.Note("r", note_1.Note.RHYTHM_EIGHTH);
                                rest.position = pos;
                                rest.filler = true;
                                rest.fillPosition = index;
                                pos += rest.getLength();
                                stave.push(rest);
                                beat++;
                            }
                            for (var i = beat; i < 8; i += 2) {
                                rest = new note_1.Note("r", note_1.Note.RHYTHM_QUARTER);
                                rest.position = pos;
                                rest.filler = true;
                                rest.fillPosition = index;
                                pos += rest.getLength();
                                stave.push(rest);
                            }
                            beat = 8;
                        }
                        // add bar
                        var bar = new note_1.Note("|", null);
                        bar.position = pos;
                        pos += bar.getLength();
                        stave.push(bar);
                    };
                    var self = this;
                    var measureCheck = function () {
                        // check for 2 measures
                        measures++;
                        if (measures == 2) {
                            self.staves.push(stave);
                            stave = [];
                            measures = 0;
                            pos = 0;
                        }
                    };
                    for (index = 0; index < this.notes.length; index++) {
                        note = this.notes[index];
                        if (beat + note.getBeats() > 8) {
                            fill();
                            beat = 0;
                            measureCheck();
                        }
                        note.position = pos;
                        stave.push(note);
                        beat += note.getBeats();
                        pos += note.getLength();
                    }
                    fill();
                    beat = 0;
                    measureCheck();
                    // make an extra empty measure with a single rest
                    var rest = new note_1.Note("r", note_1.Note.RHYTHM_QUARTER);
                    rest.position = pos;
                    rest.filler = true;
                    rest.fillPosition = index;
                    pos += rest.getLength();
                    stave.push(rest);
                    this.staves.push(stave);
                    this.height = this.staves.length * 120;
                };
                ;
                Demisharp.prototype.setValue = function (note, value) {
                    note.setValue(value);
                    if (note.filler) {
                        note.filler = false;
                        this.notes.splice(note.fillPosition, 0, note);
                        this.recalculate();
                    }
                    this.exportSheet();
                };
                Demisharp.prototype.setRhythm = function (note, rhythm) {
                    note.setRhythm(rhythm);
                    if (note.filler) {
                        note.filler = false;
                        this.notes.splice(note.fillPosition, 0, note);
                    }
                    this.recalculate();
                    this.exportSheet();
                };
                Demisharp.prototype.ngOnChanges = function (changes) {
                    if (changes.sheet) {
                        this.importSheet();
                    }
                };
                Demisharp.prototype.importSheet = function () {
                    if (this.sheet) {
                        var input = this.sheet.replace(/\|/g, " ").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").split(" ");
                        if (input[0] === "\\key") {
                            this.key = [input[1], input[2]];
                            input.splice(0, 3);
                            var key = this.key.join(" ");
                            if (this.keys[this.key.join(" ")]) {
                                this.sharps = this.keys[this.key.join(" ")]['#'];
                                this.flats = this.keys[this.key.join(" ")]['b'];
                            }
                        }
                        this.notes = [];
                        var rhythm = '';
                        for (var i = 0; i < input.length; i++) {
                            var note = note_1.Note.fromString(input[i], rhythm);
                            rhythm = note.rhythm;
                            this.notes.push(note);
                        }
                    }
                    this.recalculate(true);
                };
                Demisharp.prototype.exportSheet = function () {
                    var sheet = "\\key " + this.key.join(" ") + "\n";
                    for (var i = 0; i < this.staves.length; i++) {
                        var last = "";
                        for (var j = 0; j < this.staves[i].length; j++) {
                            var note = this.staves[i][j];
                            if (note.filler)
                                continue;
                            if (note.value === "|") {
                                sheet += "|\n";
                                last = "";
                            }
                            else if (note.rhythm === last) {
                                sheet += note.value + " ";
                            }
                            else {
                                sheet += note.value + note.rhythm + " ";
                                last = note.rhythm;
                            }
                        }
                    }
                    this.sheetChange.emit(sheet);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Demisharp.prototype, "sheet", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Demisharp.prototype, "sheetChange", void 0);
                Demisharp = __decorate([
                    core_1.Component({
                        selector: 'demisharp',
                        templateUrl: 'app/templates/demisharp.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Demisharp);
                return Demisharp;
            })();
            exports_1("Demisharp", Demisharp);
        }
    }
});
//# sourceMappingURL=demisharp.component.js.map