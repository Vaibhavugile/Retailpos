import JsBarcode from "jsbarcode";
import { generateThermalTemplate } from "../templates/ThermalTemplate";

export function print58mm({
  product,
  copies,
  storeName,
}) {

  const printWindow = window.open(
    "",
    "_blank",
    "width=320,height=700,resizable=yes"
  );

  if (!printWindow) {
    alert("Unable to open print window.");
    return;
  }

  const body = generateThermalTemplate({
    product,
    storeName,
    copies,
    paperWidth: "50x30",
  });

  printWindow.document.open();

printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>50 × 30 Barcode Label</title>

<style>

/* ==========================================
                PAGE
========================================== */

@page{
    size:50mm 30mm;
    margin:0;
}

/* ==========================================
                RESET
========================================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

/* ==========================================
            HTML / BODY
========================================== */

html,
body{

    width:50mm;

    margin:0;

    padding:0;

    background:#ffffff;

}

/* ==========================================
                TOOLBAR
========================================== */

.toolbar{

    position:sticky;

    top:0;

    display:flex;

    justify-content:flex-end;

    gap:8px;

    padding:8px;

    background:#fff;

    border-bottom:1px solid #ddd;

    z-index:999;

}

.toolbar button{

    padding:6px 12px;

    border:none;

    border-radius:6px;

    background:#111827;

    color:#fff;

    cursor:pointer;

    font-size:12px;

    font-weight:600;

}

.toolbar button:hover{

    background:#000;

}

/* ==========================================
                CONTENT
========================================== */

.content{

    width:50mm;

    margin:0 auto;

    padding:0;

}

/* ==========================================
            LABEL SHEET
========================================== */

.sheet-50x30,
.sheet-58{

    width:50mm;

    margin:0 auto;

}

/* ==========================================
                LABEL
========================================== */

.label{

    width:50mm;

    height:30mm;

    padding:1mm;

    display:flex;

    flex-direction:column;

    justify-content:space-evenly;

    align-items:center;

    text-align:center;

    overflow:hidden;

}

/* Every label except last gets a new page */

.label:not(:last-child){

    page-break-after:always;

    break-after:page;

}

/* ==========================================
                STORE
========================================== */

.store{

    width:100%;

    font-size:11px;

    font-weight:700;

    line-height:1;

    text-align:center;

}

/* ==========================================
            PRICE + VARIANT
========================================== */

.label-top{

    width:100%;

    display:flex;

    justify-content:space-between;

    align-items:center;

}

.variant{

    flex:1;

    text-align:left;

    font-size:9px;

    font-weight:600;

    overflow:hidden;

    white-space:nowrap;

    text-overflow:ellipsis;

}

.price{

    margin-left:2mm;

    font-size:15px;

    font-weight:700;

    white-space:nowrap;

}

/* ==========================================
                PRODUCT
========================================== */

.product{

    width:100%;

    text-align:center;

    font-size:8px;

    font-weight:600;

    overflow:hidden;

    white-space:nowrap;

    text-overflow:ellipsis;

}

/* ==========================================
                BARCODE
========================================== */

.barcode{

    width:48mm;

    height:13mm;

    display:block;

    margin:1mm auto;

}

/* ==========================================
            BARCODE NUMBER
========================================== */

.barcode-number{

    width:100%;

    text-align:center;

    font-size:7px;

    font-weight:700;

    letter-spacing:.5px;

}

.sku{

    display:none;

}

/* ==========================================
            SCREEN PREVIEW
========================================== */

@media screen{

    body{

        background:#f3f4f6;

    }

    .label{

        border:1px dashed #ccc;

        margin-bottom:10px;

        background:#fff;

        box-shadow:0 2px 8px rgba(0,0,0,.08);

    }

}

/* ==========================================
                PRINT
========================================== */

@media print{

    @page{

        size:50mm 30mm;

        margin:0;

    }

    html,
    body{

        width:50mm;

        margin:0;

        padding:0;

        background:#fff;

    }

    .toolbar{

        display:none !important;

    }

    .content{

        width:50mm;

        margin:0;

        padding:0;

    }

    .sheet-50x30,
    .sheet-58{

        width:50mm;

        margin:0;

        padding:0;

    }

    .label{

        width:50mm;

        height:30mm;

        margin:0;

        padding:1mm;

        border:none;

        page-break-inside:avoid;

    }

    .label:not(:last-child){

        page-break-after:always;

        break-after:page;

    }

}

</style>

</head>

<body>

<div class="toolbar">

    <button onclick="window.print()">
        🖨 Print
    </button>

    <button onclick="window.close()">
        ✖ Close
    </button>

</div>

<div class="content">

${body}

</div>

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

        try{

            JsBarcode(svg, barcode, {

                format:"CODE128",

                width:2,

                height:50,

                margin:0,

                displayValue:false,

                background:"#ffffff",

                lineColor:"#000000",

                fontOptions:"bold",

                valid:function(valid){

                    if(!valid){

                        console.error(
                            "Invalid Barcode:",
                            barcode
                        );

                    }

                }

            });

        }catch(err){

            console.error(
                "Barcode Error:",
                err
            );

        }

    });

    requestAnimationFrame(() => {

        printWindow.focus();

    });

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