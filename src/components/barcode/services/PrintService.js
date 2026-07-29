import { print58mm } from "./Print58mm";
import { print80mm } from "./Print80mm";
import { printA4 } from "./PrintA4";

export function printBarcodes(options) {
  switch (options.format) {
    case "58mm":
      return print58mm(options);

    case "80mm":
      return print80mm(options);

    case "a4":
      return printA4(options);

    default:
      return print80mm(options);
  }
}