import css from './styles/main.css';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Fiddle away
const print = (string) => {
  const temp1 = document.getElementById('temp1')
  temp1.innerHTML += string;
  temp1.innerHTML += '<br/>';
  console.log(string);
}

print('Fiddle away!');

const nums = of(1, 2, 3);
const squareValues = map(val => val * val);
const squaredNums = squareValues(nums);

squaredNums.subscribe(x => {
  print(x);
});
