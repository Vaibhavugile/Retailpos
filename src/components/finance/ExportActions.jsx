import React from "react";
import "./ExportActions.css";

import {
  FiFileText,
  FiFile,
  FiPrinter,
  FiDownload,
} from "react-icons/fi";

const ExportActions = ({
  onPDF,
  onExcel,
  onCSV,
  onPrint,
}) => {

  return (

    <div className="export-actions">

      <div className="export-header">

        <h2>

          Export Reports

        </h2>

        <p>

          Download or print your finance reports.

        </p>

      </div>

      <div className="export-grid">

        <button
          className="export-card pdf"
          onClick={onPDF}
        >

          <FiFileText />

          <span>

            Export PDF

          </span>

        </button>

        <button
          className="export-card excel"
          onClick={onExcel}
        >

          <FiFile />

          <span>

            Export Excel

          </span>

        </button>

        <button
          className="export-card csv"
          onClick={onCSV}
        >

          <FiDownload />

          <span>

            Export CSV

          </span>

        </button>

        <button
          className="export-card print"
          onClick={onPrint}
        >

          <FiPrinter />

          <span>

            Print Report

          </span>

        </button>

      </div>

    </div>

  );

};

export default ExportActions;