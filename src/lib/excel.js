import * as XLSX from "xlsx"
import { sharePointService } from "./sharepoint"



class ExcelService {
  async checkDuplicateInExcel(newBuffer, email, phone){
    try {
      if (buffer.byteLength === 0) {
        return false
      }

      const workbook = XLSX.read(buffer, { type: "array" })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      // Skip disclaimer row and header row
      const dataRows = data.slice(2)

      for (const row of dataRows) {
        if (row && row.length > 2) {
          const rowEmail = row[2]?.toString().toLowerCase().trim()
          const rowPhone = row[1]?.toString().trim()

          if (rowEmail === email.toLowerCase().trim() || rowPhone === phone.trim()) {
            return true
          }
        }
      }

      return false
    } catch (error) {
      console.error("Error checking duplicates in Excel:", error)
      return false
    }
  }

  async addRegistration(record) {
    try {
      // Ensure upload folder exists
      await sharePointService.ensureUploadFolderExists()

      // Download existing Excel file
      const buffer = await sharePointService.downloadExcelFile()

      let workbook
      let existingData = []

      if (buffer.byteLength > 0) {
        workbook = XLSX.read(buffer, { type: "array" })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        existingData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      } else {
        // Create new workbook if file doesn't exist
        workbook = XLSX.utils.book_new()
      }

      // Prepare new row
      const newRow = [
        record.name,
        record.phone,
        record.email,
        record.DOB,
        record.course,
        record.state,
        record.city,
        record.identity,
        record.consent ? "Yes" : "No",
        record.fileUrl,
        record.referenceId,
        new Date(record.submissionDate).toLocaleDateString("en-US"),
      ]

      // Create disclaimer row
      const disclaimerRow = [
        "DISCLAIMER: By providing your phone number, you consent to receive updates, reminders, promotional content, and important information related to courses and training programs offered by Kirat Learning via WhatsApp and SMS. We respect your privacy and will not share your contact information with third parties. You may opt out at any time by replying with 'STOP'.",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]

      // Create header row
      const headerRow = [
        "Name",
        "Phone",
        "Email",
        "Date of Birth",
        "Course",
        "State",
        "City",
        "Identity",
        "Consent",
        "File URL",
        "Reference ID",
        "Submission Date",
      ]

      let updatedData

      if (existingData.length === 0) {
        // New file
        updatedData = [disclaimerRow, headerRow, newRow]
      } else {
        // Check if disclaimer and header exist
        const hasDisclaimer = existingData[0]?.[0]?.toString().includes("DISCLAIMER")
        const hasHeader = existingData.some((row) => row[0]?.toString() === "Name")

        if (!hasDisclaimer) {
          updatedData = [disclaimerRow, headerRow, ...existingData, newRow]
        } else if (!hasHeader) {
          updatedData = [existingData[0], headerRow, ...existingData.slice(1), newRow]
        } else {
          updatedData = [...existingData, newRow]
        }
      }

      // Create new worksheet
      const newWorksheet = XLSX.utils.aoa_to_sheet(updatedData)

      // Apply formatting
      this.applyExcelFormatting(newWorksheet, updatedData.length)

      // Update workbook
      if (workbook.SheetNames.length === 0) {
        XLSX.utils.book_append_sheet(workbook, newWorksheet, "Registrations")
      } else {
        workbook.Sheets[workbook.SheetNames[0]] = newWorksheet
      }

      // Convert to buffer and upload
      const newBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" })
      await sharePointService.uploadExcelFile(newBuffer)

      console.log("Registration added to Excel successfully")
    } catch (error) {
      console.error("Error adding registration to Excel:", error)
      throw new Error("Failed to update Excel file")
    }
  }

  applyExcelFormatting(worksheet, rowCount){
    // Set column widths
    const colWidths = [
      { wch: 25 }, // Name
      { wch: 15 }, // Phone
      { wch: 30 }, // Email
      { wch: 15 }, // DOB
      { wch: 20 }, // Course
      { wch: 15 }, // State
      { wch: 15 }, // City
      { wch: 20 }, // Identity
      { wch: 10 }, // Consent
      { wch: 50 }, // File URL
      { wch: 20 }, // Reference ID
      { wch: 15 }, // Submission Date
    ]
    worksheet["!cols"] = colWidths

    // Merge cells for disclaimer row
    if (!worksheet["!merges"]) {
      worksheet["!merges"] = []
    }
    worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 11 } })

    // Set row heights
    if (!worksheet["!rows"]) {
      worksheet["!rows"] = []
    }
    worksheet["!rows"][0] = { hpt: 60 } // Disclaimer row height

    // Format disclaimer cell
    if (worksheet["A1"]) {
      worksheet["A1"].s = {
        font: { bold: true, color: { rgb: "FF0000" }, size: 10 },
        alignment: { horizontal: "left", vertical: "top", wrapText: true },
        fill: { fgColor: { rgb: "FFFACD" } },
      }
    }

    // Format header row
    const headerRowIndex = 2
    const headerCells = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
    headerCells.forEach((col) => {
      const cellRef = `${col}${headerRowIndex}`
      if (worksheet[cellRef]) {
        worksheet[cellRef].s = {
          font: { bold: true, color: { rgb: "000000" } },
          fill: { fgColor: { rgb: "E6E6FA" } },
          alignment: { horizontal: "center" },
        }
      }
    })

    // Format data rows
    for (let row = 3; row <= rowCount; row++) {
      // Date of Birth column (D)
      const dobCell = `D${row}`
      if (worksheet[dobCell]) {
        worksheet[dobCell].s = {
          numFmt: "mm/dd/yyyy",
          alignment: { horizontal: "center" },
        }
      }

      // Submission Date column (L)
      const submissionCell = `L${row}`
      if (worksheet[submissionCell]) {
        worksheet[submissionCell].s = {
          numFmt: "mm/dd/yyyy",
          alignment: { horizontal: "center" },
        }
      }

      // Phone column (B)
      const phoneCell = `B${row}`
      if (worksheet[phoneCell]) {
        worksheet[phoneCell].s = {
          numFmt: "@", // Text format
          alignment: { horizontal: "center" },
        }
      }

      // Email column (C)
      const emailCell = `C${row}`
      if (worksheet[emailCell]) {
        worksheet[emailCell].s = {
          alignment: { horizontal: "left" },
        }
      }
    }
  }
}

export const excelService = new ExcelService()
