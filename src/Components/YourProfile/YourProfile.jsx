import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { FaEdit, FaTrashAlt, FaPlus, FaSave } from 'react-icons/fa';
import './YourProfile.css';
import usericon from "../../Assets/Images/signin-icon.png";
import User from "../../Scripts/User";

// Validation Schema
const validationSchema = Yup.object().shape({
  billingAddress: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    flatNo: Yup.string().required('Flat number is required'),
    street: Yup.string().required('Street is required'),
    area: Yup.string().required('Area is required'),
    district: Yup.string().required('District is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string().required('Pincode is required'),
    phoneNo: Yup.string().required('Phone number is required'),
    landmark: Yup.string(),
  }),
  shippingAddresses: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      flatNo: Yup.string().required('Flat number is required'),
      street: Yup.string().required('Street is required'),
      area: Yup.string().required('Area is required'),
      district: Yup.string().required('District is required'),
      state: Yup.string().required('State is required'),
      pincode: Yup.string().required('Pincode is required'),
      phoneNo: Yup.string().required('Phone number is required'),
      landmark: Yup.string(),
      isDefault: Yup.boolean(),
    })
  ),
});

const YourProfile = () => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [useBillingAsShipping, setUseBillingAsShipping] = useState(false);
  const [sections, setSections] = useState({
    showEmailSection: false,
    showPhoneNumberSection: false,
    showBillingAddressSection: true,
    showShippingAddressSection: true,
    showAddAddressSection: false,
  });

  const toggleSection = (section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (values) => {
    // Copy billing address to shipping address if checkbox is checked
    if (useBillingAsShipping) {
      values.shippingAddresses = [values.billingAddress];
    }
    
    // Save the addresses to state
    setSavedAddresses([...savedAddresses, values]);
    alert('Successfully saved addresses');
    setIsEditing(false);
  };

  return (
    <div className='YourProfile'>
      <h1>Your Profile</h1>
      <Formik
        initialValues={{
          email: '',
          phoneNumber: '',
          billingAddress: {
            name: '',
            flatNo: '',
            street: '',
            area: '',
            district: '',
            state: '',
            pincode: '',
            phoneNo: '',
            landmark: '',
          },
          shippingAddresses: [{
            name: '',
            flatNo: '',
            street: '',
            area: '',
            district: '',
            state: '',
            pincode: '',
            phoneNo: '',
            landmark: '',
            isDefault: false,
          }],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ values, setFieldValue }) => (
          <Form className="profile-form">
            {/* User Profile Section */}
            <div className="user-profile-section">
              <img src="https://i.ibb.co/JkptQRR/signin-icon.png" alt="User" className="signin-image" />
              <div className='usericon'>
                <Field name="username" placeholder="Username" className="profile-input" value={User.getUserName()} />
                <FaEdit className="edit-icon" onClick={handleEditClick} />
              </div>
            </div>

            {/* Email Section */}
            <div className="profile-section">
              <div className="profile-bar" onClick={() => toggleSection('showEmailSection')}>
                Gmail ID
              </div>
              {sections.showEmailSection && (
                <Field name="email" placeholder="Gmail ID" className="profile-input" />
              )}
            </div>

            {/* Phone Number Section */}
            <div className="profile-section">
              <div className="profile-bar" onClick={() => toggleSection('showPhoneNumberSection')}>
                Phone Number
              </div>
              {sections.showPhoneNumberSection && (
                <Field name="phoneNumber" placeholder="Phone Number" className="profile-input" />
              )}
            </div>

            {/* Billing Address Section */}
            <div className="profile-section">
              <div className="profile-bar" onClick={() => toggleSection('showBillingAddressSection')}>
                Billing Address
              </div>
              {sections.showBillingAddressSection && (
                <div className="address-entry">
                  <Field name="billingAddress.name" placeholder="Name" />
                  <Field name="billingAddress.flatNo" placeholder="Flat No" />
                  <Field name="billingAddress.street" placeholder="Street" />
                  <Field name="billingAddress.area" placeholder="Area" />
                  <Field name="billingAddress.district" placeholder="District" />
                  <Field name="billingAddress.state" placeholder="State" />
                  <Field name="billingAddress.pincode" placeholder="Pincode" />
                  <Field name="billingAddress.phoneNo" placeholder="Phone No" />
                  <Field name="billingAddress.landmark" placeholder="Landmark (Optional)" />
                  <button type="submit" className="save-button">
                    <FaSave /> Save
                  </button>
                </div>
              )}
            </div>

            {/* Checkbox to use Billing Address as Shipping Address */}
            <div className="checkbox-section">
              <label>
                <Field
                  type="checkbox"
                  name="useBillingAsShipping"
                  checked={useBillingAsShipping}
                  onChange={() => {
                    setUseBillingAsShipping(!useBillingAsShipping);
                    if (!useBillingAsShipping) {
                      setFieldValue('shippingAddresses', [values.billingAddress]);
                    }
                  }}
                />
                Use the above address for shipping
              </label>
            </div>

            {/* Shipping Addresses Section */}
            <div className="profile-section">
              <div className="profile-bar" onClick={() => toggleSection('showShippingAddressSection')}>
                Shipping Address
              </div>
              {sections.showShippingAddressSection && (
                <FieldArray name="shippingAddresses">
                  {({ push, remove }) => (
                    <div>
                      {values.shippingAddresses.map((address, index) => (
                        <div key={index} className="address-box">
                          <h2>Shipping Address {index + 1}</h2>
                          <div className="address-entry">
                            <Field name={`shippingAddresses.${index}.name`} placeholder="Name" />
                            <Field name={`shippingAddresses.${index}.flatNo`} placeholder="Flat No" />
                            <Field name={`shippingAddresses.${index}.street`} placeholder="Street" />
                            <Field name={`shippingAddresses.${index}.area`} placeholder="Area" />
                            <Field name={`shippingAddresses.${index}.district`} placeholder="District" />
                            <Field name={`shippingAddresses.${index}.state`} placeholder="State" />
                            <Field name={`shippingAddresses.${index}.pincode`} placeholder="Pincode" />
                            <Field name={`shippingAddresses.${index}.phoneNo`} placeholder="Phone No" />
                            <Field name={`shippingAddresses.${index}.landmark`} placeholder="Landmark (Optional)" />
                            <button type="submit" className="save-button">
                              <FaSave /> Save
                            </button>
                            <label>
                              <Field
                                type="checkbox"
                                name={`shippingAddresses.${index}.isDefault`}
                                checked={address.isDefault}
                                onChange={() => {
                                  const newAddresses = values.shippingAddresses.map((addr, i) => ({
                                    ...addr,
                                    isDefault: i === index,
                                  }));
                                  setFieldValue('shippingAddresses', newAddresses);
                                }}
                              />
                              Default
                            </label>
                            <FaTrashAlt className="delete-icon" onClick={() => remove(index)} />
                          </div>
                        </div>
                      ))}
                      <button
                        className="profile-add-icon"
                        type="button"
                        onClick={() => push({
                          name: '',
                          flatNo: '',
                          street: '',
                          area: '',
                          district: '',
                          state: '',
                          pincode: '',
                          phoneNo: '',
                          landmark: '',
                          isDefault: false,
                        })}
                      >
                        <FaPlus /> Add Address
                      </button>
                    </div>
                  )}
                </FieldArray>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* Display Saved Addresses */}
      {savedAddresses.length > 0 && (
        <div className="saved-addresses">
          <h2>Addresses</h2>
          {savedAddresses.map((address, index) => (
            <div key={index} className="address-box">
              <p>
                {address.billingAddress.name},<br/>
                {address.billingAddress.flatNo},<br/> {address.billingAddress.street},<br/> 
                {address.billingAddress.area},<br/> {address.billingAddress.district},<br/>
                {address.billingAddress.state},<br/>{address.billingAddress.pincode},<br/> 
                {address.billingAddress.phoneNo}<br/> {address.billingAddress.landmark}<br/>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourProfile;
