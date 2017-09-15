import hello from './hello';
import Rx from 'rxjs/Rx';

var obs = Rx.Observable.of(1,2,3,4,5);
obs.subscribe(x => console.log("hello"))

console.log("hello I'm main")
console.log("hello I'm fuckin maaaaaaaaaaain")
hello()
