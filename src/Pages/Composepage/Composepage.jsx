import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Popup from 'reactjs-popup';
import './Composepage.css';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { Link } from 'react-router-dom';
import the_hindu_logo from '../Assests/the_hindu_logo.jpg'
import modal_logo from '../Assests/modal_logo.png'



const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSundays, setSelectedSundays] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Function to check if a date is a Sunday
    const isSunday = (date) => {
        return date.getDay() === 0;
    };

    // Custom filter for disabling days that are not Sundays
    const filterPassedDate = (date) => {
        const today = new Date();
        return date.getDay() === 0 && date > today;
    };

    // Function to handle date selection and set selected Sunday
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowPopup(false);

        if (isSunday(date)) {
            const nextSundays = [date];
            for (let i = 1; i < 4; i++) {
                const nextSunday = new Date(date);
                nextSunday.setDate(date.getDate() + i * 7); // Increment by 7 days for next Sunday
                nextSundays.push(nextSunday);
            }
            setSelectedSundays(nextSundays);
            setShowPopup(true);
        } else {
            setSelectedSundays([]);
        }
    };


    const handleSelectOption = (option) => {
        // Handle the selection of one Sunday date and the next 3 Sundays
        setSelectedDate(option);
        setShowPopup(false);
        // Optionally, you can perform additional logic based on the selected option
    };



    return (
        <div className="custom-calendar">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateSelect}
                filterDate={filterPassedDate}
                showYearDropdown
                scrollableYearDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                inline
            />
            <Popup
                trigger={<div className="popup-trigger"></div>}
                position="left "
                open={showPopup}
                onClose={() => setShowPopup(false)}
            >
                <div className="modal-content">
                    <p>Special Offers Flat 50%</p>
                    <img src={modal_logo} alt="" />
                    <p>Pay 1 Sunday Get Next 3 Sundays Free</p>
                    <p>( You Pay Flats 50% Amount Only for Your Next 3 Sundays )</p>
                    <ul>
                        {selectedSundays &&
                            selectedSundays.map((sunday, index) => (
                                <li key={index} onClick={() => handleSelectOption(sunday)}>
                                    {sunday.toLocaleDateString('en-US')}
                                </li>
                            ))}
                    </ul>
                    <div className='buttons-container'>
                    <button>Yes</button>
                    <button>No</button>
                    </div>
                </div>
            </Popup>
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
    const [isTickAdded, setIsTickAdded] = useState(false); // State to track if tick is added
    const [isBoldText, setIsBoldText] = useState(false);
    const [paymentOption, setPaymentOption] = useState('');
    const [selectedBgColor, setSelectedBgColor] = useState('#ffffff'); // Default background color
    const colorOptions = [
        { value: '#ffffff', label: 'No BG Color' },
        { value: '#ccffff', label: 'Light Blue' },
        { value: '#cefdd0', label: 'Light Green' },
        { value: '#feccc9', label: 'Light Pink' },
        { value: '#ffffca', label: 'Light Yellow' },
        { value: '#ffccff', label: 'Light Purple' },
    ];

    useEffect(() => {
        setSelectedInputLabel(params.get('selectedInputLabel') || '');
    }, [location.search, params]);



    const handleTickBoxChange = (e) => {
        const isChecked = e.target.checked;
        setIsTickAdded(isChecked);

        // Add or remove tick symbol based on whether the tick box is checked
        const tickSymbol = '✓';
        const updatedTextAreaValue = isChecked ? tickSymbol + textAreaValue.slice(tickSymbol.length) : textAreaValue.slice(tickSymbol.length);
        setTextAreaValue(updatedTextAreaValue);
        setPreviewContent(updatedTextAreaValue); // Update preview content

        const tickPrice = isChecked ? 310 : 0;
        const totalPriceWithTick = basePrice + tickPrice + extraPrice * extraCharacters;
        setTotalPrice(totalPriceWithTick);
    };

    const handleBoldText = () => {
        setIsBoldText(!isBoldText);

        const updatedTextAreaValue = !isBoldText ? textAreaValue.toUpperCase() : textAreaValue.toLowerCase();
        setTextAreaValue(updatedTextAreaValue);
        setPreviewContent(updatedTextAreaValue);

        const boldPrice = isBoldText ? 0 : basePrice * 0.3;
        const totalPriceWithBold = basePrice + boldPrice + extraPrice * extraCharacters;
        setTotalPrice(totalPriceWithBold);
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
        { value: 'Wanted Grooms', label: 'Wanted Grooms' },
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
        const selectedColor = e.target.value;

        if (selectedColor === '#ffffff') {
            // Set the total price without adding any extra price for background color
            const totalPriceWithoutBgColor = basePrice + extraPrice * extraCharacters;
            setTotalPrice(totalPriceWithoutBgColor);
            setSelectedBgColor('#ffffff'); // Set the selected background color to transparent
        } else {
            setSelectedBgColor(selectedColor);

            // Calculate the price for background color and update the total price accordingly
            const bgColorPrice = basePrice * 0.1;
            const totalPriceWithBgColor = basePrice + bgColorPrice + extraPrice * extraCharacters;
            setTotalPrice(totalPriceWithBgColor);
        }
    };

    const handlePaymentOptionChange = (e) => {
        setPaymentOption(e.target.value);
    };


    const editionOptions = getEditionOptions();

    return (
        <div className='package'>
            <div className='composepage-left'>
                <div className='page-logo'>
                    <img src={the_hindu_logo} alt="" />
                </div>
                <div className="side menu">
                    <h3>Your Package</h3>
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
                    <div class="select-input-label">
                        {selectedInputLabel && (
                            <span style={{ marginLeft: '5px' }}>{selectedInputLabel}</span>
                        )}
                    </div>
                </div>
                <div className='upload'>
                    <p>Note: For certain ads, supporting documents will be required by the publication house. You will be contacted for the same. Upload now or send on <a href="mailto:sales@plusadversiting@gmail.com">sales@plusadversiting@gmail.com</a></p>
                    <input type="file" id="fileUpload" />
                    <label htmlFor="fileUpload" className="upload-button">Upload File</label>
                </div>
            </div>

            <div>
                <div className="marquee-container">
                    <div>
                        {/* Selected elements with marquee animation */}
                        <span>{selectedPublication}</span>
                        <span>-{selectedCategory}</span>
                        <span>-{selectedEdition}</span>
                        <span>-{selectedSubCategory1}</span>
                        <span>-{selectedSubCategory2}</span>
                        {isTickAdded && <span>-Tick</span>}
                        {isBoldText && <span>-Bold</span>}
                        {selectedBgColor !== '#ffffff' && <span>-BG Color</span>}
                        <span>-Extra Lines: {extraCharacters}</span>
                        <span>-Total Amount: Rs. {totalPrice}</span>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div class="icon">
                            <div class="arrow"></div>
                        </div>
                        <h3 className={`select-subcategorys ${selectedSubCategory1 && selectedSubCategory2 ? 'disable' : ''}`}>Select SubCategorys</h3>
                        <div className="input-field">
                            <label htmlFor="selectedSubCategory1"></label>
                            <select
                                id="selectedSubCategory1"
                                value={selectedSubCategory1}
                                onChange={handleSubCategory1Change}
                                disabled={!selectedPublication || !selectedCategory || selectedCategory !== 'Matrimonial' || selectedEdition !== 'All Edition'}
                            >
                                <option value="">Subcategory-1</option>
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
                    <div className={`horizonital-line-box ${!selectedSubCategory2 ? 'disabled' : ''}`}>
                        <h3>Compose Area</h3>
                    </div>
                    <div className={`text-area ${!selectedSubCategory2 ? 'disabled' : ''}`}>
                        <label htmlFor="textArea"></label>
                        <textarea
                            id="textArea"
                            rows={12.5}
                            cols={45}
                            placeholder="Sample Ads... ✓ Requires male/female Sales Coordinator, English speaking Telecallers and Computer typist. Good Salary. Walkin FF-20, Palika Bazar GT Road Ghaziabad."
                            value={textAreaValue}
                            onChange={handleTextAreaChange}
                            style={{ backgroundColor: selectedBgColor, fontWeight: isBoldText ? 'bold' : 'normal' }}
                            disabled={!selectedSubCategory1 || !selectedSubCategory2}
                        />
                    </div>
                    <div className={`preview-area ${!selectedSubCategory2 ? 'disabled' : ''}`}>
                        <textarea
                            id="previewTextArea"
                            rows={10}
                            cols={35}
                            placeholder='Ads Preview...'
                            value={previewContent}
                            readOnly
                            style={{ backgroundColor: selectedBgColor, fontWeight: isBoldText ? 'bold' : 'normal' }}
                            disabled={!selectedSubCategory1 || !selectedSubCategory2}
                        />
                    </div>
                    <div className={`calendar-container ${!selectedSubCategory2 ? 'disabled' : ''}`}>
                        {/* Include CustomCalendar component here */}
                        <CustomCalendar />
                    </div>

                    <div className="content">
                        <label htmlFor="addTick">Add Tick</label>
                        <input
                            type="checkbox"
                            id="addTick"
                            checked={isTickAdded}
                            onChange={handleTickBoxChange}
                        />
                        <label htmlFor="addBold">Add Bold</label>
                        <input
                            type="checkbox"
                            id="addBold"
                            checked={isBoldText}
                            onChange={handleBoldText}
                        />
                        <div className="input-field1">
                            <label htmlFor="bgColor">BG Color(Extra Price)</label>
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
                    <div className="price-info">
                        <PriceInfo
                            basePrice={basePrice}
                            extraCharacters={extraCharacters}
                            extraPrice={extraPrice}
                            totalPrice={totalPrice}
                        />
                    </div>
                    <div className="table-content-box">
                        <h3>Selected Content</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Publication</th>
                                    <th>Category</th>
                                    <th>Edition</th>
                                    <th>Subcategory 1</th>
                                    <th>Subcategory 2</th>
                                    <th>Extra Lines</th>
                                    {/* Conditionally render additional labels based on checkbox states */}
                                    {isTickAdded && <th>Add Tick</th>}
                                    {isBoldText && <th>Add Bold</th>}
                                    {selectedBgColor !== '#ffffff' && <th>Add BG Color</th>}
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectedPublication}</td>
                                    <td>{selectedCategory}</td>
                                    <td>{selectedEdition}</td>
                                    <td>{selectedSubCategory1}</td>
                                    <td>{selectedSubCategory2}</td>
                                    <td>{extraCharacters}</td>
                                    {/* Conditionally render additional data based on checkbox states */}
                                    {isTickAdded && <td>Tick added</td>}
                                    {isBoldText && <td>Bold text</td>}
                                    {selectedBgColor !== '#ffffff' && <td>{selectedBgColor}</td>}
                                    <td>Rs. {totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="payment-options">
                        <p className="payment-info-box"></p>
                        <div>
                            <input
                                type="radio"
                                id="nilTransaction"
                                name="paymentOption"
                                value="nilTransaction"
                                checked={paymentOption === 'nilTransaction'}
                                onChange={handlePaymentOptionChange}
                            />
                            <label htmlFor="nilTransaction">Nill Transaction Charges for payment (G Pay, Bank Transfer (IMPS))</label>
                        </div>
                        <p className="payment-options-or">(or)</p>
                        <p className="payment-info-box"></p>
                        <div>
                            <input
                                type="radio"
                                id="paymentGateway"
                                name="paymentOption"
                                value="paymentGateway"
                                checked={paymentOption === 'paymentGateway'}
                                onChange={handlePaymentOptionChange}
                            />
                            <label htmlFor="paymentGateway">Payment Gateway (2.5% Extra Charges)</label>
                        </div>
                    </div>
                    <div className="composepage-btn">
                        <Link to="/paymentpage">
                            <button type="button">Proceed To Payment</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComposePage;


