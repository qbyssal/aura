import {Tokenizer} from './Tokenizer.ts'
import { Parser } from './Parser.ts'
const file = Deno.readTextFileSync(Deno.args[0])



//const WORD_DELIMITERS= 



let parsed=Parser.parse(Tokenizer.tokenize(file))
console.log(parsed)