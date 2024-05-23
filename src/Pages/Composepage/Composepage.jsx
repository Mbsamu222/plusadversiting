import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Popup from 'reactjs-popup';
import './Composepage.css';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { Link } from 'react-router-dom';
import the_hindu_logo from '../Assests/the_hindu_logo.jpg'
import modal_logo from '../Assests/modal_logo.png'
import axios from 'axios';


const totalPrice = 100;

const handlePhonePePayment = async () => {
    try {
        const response = await axios.post('http://localhost:4001/api/payment', { amount: totalPrice });
        console.log(response.data);
        if (response.data.success === true) {
            window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
        }
    } catch (error) {
        console.error('Error initiating PhonePe payment:', error);
    }
};


const CustomCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSundays, setSelectedSundays] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const isSunday = (date) => date.getDay() === 0;

    const filterPassedDate = (date) => {
        const today = new Date();
        return date.getDay() === 0 && date > today;
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowPopup(false);

        if (isSunday(date)) {
            const nextSundays = [date];
            for (let i = 1; i < 4; i++) {
                const nextSunday = new Date(date);
                nextSunday.setDate(date.getDate() + i * 7);
                nextSundays.push(nextSunday);
            }
            setSelectedSundays(nextSundays);
            setShowPopup(true);
        } else {
            setSelectedSundays([]);
        }
    };

    const handleSelectOption = (option) => {
        setShowPopup(false);

        if (option instanceof Date) {
            setSelectedDate(option);
            setSelectedSundays([]);
        }

        if (Array.isArray(option)) {
            setSelectedSundays(option);
            setSelectedDate(option[0]);
        }
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
                customInput={<CustomInput />}
                inline
                shouldDisabledDay={isSunday}
            />
            <Popup
                trigger={<div className="popup-trigger"></div>}
                position="left"
                open={showPopup}
                onClose={() => setShowPopup(false)}
            >
                <div className="modal-content">
                    <h4>Special Offers Flat 50%</h4>
                    <img src={modal_logo} alt="" />
                    <p>Pay 1 Sunday 50% Offer Get Next 3 Sundays Free</p>
                    <p>( You Pay Flats 50% Amount Only for Your Next 3 Sundays )</p>
                    <ul className='selectedDate'>
                        {selectedDate && (
                            <li>{formatDate(selectedDate)}</li>
                        )}
                        <div className='buttons-container1'>
                            <button onClick={() => handleSelectOption(selectedDate)}> Select 1 Sunday</button>
                        </div>
                    </ul>
                    <ul>
                        {selectedSundays.map((sunday, index) => (
                            <li key={index}>
                                {formatDate(sunday)}
                            </li>
                        ))}
                        <div className='buttons-container2'>
                            <button onClick={() => handleSelectOption(selectedSundays)}> Select 4 Sundays</button>
                        </div>
                    </ul>
                </div>
            </Popup>
        </div>
    );
};

const CustomInput = ({ value, onClick }) => (
    <input type="text" value={value} onClick={onClick} readOnly />
);

const PriceInfo = ({ basePrice, extraCharacters, extraPrice, totalPrice }) => {
    return (
        <div className="price-info">
            <div className="price-info-text">
                <p>Base Price(3 Lines): Rs. {basePrice}</p>
                <p>Extra Lines: {extraCharacters}</p>
                <p>Extra Price(per 35 Characters): Rs. {extraPrice}</p>
                <p>(GST Extra 5 %) Total Amount: Rs. {totalPrice}</p>
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
    const [selectedPublication] = useState(initialSelectedPublication);
    const [selectedCategory] = useState(initialSelectedCategory);
    const [selectedEdition] = useState(initialSelectedEdition);
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
    const [couponCode, setCouponCode] = useState('');
    const [selectedBgColor, setSelectedBgColor] = useState('#ffffff'); // Default background color
    const [selectedDate] = useState(null);
    const [selectedSundays] = useState([]);
    const colorOptions = [
        { value: '#ffffff', label: 'No BG Color' },
        { value: '#ccffff', label: 'Light Blue' },
        { value: '#cefdd0', label: 'Light Green' },
        { value: '#feccc9', label: 'Light Pink' },
        { value: '#ffffca', label: 'Light Yellow' },
        { value: '#ffccff', label: 'Light Purple' },
    ];

    useEffect(() => {
        setSelectedSubCategory1('');
        setSelectedSubCategory2('');
    }, [selectedPublication, selectedCategory, selectedEdition]);



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
        { value: 'Real Estate', label: 'Real Estate' },
        { value: 'Rental', label: 'Rental' },
        { value: 'Situation Req', label: 'Situation Req' },
        { value: 'Auto/Gen/ Rental/ Finance', label: 'Auto/Gen/ Rental/ Finance' },
        { value: 'Business Off/Edu/Tender', label: 'Business Off/Edu/Tender ' },
        { value: 'Marriage Bureau', label: 'Marriage Bureau' },
        { value: 'Personal / Xpressions', label: 'Personal / Xpressions' },
        { value: 'Situation Vacant', label: 'Situation Vacant' },
        { value: 'Public / Auction Notice', label: 'Public / Auction Notice' },
        { value: 'Industrial Needs spl focus*', label: 'Industrial Needs  spl focus*' },
        { value: 'General Mart', label: ' General Mart' },
        { value: 'Automotive-4 W', label: 'Automotive-4 W' },
        { value: 'Auto -2Wheeler', label: 'Auto -2Wheeler' },
        { value: 'Education', label: 'Education' },
        { value: 'Tenders', label: 'Tenders' },

    ];
    const getEditionOptions = () => {
        switch (selectedCategory) {
            case 'Matrimonial':
                return [
                    { value: 'All Edition', label: 'All Edition', disabled: false },
                    { value: 'Chennai Edition', label: 'Chennai Edition', disabled: true },
                    { value: 'Other Edition', label: 'Other Edition', disabled: true },
                    { value: 'TN Edition', label: 'TN Edition', disabled: true },
                ];
            case 'Real Estate':
            case 'Rental':
            case 'Situation Req':
            case 'Business Off/Edu/Tender':
            case 'Personal / Xpressions':
            case 'Situation Vacant':
            case 'Public / Auction Notice':
            case 'Industrial Needs spl focus*':
            case 'General Mart':
            case 'Automotive-4 W':
            case 'Auto -2Wheeler':
            case 'Education':
            case 'Tenders':
                return [
                    { value: 'TN Edition', label: 'TN Edition', disabled: false },
                    { value: 'All Edition', label: 'All Edition', disabled: false },
                    { value: 'Chennai Edition', label: 'Chennai Edition', disabled: false },
                    { value: 'Other Edition', label: 'Other Edition', disabled: false },
                ];
            case 'Marriage Bureau':
            case 'Auto/Gen/ Rental/ Finance':
                return [
                    { value: 'TN Edition', label: 'TN Edition', disabled: false },
                ];
            default:
                return [
                    { value: 'Chennai Edition', label: 'Chennai Edition', disabled: false },
                    { value: 'All Edition', label: 'All Edition', disabled: false },
                    { value: 'Other Edition', label: 'Other Edition', disabled: false },
                    { value: 'TN Edition', label: 'TN Edition', disabled: false },
                ];
        }
    };

    const subCategory1Options = useMemo(() => {
        switch (selectedCategory) {
            case 'Matrimonial':
                return [
                    { value: 'Wanted Bride', label: 'Wanted Bride' },
                    { value: 'Wanted Grooms', label: 'Wanted Grooms' },
                ];
            case 'Real Estate':
                return [
                    { value: 'Buying', label: 'Buying' },
                    { value: 'Selling', label: 'Selling' },
                    { value: 'Real Estate Other', label: 'Real Estate Other' },
                ];
            case 'Rental':
                return [
                    { value: 'Rental', label: 'Rental' },
                    { value: 'Rental Residential', label: 'Rental Residential' },
                ];
            case 'Personal / Xpressions':
                return [
                    { value: 'Personal', label: 'Personal' },

                ];
            case 'Situation Vacant':
                return [
                    { value: 'Situation Vacant', label: 'Situation Vacant' },

                ];
            case 'Business Off/Edu/Tender':
                return [
                    { value: 'Business Offer', label: 'Business Offer' },
                ];
            default:
                return [];
        }
    }, [selectedCategory]);

    const subCategory2Options = useMemo(() => {
        switch (selectedSubCategory1) {
            case 'Wanted Bride':
                return [
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
            case 'Wanted Grooms':
                return [
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
            case 'Buying':
                return [
                    { value: 'Commercial', label: 'CommercialL' },
                    { value: 'Commercial Building', label: 'Commercial Building' },
                    { value: 'Commercial Land', label: 'Commercial Land' },
                    { value: 'Factories Sites', label: 'Factories Sites' },
                    { value: 'Farmhouse/ Land/ Resorts', label: 'Farmhouse/ Land/ Resorts' },
                    { value: 'General', label: 'General' },
                    { value: 'Residential', label: 'Residential' },
                    { value: 'Residential Flat', label: 'Residential Flat' },
                    { value: 'Residential House', label: 'Residential House' },
                    { value: 'Residential Land', label: 'Residential Land' },
                    { value: 'TimeShare', label: 'TimeShare' },
                ];
            case 'Selling':
                return [
                    { value: 'Commercial', label: 'Commercial' },
                    { value: 'Commercial Building', label: 'Commercial Building' },
                    { value: 'Commercial Land', label: 'Commercial Land' },
                    { value: 'Factories Sites', label: 'Factories Sites' },
                    { value: 'Farmhouse/ Land/ Resorts', label: 'Farmhouse/ Land/ Resorts' },
                    { value: 'General', label: 'General' },
                    { value: 'Residential', label: 'Residential' },
                    { value: 'Residential Flatnew', label: 'Residential Flatnew' },
                    { value: 'Residential Flatothers', label: 'Residential Flatothers' },
                    { value: 'Residential Flatresale', label: 'Residential Flatresale' },
                    { value: 'Residential House', label: 'Residential House' },
                    { value: 'Residential Land', label: 'Residential Land' },
                    { value: 'TimeShare', label: 'TimeShare' },
                    // Add more options as needed
                ];
            case 'Real Estate Other':
                return [
                    { value: 'Architects ', label: 'Architects ' }, { value: 'Bricks / Concrete Blocks', label: 'Bricks / Concrete Blocks' }, { value: 'Building Contractors', label: 'Building Contractors' }, { value: 'Building Materials', label: 'Building Materials' }, { value: 'Buzaar Cement', label: 'Buzaar Cement' }, { value: 'Consultants', label: 'Consultants' }, { value: 'General', label: 'General' }, { value: 'Hardware', label: 'Hardware' }, { value: 'Home Decor', label: 'Home Decor' }, { value: 'Home Finance', label: 'Home Finance' }, { value: 'Joint Development', label: 'Joint Development' }, { value: 'Marble', label: 'Marble' }, { value: 'Painting Contractors', label: 'Painting Contractors' }, { value: 'Plumbing/maintenance', label: 'Plumbing/maintenance' }, { value: 'Public Notice', label: 'Public Notice' }, { value: 'Turnkey Developers', label: 'Turnkey Developers' },
                ];
            case 'Rental':
                return [
                    { value: 'Accommodation Wanted ', label: 'Accommodation Wanted ' },
                    { value: 'Accommodation Wanted Commercial ', label: 'Accommodation Wanted Commercial ' },
                    { value: 'Accommodation Wanted Residential ', label: 'Accommodation Wanted Residential ' },
                    { value: 'Bank Notice ', label: 'Bank Notice ' },
                    { value: 'Change Of Address Services ', label: 'Change Of Address Services ' },
                    { value: 'Commercial Rental Fabrication Works ', label: 'Commercial Rental Fabrication Works ' },
                    { value: 'Factories Sites ', label: 'Factories Sites ' },
                    { value: 'Farm House/ Land/ Resorts ', label: 'Farm House/ Land/ Resorts ' },
                    { value: 'General ', label: 'General ' },
                    { value: 'Guest House ', label: 'Guest House ' },
                    { value: 'Hostel ', label: 'Hostel ' },
                    { value: 'Paying Guest Accommodation ', label: 'Paying Guest Accommodation ' },
                    { value: 'Service Apartments', label: 'Service Apartments' },
                    { value: 'Timeshare ', label: 'Timeshare ' },
                ];
            case 'Rental Residential':
                return [
                    { value: 'Abiramapuram', label: 'Abiramapuram ' }, { value: 'Adambakkam ', label: 'Adambakkam ' }, { value: 'Adyar', label: 'Adyar' }, { value: 'Airport Road ', label: 'Airport Road ' }, { value: 'Alandur ', label: 'Alandur ' }, { value: 'Alwarpet ', label: 'Alwarpet ' }, { value: 'Alwarthiru Nagar', label: 'Alwarthiru Nagar' }, { value: 'Ambattur', label: 'Ambattur' }, { value: 'Aminjikarai', label: 'Aminjikarai' }, { value: 'Anakaputhur', label: 'Anakaputhur' }, { value: 'Anjanapura', label: 'Anjanapura' }, { value: 'Anna Nagar', label: 'Anna Nagar' }, { value: 'Anna Nagar East ', label: 'Anna Nagar East ' }, { value: 'Anna Nagar West', label: 'Anna Nagar West' }, { value: 'Anna Salai ', label: 'Anna Salai' }, { value: 'Arakonam', label: 'Arakonam' }, { value: 'Arumbakkam', label: 'Arumbakkam' }, { value: 'Ashok Nagar', label: 'Ashok Nagar' }, { value: 'Avadi', label: 'Avadi' }, { value: 'Ayanavaram', label: 'Ayanavaram' }, { value: 'Banashankari', label: 'Banashankari' }, { value: 'Banaswadi', label: 'Banaswadi' }, { value: 'Bannerghatta Road', label: 'Bannerghatta Road' }, { value: 'Basavanagudi', label: 'Basavanagudi' }, { value: 'Besant Nagar ', label: 'Besant Nagar ' }, { value: 'Broadway', label: 'Broadway' }, { value: 'Brookfields', label: 'Brookfields' }, { value: 'Btm Layout', label: 'Btm Layout' }, { value: 'C. V. Raman Nagar', label: 'C. V. Raman Nagar' }, { value: 'Chamarajapet', label: 'Chamarajapet' }, { value: 'Chengalpet', label: 'Chengalpet' }, { value: 'Chetpet', label: 'Chetpet' }, { value: 'Chintadripet', label: 'Chintadripet' }, { value: 'Chitlapakkam', label: 'Chitlapakkam' }, { value: 'Choolai', label: 'Choolai' }, { value: 'Choolaimedu', label: 'Choolaimedu' }, { value: 'Chromepet', label: 'Chromepet' }, { value: 'Cinc Road', label: 'Cinc Road' }, { value: 'Cooke Town', label: 'Cooke Town' }, { value: 'Defence Colony', label: 'Defence Colony' }, { value: 'Devanahalli', label: 'Devanahalli' }, { value: 'Dollars Colony', label: 'Dollars Colony' }, { value: 'East Coast Road', label: 'East Coast Road' }, { value: 'Egmore', label: 'Egmore' }, { value: 'Ekkaduthangal', label: 'Ekkaduthangal' }, { value: 'Electronics City', label: 'Electronics City' }, { value: 'Ennore', label: 'Ennore' }, { value: 'Fort St George', label: 'Fort St George' }, { value: 'Frazer Town', label: 'Frazer Town' }, { value: 'Ganganagar', label: 'Ganganagar' }, { value: 'Gopalapuram', label: 'Gopalapuram' }, { value: 'Gowrivakkam', label: 'Gowrivakkam' }, { value: 'Greams Road', label: 'Greams Road' }, { value: 'Guduvancheri', label: 'Guduvancheri' }, { value: 'Guindy', label: 'Guindy' }, { value: 'Guindy Industrial Estate', label: 'Guindy Industrial Estate' }, { value: 'Gummidipoondi', label: 'Gummidipoondi' }, { value: 'Halasuru', label: 'Halasuru' }, { value: 'Hbr Layout', label: 'Hbr Layout' }, { value: 'Hebbal', label: 'Hebbal' }, { value: 'Hosur Road', label: 'Hosur Road' }, { value: 'Hrbr Layout', label: 'Hrbr Layout' }, { value: 'Hsr Layout', label: 'Hsr Layout' }, { value: 'I C F Colony ', label: 'I C F Colony ' }, { value: 'I I T ', label: 'I I T ' }, { value: 'Indira Nagar', label: 'Indira Nagar' }, { value: 'Injambakkam', label: 'Injambakkam' }, { value: 'International Airport', label: 'International Airport' }, { value: 'Itpl', label: 'Itpl' }, { value: 'Iyyappanthangal', label: 'Iyyappanthangal' }, { value: 'J P Nagar', label: 'J P Nagar' }, { value: 'Jafferkhanpet', label: 'Jafferkhanpet' }, { value: 'Jakkur', label: 'Jakkur' }, { value: 'Jalahalli', label: 'Jalahalli' }, { value: 'Jawahar Nagar ', label: 'Jawahar Nagar ' }, { value: 'Jayanagar', label: 'Jayanagar' }, { value: 'Jc Road', label: 'Jc Road' }, { value: 'Jeevanbhima Nagar', label: 'Jeevanbhima Nagar' }, { value: 'K K Nagar', label: 'K K Nagar' }, { value: 'K R Puram', label: 'K R Puram' }, { value: 'Kaggadaspura', label: 'Kaggadaspura' }, { value: 'Kalasipalayam', label: 'Kalasipalayam' }, { value: 'Kalyananagar', label: 'Kalyananagar' }, { value: 'Kanakapura Road', label: 'Kanakapura Road' }, { value: 'Kanchipuram', label: 'Kanchipuram' }, { value: 'Kasturi Nagar', label: 'Kasturi Nagar' }, { value: 'Kavarapettai', label: 'Kavarapettai' }, { value: 'Kelambakkam', label: 'Kelambakkam' }, { value: 'Kellys', label: 'Kellys' }, { value: 'Kellys', label: 'Kellys' }, { value: 'Kilkattalai', label: 'Kilkattalai' }, { value: 'Kilpauk', label: 'Kilpauk' }, { value: 'Kodambakkam', label: 'Kodambakkam' }, { value: 'Kodungaiyur', label: 'Kodungaiyur' }, { value: 'Kolathur', label: 'Kolathur' }, { value: 'Koramangala', label: 'Koramangala' }, { value: 'Korattur', label: 'Korattur' }, { value: 'Kosappur', label: 'Kosappur' }, { value: 'Kottivakkam', label: 'Kottivakkam' }, { value: 'Kotturpuram', label: 'Kotturpuram' }, { value: 'Kovilambakkam', label: 'Kovilambakkam' }, { value: 'Koyambedu', label: 'Koyambedu' }, { value: 'Kumara Park ', label: 'Kumara Park ' }, { value: 'Kumaraswamy Layout', label: 'Kumaraswamy Layout' }, { value: 'Kundrathur', label: 'Kundrathur' }, { value: 'Lalbagh Road', label: 'Lalbagh Road' }, { value: 'Langford Town', label: 'Langford Town' }, { value: 'M G Road', label: 'M G Road' }, { value: 'Madhavaram', label: 'Madhavaram' }, { value: 'Madipakkam', label: 'Madipakkam' }, { value: 'Maduravoyal', label: 'Maduravoyal' }, { value: 'Magadi Road', label: 'Magadi Road' }, { value: 'Mahabalipuram', label: 'Mahabalipuram' }, { value: 'Mahadevapura', label: 'Mahadevapura' }, { value: 'Mahalaxmipuram', label: 'Mahalaxmipuram' }, { value: 'Malleshwaram', label: 'Malleshwaram' }, { value: 'Manali', label: 'Manali' }, { value: 'Manapakkam', label: 'Manapakkam' }, { value: 'Mandaveli', label: 'Mandaveli' }, { value: 'Mangadu', label: 'Mangadu' }, { value: 'Maraimalai Nagar', label: 'Maraimalai Nagar' }, { value: 'Marathahalli', label: 'Marathahalli' }, { value: 'Mathikere', label: 'Mathikere' }, { value: 'Medavakkam', label: 'Medavakkam' }, { value: 'Meenambakkam', label: 'Meenambakkam' }, { value: 'Minjur', label: 'Minjur' }, { value: 'Mogappair', label: 'Mogappair' }, { value: 'Mogappair East', label: 'Mogappair East' }, { value: 'Mogappair West', label: 'Mogappair West' }, { value: 'Moolakadai', label: 'Moolakadai' }, { value: 'Mugalivakkam', label: 'Mugalivakkam' }, { value: 'Multiple Locations', label: 'Multiple Locations' }, { value: 'Mylapore', label: 'Mylapore' }, { value: 'Nagarabhavi', label: 'Nagarabhavi' }, { value: 'Nandambakkam', label: 'Nandambakkam' }, { value: 'Nandanam', label: 'Nandanam' }, { value: 'Nanganallur', label: 'Nanganallur' }, { value: 'Navalur', label: 'Navalur' }, { value: 'Neelankarai', label: 'Neelankarai' }, { value: 'Nesapakkam', label: 'Nesapakkam' }, { value: 'New Bel Road', label: 'New Bel Road' }, { value: 'Nolambur', label: 'Nolambur' }, { value: 'Noombal', label: 'Noombal' }, { value: 'Nungambakkam', label: 'Nungambakkam' }, { value: 'Omr', label: 'Omr' }, { value: 'Oragadam', label: 'Oragadam' }, { value: 'Others', label: 'Others' }, { value: 'Outer Ring Road', label: 'Outer Ring Road' }, { value: 'Padappai', label: 'Padappai' }, { value: 'Padi', label: 'Padi' }, { value: 'Padmanabha Nagar', label: 'Padmanabha Nagar' }, { value: 'Padur', label: 'Padur' }, { value: 'Palavakkam', label: 'Palavakkam' }, { value: 'Pallavaram', label: 'Pallavaram' }, { value: 'Pallikaranai', label: 'Pallikaranai' }, { value: 'Pammal', label: 'Pammal' }, { value: 'Park Town', label: 'Park Town' }, { value: 'Parrys', label: 'Parrys' }, { value: 'Pattabiram', label: 'Pattabiram' }, { value: 'Pazhavanthangal', label: 'Pazhavanthangal' }, { value: 'Peenya', label: 'Peenya' }, { value: 'Perambur', label: 'Perambur' }, { value: 'Periamet', label: 'Periamet' }, { value: 'Periyar Nagar', label: 'Periyar Nagar' }, { value: 'Perungalathur', label: 'Perungalathur' }, { value: 'Perungudi', label: 'Perungudi' }, { value: 'Ponneri', label: 'Ponneri' }, { value: 'Poonamallee', label: 'Poonamallee' }, { value: 'Porur', label: 'Porur' }, { value: 'Pozhichalur', label: 'Pozhichalur' }, { value: 'Pulicat', label: 'Pulicat' }, { value: 'Purasawalkam', label: 'Purasawalkam' }, { value: 'Puzhal', label: 'Puzhal' }, { value: 'Puzhuthivakkam', label: 'Puzhuthivakkam' }, { value: 'R A Puram', label: 'R A Puram' }, { value: 'R M V Extension ', label: 'R M V Extension ' }, { value: 'Rabindranath Tagore Nagar', label: 'Rabindranath Tagore Nagar' }, { value: 'Raj Bhavan', label: 'Raj Bhavan' }, { value: 'Rajajinagar', label: 'Rajajinagar' }, { value: 'Rajarajeshwari Nagar', label: 'Rajarajeshwari Nagar' }, { value: 'Ramavaram', label: 'Ramavaram' }, { value: 'Red Hills', label: 'Red Hills' }, { value: 'Richmond Town', label: 'Richmond Town' }, { value: 'Royapettah', label: 'Royapettah' }, { value: 'Royapuram', label: 'Royapuram' }, { value: 'Sadashiva Nagar', label: 'Sadashiva Nagar' }, { value: 'Sahakaranagar', label: 'Sahakaranagar' }, { value: 'Saidapet', label: 'Saidapet' }, { value: 'Saligramam', label: 'Saligramam' }, { value: 'Sanjaynagar', label: 'Sanjaynagar' }, { value: 'Santhome', label: 'Santhome' }, { value: 'Sarjapur Road', label: 'Sarjapur Road' }, { value: 'Sathyamurthy Nagar', label: 'Sathyamurthy Nagar' }, { value: 'Selaiyur', label: 'Selaiyur' }, { value: 'Sembakkam', label: 'Sembakkam' }, { value: 'Sembium', label: 'Sembium' }, { value: 'Shenoy Nagar', label: 'Shenoy Nagar' }, { value: 'Sheshadripuram', label: 'Sheshadripuram' }, { value: 'Sholavaram', label: 'Sholavaram' }, { value: 'Sholinganallur', label: 'Sholinganallur' }, { value: 'Sidco Estate', label: 'Sidco Estate' }, { value: 'Singaperumal Koil', label: 'Singaperumal Koil' }, { value: 'Siruseri', label: 'Siruseri' }, { value: 'Sowcarpet', label: 'Sowcarpet' }, { value: 'Srinivasa Nagar', label: 'Srinivasa Nagar' }, { value: 'Sriperumbudur', label: 'Sriperumbudur' }, { value: 'St Thomas Mount', label: 'St Thomas Mount' }, { value: 'T Nagar', label: 'T Nagar' }, { value: 'Tambaram', label: 'Tambaram' }, { value: 'Tambaram East', label: 'Tambaram East' }, { value: 'Tambaram Sanatorium', label: 'Tambaram Sanatorium' }, { value: 'Tambaram West', label: 'Tambaram West' }, { value: 'Taramani', label: 'Taramani' }, { value: 'Teynampet', label: 'Teynampet' }, { value: 'Thippasandra', label: 'Thippasandra' }, { value: 'Thirumazhisai ', label: 'Thirumazhisai ' }, { value: 'Thirunindravur', label: 'Thirunindravur' }, { value: 'Thiruvallur', label: 'Thiruvallur' }, { value: 'Thiruvanmiyur', label: 'Thiruvanmiyur' }, { value: 'Thiruverkadu', label: 'Thiruverkadu' }, { value: 'Thuraipakkam', label: 'Thuraipakkam' }, { value: 'Tiruvottiyur ', label: 'Tiruvottiyur ' }, { value: 'Tondiarpet', label: 'Tondiarpet' }, { value: 'Triplicane', label: 'Triplicane' }, { value: 'Tvk Nagar', label: 'Tvk Nagar' }, { value: 'Ullagaram', label: 'Ullagaram' }, { value: 'Urappakkam', label: 'Urappakkam' }, { value: 'Vadapalani', label: 'Vadapalani ' }, { value: 'Valasarawalkam', label: 'Valasarawalkam' }, { value: 'Vanagaram', label: 'Vanagaram' }, { value: 'Vandalur', label: 'Vandalur' }, { value: 'Vasanthanagar', label: 'Vasanthanagar' }, { value: 'Velacheri ', label: 'Velacheri ' }, { value: 'Vellappanchavadi', label: 'Vellappanchavadi' }, { value: 'Vepery', label: 'Vepery' }, { value: 'Vidyaranyapura', label: 'Vidyaranyapura' }, { value: 'Vijayanagara', label: 'Vijayanagara' }, { value: 'Villivakkam', label: 'Villivakkam' }, { value: 'Virugambakkam ', label: 'Virugambakkam ' }, { value: 'Visweswariah Road', label: 'Visweswariah Road' }, { value: 'Vyasarpadi', label: 'Vyasarpadi' }, { value: 'Washermanpet', label: 'Washermanpet' }, { value: 'West Mambalam', label: 'West Mambalam' }, { value: 'Whitefield', label: 'Whitefield' }, { value: 'Yelahanka', label: 'Yelahanka' }, { value: 'Gerugambakkam', label: 'Gerugambakkam' },
                ];
            case 'Personal':
                return [
                    { value: 'Old Age Home', label: 'Old Age Home' }, { value: 'Messages', label: 'Messages' }, { value: 'Centenary', label: 'Centenary' }, { value: 'Others', label: 'Others' }, { value: 'Acknowledgement', label: 'Acknowledgement' }, { value: 'Announcements', label: 'Announcements' }, { value: 'Cancellations', label: 'Cancellations' }, { value: 'Change Of Name', label: 'Change Of Name' }, { value: 'Information Wanted', label: 'Information Wanted' }, { value: 'Lost Found', label: 'Lost Found' }, { value: 'Missing', label: 'Missing' }, { value: 'Thanksgiving', label: 'Thanksgiving' }, { value: 'Web Designing', label: 'Web Designing' },
                ];
            case 'Situation Vacant':
                return [
                    { value: 'Bpo', label: 'Bpo' }, { value: 'Computers IT', label: 'Computers IT' }, { value: 'Consultants', label: 'Consultants' }, { value: 'Couriers', label: 'Couriers' }, { value: 'Detective Services', label: 'Detective Services' }, { value: 'Finance', label: 'Finance' }, { value: 'Garments', label: 'Garments' }, { value: 'General', label: 'General' }, { value: 'Hotels', label: 'Hotels' }, { value: 'House Keeping', label: 'House Keeping' }, { value: 'Hrd Admn', label: 'Hrd Admn' }, { value: 'Insurance', label: 'Insurance' }, { value: 'Labour (Overseas)', label: 'Labour (Overseas)' }, { value: 'Logistics', label: 'Logistics' }, { value: 'Marketing', label: 'Marketing' }, { value: 'Medical', label: 'Medical' }, { value: 'Overseas', label: 'Overseas' }, { value: 'Placement Assistance', label: 'Placement Assistance' }, { value: 'Printing/epublishing', label: 'Printing/epublishing' }, { value: 'Public Appointment', label: 'Public Appointment' }, { value: 'R&d/lab', label: 'R&d/lab' }, { value: 'Secretarial', label: 'Secretarial' }, { value: 'Shipping/cargo', label: 'Shipping/cargo' }, { value: 'Skilled Labour', label: 'Skilled Labour' }, { value: 'Stores/purchase', label: 'Stores/purchase' }, { value: 'Technical', label: 'Technical' }, { value: 'Transcription(Med)', label: 'Transcription(Med)' }, { value: 'Training / Placements', label: 'Training / Placements' }, { value: 'Walkin', label: 'Walkin' },
                ];
            case 'Business Offer':
                return [
                    { value: 'For Sale', label: 'For Sale' }, { value: 'Agents Wanted', label: 'Agents Wanted' }, { value: 'Consultants', label: 'Consultants' }, { value: 'Contractors', label: 'Contractors' }, { value: 'Finance', label: 'Finance' }, { value: 'General', label: 'General' }, { value: 'Immigration Services', label: 'Immigration Services' }, { value: 'Import/export', label: 'Import/export' }, { value: 'Insurance', label: 'Insurance' }, { value: 'Legal', label: 'Legal' }, { value: 'Logistics', label: 'Logistics' }, { value: 'Management', label: 'Management' }, { value: 'Others', label: 'Others' }, { value: 'Partnerships', label: 'Partnerships' }, { value: 'Project', label: 'Project' }, { value: 'Shares/investments', label: 'Shares/investments' }, { value: 'Tax Planning', label: 'Tax Planning' }, { value: 'Manufacturer', label: 'Manufacturer' },
                ];
            default:
                return [];
        }
    }, [selectedSubCategory1]);

    const handleSubCategory1Change = (e) => {
        setSelectedSubCategory1(e.target.value);
        setSelectedSubCategory2('');


    };
    const handleSubCategory2Change = (e) => {
        setSelectedSubCategory2(e.target.value);
    };
    const shouldBlink = !(selectedSubCategory1 && selectedSubCategory2);
    
    const isAnimationStopped = selectedSubCategory1 && selectedSubCategory2;

    const handleTextAreaChange = (e) => {

        const value = e.target.value;
        setTextAreaValue(isTickAdded ? '✓' + value.slice(1) : value);
        setPreviewContent(isTickAdded ? '✓' + value.slice(1) : value);
        setTextAreaValue(isBoldText ? `<strong>${value}</strong>` : value);
        setPreviewContent(isBoldText ? `<strong>${value}</strong>` : value);

        const updatedValue = isBoldText ? value.toUpperCase() : value;
        setTextAreaValue(updatedValue);
        setPreviewContent(updatedValue);

        const characterCount = value.length;
        let maxCharacterCount = 70; // Default max character count
        let basePrice = 2180; // Default base price
        let extraPricePer35Characters = 1955; // Default extra price per 35 characters

        // Check if selectedPublication, selectedCategory, and selectedEdition match any specific criteria
        let specialPrices = {
            'THE HINDU': {
                'Matrimonial': {
                    'All Edition': { basePrice: 1575, extraPricePer35Characters: 485, maxCharacterCount: 105, extraPricePerCharacters: 35 },
                },
                'Real Estate': {
                    'All Edition': { basePrice: 2825, extraPricePer35Characters: 1285 },
                    'Chennai Edition': { basePrice: 2180, extraPricePer35Characters: 870 }
                },
                'Rental': {
                    'All Edition': { basePrice: 2825, extraPricePer35Characters: 1285 },
                    'Chennai Edition': { basePrice: 1210, extraPricePer35Characters: 515 }
                },
                'Situtation Req': {
                    'All Edition': { basePrice: 2810, extraPricePer35Characters: 1230 },
                    'Chennai Edition': { basePrice: 1260, extraPricePer35Characters: 495 }
                },
                'Business Off/Edu/Tender': {
                    'All Edition': { basePrice: 3850, extraPricePer35Characters: 1670 },
                    'Chennai Edition': { basePrice: 2310, extraPricePer35Characters: 915 }
                },
                'Personal / Xpressions': {
                    'All Edition': { basePrice: 3850, extraPricePer35Characters: 1670 },
                    'Chennai Edition': { basePrice: 2310, extraPricePer35Characters: 915 }
                },
            }
        };

        const selectedSpecialPrices = specialPrices[selectedPublication]?.[selectedCategory]?.[selectedEdition];
        if (selectedSpecialPrices) {
            maxCharacterCount = 70;
            basePrice = selectedSpecialPrices.basePrice;
            extraPricePer35Characters = selectedSpecialPrices.extraPricePer35Characters;
        }

        // Set the text area value
        setTextAreaValue(value);

        // Calculate the total price based on the character count and prices
        let totalPrice = 0;
        let extraCharacters = 0;
        let extraPrice = 0;

        if (characterCount > 0) {
            if (characterCount > maxCharacterCount) {
                const additionalCharacters = characterCount - maxCharacterCount;
                extraCharacters = Math.ceil(additionalCharacters / 35);
                extraPrice = extraCharacters * extraPricePer35Characters;
                totalPrice = basePrice + extraPrice;
            } else {
                totalPrice = basePrice;
            }
        }

        // Calculate GST (5%) and final total price
        const gst = totalPrice * 0.05;
        const finalTotalPrice = totalPrice + gst;



        setTotalPrice(finalTotalPrice);
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

    const handleCouponCodeChange = (e) => {
        setCouponCode(e.target.value);
    };

    // Function to handle coupon code submission
    const handleSubmitCouponCode = () => {
        // You can implement logic to handle coupon code submission here
        alert(`Coupon Code Submitted: ${couponCode}`);
    };

    const inputFields = document.querySelectorAll('.input-field select');

    inputFields.forEach((inputField) => {
        inputField.addEventListener('focus', () => {
            inputField.classList.add('blink-border');
        });

        inputField.addEventListener('change', () => {
            inputField.classList.remove('blink-border');
        });
    });


    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


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
                        <div id="selectedPublication">{publicationOptions.find(option => option.value === selectedPublication)?.label}</div>
                    </div>
                    <div>
                        <label htmlFor="selectedCategory"></label>
                        <div id="selectedCategory">{categoryOptions.find(option => option.value === selectedCategory)?.label}</div>
                    </div>
                    <div>
                        <label htmlFor="selectedEdition"></label>
                        <div id="selectedEdition">{editionOptions.find(option => option.value === selectedEdition)?.label}</div>
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
                        <span>{selectedDate ? formatDate(selectedDate) : ''}</span>
                        {selectedSundays.length > 0 && (
                            <span>-Sundays: {selectedSundays.map((date) => formatDate(date)).join(', ')}</span>
                        )}
                        {isTickAdded && <span>-Tick</span>}
                        {isBoldText && <span>-Bold</span>}
                        {selectedBgColor !== '#ffffff' && <span>-BG Color</span>}
                        <span>-Extra Lines: {extraCharacters}</span>
                        <span>-Total Amount: Rs. {totalPrice}</span>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className={`icon ${isAnimationStopped ? 'stop-animation' : ''}`}>
                            <div className="arrow"></div>
                        </div>
                        <h3 className={`select-subcategorys ${selectedSubCategory1 && selectedSubCategory2 ? 'disable' : ''}`}>
                            Select SubCategory2
                        </h3>
                        <div className={`input-field ${shouldBlink && (!selectedSubCategory1 || !selectedSubCategory2) ? 'blinking' : 'default-border'}`}>
                            <label htmlFor="selectedSubCategory1"></label>
                            <select
                                id="selectedSubCategory1"
                                value={selectedSubCategory1}
                                onChange={handleSubCategory1Change}
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
                            <div className={`input-field ${shouldBlink && (!selectedSubCategory1 || !selectedSubCategory2) ? 'blinking' : 'default-border'}`}>
                                <label htmlFor="selectedSubCategory2"></label>
                                <select
                                    id="selectedSubCategory2"
                                    value={selectedSubCategory2}
                                    onChange={handleSubCategory2Change}
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
                        <p>Ads Preview (Tentative preview not for actual paper print)</p>
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
                        <div class="icon1">
                            <div class="arrow1"></div>
                        </div>
                        <p>Calendar</p>
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
                        <h3>Your Package Content</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Publication</th>
                                    <th>Category</th>
                                    <th>Edition</th>
                                    <th>Subcategory 1</th>
                                    <th>Subcategory 2</th>
                                    <th>Date</th>
                                    <th>Date</th>
                                    <th>Extra Lines</th>
                                    {/* Conditionally render additional labels based on checkbox states */}
                                    {isTickAdded && <th>Add Tick</th>}
                                    {isBoldText && <th>Add Bold</th>}
                                    {selectedBgColor !== '#ffffff' && <th>Add BG Color</th>}
                                    <th>Total Amount (GST Extra 5 %)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{selectedPublication}</td>
                                    <td>{selectedCategory}</td>
                                    <td>{selectedEdition}</td>
                                    <td>{selectedSubCategory1}</td>
                                    <td>{selectedSubCategory2}</td>
                                    <td>{selectedDate ? formatDate(selectedDate) : ''}</td>
                                    <td>{selectedSundays.length > 0 ? selectedSundays.map((date) => formatDate(date)).join(', ') : ''}</td>
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
                    <div className="coupon-code-container">
                        <p>Coupon Code</p>
                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            value={couponCode}
                            onChange={handleCouponCodeChange}
                        />
                        <button onClick={handleSubmitCouponCode}>Submit</button>
                    </div>
                    <div className="composepage-btn">
                        <Link to="/paymentpage">
                            <button type="button" onClick={handlePhonePePayment}>Proceed To Payment</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComposePage;


