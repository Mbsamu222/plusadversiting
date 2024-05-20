import React, { useState, useEffect } from 'react';
import './Dropdown.css';
import classified_text from '../Assests/classified_text.png'
import classified_display from '../Assests/classified _display.png'
import display_picture from '../Assests/display_ picture.png'

const Dropdown = () => {
    const [selectedPublication, setSelectedPublication] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedEdition, setSelectedEdition] = useState('');
    const [selectedImageType, setSelectedImageType] = useState('');

    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);
    const [showImagePopup1, setShowImagePopup1] = useState(false);
    const [showImagePopup2, setShowImagePopup2] = useState(false);
    const [showImagePopup3, setShowImagePopup3] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

    const publicationOptions = [
        { value: 'THE HINDU', label: 'THE HINDU' },
        { value: 'DAILY THANTHI', label: 'DAILY THANTHI' },
        { value: 'TIMES OF INDIA', label: 'TIMES OF INDIA' },
        
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
    

    const handleSelectPublication = (e) => {
        setSelectedPublication(e.target.value);
        setSelectedEdition('');
        setShowDropdown2(true);
        setShowDropdown3(selectedCategory !== '');

    };

    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedEdition(e.target.value === 'Matrimonial' ? 'All Edition' : selectedEdition);
        setShowDropdown3(true);
        setShowImagePopup1(true);
        setShowImagePopup2(true);
        setShowImagePopup3(true);
    };

    const handleSelectEdition = (e) => {
        setSelectedEdition(e.target.value);
        setShowImagePopup1(e.target.value === 'Chennai Edition' || e.target.value === 'All Edition' || e.target.value === 'Other Edition'|| e.target.value === 'TN Edition');
        setShowImagePopup2(e.target.value === 'Chennai Edition' || e.target.value === 'All Edition' || e.target.value === 'Other Edition'|| e.target.value === 'TN Edition');
        setShowImagePopup3(e.target.value === 'Chennai Edition' || e.target.value === 'All Edition' || e.target.value === 'Other Edition'|| e.target.value === 'TN Edition');
    };

    const handleImageTypeChange = (e) => {
        setSelectedImageType(e.target.value);
    };

    const handleNextButtonClick = () => {
        const selectedPublicationLabel = publicationOptions.find(option => option.value === selectedPublication)?.label || '';
        const selectedCategoryLabel = categoryOptions.find(option => option.value === selectedCategory)?.label || '';
        const selectedEditionLabel = editionOptions.find(option => option.value === selectedEdition)?.label || '';
        const selectedInputLabel = document.querySelector('input[type="radio"]:checked + label')?.innerText || '';


        const composePagePath = `/compose?publication=${selectedPublicationLabel}&category=${selectedCategoryLabel}&edition=${selectedEditionLabel}&selectedInputLabel=${selectedInputLabel}`;

        window.location.href = composePagePath;
    };

    useEffect(() => {
        setIsNextButtonDisabled(!(selectedPublication && selectedCategory && selectedEdition && selectedImageType));
    }, [selectedPublication, selectedCategory, selectedEdition,selectedImageType]);


    const editionOptions = getEditionOptions();

    return (
        <div className="dropdown">
            <form>
                <div className="dropdown-field">
                    <select value={selectedPublication} onChange={handleSelectPublication} name='selectedPublication'>
                        <option value="">- Select Publication -</option>
                        {publicationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {showDropdown2 && (
                        <select value={selectedCategory} onChange={handleSelectCategory}>
                            <option value="">- Select Category -</option>
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {showDropdown3 && (
                        <select value={selectedEdition} onChange={handleSelectEdition}>
                            <option value="">- Select Edition -</option>
                            {editionOptions.map((option) => (
                                <option key={option.value} value={option.value} disabled={option.disabled}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    <div className="popup-and-button">
                        <div className="image-popup">
                            {showImagePopup1 && showImagePopup2 && showImagePopup3 && (
                                <>
                                    <div className="image-option">
                                        <img src={classified_text} alt="Classified Text" />
                                        <p>
                                            <input type="radio" name="imageType" value="Classified Text" id="image1_option1" checked={selectedImageType === 'Classified Text'} onChange={handleImageTypeChange} />
                                            <label htmlFor="image1_option1">Classified Text</label>
                                        </p>
                                    </div>
                                    <div className="image-option">
                                        <img src={classified_display} alt="Classified Display" />
                                        <p>
                                            <input type="radio" name="imageType" value="Classified Display" id="image2_option1" checked={selectedImageType === 'Classified Display'} onChange={handleImageTypeChange} />
                                            <label htmlFor="image2_option1">Classified Display</label>
                                        </p>
                                    </div>
                                    <div className="image-option">
                                        <img src={display_picture} alt="Display" />
                                        <p>
                                            <input type="radio" name="imageType" value="Display Picture" id="image3_option1" checked={selectedImageType === 'Display Picture'} onChange={handleImageTypeChange} />
                                            <label htmlFor="image3_option1">Display Picture</label>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='dropdown-btn'>
                            <button type="button" onClick={handleNextButtonClick} disabled={isNextButtonDisabled}>NEXT</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Dropdown;