import React, { useRef, useState, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import { BsFillEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Terms() {
  const [value, setFieldValue] = useState("");

  const [placeholder, setplaceholder] = useState("enter description...");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div className="mt-20 lg:ml-60">
      <div>
        <div className="sm:text-2xl text-xl font-bold  text-purple-700 font mt-2">
          Terms Of Use
        </div>
        <Link to={"/termstable"}>
          <div className="  top-20 lg:right-11 right-10 absolute ">
            <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
              View
            </button>
          </div>
        </Link>
      </div>

<div className=" gap-10 flex flex-col sm:mt-9 mt-5 mb-9 sm:text-xl  ">

      <div>
        <div className="font-semibold text-purple-700 mb-2 w-full ">
          Privacy Policy
          </div>
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

      <div>
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          Instructor Terms
          </div>
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

      <div>
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          Pricing Policy
          </div>
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

      <div>
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          Business Privacy Statement
          </div>
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

      <div>
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          Master Services Agreement
          </div>
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

      <div>
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          Business Term Conditions
          </div>
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

      <div>
        <div className="font-semibold text-purple-700 mb-2 w-full ">
          Affiliate Terms Conditions
          </div>
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

      <div>
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          Launch Services
          </div>
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

      <div>
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          DeletedAt
          </div>
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

      <div >
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          CreatedAt
          </div>
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

      <div>
        <div className=" font-semibold text-purple-700 mb-2 w-full ">
          UpdatedAt
          </div>
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

export default Terms;
