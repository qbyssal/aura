export interface nodeStatement{};

export interface nodeBlock extends nodeStatement{
    body:Array<nodeStatement>
}

export interface nodeExpression extends nodeStatement{
    body:nodeStatement
}

export interface node{}
export interface nodeProgram extends nodeBlock{}