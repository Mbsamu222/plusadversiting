import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Composepage.css';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

// CustomCalendar component
const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Function to check if a date is a Sunday
    const isSunday = (date) => {
        return date.getDay() === 0;
    };

    // Custom filter for disabling days that are not Sundays
    const filterPassedDate = (date) => {
        return isSunday(date);
    };

    return (
        <div className="custom-calendar">
            <p>Select Ads Date Calendar</p>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                filterDate={filterPassedDate}
                showYearDropdown
                scrollableYearDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
};

const PriceInfo = ({ basePrice, extraCharacters, extraPrice, totalPrice }) => {
    return (
        <div className="price-info">
            <div className="price-info-text">
                <p>Base Price(3 Lines): Rs. {basePrice}</p>
                <p>Extra Lines: {extraCharacters}</p>
                <p>Extra Price(per 35 Characters): Rs. {extraPrice}</p>
                <p>Total Amount: Rs. {totalPrice}</p>
            </div>
        </div>
    );
};

const ComposePage = () => {
    const location = useLocation();
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);


    // Get the values of publication, category, and edition from the URL query parameters
    const initialSelectedPublication = params.get('publication') || '';
    const initialSelectedCategory = params.get('category') || '';
    const initialSelectedEdition = params.get('edition') || '';
    const initialSelectedInputLabel = params.get('selectedInputLabel') || '';


    // Define state variables for selected options and textarea content
    const [selectedPublication, setSelectedPublication] = useState(initialSelectedPublication);
    const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory);
    const [selectedEdition, setSelectedEdition] = useState(initialSelectedEdition);
    const [selectedInputLabel, setSelectedInputLabel] = useState(initialSelectedInputLabel);
    const [selectedSubCategory1, setSelectedSubCategory1] = useState('');
    const [selectedSubCategory2, setSelectedSubCategory2] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [previewContent, setPreviewContent] = useState('');
    const [basePrice] = useState(1575);
    const [extraPrice, setExtraPrice] = useState(485);
    const [totalPrice, setTotalPrice] = useState(0); // State to store total price
    const [extraCharacters, setExtraCharacters] = useState(0); // State to store extra characters
    const [selectedDate] = useState(null);
    const [isTickAdded, setIsTickAdded] = useState(false); // State to track if tick is added
    const [isBoldText, setIsBoldText] = useState(false);
    const [selectedBgColor, setSelectedBgColor] = useState('#ffffff'); // Default background color
    const colorOptions = [
        { value: '#ffffff', label: 'White' },
        { value: '#ccffff', label: 'Light Blue' },
        { value: '#cefdd0', label: 'Light Green' },
        { value: '#feccc9', label: 'Light Pink' },
        { value: '#ffffca', label: 'Light Yellow' },
        { value: '#ffccff', label: 'Light Purple' },
    ];

    useEffect(() => {
        setSelectedInputLabel(params.get('selectedInputLabel') || '');
    }, [location.search,params]);
    


    const handleSaveData = async () => {
        try {
            // Prepare the data to be sent to the backend
            const data = {
                selectedPublication,
                selectedCategory,
                selectedEdition,
                selectedInputLabel,
                selectedSubCategory1,
                selectedSubCategory2,
                textAreaValue,
                totalPrice,
                selectedDate
            };


            console.log('Data to be sent to backend:', data); // Log data before sending

            // Send a POST request to the backend API to save the data
            const response = await axios.post('http://localhost:4000/saveData', data);
            console.log('Response from backend:', response.data); // Log the response from the backend

            // Optionally, display a success message or perform other actions after successful data saving
        } catch (error) {
            console.error('Error saving data:', error);
            // Handle errors, such as displaying an error message to the user
        }
    };


    const handleTickBoxChange = (e) => {
        const isChecked = e.target.checked;
        setIsTickAdded(isChecked);

        // Add or remove tick symbol based on whether the tick box is checked
        const tickSymbol = '✓';
        const updatedTextAreaValue = isChecked ? tickSymbol + textAreaValue.slice(tickSymbol.length) : textAreaValue.slice(tickSymbol.length);
        setTextAreaValue(updatedTextAreaValue);
        setPreviewContent(updatedTextAreaValue); // Update preview content
    };

    const handleBoldText = () => {
        setIsBoldText(!isBoldText);

        const updatedTextAreaValue = !isBoldText ? textAreaValue.toUpperCase() : textAreaValue.toLowerCase();
        setTextAreaValue(updatedTextAreaValue);
        setPreviewContent(updatedTextAreaValue);
    };


    // Simulated data for dropdown options
    const publicationOptions = [
        { value: 'THE HINDU', label: 'THE HINDU' },
        { value: 'DAILY THANTHI', label: 'DAILY THANTHI' },
        { value: 'INDIAN EXPRESS', label: 'INDIAN EXPRESS' },
    ];

    const categoryOptions = [
        { value: 'Matrimonial', label: 'Matrimonial' },
        { value: 'Educational', label: 'Educational' },
        { value: 'Hotel Management', label: 'Hotel Management' },
    ];
    const getEditionOptions = () => {
        if (selectedPublication === 'THE HINDU' && selectedCategory === 'Matrimonial') {
            return [
                { value: 'Chennai Edition', label: 'Chennai Edition', disabled: true },
                { value: 'All Edition', label: 'All Edition', disabled: false },
                { value: 'Other Edition', label: 'Other Edition', disabled: true },
            ];
        } else {
            return [
                { value: 'Chennai Edition', label: 'Chennai Edition', disabled: false },
                { value: 'All Edition', label: 'All Edition', disabled: false },
                { value: 'Other Edition', label: 'Other Edition', disabled: false },
            ];
        }
    };

    const subCategory1Options = [
        { value: 'Wanted Bride', label: 'Wanted Bride' },
        { value: 'Wanted Grooms', label: 'wanted Grooms' },
    ];

    const subCategory2Options = [
        { value: 'Tamil', label: 'Tamil' },
        { value: 'Telugu', label: 'Telugu' },
        { value: 'Malayalam', label: 'Malayalam' },
        { value: 'Kannada', label: 'Kannada' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'English', label: 'English' },
        { value: 'Assamese', label: 'Assamese' },
        { value: 'Awadhi', label: 'Awadhi' },
        { value: 'Bengali', label: 'Bengali' },
        { value: 'Bhojpuri', label: 'Bhojpuri' },
        { value: 'Bihari', label: 'Bihari' },
        { value: 'Chhattisgarthi', label: 'Chhattisgarth' },
        { value: 'Gujarati', label: 'Gujarati' },
        { value: 'Haryanvi', label: 'Haryanvi' },
        { value: 'Kashmiri', label: 'Kashmiri' },
        { value: 'Konkani', label: 'Konkani' },
        { value: 'Manipuri', label: 'Manipuri' },
        { value: 'Marathi', label: 'Marathi' },
        { value: 'Marwari', label: 'Marwari' },
        { value: 'Nepali', label: 'Nepali' },
        { value: 'Parsi', label: 'Parsi' },
        { value: 'Punjabi', label: 'Punjabi' },
        { value: 'Saurastra', label: 'Saurastra' },
        { value: 'Sindhi', label: 'Sindhi' },
        { value: 'Tulu', label: 'Tulu' },
        { value: 'Urdu', label: 'Urdu' },
        { value: 'Advocate', label: 'Advocate' },
        { value: 'Business', label: 'Business' },
        { value: 'Defence', label: 'Defence' },
        { value: 'Doctor', label: 'Doctor' },
        { value: 'Engineer', label: 'Engineer' },
        { value: 'Finance/Bank', label: 'Finance/Bank' },
        { value: 'Govt/Quasi G', label: 'Govt/Quasi G' },
        { value: 'IAS/Allied Ser', label: 'IAS/Allied Ser' },
        { value: 'Computer/Info', label: 'Computer/Info' },
        { value: 'MBA/CA/ICWA', label: 'MBA/CA/ICWA' },
        { value: 'NRI', label: 'NRI' },
        { value: 'Divorces', label: 'Divorces' },
        { value: 'Physically Challenged', label: 'Physically Challenged' },
        { value: 'Cosmopolitan', label: 'Cosmopolitan' },
    ];

    const handleSubCategory1Change = (e) => {
        setSelectedSubCategory1(e.target.value);
        setSelectedSubCategory2('');
    };
    const handleTextAreaChange = (e) => {

        const value = e.target.value;
        setTextAreaValue(isTickAdded ? '✓' + value.slice(1) : value);
        setPreviewContent(isTickAdded ? '✓' + value.slice(1) : value);
        setTextAreaValue(isBoldText ? `<strong>${value}</strong>` : value);
        setPreviewContent(isBoldText ? `<strong>${value}</strong>` : value);

        const updatedValue = isBoldText ? value.toUpperCase() : value;
        setTextAreaValue(updatedValue);
        setPreviewContent(updatedValue);

        // Calculate the price based on the text length and additional character cost
        const characterCount = value.length;
        let totalPrice = 0; // Set initial price to 0
        let extraCharacters = 0;
        let extraPrice = 0;

        if (characterCount > 0) { // Added condition to handle when characters are deleted
            if (characterCount > 105) {
                // Calculate extra characters beyond the first 105
                const additionalCharacters = characterCount - 105;
                extraCharacters = Math.ceil(additionalCharacters / 35); // Calculate extra characters for every 35 characters beyond 105
                extraPrice = Math.ceil(additionalCharacters / 35) * 485;

                // Calculate the extra price based on the extra characters
                totalPrice = 1575 + extraCharacters * 485;
            } else {
                // Set base price if character count is less than or equal to 105
                totalPrice = 1575;
            }
        } else {
            // Set initial stage when character count is zero
            totalPrice = 0;
            extraCharacters = 0;
            extraPrice = 0;
        }


        // Split the text into words and capitalize the first two letters of each word







        // Set the total price, extra characters, and extra price in state

        setTotalPrice(totalPrice);
        setExtraCharacters(extraCharacters);
        setExtraPrice(extraPrice);
    };

    const handleBgColorChange = (e) => {
        setSelectedBgColor(e.target.value);
    };


    const editionOptions = getEditionOptions();

    return (
        <div className='package'>
            <div>
                <div className="side menu">
                    <h3>YOUR PACKAGE</h3>
                    <div>
                        <label htmlFor="selectedPublication"></label>
                        <select
                            id="selectedPublication"
                            value={selectedPublication}
                            onChange={(e) => setSelectedPublication(e.target.value)}
                        >
                            {publicationOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="selectedCategory"></label>
                        <select
                            id="selectedCategory"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="selectedEdition"></label>
                        <select
                            id="selectedEdition"
                            value={selectedEdition}
                            onChange={(e) => setSelectedEdition(e.target.value)}
                        >
                            {editionOptions.map((option) => (
                                <option key={option.value} value={option.value} disabled={option.disabled}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {selectedInputLabel && (
                            <span style={{ marginLeft: '5px' }}>{selectedInputLabel}</span>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div className="container">
                        <div className="input-field">
                            <label htmlFor="selectedSubCategory1"></label>
                            <select
                                id="selectedSubCategory1"
                                value={selectedSubCategory1}
                                onChange={handleSubCategory1Change}
                                disabled={!selectedPublication || !selectedCategory || selectedCategory !== 'Matrimonial' || selectedEdition !== 'All Edition'}
                            >
                                <option value="">-Subcategory -1</option>
                                {subCategory1Options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedSubCategory1 && (
                            <div className="input-field">
                                <label htmlFor="selectedSubCategory2"></label>
                                <select
                                    id="selectedSubCategory2"
                                    value={selectedSubCategory2}
                                    onChange={(e) => setSelectedSubCategory2(e.target.value)}
                                    disabled={!selectedSubCategory1 || !selectedPublication || !selectedCategory || selectedCategory !== 'Matrimonial' || selectedEdition !== 'All Edition'}
                                >
                                    <option value="">-Subcategory-</option>
                                    {subCategory2Options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                <div className="content">
                    <div className="horizonital-line-box">
                        <p>Write Below Text Area</p>
                    </div>
                    <div>
                        <label htmlFor="addTick">Add Tick</label>
                        <input
                            type="checkbox"
                            id="addTick"
                            checked={isTickAdded}
                            onChange={handleTickBoxChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="addBold">Add Bold</label>
                        <input
                            type="checkbox"
                            id="addBold"
                            checked={isBoldText}
                            onChange={handleBoldText}
                        />
                    </div>
                    <div>
                        <div className="input-field">
                            <label htmlFor="bgColor">BG Color</label>
                            <select
                                id="bgColor"
                                value={selectedBgColor}
                                onChange={handleBgColorChange}
                            >
                                {colorOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="input-field">
                        <label htmlFor="textArea"></label>
                        <textarea
                            id="textArea"
                            rows={12.5}
                            cols={45}
                            placeholder="Sample Ads... Requires male/female Sales Coordinator, English speaking Telecallers and Computer typist. Good Salary. Walkin FF-20, Palika Bazar GT Road Ghaziabad."
                            value={textAreaValue}
                            onChange={handleTextAreaChange}
                            style={{ backgroundColor: selectedBgColor,fontWeight: isBoldText ? 'bold' : 'normal' }}
                            disabled={!selectedSubCategory1 || !selectedSubCategory2}
                        />
                    </div>
                    <div className="price-info">
                        <PriceInfo
                            basePrice={basePrice}
                            extraCharacters={extraCharacters}
                            extraPrice={extraPrice}
                            totalPrice={totalPrice}
                        />
                    </div>
                    <div className='upload'>
                        <p>Note: For certain ads, supporting documents will be required by the publication house. You will be contacted for the same. Upload now or send on <a href="mailto:sales@plusadversiting@gmail.com">sales@plusadversiting@gmail.com</a></p>
                        <input type="file" id="fileUpload" />
                        <label htmlFor="fileUpload" className="upload-button">Upload File</label>
                    </div>

                    <div className="table-content-box">
                        <h3>Selected Content</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Selected Publication:</td>
                                    <td>{selectedPublication}</td>
                                </tr>
                                <tr>
                                    <td>Selected Category:</td>
                                    <td>{selectedCategory}</td>
                                </tr>
                                <tr>
                                    <td>Selected Edition:</td>
                                    <td>{selectedEdition}</td>
                                </tr>
                                <tr>
                                    <td>Selected Subcategory 1:</td>
                                    <td>{selectedSubCategory1}</td>
                                </tr>
                                <tr>
                                    <td>Selected Subcategory 2:</td>
                                    <td>{selectedSubCategory2}</td>
                                </tr>
                                <tr>
                                    <td>Typed Text:</td>
                                    <td>{textAreaValue}</td>
                                </tr>
                                <tr>
                                    <td>Extra Lines:</td>
                                    <td>{extraCharacters}</td>
                                </tr>
                                <tr>
                                    <td>Total Amount:</td>
                                    <td>Rs. {totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
            <div className="preview">
                <h3>Preview</h3>
                <textarea
                    id="previewTextArea"
                    rows={10}
                    cols={35}
                    placeholder='Ads Preview...'
                    value={previewContent}
                    readOnly
                    style={{ backgroundColor: selectedBgColor,  fontWeight: isBoldText ? 'bold' : 'normal' }}
                    disabled={!selectedSubCategory1 || !selectedSubCategory2}
                />
            </div>

            <div>
                {/* Include CustomCalendar component here */}
                <CustomCalendar />

                <div>
                    <div className="composepage-btn">
                        <button type='button' onClick={handleSaveData}> Proceed To Payment </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComposePage;

