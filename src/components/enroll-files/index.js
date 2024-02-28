import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx'

function EnrollFile() {
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);

    // submit state
    const [excelData, setExcelData] = useState(null);

    // onchange event
    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            } else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        } else {
            console.log('Please select your file');
        }
    }

    // submit event
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            var cleaned = [];
            data.map(item1 => {
                var maxVersion = 0;
                data.filter(item2 => item1.userId === item2.userId)
                    .map(item2 => {
                        if(item2.version > maxVersion) {
                            maxVersion = item2.version;
                        }
                    });
                if(item1.version === maxVersion) {
                    cleaned.push(item1);
                }
            })
            setExcelData(cleaned);
        }
    }

    return (
        <Container className='d-flex flex-column justify-content-center align-items-center p-4'>
            <h1>Upload & view Excel sheets</h1>
            <div className='w-100 rounded bg-white border shadow p-4'>
                <form className="mb-2 form-group custom-form" onSubmit={handleFileSubmit}>
                    <input type="file" className="form-control mb-2" required onChange={handleFile} />
                    <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
                    <Link to="/" className='btn btn-primary ms-3'>Back</Link>
                    {typeError && (
                        <div className="alert alert-danger" role="alert">{typeError}</div>
                    )}
                </form>
                <div className="viewer">
                    {excelData ? (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        {Object.keys(excelData[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {excelData.map((individualExcelData, index) => (
                                        <tr key={index}>
                                            {Object.keys(individualExcelData).map((key) => (
                                                <td key={key}>{individualExcelData[key]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>No File is uploaded yet!</div>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default EnrollFile;
