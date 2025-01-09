import React, { useEffect, useState } from "react";
import Select from "react-select";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
import Filemanagermain from "../fileManager/filemanagermain";

const WebPreProjects = () => {
  const [files, setFiles] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);
  const [values, setValues] = useState();

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallwebpreprojects`)
      .then((res) => res.json())
      .then((data) => {
        const rawUrl = JSON.parse(data.data[0].cover_url);
        setFiles(rawUrl);
        setValues({ ...data.data[0], cover_url: rawUrl });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setValues((prev) => ({ ...prev, [name]: value }));
    const { name, value } = e.target;
    setValues((prev) => {
      const newState = {
        ...prev,
        [name]: value,
      };
      if (name === "title") {
        newState.slug = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/\?/g, "-");
      }
      return newState;
    });
  };

  const handleProjectsSubmit = () => {
    if (
      !(
        values.title &&
        values.slug &&
        values.meta_title &&
        values.meta_description &&
        values.cover_url &&
        values.breadcrumb_name &&
        values.description
      )
    ) {
      toast.error("Please Fill all the fields!");
      return;
    }
    const data = {
      ...values,
      cover_url: JSON.stringify(values.cover_url),
    };
    console.log(data);

    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidwebpreprojects/1`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Pre-Projects Page updated successfully");
        // Optionally, handle data or reset state here
      })
      .catch((err) => toast.error("Error: " + err.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValues((prv) => (prv = { ...prv, cover_url: files }));
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
              currentpage="Pre-Projects"
              activepage="Pages"
              mainpage="Pre-Projects"
            />
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 xxl:col-span-8">
                <div className="box">
                  <div className="box-body space-y-5">
                    <label htmlFor="input-label1" className="ti-form-label">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={(e) => handleInputChange(e)}
                      id="input-label1"
                      className="ti-form-input"
                      placeholder="Projects Title"
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-body space-y-5">
                    <label htmlFor="input-label1" className="ti-form-label">
                      Project Description
                    </label>
                    <textarea
                      value={values.description}
                      onChange={(e) => handleInputChange(e)}
                      name="description"
                      className="ti-form-input"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div className="box">
                  <div className="box-body space-y-5">
                    <label htmlFor="input-label1" className="ti-form-label">
                      Short Description
                    </label>
                    <textarea
                      value={values.short_description}
                      onChange={(e) => handleInputChange(e)}
                      name="short_description"
                      className="ti-form-input"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-12 xxl:col-span-6">
                    <div className="box">
                      <div className="box-body space-y-4">
                        <label htmlFor="input-label1" className="ti-form-label">
                          Meta Title
                        </label>
                        <input
                          type="text"
                          name="meta_title"
                          value={values.meta_title}
                          onChange={(e) => handleInputChange(e)}
                          id="input-label1"
                          className="ti-form-input"
                          placeholder="meta title"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 xxl:col-span-6">
                    <div className="box">
                      <div className="box-body space-y-4">
                        <label htmlFor="input-label1" className="ti-form-label">
                          Meta Description
                        </label>
                        <input
                          type="text"
                          name="meta_description"
                          value={values.meta_description}
                          onChange={(e) => handleInputChange(e)}
                          id="input-label1"
                          className="ti-form-input"
                          placeholder="meta description"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xxl:col-span-4">
                <div className="box">
                  <div className="box-body space-y-4">
                    <label htmlFor="input-label1" className="ti-form-label">
                      Breadcrumb name
                    </label>
                    <input
                      type="text"
                      name="breadcrumb_name"
                      value={values.breadcrumb_name}
                      onChange={(e) => handleInputChange(e)}
                      id="input-label1"
                      className="ti-form-input"
                      placeholder="breadcrumb"
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-body space-y-4">
                    <label htmlFor="input-label1" className="ti-form-label">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={values.slug}
                      disabled
                      id="input-label1"
                      className="ti-form-input"
                      placeholder="slug"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="box">
                    <div className="box-header">
                      <h5 className="box-title">Sort</h5>
                    </div>
                    <div className="box-body">
                      <Select
                        value={[
                          values.sort_order === 1
                            ? { value: 1, label: "1" }
                            : { value: 0, label: "0" },
                        ]}
                        classNamePrefix="react-select"
                        options={[
                          { value: 1, label: "1" },
                          { value: 0, label: "0" },
                        ]}
                        onChange={(val) => {
                          setValues(
                            (prv) =>
                              (prv = { ...values, sort_order: val.value })
                          );
                        }}
                        placeholder="Open this select menu"
                      />
                    </div>
                  </div>
                </div>

                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Project Status</h5>
                  </div>
                  <div className="box-body">
                    <Select
                      value={[
                        values.project_status === 1
                          ? { value: 1, label: "Enable" }
                          : { value: 0, label: "Disable" },
                      ]}
                      classNamePrefix="react-select"
                      options={[
                        { value: 1, label: "Enable" },
                        { value: 0, label: "Disable" },
                      ]}
                      onChange={(val) =>
                        setValues(
                          (prv) =>
                            (prv = { ...values, project_status: val.value })
                        )
                      }
                      placeholder="Open this select menu"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title"> Cover URl</h5>
                  </div>
                  <div className="box-body">
                    <div>
                      <span className="sr-only">Cover Url</span>
                      <label className="block">
                        <button
                          type="button"
                          onClick={() => setManagerOpener(true)}
                          className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary"
                        >
                          Change Image <i className="ti ti-file-plus "></i>
                        </button>
                        <img
                          src={`${import.meta.env.VITE_CMS_URL}api/transform/${
                            values.cover_url
                          }`}
                          className="box-img-top h-40 w-full
                       rounded-t-sm"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="box-footer bg-transparent">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={handleProjectsSubmit}
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
export default WebPreProjects;
