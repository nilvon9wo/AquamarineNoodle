import {sayHello} from './greet';

function showHello(divName: string, name: string) {
    const element = document.getElementById(divName);
    element.innerText = sayHello(name);
}
showHello('greeting', 'TypeScript');
    