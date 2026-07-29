import JsBarcode from "jsbarcode";
import { generateThermalTemplate } from "../templates/ThermalTemplate";

export function print80mm({
  product,
  copies,
  storeName,
}) {
  const printWindow = window.open(
    "",
    "_blank",
    "width=450,height=900"
  );

  if (!printWindow) {
    alert("Unable to open print window.");
    return;
  }

  const body = generateThermalTemplate({
    product,
    storeName,
    copies,
    paperWidth: "80mm",
  });

  printWindow.document.open();

  printWindow.document.write(`
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<title>80mm Barcode</title>

<style>

@page{
    size:80mm auto;
    margin:0;
}

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

html,
body{

    width:80mm;

    margin:0;

    padding:0;

    background:#ffffff;
}

.sheet-80{

    width:80mm;

    padding:3mm;
}

.label{

    width:74mm;

    margin:0 auto;

    padding:3mm 0;

    text-align:center;

    page-break-after:always;
}

.store{

    font-size:18px;

    font-weight:bold;
}

.product{

    margin-top:4px;

    font-size:16px;

    font-weight:600;

    word-break:break-word;
}

.variant{

    margin-top:3px;

    font-size:14px;
}

.price{

    margin:5px 0;

    font-size:22px;

    font-weight:bold;
}

.barcode{

    display:block;

    width:100%;

    height:60px;

    margin:6px auto;
}

.barcode-number{

    margin-top:3px;

    font-size:13px;

    letter-spacing:2px;
}

.sku{

    margin-top:3px;

    font-size:11px;
}

</style>

</head>

<body>

${body}

</body>

</html>
`);

  printWindow.document.close();

  const generate = () => {

    const svgs =
      printWindow.document.querySelectorAll(
        "svg.barcode"
      );

    svgs.forEach((svg) => {

      const barcode =
        svg.getAttribute("data-barcode");

      if (!barcode) return;

      try {

        JsBarcode(svg, barcode, {

          format: "CODE128",

          width: 2,

          height: 55,

          margin: 0,

          displayValue: false,

          background: "#ffffff",

          lineColor: "#000000",

        });

      } catch (err) {

        console.error(
          "Barcode Error:",
          err
        );

      }

    });

    setTimeout(() => {

      printWindow.focus();

      printWindow.print();

      printWindow.onafterprint = () => {

        printWindow.close();

      };

    },300);

  };

  if (
    printWindow.document.readyState ===
    "complete"
  ) {

    generate();

  } else {

    printWindow.onload = generate;

  }

}