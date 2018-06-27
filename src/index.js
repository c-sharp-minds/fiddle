import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Fiddle away
document.body.innerHTML = 'Fiddle away!'

const nums = of(1, 2, 3);
const squareValues = map(val => val * val);
const squaredNums = squareValues(nums);

squaredNums.subscribe(x => {
  console.log(x);
  document.body.innerHTML += '<br/>';
  document.body.innerHTML += x;
});
