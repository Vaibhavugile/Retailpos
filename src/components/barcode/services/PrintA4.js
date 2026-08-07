import JsBarcode from "jsbarcode";
import { generateA4Template } from "../templates/A4Template";

export function printA4({
  product,
  variants,
  storeName,
}) {

  const printWindow = window.open(
    "",
    "_blank",
    "width=1200,height=900"
  );

  if (!printWindow) {
    alert("Unable to open print window.");
    return;
  }

 
  const body = generateA4Template({
    product,
    variants,
    storeName,
  });

  printWindow.document.open();

  printWindow.document.write(`
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>A4 Barcode Sheet</title>

<style>

@page{

    size:A4;

    margin:8mm;
}

*{

    margin:0;

    padding:0;

    box-sizing:border-box;

    font-family:Arial,sans-serif;
}

body{

    background:white;
}

/* ============================
        LABEL SHEET
============================ */

.a4-sheet{

    width:194mm;

    display:grid;

    grid-template-columns:
        repeat(3,63mm);

    grid-auto-rows:38mm;

    gap:2mm;

    margin:0 auto;
}

/* ============================
          LABEL
============================ */

.a4-label{

    border:1px dashed #ddd;

    padding:2mm;

    overflow:hidden;

    text-align:center;
}

.store{

    font-size:10px;

    font-weight:bold;
}

.product{

    margin-top:2px;

    font-size:9px;

    font-weight:bold;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
}

.variant{

    margin-top:1px;

    font-size:8px;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
}

.price{

    margin:2px 0;

    font-size:11px;

    font-weight:bold;
}

.barcode{

    width:100%;

    height:38px;

    margin:2px auto;
}

.barcode-number{

    margin-top:1px;

    font-size:8px;
}

.sku{

    margin-top:1px;

    font-size:7px;
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

      JsBarcode(svg, barcode, {

        format:"CODE128",

        width:1.3,

        height:32,

        margin:0,

        displayValue:false,

      });

    });

    setTimeout(() => {

      printWindow.focus();

      printWindow.print();

      printWindow.onafterprint =
        () => printWindow.close();

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