import {Component,Input,Output,EventEmitter,OnChanges} from 'angular2/core';
import {Note} from './note';

@Component({
    selector: 'demisharp',
    templateUrl: 'app/templates/demisharp.html'
})

export class Demisharp implements OnChanges { 
  
  @Input() sheet:string;
  @Output() sheetChange:EventEmitter<string> = new EventEmitter<string>();
  
  width:number = 500;
  height:number = 0;
  Note:Object = Note;
  key:string[];
  
  notes:Array<Note>;
  
  staves:Array<Array<Note>> = [];
  
  keys:{[key:string]:{[key:string]:number[]}} = {
    'c \\major': {'#': [], 'b': []},
    'g \\major': {'#': [0], 'b': []},
    'd \\major': {'#': [0,3], 'b': []},
    'a \\major': {'#': [0,3,-1], 'b': []},
    'e \\major': {'#': [0,3,-1,2], 'b': []},
    'b \\major': {'#': [0,3,-1,2,5], 'b': []},
    'f \\major': {'#': [], 'b': [4]},
    'c \\minor': {'#': [], 'b': [4,1,5]},
    'g \\minor': {'#': [], 'b': [4,1]},
    'd \\minor': {'#': [], 'b': [4]},
    'a \\minor': {'#': [], 'b': []},
    'e \\minor': {'#': [0], 'b': []},
    'b \\minor': {'#': [0,3], 'b': []},
    'f \\minor': {'#': [], 'b': [4,1,5,2]},
  };
  
  sharps:number[] = [];
  flats:number[] = [];
  
  constructor() {
  }
  
  
  
  recalculate(fromImport?:boolean) {
    this.staves = [];
    
    var stave:Array<Note> = []
    
    var pos:number = 0;
    var beat:number = 0;
    var measures:number = 0;
    var note:Note;
    var index:number = 0;
    
    var fill:Function = () => {
      // check for skipped beats
      if (beat != 8) {
        // insert dummy rests
        var rest:Note;
        if (beat % 2 === 1) {
          rest = new Note("r", Note.RHYTHM_EIGHTH);
          rest.position = pos;
          rest.filler = true;
          rest.fillPosition = index;
          pos += rest.getLength();
          stave.push(rest);
          beat++;
        }
        for (var i = beat; i < 8; i+=2) {
          rest = new Note("r", Note.RHYTHM_QUARTER);
          rest.position = pos;
          rest.filler = true;
          rest.fillPosition = index;
          pos += rest.getLength();
          stave.push(rest);
        }
        beat = 8;
      }
      // add bar
      var bar:Note = new Note("|", null);
      bar.position = pos;
      pos += bar.getLength();
      stave.push(bar);
    };
    
    var self = this;
    
    var measureCheck:Function = () => {
      
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
    var rest:Note = new Note("r", Note.RHYTHM_QUARTER);
    rest.position = pos;
    rest.filler = true;
    rest.fillPosition = index;
    pos += rest.getLength();
    stave.push(rest);
      
    this.staves.push(stave);
    
    this.height = this.staves.length * 120;
  };
  
  setValue(note:Note, value:string) {
    note.setValue(value);
    if (note.filler) {
      note.filler = false;
      this.notes.splice(note.fillPosition, 0, note);
      this.recalculate();
    }
    
    this.exportSheet();
  }
  
  setRhythm(note:Note, rhythm:string) {
    note.setRhythm(rhythm);
    if (note.filler) {
      note.filler = false;
      this.notes.splice(note.fillPosition, 0, note);
    }
    this.recalculate();
    
    this.exportSheet();
  }
  
  ngOnChanges(changes) {
    if (changes.sheet) {
      this.importSheet();
    }
  }
  
  importSheet() {
    
    if (this.sheet) {
      var input:string[] = this.sheet.replace(/\|/g, " ").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").split(" ");
      
      if (input[0] === "\\key") {
        this.key = [input[1],input[2]];
        input.splice(0, 3);
        
        var key = this.key.join(" ");
        if (this.keys[this.key.join(" ")]) {
          this.sharps = this.keys[this.key.join(" ")]['#'];
          this.flats  = this.keys[this.key.join(" ")]['b'];
        }
        
      }
      
      this.notes = [];
      var rhythm:string = '';
      for (var i:number = 0; i < input.length; i++) {
        var note = Note.fromString(input[i], rhythm);
        rhythm = note.rhythm;
        this.notes.push(note);
      }
    }
    
    this.recalculate(true);
  }
  
  exportSheet() {
    var sheet:string = "\\key "+this.key.join(" ")+"\n";
    
    for (var i:number = 0; i < this.staves.length; i++) {
      var last:string = "";
      for (var j:number = 0; j < this.staves[i].length; j++) {
        var note = this.staves[i][j];
        if (note.filler) continue;
        
        if (note.value === "|") {
          sheet += "|\n";
          last = "";
        } else if (note.rhythm === last) {
          sheet += note.value+" "; 
        } else {
          sheet += note.value+note.rhythm+" ";
          last = note.rhythm;
        }
      }
    }
    
    this.sheetChange.emit(sheet);
  }
  
  
}

