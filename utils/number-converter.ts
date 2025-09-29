export type NumberSystem = "binary" | "decimal" | "octal" | "hexadecimal";

export interface ConversionStep {
  step: string;
  calculation: string;
  result: string;
}

export interface ConversionResult {
  result: string;
  steps: ConversionStep[];
  isValid: boolean;
  error?: string;
}

export const numberSystems = [
  { value: "binary" as const, label: "Binary (Base 2)", base: 2 },
  { value: "decimal" as const, label: "Decimal (Base 10)", base: 10 },
  { value: "octal" as const, label: "Octal (Base 8)", base: 8 },
  { value: "hexadecimal" as const, label: "Hexadecimal (Base 16)", base: 16 },
];

export function validateInput(input: string, system: NumberSystem): boolean {
  if (!input || typeof input !== "string" || !input.trim()) return false;
  if (!system || typeof system !== "string") return false;

  const cleanInput = input.trim().toLowerCase();

  switch (system) {
    case "binary":
      return /^-?[01]+(?:\.[01]+)?$/.test(cleanInput);
    case "decimal":
      return /^-?[0-9]+(?:\.[0-9]+)?$/.test(cleanInput);
    case "octal":
      return /^-?[0-7]+(?:\.[0-7]+)?$/.test(cleanInput);
    case "hexadecimal":
      return /^-?[0-9a-f]+(?:\.[0-9a-f]+)?$/.test(cleanInput);
    default:
      return false;
  }
}

export function convertNumber(
  input: string,
  fromSystem: NumberSystem,
  toSystem: NumberSystem
): ConversionResult {
  if (
    !input ||
    typeof input !== "string" ||
    !fromSystem ||
    typeof fromSystem !== "string" ||
    !toSystem ||
    typeof toSystem !== "string"
  ) {
    return {
      result: "",
      steps: [],
      isValid: false,
      error: "Invalid input parameters",
    };
  }

  if (!validateInput(input, fromSystem)) {
    return {
      result: "",
      steps: [],
      isValid: false,
      error: `Invalid ${fromSystem} number format`,
    };
  }

  try {
    const cleanInput = input.trim().toLowerCase();

    // Parse negative sign and fractional parts
    const isNegative = cleanInput.startsWith("-");
    const absoluteInput = isNegative ? cleanInput.substring(1) : cleanInput;
    const fractionalPart = absoluteInput.includes(".")
      ? absoluteInput.split(".")[1]
      : undefined;

    // Convert to decimal
    const decimalValue = convertToDecimal(absoluteInput, fromSystem);
    const steps: ConversionStep[] = [];

    if (fromSystem !== "decimal") {
      steps.push(
        ...getToDecimalSteps(
          absoluteInput,
          fromSystem,
          decimalValue,
          isNegative,
          fractionalPart
        )
      );
    }

    let finalResult: string;
    if (toSystem === "decimal") {
      finalResult = (isNegative ? -decimalValue : decimalValue).toString();
    } else {
      finalResult = convertFromDecimal(
        decimalValue,
        toSystem,
        isNegative,
        fractionalPart ? true : false
      );
      if (fromSystem !== "decimal") {
        steps.push({
          step: `Convert decimal to ${toSystem}`,
          calculation: `${isNegative ? "-" : ""}${decimalValue} → ${toSystem}`,
          result: finalResult,
        });
      }
      steps.push(
        ...getFromDecimalSteps(
          decimalValue,
          toSystem,
          finalResult,
          isNegative,
          fractionalPart
        )
      );
    }

    return {
      result: finalResult.toUpperCase(),
      steps,
      isValid: true,
    };
  } catch {
    return {
      result: "",
      steps: [],
      isValid: false,
      error: "Conversion error occurred",
    };
  }
}

function convertToDecimal(input: string, fromSystem: NumberSystem): number {
  if (
    !input ||
    typeof input !== "string" ||
    !fromSystem ||
    typeof fromSystem !== "string"
  )
    return 0;

  const base = numberSystems.find((s) => s.value === fromSystem)?.base || 10;
  const [integerPart, fractionalPart] = input.split(".");

  // Convert integer part
  let result = parseInt(integerPart || "0", base);

  // Convert fractional part if it exists
  if (fractionalPart) {
    let fractionalValue = 0;
    for (let i = 0; i < fractionalPart.length; i++) {
      const digit = parseInt(fractionalPart[i], base);
      fractionalValue += digit / Math.pow(base, i + 1);
    }
    result += fractionalValue;
  }

  return result;
}

function convertFromDecimal(
  decimal: number,
  toSystem: NumberSystem,
  isNegative: boolean = false,
  hasFractional: boolean = false
): string {
  if (typeof decimal !== "number" || !toSystem || typeof toSystem !== "string")
    return "";

  const base = numberSystems.find((s) => s.value === toSystem)?.base || 10;
  const integerPart = Math.floor(decimal);
  const fractionalPart = decimal - integerPart;

  let result = integerPart.toString(base);

  // Convert fractional part if it exists
  if (fractionalPart > 0 || hasFractional) {
    let fractionalResult = "";
    let current = fractionalPart;
    let iterations = 0;
    const maxIterations = 10; // Limit to 10 digits for readability

    while (current > 0 && iterations < maxIterations) {
      current *= base;
      const digit = Math.floor(current);
      fractionalResult += digit.toString(base);
      current -= digit;
      iterations++;
    }

    if (fractionalResult) {
      result += "." + fractionalResult;
    }
  }

  return isNegative ? "-" + result : result;
}

function getToDecimalSteps(
  input: string,
  fromSystem: NumberSystem,
  result: number,
  isNegative: boolean = false,
  fractionalPart?: string
): ConversionStep[] {
  if (
    !input ||
    typeof input !== "string" ||
    !fromSystem ||
    typeof fromSystem !== "string"
  )
    return [];
  const steps: ConversionStep[] = [];
  const base = numberSystems.find((s) => s.value === fromSystem)?.base || 10;

  const [integerPart, fracPart] = input.split(".");

  if (isNegative) {
    steps.push({
      step: "Handle negative sign",
      calculation: `Input is negative: -${input}`,
      result: "Keep the negative sign for final result",
    });
  }

  // Integer part conversion
  if (
    fromSystem === "binary" ||
    fromSystem === "octal" ||
    fromSystem === "hexadecimal"
  ) {
    const digits = integerPart.split("").reverse();
    const calculations = digits
      .map((digit, index) => {
        if (!digit || typeof digit !== "string") return "";
        return `${digit.toUpperCase()} × ${base}^${index}`;
      })
      .reverse();
    const values = digits.map((digit, index) => {
      if (!digit || typeof digit !== "string") return 0;
      return parseInt(digit, base) * Math.pow(base, index);
    });

    steps.push({
      step: "Convert integer part - multiply each digit by its position value",
      calculation: calculations.join(" + "),
      result:
        values.join(" + ") + " = " + values.reduce((sum, val) => sum + val, 0),
    });
  }

  // Fractional part conversion
  if (fracPart) {
    const fracDigits = fracPart.split("");
    const fracCalculations = fracDigits.map((digit, index) => {
      return `${digit.toUpperCase()} × ${base}^${-(index + 1)}`;
    });
    const fracValues = fracDigits.map((digit, index) => {
      return parseInt(digit, base) / Math.pow(base, index + 1);
    });

    steps.push({
      step: "Convert fractional part - multiply each digit by negative powers",
      calculation: fracCalculations.join(" + "),
      result:
        fracValues.map((v) => v.toFixed(6)).join(" + ") +
        " = " +
        fracValues.reduce((sum, val) => sum + val, 0).toFixed(6),
    });

    steps.push({
      step: "Add integer and fractional parts",
      calculation: `${Math.floor(result)} + ${(
        result - Math.floor(result)
      ).toFixed(6)}`,
      result: (isNegative ? "-" : "") + result.toString(),
    });
  } else {
    steps.push({
      step: "Final result",
      calculation: `${fromSystem} to decimal conversion`,
      result: (isNegative ? "-" : "") + result.toString(),
    });
  }

  return steps;
}

function getFromDecimalSteps(
  decimal: number,
  toSystem: NumberSystem,
  result: string,
  isNegative: boolean = false,
  fractionalPart?: string
): ConversionStep[] {
  const base = numberSystems.find((s) => s.value === toSystem)?.base || 10;
  const steps: ConversionStep[] = [];

  if (toSystem !== "decimal") {
    const integerPart = Math.floor(decimal);
    const fracPart = decimal - integerPart;

    if (isNegative) {
      steps.push({
        step: "Handle negative number",
        calculation: `Working with absolute value: ${decimal}`,
        result: "Will add negative sign to final result",
      });
    }

    // Integer part conversion
    if (integerPart > 0) {
      const divisions: string[] = [];
      let current = integerPart;

      while (current > 0) {
        const remainder = current % base;
        const quotient = Math.floor(current / base);
        const remainderStr =
          remainder < 10
            ? remainder.toString()
            : String.fromCharCode(87 + remainder);
        divisions.push(
          `${current} ÷ ${base} = ${quotient} remainder ${remainderStr}`
        );
        current = quotient;
      }

      steps.push({
        step: `Convert integer part - divide by ${base} repeatedly`,
        calculation: divisions.join("\n"),
        result: `Read remainders from bottom to top for integer part`,
      });
    }

    // Fractional part conversion
    if (fracPart > 0) {
      const multiplications: string[] = [];
      let current = fracPart;
      let fracResult = "";
      let iterations = 0;
      const maxIterations = 10;

      while (current > 0 && iterations < maxIterations) {
        current *= base;
        const digit = Math.floor(current);
        const digitStr =
          digit < 10 ? digit.toString() : String.fromCharCode(87 + digit);
        multiplications.push(
          `${(current / base).toFixed(6)} × ${base} = ${current.toFixed(
            6
          )} → digit: ${digitStr}`
        );
        fracResult += digitStr;
        current -= digit;
        iterations++;
      }

      steps.push({
        step: `Convert fractional part - multiply by ${base} repeatedly`,
        calculation: multiplications.join("\n"),
        result: `Take integer parts in order: 0.${fracResult}`,
      });
    }

    steps.push({
      step: "Combine results",
      calculation: `${isNegative ? "Add negative sign: -" : ""}${result.replace(
        "-",
        ""
      )}`,
      result: `Final result: ${result.toUpperCase()}`,
    });
  }

  return steps;
}
