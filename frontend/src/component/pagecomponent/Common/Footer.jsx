import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Filemanagermain from "../fileManager/filemanagermain";

const Footer = () => {
  const [files, setFiles] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);
  const [values, setValues] = useState();

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallfooter`)
      .then((res) => res.json())
      .then((data) => {
        const rawUrl = JSON.parse(data.data[0].footer_logo);
        setFiles(rawUrl);
        setValues({ ...data.data[0], footer_logo: rawUrl });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prv) => (prv = { ...values, [name]: value }));
  };

  const handleBlogSubmit = () => {
    if (
      !(
        values.slug &&
        values.footer_description &&
        values.footer_logo &&
        values.status
      )
    ) {
      toast.error("Please Fill all the fields!");
      return;
    }
    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidfooter/1`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ...values,
        footer_logo: JSON.stringify(values.footer_logo),
      }),
    })
      .then((res) => res.json())
      .then(toast.success("Footer updated succesfully"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValues((prv) => (prv = { ...prv, footer_logo: files }));
  }, [files]);

  return (
    values && (
      <>
        {managerOpener ? (
          <Filemanagermain
            file={files}
            ratio={values.dimension}
            fileSetter={setFiles}
            openSetter={setManagerOpener}
          />
        ) : (
          <div>
            <PageHeader
              currentpage="Footer"
              activepage="Pages"
              mainpage="Footer"
            />
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 xxl:col-span-8">
                <div className="box">
                  <div className="box-body space-y-5">
                    <label htmlFor="input-label1" className="ti-form-label">
                      Footer Description
                    </label>
                    <textarea
                      name="content"
                      value={values.footer_description}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      className="ti-form-input"
                      rows="6"
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-x-2">
                  <div className="col-span-12 xxl:col-span-6">
                    <div className="box">
                      <div className="box-header">
                        <h5 className="box-title">Social Links</h5>
                      </div>
                      <div className="box-body space-y-4">
                        <Link to={"/cms/general/social"}>
                          <button className="py-2 px-3 ti-btn ti-btn-primary">
                            SocialLinks
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="box">
                      <div className="box-body space-y-5">
                        <label htmlFor="input-label1" className="ti-form-label">
                          Footer Slug
                        </label>
                        <input
                          type="text"
                          name="slug"
                          value={values.slug}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                          className="ti-form-input"
                          rows="6"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 xxl:col-span-6">
                    <div className="box">
                      <div className="box-header">
                        <h5 className="box-title">Addresses</h5>
                      </div>
                      <div className="box-body space-y-4">
                        <Link to={"/cms/general/addresses"}>
                          <button className="py-2 px-3 ti-btn ti-btn-primary">
                            Addresses
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xxl:col-span-4">
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Status</h5>
                  </div>
                  <div className="box-body">
                    <Select
                      values={[{ value: 1, label: "Enable" }]}
                      classNamePrefix="react-select"
                      onChange={(val) => {
                        setValues(
                          (prv) => (prv = { ...values, status: val.value })
                        );
                      }}
                      options={[
                        { value: 1, label: "Enable" },
                        { value: 0, label: "Disable" },
                      ]}
                      placeholder="Open this select menu"
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Footer Logo</h5>
                  </div>
                  <div className="box-body">
                    <div>
                      <label className="block">
                        <button
                          type="button"
                          onClick={() => setManagerOpener(1)}
                          className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary"
                        >
                          Change Image <i className="ti ti-file-plus "></i>
                        </button>
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${
                            values.footer_logo
                          }`}
                          className="box-img-top h-44
                       rounded-t-sm"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="box">
                  <div className="box-footer bg-transparent">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={handleBlogSubmit}
                        className="py-2 px-3 ti-btn ti-btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
};
export default Footer;
