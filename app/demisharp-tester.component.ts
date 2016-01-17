 import {Component} from 'angular2/core';
import {Demisharp} from './demisharp.component'

@Component({
  selector: 'demisharp-tester',
  templateUrl: 'app/templates/demisharp-tester.html',
  directives: [Demisharp]
})

export class DemisharpTester { 
  sheet:String = `\\key c \\major
`;
}
