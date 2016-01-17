export class Note {
  
  position:number;
  ledgers:number[];
  editing:boolean = false;
  beat:number;
  filler:boolean = false;
  fillPosition:number;

  static RHYTHM_HALF:string = "2";
  static RHYTHM_QUARTER:string = "4";
  static RHYTHM_EIGHTH:string = "8";

  constructor(public value:string, public rhythm?:string) {
  }
  
  getLength():number {
    if (this.value === '|') {
      return 20;
    }
    return {
      '2': 100,
      '4': 50,
      '8': 25
    }[this.rhythm];
  }
  
  getBeats():number {
    if (this.value === '|') {
      return 0;
    }
    return {
      '2': 4,
      '4': 2,
      '8': 1
    }[this.rhythm];
  }
  
  isReal():boolean {
    return '|r'.indexOf(this.value) === -1;
  }
  
  isUp():boolean {
    if (!this.isReal()) {
      return null;
    }
    return {
      "a"   :  true,
      "b"   :  true,
      "c'"  :  true,
      "d'"  :  true,
      "e'"  :  true,
      "f'"  :  true,
      "g'"  :  true,
      "a'"  :  true,
      "b'"  :  true,
      "c''" : false,
      "d''" : false,
      "e''" : false,
      "f''" : false,
      "g''" : false,
      "a''" : false,
      "b''" : false,
      "c'''": false
    }[this.value];
  }
  
  getHeight():number {
    if (!this.isReal()) {
      return 0;
    }
    return {
      "a"   :  45,
      "b"   :  40,
      "c'"  :  35,
      "d'"  :  30,
      "e'"  :  25,
      "f'"  :  20,
      "g'"  :  15,
      "a'"  :  10,
      "b'"  :   5,
      "c''" :   0,
      "d''" : - 5,
      "e''" : -10,
      "f''" : -15,
      "g''" : -20,
      "a''" : -25,
      "b''" : -30,
      "c'''": -35
    }[this.value];
  }
  
  getLedgers():Array<number> {
    if (!this.ledgers) {
      if (!this.isReal()) {
        this.ledgers = [];
      } else {
        this.ledgers = {
          "a"   : [-10,0],
          "b"   : [-5],
          "c'"  : [0],
          "d'"  : [],
          "e'"  : [],
          "f'"  : [],
          "g'"  : [],
          "a'"  : [],
          "b'"  : [],
          "c''" : [],
          "d''" : [],
          "e''" : [],
          "f''" : [],
          "g''" : [],
          "a''" : [0],
          "b''" : [5],
          "c'''": [0,10]
        }[this.value];
      }
    }
    return this.ledgers;
  }
  
  edit() {
    this.editing = true;
  }
  
  setValue(newValue) {
    this.editing = false;
    this.value = newValue;
  }
  
  setRhythm(newRhythm) {
    this.editing = false;
    this.rhythm = newRhythm;
  }
  
  toString():string {
    return this.value + this.rhythm;
  }
  
  static fromString(s:string, defaultRhythm?:string):Note {
    var value:string = s.match(/^\D+/)[0];
    var rhythmMatch:string[] = s.match(/\d+$/);
    
    var rhythm:string = rhythmMatch ? rhythmMatch[0] : defaultRhythm;
    return new Note(value, rhythm);
  }
}
