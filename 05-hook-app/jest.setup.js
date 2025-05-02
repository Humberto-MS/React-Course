// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- npm i whatwg-fetch
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;