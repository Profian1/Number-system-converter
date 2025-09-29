export interface LearningSection {
  title: string;
  content: string;
  methods: LearningMethod[];
}

export interface LearningMethod {
  title: string;
  description: string;
  example: string;
  hint: string;
}

export const learningContent: LearningSection[] = [
  {
    title: "Decimal ↔ Binary",
    content:
      "Binary (base 2) uses only digits 0 and 1. Each position represents a power of 2. This is the foundation of all computer operations.",
    methods: [
      {
        title: "Binary to Decimal: Position Value Method",
        description:
          "Multiply each binary digit by its position value (power of 2) and add them up. Start from the rightmost digit as 2⁰.",
        example:
          "1011₂ = (1×2³) + (0×2²) + (1×2¹) + (1×2⁰) = 8 + 0 + 2 + 1 = 11₁₀\n\nWith fractions: 1011.101₂ = 11₁₀ + (1×2⁻¹) + (0×2⁻²) + (1×2⁻³) = 11 + 0.5 + 0 + 0.125 = 11.625₁₀\n\nWith negatives: -1011₂ = -11₁₀",
        hint: "Easiest method for beginners. Remember: 2⁰=1, 2¹=2, 2²=4, 2³=8, etc. For fractions, use negative powers.",
      },
      {
        title: "Decimal to Binary: Division Method",
        description:
          "For integers: divide by 2 repeatedly, collect remainders from bottom to top. For fractions: multiply fractional part by 2, take integer part.",
        example:
          "11₁₀: 11÷2=5 r1, 5÷2=2 r1, 2÷2=1 r0, 1÷2=0 r1 → 1011₂\n\nWith fractions (11.625₁₀):\nInteger: 11₁₀ = 1011₂\nFractional: 0.625×2=1.25 (take 1), 0.25×2=0.5 (take 0), 0.5×2=1.0 (take 1) → 0.101₂\nResult: 1011.101₂\n\nWith negatives: -11₁₀ → convert 11₁₀ = 1011₂, add sign → -1011₂",
        hint: "Most reliable method. For fractions, stop when you get 0 or reach desired precision (usually 10 digits).",
      },
    ],
  },
  {
    title: "Decimal ↔ Octal",
    content:
      "Octal (base 8) uses digits 0-7. Each position represents a power of 8. Often used in Unix file permissions.",
    methods: [
      {
        title: "Octal to Decimal: Position Value Method",
        description:
          "Multiply each octal digit by its position value (power of 8) and add them up.",
        example:
          "157₈ = (1×8²) + (5×8¹) + (7×8⁰) = 64 + 40 + 7 = 111₁₀\n\nWith fractions: 157.24₈ = 111₁₀ + (2×8⁻¹) + (4×8⁻²) = 111 + 0.25 + 0.0625 = 111.3125₁₀\n\nWith negatives: -157₈ = -111₁₀",
        hint: "Same concept as binary, but with powers of 8: 8⁰=1, 8¹=8, 8²=64, etc.",
      },
      {
        title: "Decimal to Octal: Division Method",
        description:
          "For integers: divide by 8 repeatedly, collect remainders. For fractions: multiply by 8, take integer parts.",
        example:
          "111₁₀: 111÷8=13 r7, 13÷8=1 r5, 1÷8=0 r1 → 157₈\n\nWith fractions (111.3125₁₀):\nInteger: 111₁₀ = 157₈\nFractional: 0.3125×8=2.5 (take 2), 0.5×8=4.0 (take 4) → 0.24₈\nResult: 157.24₈",
        hint: "Same process as decimal to binary, but divide by 8 instead of 2.",
      },
    ],
  },
  {
    title: "Decimal ↔ Hexadecimal",
    content:
      "Hexadecimal (base 16) uses digits 0-9 and letters A-F (A=10, B=11, C=12, D=13, E=14, F=15). Widely used in programming and computer graphics.",
    methods: [
      {
        title: "Hex to Decimal: Position Value Method",
        description:
          "Convert letters to numbers (A=10, B=11, etc.), multiply by position values (powers of 16), and add.",
        example:
          "2F₁₆ = (2×16¹) + (15×16⁰) = 32 + 15 = 47₁₀\n\nWith fractions: 2F.8₁₆ = 47₁₀ + (8×16⁻¹) = 47 + 0.5 = 47.5₁₀\n\nWith negatives: -2F₁₆ = -47₁₀",
        hint: "Remember hex digits: A=10, B=11, C=12, D=13, E=14, F=15. Powers of 16: 16⁰=1, 16¹=16, 16²=256.",
      },
      {
        title: "Decimal to Hex: Division Method",
        description:
          "For integers: divide by 16 repeatedly, convert remainders 10-15 to A-F. For fractions: multiply by 16.",
        example:
          "47₁₀: 47÷16=2 r15(F), 2÷16=0 r2 → 2F₁₆\n\nWith fractions (47.5₁₀):\nInteger: 47₁₀ = 2F₁₆\nFractional: 0.5×16=8.0 (take 8) → 0.8₁₆\nResult: 2F.8₁₆",
        hint: "Convert remainders 10→A, 11→B, 12→C, 13→D, 14→E, 15→F.",
      },
    ],
  },
  {
    title: "Binary ↔ Octal",
    content:
      "Binary and octal have a special relationship: each octal digit represents exactly 3 binary digits.",
    methods: [
      {
        title: "Binary to Octal: Grouping Method",
        description:
          "Group binary digits in sets of 3 (from right to left), convert each group to octal (0-7).",
        example:
          "101110111₂ = 101|110|111 = 5|6|7 = 567₈\n\nWith fractions: 101110.111₂ = 101|110.111 = 5|6.7 = 56.7₈\n\nWith negatives: -101110111₂ = -567₈",
        hint: "Each group of 3 binary digits = 1 octal digit. Pad with zeros on left if needed: 000=0, 001=1, ..., 111=7.",
      },
      {
        title: "Octal to Binary: Direct Conversion",
        description:
          "Replace each octal digit with its 3-bit binary equivalent.",
        example:
          "567₈ = 5(101) + 6(110) + 7(111) = 101110111₂\n\nWith fractions: 56.7₈ = 101110.111₂",
        hint: "Memorize: 0→000, 1→001, 2→010, 3→011, 4→100, 5→101, 6→110, 7→111.",
      },
    ],
  },
  {
    title: "Binary ↔ Hexadecimal",
    content:
      "Binary and hexadecimal have a perfect relationship: each hex digit represents exactly 4 binary digits.",
    methods: [
      {
        title: "Binary to Hex: Grouping Method",
        description:
          "Group binary digits in sets of 4 (from right to left), convert each group to hex (0-F).",
        example:
          "10111011₂ = 1011|1011 = B|B = BB₁₆\n\nWith fractions: 10111011.1101₂ = 1011|1011.1101 = B|B.D = BB.D₁₆\n\nWith negatives: -10111011₂ = -BB₁₆",
        hint: "Fastest conversion! Each group of 4 binary digits = 1 hex digit. Memorize 0000-1111 → 0-F.",
      },
      {
        title: "Hex to Binary: Direct Conversion",
        description: "Replace each hex digit with its 4-bit binary equivalent.",
        example:
          "BB₁₆ = B(1011) + B(1011) = 10111011₂\n\nWith fractions: BB.D₁₆ = 10111011.1101₂",
        hint: "Memorize hex to 4-bit binary: 0→0000, 1→0001, ..., 9→1001, A→1010, B→1011, C→1100, D→1101, E→1110, F→1111.",
      },
    ],
  },
  {
    title: "Octal ↔ Hexadecimal",
    content:
      "Converting between octal and hexadecimal is best done through binary as an intermediate step.",
    methods: [
      {
        title: "Via Binary Method",
        description:
          "Convert octal to binary (3 bits per digit), then binary to hex (4 bits per digit).",
        example:
          "567₈ → Binary: 5(101) + 6(110) + 7(111) = 101110111₂ → Hex: 1|0111|0111 = 1|77₁₆ = 177₁₆\n\nReverse: 177₁₆ → Binary: 1(0001) + 7(0111) + 7(0111) = 000101110111₂ → Octal: 0|001|011|101|11 = 0|1|3|5|6 = 1356₈",
        hint: "Always use binary as intermediate. Octal uses 3-bit groups, hex uses 4-bit groups.",
      },
    ],
  },
  {
    title: "ASCII Character Encoding",
    content:
      "ASCII (American Standard Code for Information Interchange) assigns numbers 0-127 to characters, letters, digits, and symbols.",
    methods: [
      {
        title: "Character to Number Conversion",
        description:
          "Each ASCII character has a decimal value that can be converted to binary, octal, or hex.",
        example:
          "Letter 'A': ASCII 65₁₀ = 1000001₂ = 101₈ = 41₁₆\nLetter 'a': ASCII 97₁₀ = 1100001₂ = 141₈ = 61₁₆\nDigit '0': ASCII 48₁₀ = 110000₂ = 60₈ = 30₁₆",
        hint: "Uppercase A-Z: 65-90, lowercase a-z: 97-122, digits 0-9: 48-57. Space is 32.",
      },
      {
        title: "Number to Character Conversion",
        description:
          "Convert any number system to decimal first, then look up the ASCII character.",
        example: "1000001₂ → 65₁₀ → 'A'\n141₈ → 97₁₀ → 'a'\n30₁₆ → 48₁₀ → '0'",
        hint: "Always convert to decimal first, then use ASCII table. Values 0-31 and 127 are control characters.",
      },
    ],
  },
];
