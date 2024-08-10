import React, { useRef, useState } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import axios from '../../../Hoc/Axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { IoCloudUploadSharp } from 'react-icons/io5';

const schema = Yup.object().shape({
  citizenshipFront: Yup.string().required('Please upload your document '),
  citizenshipBack: Yup.string().required('Please upload your document '),
});

const doc = [
  { name: 'citizenshipFront', type: 'file', label: 'Citizenship Front' },
  { name: 'citizenshipBack', type: 'file', label: 'Citizenship Back' },
  { name: 'passport', type: 'file', label: 'Passport' },
];

function LegalDoc({ handleNext }) {
  const navigate = useNavigate();
  const [images, setImages] = useState({});
  const inputRefs = useRef({});

  const handleImageClick = (name) => {
    inputRefs.current[name].click();
  };

  const handleImageChange = (e, name, setFieldValue) => {
    const file = e.target.files[0];
    console.log(file);
    setImages((prev) => ({ ...prev, [name]: file }));
    setFieldValue(name, file);
  };

  return (
    <Formik
      initialValues={{
        citizenshipFront: '',
        citizenshipBack: '',
        passport: '',
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        try {
          const formData = new FormData();
          formData.append('citizenshipFront', values.citizenshipFront);
          formData.append('citizenshipBack', values.citizenshipBack);
          formData.append('passport', values.passport);

          axios
            .post('/user/auth/', formData)
            .then((res) => {
              console.log('user data', res);
              toast.success('Submit Successfully');
              handleNext();
              // navigate('/');
            })
            .catch((error) => {
              console.log(error);
              toast.error('Something went wrong');
            });
        } catch (error) {
          console.log(error);
        }
        console.log(values);
        // resetForm();
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <div>
          <Toaster />
          <Form onSubmit={handleSubmit}>
            <div className="lg:flex lg:flex-row flex flex-col gap-8 justify-center lg:gap-24 mt-9">
              {doc.map((val) => (
                <div key={val.name} className="flex justify-center">
                  <div className="flex flex-col">
                    <label className="font-medium text-blue-700 text-center">
                      {val.label}
                    </label>
                    <div
                      onClick={() => handleImageClick(val.name)}
                      className="cursor-pointer"
                    >
                      {values[val.name] ? (
                        <img
                          src={URL.createObjectURL(values[val.name])}
                          alt=""
                          name="image"
                          className='h-48 w-48  lg:h-64 object-contain lg:w-64 cursor-pointer  border-black border '
                        />
                      ) : (
                        <div className="lg:h-64 lg:w-64 h-48 w-48 border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
                          <div className="text-5xl">
                            <IoCloudUploadSharp />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <input
                        name={val.name}
                        type={val.type}
                        ref={(el) => (inputRefs.current[val.name] = el)}
                        onChange={(e) =>
                          handleImageChange(e, val.name, setFieldValue)
                        }
                        style={{ display: 'none' }}
                      />
                    </div>
                    <ErrorMessage
                      name={val.name}
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex float-end mx-11">
              <button
                type="submit"
                className="sm:w-32 w-16 h-10 rounded-3xl relative top-14 text-center text-white bg-ternary"
              >
                NEXT
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default LegalDoc;

