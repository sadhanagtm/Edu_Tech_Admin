import React, { useRef, useState, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function AddTerms() {
  const [value, setFieldValue] = useState("");

  const [placeholder, setplaceholder] = useState("enter description...");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div className="mt-28 lg:ml-60">
    

      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
          Privacy Policy
          <JoditEditor
            ref={editor}
            value={content}
            name=" privacyPolicy"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("description", newContent);
            }}
          />
        </div>
      </div>

      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
          Instructor Terms
          <JoditEditor
            ref={editor}
            value={content}
            name="instructorTerms"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("instructorTerms", newContent);
            }}
          />
        </div>
      </div>

      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
          Pricing Policy
          <JoditEditor
            ref={editor}
            value={content}
            name=" pricingPolicy"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("pricingPolicy", newContent);
            }}
          />
        </div>
      </div>


      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
          Business Privacy Statement
          <JoditEditor
            ref={editor}
            value={content}
            name=" businessPrivacyStatement"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("businessPrivacyStatement", newContent);
            }}
          />
        </div>
      </div>


      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
          Master Services Agreement
          <JoditEditor
            ref={editor}
            value={content}
            name=" masterServicesAgreement"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("masterServicesAgreement", newContent);
            }}
          />
        </div>
      </div>


      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
           Business Term Conditions
          <JoditEditor
            ref={editor}
            value={content}
            name="   businessTermConditions"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("businessTermConditions", newContent);
            }}
          />
        </div>
      </div>


      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
        Affiliate Terms Conditions
          <JoditEditor
            ref={editor}
            value={content}
            name=" affiliateTermsConditions"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("affiliateTermsConditions", newContent);
            }}
          />
        </div>
      </div>


      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
         Launch Services
          <JoditEditor
            ref={editor}
            value={content}
            name="   launchServices"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("launchServices", newContent);
            }}
          />
        </div>
      </div>


      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
         DeletedAt
          <JoditEditor
            ref={editor}
            value={content}
            name="deletedAt"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("deletedAt", newContent);
            }}
          />
        </div>
      </div>

      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
        CreatedAt
          <JoditEditor
            ref={editor}
            value={content}
            name=" createdAt"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("createdAt", newContent);
            }}
          />
        </div>
      </div>

      <div className="text-left mt-14 ">
        <div className="text-xl font-semibold text-purple-700 mb-2 w-full ">
          UpdatedAt
          <JoditEditor
            ref={editor}
            value={content}
            name=" updatedAt"
            // config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setFieldValue("updatedAt", newContent);
            }}
          />
        </div>
      </div>


    </div>
  );
}

export default AddTerms;
