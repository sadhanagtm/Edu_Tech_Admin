import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRocket } from "react-icons/fa6";
import { number } from "yup";


function Registration() {
  const [num, setnum] = useState(0);

  const formarray = [
    { name: "firstname", type: "text", placeholder: "First Name" },
    { name: "lastname", type: "text", placeholder: "Last Name" },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "confirm", type: "password", placeholder: "Confirm Password" },
    { name: "email", type: "email", placeholder: "Mention your Email" },
    { name: "phone", type: "number", placeholder: "Mention your Phone number" },
  ];

  return (
    <div className="h-100 w-full m-auto box flex ">
      <div className="flex  text-4xl text-white relative top-24 left-52 ">
        <div className=" animate-bounce   h-32 ">
          <FaRocket />
        </div>
      </div>

      <div className=" text-white  w-2/4 relative top-32 left-28 ">
        <div className="text-4xl font-semibold "> Welcome to</div>
     <div>
      <img src="/src/image/Lopho.png" className="w-48 mt-3"/>
     </div>
        
      </div>

      <div className=" bg-gray-100 h-5/6 w-11/12  m-auto  relative right-10">
        <div className=" flex justify-center mt-14 text-4xl font-semibold">
          Registration Form
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            Password: "",
            phone: "",
          }}
        
          onSubmit={(ok) => {
            console.log(ok);
          }}
        >

         {({handleSubmit, value}) =>{
          return(

          <Form
          onSubmit={handleSubmit}
          className=" grid grid-cols-2 gap-5 w-11/12 m-auto mt-9 ">
            {formarray.map((val, i) => {
              if (val.type === "select") {
                return (
                  <div>
                    <Field
                      name={val.name}
                      as={val.type}
                      placeholder={val.placeholder}
                      className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                    ></Field>
                  </div>
                );
              } else {
                return (
                  <div>
                    <Field
                      name={val.name}
                      type={val.type}
                      placeholder={val.placeholder}
                      className="outline-blue-200 px-3  border-2 border-gray-200 h-12 w-full"
                    />
                  </div>
                );
              }
            })}

            <div className="flex gap-2">
              <input type="radio" name="gender" /> Male
              <input type="radio" name="gender" /> Female
            </div>

            <input
            
            type="submit"
            value={"Register"}
            className="font-semibold h-8 w-32 bg-primary text-white text-center rounded-2xl cursor-pointer "
            
            />

            
            
          </Form>
          );
         }}

        </Formik>
      </div>
    </div>
  );
}

export default Registration;
