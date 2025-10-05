# Program Documentation - Number System Converter App

## 1. Programming Environment

* **Framework**: React Native + Expo SDK 54
* **Language**: TypeScript
* **Navigation**: Expo Router (file-based routing)
* **Styling**: Tailwind / React Native StyleSheet
* **Icons**: Lucide React Native

---

## 2. Core Components

* **InputCard**: Text input for entering numbers.
* **SystemSelector**: Dropdowns to choose source and target number systems.
* **ResultCard**: Displays converted value and explanation.
* **LearnAccordion**: Expands to show theory and different methods.
* **AsciiGrid**: Shows ASCII reference table.
* **ThemeSwitcher**: Allows switching between Light, Dark, Blue Accent, High Contrast.

---

## 3. Conversion Algorithms

### Decimal → Binary

```ts
function decimalToBinary(num: number): string {
  if (num === 0) return "0";
  let binary = "";
  let absNum = Math.abs(num);
  while (absNum > 0) {
    binary = (absNum % 2) + binary;
    absNum = Math.floor(absNum / 2);
  }
  return num < 0 ? "-" + binary : binary;
}
```

### Binary → Decimal

```ts
function binaryToDecimal(binary: string): number {
  let isNegative = binary.startsWith("-");
  let absBinary = isNegative ? binary.slice(1) : binary;
  let decimal = parseInt(absBinary, 2);
  return isNegative ? -decimal : decimal;
}
```

### Decimal → Hexadecimal

```ts
function decimalToHex(num: number): string {
  return num.toString(16).toUpperCase();
}
```

### Negative Numbers

* Negative numbers are represented with a **minus sign** for simplicity.
* Two’s complement explanation is included in Learn Section for educational value.

---

## 4. Data Structures

* **ASCII Table** stored as an array of objects:

```ts
[{ char: "A", decimal: 65, hex: "41" }, ...]
```

* **Learn Data** stored as structured text for easy display.

---

## 5. Expected Outputs

* Input: Decimal `25` → Output: Binary `11001` with step explanation.
* Input: Binary `1010` → Output: Decimal `10`.
* Input: Decimal `-15` → Output: Binary `-1111`.

---

## 6. Limitations

* Only supports **integer values** (fractions not included).
* Two’s complement is explained, not fully computed in output.

---

## 7. Future Improvements

* Add support for fractional numbers.
* Include base-64 and base-32 conversions.
* Export results as PDF for learning notes.

---
