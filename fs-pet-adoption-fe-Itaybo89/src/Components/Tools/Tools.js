import React, { useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import './tools.css';
import CustomButton from '../CustomButton/CustomeButton';
import nl2br from 'react-nl2br';

const Tools = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputString, setOutputString] = useState('');

    const searchTools = async (searchString) => {
        try {
            const response = await axios.post('http://localhost:8080/tools', {
                searchString: searchString,
            });
            return response.data;
        } catch (error) {
            console.log(`Error sending request: ${error}`);
            return [];
        }
    };

    const handleAction = async () => {
        setOutputString('');
        const result = await searchTools(inputValue);
        setOutputString(`query: ${inputValue}\nprocessed: ${result.processedResponse}`);
        setInputValue('');
    };

    return (
        <div id='toolsContainerDiv'>
            <h1 id='toolsTitle'>Admin Tools</h1>
            <div id='toolsAnswerBox'>
                {nl2br(outputString)}
            </div>
            <div id='toolsInputField'>
                <TextField
                    variant="outlined"
                    label="Input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    inputProps={{ maxLength: 200 }}
                    style={{ width: '500px' }}
                />
            </div>
            <div id='toolsProcessButton'>
                <CustomButton
                    onClickFunction={handleAction}
                    buttonText="Process"
                    buttonColor="primary"
                />
            </div>
        </div>
    );
};

export default Tools;
