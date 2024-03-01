import { Form, Required, Types, validateFieldIf } from "@tsvdec/core";

export class ModelForm {
  @Required({ message: "id is required", validateIf: m => m.validationEnabled })
  id: string = "";

  @validateFieldIf(m => m.validationEnabled)
  @Required({ message: "description is required" })
  description: string = "";

  @Required({ message: "creationDate is required" })
  creationDate: string = "";

  @Required({ message: "deadlineDate is required" })
  deadlineDate: string = "";

  validationEnabled: boolean = false;
}

function createMethodDecorator(factory: (fnParams: string[], args: any[]) => void) {
  return function <This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    // static
    function replacementMethod(this: This, ...args: Args): Return {
      const fnParams = getParamNames(target);
      factory(fnParams, args);
      return target.call(this, ...args);
    }
    return replacementMethod;
  };
}

function getParamNames(func: Function): string[] {
  // This regex focuses on capturing content inside the parentheses
  const result = func.toString().match(/\(([^)]*)\)/);
  if (result === null || result[1] === undefined) return [];

  // Split the result by comma, trim whitespace, and filter out any empty strings
  return result[1]
    .split(",")
    .map(param => param.trim())
    .filter(param => param);
}

type ClassMethodDecorator<This, Args extends any[], Return> = (
  target: any,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) => void;

function Validated<This, Args extends any[], Return>(
  clazz: MethodPropertyObject<Args>,
  arg?: string,
): ClassMethodDecorator<This, Args, Return> {
  return createMethodDecorator((params, args) => {
    const form = new Form(clazz);
    const methodArg = arg ? args[params.indexOf(arg)] : args[0];
    const result = form.validate(methodArg);
    //if (!result.valid) throw new Error(JSON.stringify(result.errors, null, 2));
    if (!result.valid) console.log(JSON.stringify(result.errors, null, 2));
  });
}

export class ModelApi {
  @Validated(ModelForm)
  doPost(body: ModelForm) {
    console.log("doPost SUCCESS", body);
  }
}

type MethodPropertyObject<Args extends any[]> = Args extends (infer P)[]
  ? P extends Types.Object
    ? Types.Class<P>
    : never
  : never;

// prettier-ignore
export const CodeText =
`import { Required, validateFieldIf } from "@tsvdec/core";

export class ModelForm {
  @Required({ message: "id is required", validateIf: m => m.validationEnabled })
  id: string = "";

  @validateFieldIf(m => m.validationEnabled)
  @Required({ message: "description is required" })
  description: string = "";

  @Required({ message: "creationDate is required" })
  creationDate: string = "";

  @Required({ message: "deadlineDate is required" })
  deadlineDate: string = "";

  validationEnabled: boolean = false;
}
`;
