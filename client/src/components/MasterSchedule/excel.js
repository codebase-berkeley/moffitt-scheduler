import * as Excel from "exceljs/dist/exceljs";

import { saveAs } from "file-saver";

import {
  abbrevs,
  days,
  libraries,
  getDatePlusX,
  shortDate,
  timeToString,
  pAbbrevs,
  columnToLetter
} from "../../utils";

async function spreadsheetGen(date, schedule) {
  const wb = new Excel.Workbook();

  const ws = wb.addWorksheet();

  addHeader(ws, date);
  addLocationLabels(ws);
  addDayLabels(ws, date);
  addData(ws, schedule);

  ws.columns.forEach(function(column) {
    //column.width = 20;
  });

  const buf = await wb.xlsx.writeBuffer();

  var lastDay = getDatePlusX(date, 6);
  var title = shortDate(date) + "-" + shortDate(lastDay);
  saveAs(new Blob([buf]), title + ".xlsx");
}

function addHeader(ws, firstDay) {
  var lastDay = getDatePlusX(firstDay, 6);

  ws.addRow([shortDate(firstDay) + " - " + shortDate(lastDay)]);
  ws.mergeCells("A1:W1");
  var cell = ws.getCell("A1");
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "E06666" }
  };
  cell.alignment = { horizontal: "center" };
  cell.font = { size: 20 };
}

function addLocationLabels(ws) {
  var row_values = [];
  row_values[0] = "Main Stacks";
  row_values[8] = "Moffitt 3rd";
  row_values[16] = "Moffitt 4th";
  ws.insertRow(2, row_values);
  ws.mergeCells("A2:G2");
  ws.mergeCells("I2:O2");
  ws.mergeCells("Q2:W2");

  var cellsToStyle = ["A2", "H2", "I2", "P2", "Q2"];
  cellsToStyle.map(c => {
    var cell = ws.getCell(c);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F9992D" }
    };
    cell.alignment = { horizontal: "center" };
    cell.font = { size: 16 };
    return null;
  });
}

function addDayLabels(ws, firstDay) {
  var row = [];
  // three different locations
  for (let i = 0; i < 3; i++) {
    for (let d = 0; d < 7; d++) {
      row.push(pAbbrevs[d] + " " + shortDate(getDatePlusX(firstDay, d)));
    }
    row.push("");
  }
  ws.addRow(row);

  for (let i = 1; i < 24; i++) {
    var cell = ws.getCell(columnToLetter(i) + "3");
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "A4C2F4" }
    };
  }
}

function addData(ws, schedule) {
  for (let t = 0; t < 24; t += 0.5) {
    var row = [];
    for (let l = 0; l < 3; l++) {
      var library = libraries[l];
      for (let d = 0; d < days.length; d++) {
        var abbrev = abbrevs[days[d]];
        var data = schedule[library][abbrev][t];
        var el = "";
        for (let i = 0; i < data.length; i++) {
          el += data[i].name;
          if (i + 1 !== data.length) {
            el += "\n";
          }
        }
        row.push(el);
      }
      if (l !== 2) {
        row.push(timeToString(t));
      }
    }
    ws.addRow(row);
  }

  for (let r = 4; r <= 51; r++) {
    for (let c = 1; c < 24; c++) {
      let cell = ws.getCell(columnToLetter(c) + r);
      cell.font = { color: "000000" };
      cell.alignment = { wrapText: true };
    }
  }

  for (let r = 4; r <= 51; r++) {
    let cell = ws.getCell("H" + r);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7F6015" }
    };
    cell = ws.getCell("P" + r);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7F6015" }
    };
  }
}

export default spreadsheetGen;
