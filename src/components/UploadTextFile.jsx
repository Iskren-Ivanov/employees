import React, { useState, useEffect } from 'react';
import { DataRenderer } from "./DataRenderer"
import FileInput from '../UI/FileInput';
import customErrors from '../customErrors/customErrors';
import { parseData } from '../utils/index';
import ProgressBar from '../UI/ProgressBar';
import loadingProgressBar from '../utils/loadingProgressBar';

import Papa from 'papaparse';
import './UploadTextFile.css';

const UploadTextFile = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [countOfProgress, setCountOfProgess] = useState(0);
    const [showProgressBar, setShowProgressBar] = useState(false);

    useEffect(() => {
        let timer = 0;
        if (showProgressBar) {
            timer = loadingProgressBar(setCountOfProgess, data)
        } 
        return () => {
            clearInterval(timer);
        };
    }, [showProgressBar]);


    const handleParse = async (file) => (
        new Promise(async () => {
            try {
                if (!file) return setError('Enter a valid file');
                setShowProgressBar(true);
                const reader = new FileReader();
                reader.onload = async ({ target }) => {
                    const context = Papa.parse(target.result, { header: true });
                    const fileData = context.data;
                    const parsedData = parseData(fileData);
                    setData(parsedData);
                    setShowProgressBar(false)
                };
                reader.readAsText(file);
            } catch (error) {
                setError(customErrors.userMessage);
            }
        })
    );

    return (
        <div>
            <div className='uploadFile_wrapper_input'>
                <div className='uploadFile_wrapper_input_form'>
                    <FileInput
                        name='file'
                        type='File'
                        handleParse={handleParse}
                    />
                </div>
            </div>
            <div>
                {error && <div>{error}</div>}
                {(showProgressBar && !error) && <ProgressBar chargePercentage={countOfProgress} />}
                {Object.values(data).length > 0 && <DataRenderer data={data} />}
            </div>
        </div>
    );
};

export default UploadTextFile;