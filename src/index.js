import loader from './components/loader/loader.js';
import css from './styles/main.css';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Fiddle away
const print = (input) => {
  const temp1 = document.getElementById('fiddle')
  temp1.innerHTML += input;
}

const printLog = (input) => {
  print(input);
  console.log(input);
}

print('<span class="title">Fiddle</span>');
print(loader);
print('<br/>');
print('<br/>');

const nums = of(1, 2, 3);
const squareValues = map(val => val * val);
const squaredNums = squareValues(nums);

squaredNums.subscribe(x => { printLog(x); print('<br/>'); });
