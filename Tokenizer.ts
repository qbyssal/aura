// deno-lint-ignore-file no-explicit-any
export type Token = {
   type: TokenType;
   value?: unknown;
};

export enum TokenType {
   IntKeyword = "IntKeyword",
   FloatKeyword = "FloatKeyword",
   WhileKeyword = "WhileKeyword",

   Identifier = "Identifier",

   Integer = "Integer",
   Float = "Float",

   OpenParenthesis = "OpenParenthesis",
   CloseParenthesis = "CloseParenthesis",
   OpenBracket = "OpenBracket",
   CloseBracket = "CloseBracket",
   OpenCurly = "OpenCurly",
   CloseCurly = "CloseCurly",
   OpenQuote = "OpenQuote",
   CloseQuote = "CloseQuote",
   EqualityOperator = "EqualityOperator",
   AssignmentOperator = "AssignmentOperator",
   AdditionOperator = "AdditionOperator",
   IncrementOperator = "IncrementOperator",
   MultiplicationOperator = "MultiplicationOperator",
   ExponentiationOperator = "ExponentiationOperator",
   LessThanOperator = "LessThanOperator",
   LessThanOrEqualToOperator = "LessThanOrEqualToOperator",
   LeftShiftOperator = "LeftShiftOperator",
   GreaterThanOperator = "GreaterThanOperator",
   GreaterThanOrEqualToOperator = "GreaterThanOrEqualToOperator",
   RightShiftOperator = "RightShiftOperator",

   Comma = "Comma",
   Semicolon = "Semicolon",
}

export class Tokenizer {
   static tokenize(str: string): Array<Token> {
      const items: string[] = [];
      str.split("").forEach((char) => {
         if (char == "\n") return;
         if (char == "\r") return;

         items.push(char);
      });

      const tokens = new Array<Token>();

      for (let i = 0; i < items.length; i++) {
         let word = "";

         if (items[i] == " ") {
            continue;
         }

         switch (items[i]) {
            case "(":
               tokens.push(token(TokenType.OpenParenthesis, "("));
               i++
               break;
            case ")":
               tokens.push(token(TokenType.CloseParenthesis, ")"));
               i++
               break;
            case ";":
               tokens.push(token(TokenType.Semicolon, ";"));
               i++
               break;
            case ",":
               tokens.push(token(TokenType.Comma, ","));
               i++
               break;
            case "=":
               if (items[i + 1] == "=") {
                  tokens.push(token(TokenType.EqualityOperator, "=="));
                  i++;
               } else {
                  tokens.push(token(TokenType.AssignmentOperator, "="));
               }
               i++
               break;
            case "+":
               if (items[i + 1] == "+") {
                  tokens.push(token(TokenType.IncrementOperator, "++"));
                  i++;
               } else {
                  tokens.push(token(TokenType.AdditionOperator, "+"));
               }
               i++
               break;
            case "-":
               if (items[i + 1] == "-") {
                  tokens.push(token(TokenType.EqualityOperator, "--"));
                  i++;
               } else {
                  tokens.push(token(TokenType.AssignmentOperator, "-"));
               }
               i++
               break;
            case "*":
               if (items[i + 1] == "*") {
                  tokens.push(token(TokenType.ExponentiationOperator, "**"));
                  i++;
               } else {
                  tokens.push(token(TokenType.MultiplicationOperator, "*"));
               }
               i++
               break;
            case "<":
               if (items[i + 1] == "=") {
                  tokens.push(token(TokenType.LessThanOrEqualToOperator, "<="));
                  i++;
               } else if (items[i + 1] == "<") {
                  tokens.push(token(TokenType.LeftShiftOperator, "<<"));
                  i++;
               } else {
                  tokens.push(token(TokenType.LessThanOperator, "<"));
               }
               i++
               break;
            case ">":
               if (items[i + 1] == "=") {
                  tokens.push(
                     token(TokenType.GreaterThanOrEqualToOperator, ">=")
                  );
                  i++;
               } else if (items[i + 1] == "<") {
                  tokens.push(token(TokenType.RightShiftOperator, ">>"));
                  i++;
               } else {
                  tokens.push(token(TokenType.GreaterThanOperator, ">"));
               }
               i++
               break;
         }
         if (Number.isInteger(+items[i])) {
            let j = i;
            let float = false;
            let num = items[i];
            while (j++ < items.length) {
               if (Number.isInteger(+items[j])) {
                  num += items[j];
               } else if (items[j] == ".") {
                  float = true;
                  num += ".";
                  while (j++ < items.length) {
                     if (Number.isInteger(+items[j])) {
                        num += items[j];
                     } else {
                        break;
                     }
                  }
                  j--;
               } else {
                  break;
               }
               i = j;
            }
            if (!float) {
               tokens.push(token(TokenType.Integer, num));
            } else {
               tokens.push(token(TokenType.Float, num));
            }
         } else {
            let j = i;
            while (j < items.length) {
               if (!" ,.;:[]{}()=+-/*%<>".includes(items[j])) {
                  word += items[j];
               } else {
                  switch (word) {
                     case "":
                        break;
                     case "int":
                        tokens.push(token(TokenType.IntKeyword, "int"));
                        break;
                     case "while":
                        tokens.push(token(TokenType.WhileKeyword, "while"));
                        break;
                     default:
                        tokens.push(token(TokenType.Identifier, word));
                  }
                  break;
               }
               j++;
               i = j - 1;
            }
         }
      }
      return tokens;
   }
}

export function token(type: TokenType, value?: any): Token {
   return { type, value };
}
