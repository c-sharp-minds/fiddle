/* eslint-disable-next-line no-unused-vars */
import css from './styles/main.css';
import loader from './components/loader/loader.js';
/*
import {of, fromEvent} from 'rxjs';
import {map, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';
*/

// Fiddle away
const print = (input) => {
  const temp1 = document.getElementById('fiddle');
  temp1.innerHTML += input;
};

print('<span class="title">Fiddle</span>');
print(loader);
print('<br/><br/>');

const decodedCookie = decodeURIComponent(document.cookie).split(';').reduce(
  (acc, c) => {
    const splitC = c.trim().split('=');
    return ({
      ...acc,
      [splitC[0]]: splitC[1],
    });
  },
    {}
);

console.table(decodedCookie);

const term = 'forte Dafalgan b';
const search = 'Dafalgan forte bruis comp  1 g 5ml/H 10>6';

const transform = (input, term) => {
  if (!input) {
    return input;
  }

  let terms = term.split(' ').filter((i) => i);
  let returnValue = input;

  terms.forEach((t) => {
    try {
      let esc = t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let regex = new RegExp((esc), 'gi');
      console.log('regex', regex);

      const bolds = returnValue.match(/<b>(.*?)<\/b>/g);
      let containsBold = false;
      if (!!bolds && !!bolds.length) {
        containsBold = bolds.reduce((contains, bold) => {
          return bold.toUpperCase().indexOf(t.toUpperCase()) > -1 || contains;
        }, false);
        console.log('containsBold: ', containsBold);
      }

      if (!containsBold) {
        // No bold string was matched, so we can add new bold tags to the match
        returnValue = returnValue.replace(regex, (match) => {
          return '<b>' + match + '</b>';
        });
      } else {
        // Don't replace where the bold tags have already been added
        if (!!bolds && !!bolds.length) {
          const boldsRegex = new RegExp(bolds.join('|'), 'gi');
          let calculateReturnValue = returnValue;
          console.log('returnValue.match(boldsRegex): ', returnValue.match(boldsRegex));
          console.log('boldsRegex: ', boldsRegex);
          if (calculateReturnValue.match(boldsRegex)) {
            console.log('calculateReturnValue.match(boldsRegex): ', calculateReturnValue.match(boldsRegex));
            calculateReturnValue = returnValue.replace(boldsRegex, '').trim();
            const calculateReturnValueRegex = new RegExp(calculateReturnValue, 'gi');
            console.log('calculateReturnValueRegex: ', calculateReturnValueRegex);
            /*
            // const calculateResult =
            console.log('returnValue: ', returnValue);
            console.log('returnValue.match(calculateReturnValueRegex): ', returnValue.match(calculateReturnValueRegex)); */
            console.log('calculateReturnValue: ', calculateReturnValue);

            const calculated = transform(calculateReturnValue, term);
            returnValue = returnValue.replace(calculateReturnValueRegex, calculated);
          }
          /* bolds.reduce((newString, bold) => {
              const boldIndex = bold.toUpperCase().indexOf(t.toUpperCase());
              if (boldIndex > -1) {
                  // Bold string match: skip this part of the string
                  const boldMatchRegex = new RegExp(bold, 'gi');
                  console.log('boldMatchRegex: ', boldMatchRegex);

                  return `${newString}`;
              } else {
                  return `${newString}`;
              }
          }, ''); */
      }
      }
    } catch (ex) {
      console.log(`error: input: '${input} ' & term: '${t}'`, ex);
    }
  });

  // console.log('matches: ', matching);
  // console.log('Replace with matches: ', replace(returnValue, matching));
  console.log('returnValue: ', returnValue);
  return returnValue;
};

const result = transform(search, term);
print(result);
