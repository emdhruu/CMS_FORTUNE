import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import Select from "react-select";
import { toast } from "react-toastify";
import Filemanagermain from "../pagecomponent/fileManager/filemanagermain";
import { useNavigate } from "react-router-dom";

const AddPreProjects = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    slug: "",
    address: "",
    lessee: "",
    points: "",
    status: "",
    meta_title: "",
    meta_description: "",
  });
  const [image, setImage] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [managerOpener, setManagerOpener] = useState();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      const newState = {
        ...prev,
        [name]: value,
      };
      if (name === "name") {
        newState.slug = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/\?/g, "-");
      }
      return newState;
    });
  };

  const SubmitData = (id) => {
    const newData = {
      ...input,
      cover_url: JSON.stringify(coverUrl),
      logo: JSON.stringify(logo),
      image: JSON.stringify(image),
    };
    fetch(`${import.meta.env.VITE_CMS_URL}api/createpreprojects`, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          toast.success("Added new Pre-Project succesfully");
          navigate("/cms/projects/pre-projects");
        } else {
          toast.error(data.message);
        }
      });
  };

  const handleSubmit = () => {
    if (
      !(
        input.name &&
        input.address &&
        input.lessee &&
        input.points &&
        input.meta_title &&
        input.meta_description
      )
    ) {
      toast.error("Please enter all field");
      return;
    }
    try {
      SubmitData(input.p_id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    input && (
      <div>
        {managerOpener == 1 ? (
          <Filemanagermain
            file={logo}
            ratio={70 / 70}
            fileSetter={setLogo}
            openSetter={setManagerOpener}
          />
        ) : managerOpener == 2 ? (
          <Filemanagermain
            file={image}
            ratio={1030 / 1285}
            fileSetter={setImage}
            openSetter={setManagerOpener}
          />
        ) : managerOpener == 3 ? (
          <Filemanagermain
            file={coverUrl}
            ratio={1960 / 600}
            fileSetter={setCoverUrl}
            openSetter={setManagerOpener}
          />
        ) : (
          <>
            <PageHeader
              currentpage="Add Pre-Project"
              activepage="Pages"
              mainpage="Add Pre-Project"
            />
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 ">
                <div className="box">
                  <div className="box-body space-y-5">
                    <div>
                      <label htmlFor="input-label1" className="ti-form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="ti-form-input"
                        placeholder="name"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChangeValue(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor="input-label1" className="ti-form-label">
                        Slug
                      </label>
                      <input
                        type="text"
                        className="ti-form-input"
                        placeholder="Slug"
                        name="slug"
                        value={input.slug}
                        disabled
                      />
                    </div>
                    <div>
                      <label htmlFor="input-label" clas3sName="ti-form-label">
                        Overview Points
                      </label>
                      <SunEditor
                        className="ht-250"
                        height="260"
                        setContents={input.points}
                        name="points"
                        onChange={(e) =>
                          setInput((prv) => (prv = { ...prv, points: e }))
                        }
                        setOptions={{
                          buttonList: [
                            ["undo", "redo"],
                            ["font", "fontSize"],
                            ["paragraphStyle", "blockquote"],
                            [
                              "bold",
                              "underline",
                              "italic",
                              "strike",
                              "subscript",
                              "superscript",
                            ],
                            ["fontColor", "hiliteColor"],
                            ["align", "list", "lineHeight"],
                            ["outdent", "indent"],
                            [
                              "table",
                              "horizontalRule",
                              "link",
                              "image",
                              "video",
                            ],
                            ["preview", "print"],
                            ["removeFormat"],
                          ],
                          defaultTag: "div",
                          minHeight: "300px",
                          showPathLabel: false,
                          attributesWhitelist: {
                            all: "style",
                            table: "cellpadding|width|cellspacing|height|style",
                            tr: "valign|style",
                            td: "styleinsert|height|style",
                            img: "title|alt|src|style",
                          },
                        }}
                      />
                    </div>
                    {/* Logo1*/}
                    <div className="box">
                      <div className="box-header flex justify-between">
                        <h5 className="box-title">Logo</h5>
                        <span className="text-sm font-thin underline text-red-500">
                          1 Image allowed Only
                        </span>
                      </div>
                      <div className="box-body">
                        <div onClick={() => setManagerOpener(1)}>
                          <label className="block">
                            <span className="sr-only">Logo</span>
                            <button
                              type="button"
                              className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary"
                            >
                              Change Image <i className="ti ti-file-plus "></i>
                            </button>
                            <div className="grid grid-cols-12 gap-x-2">
                              {/* {listImage &&
                                listImage.map((pathFile, i) => {
                                  return (
                                    <img
                                      key={i}
                                      src={`${
                                        import.meta.env.VITE_CMS_URL
                                      }api/transform/${pathFile}`}
                                      className="col-span-4 h-32 rounded-t-sm"
                                    />
                                  );
                                })} */}
                              {logo &&
                                logo.map((pathFile, i) => {
                                  return (
                                    <img
                                      key={i}
                                      src={`${
                                        import.meta.env.VITE_CMS_URL
                                      }api/transform/${pathFile}`}
                                      className="col-span-4 h-32 rounded-t-sm"
                                    />
                                  );
                                })}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Image */}
                    <div className="box">
                      <div className="box-header flex justify-between">
                        <h5 className="box-title"> Image</h5>
                        <span className="text-sm font-thin underline text-red-500">
                          1 Image allowed Only
                        </span>
                      </div>
                      <div className="box-body">
                        <div onClick={() => setManagerOpener(2)}>
                          <label className="block">
                            <span className="sr-only">Image</span>
                            <button
                              type="button"
                              className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary"
                            >
                              Change Image <i className="ti ti-file-plus "></i>
                            </button>
                            <div className="grid grid-cols-12 gap-x-2">
                              {image &&
                                image.map((pathFile, i) => {
                                  return (
                                    <img
                                      key={i}
                                      src={`${
                                        import.meta.env.VITE_CMS_URL
                                      }api/transform/${pathFile}`}
                                      className="col-span-4 h-32 rounded-t-sm"
                                    />
                                  );
                                })}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Cover Image */}
                    <div className="box">
                      <div className="box-header flex justify-between">
                        <h5 className="box-title">Cover Image</h5>
                        <span className="text-sm font-thin underline text-red-500">
                          1 Image allowed Only
                        </span>
                      </div>
                      <div className="box-body">
                        <div onClick={() => setManagerOpener(3)}>
                          <label className="block">
                            <span className="sr-only">Cover Image</span>
                            <button
                              type="button"
                              className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary"
                            >
                              Change Image <i className="ti ti-file-plus "></i>
                            </button>
                            <div className="grid grid-cols-12 gap-x-2">
                              {coverUrl &&
                                coverUrl.map((pathFile, i) => {
                                  return (
                                    <img
                                      key={i}
                                      src={`${
                                        import.meta.env.VITE_CMS_URL
                                      }api/transform/${pathFile}`}
                                      className="col-span-4 h-32 rounded-t-sm"
                                    />
                                  );
                                })}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sm:grid grid-cols-12 sm:gap-6 space-y-5 sm:space-y-0">
                      <div className="col-span-12 xxl:col-span-9">
                        <label className="ti-form-label">Lessee</label>
                        <input
                          type="text"
                          className="ti-form-input"
                          name="lessee"
                          value={input.lessee}
                          onChange={(e) => handleChangeValue(e)}
                          required
                        />
                      </div>
                      <div className="col-span-12 xxl:col-span-9 mt-3">
                        <label className="ti-form-label">Address</label>
                        <textarea
                          className="ti-form-input"
                          rows="3"
                          placeholder="Enter Address of project"
                          value={input.address}
                          name="address"
                          onChange={(e) => handleChangeValue(e)}
                        ></textarea>
                      </div>
                      <div className="col-span-12 xxl:col-span-9 ">
                        <label className="ti-form-label">Meta Title</label>
                        <input
                          type="text"
                          className="ti-form-input"
                          placeholder="Enter Meta Title"
                          value={input.meta_title}
                          name="meta_title"
                          onChange={(e) => handleChangeValue(e)}
                          required
                        />
                      </div>
                      <div className="col-span-12 xxl:col-span-9 mt-3">
                        <label className="ti-form-label">
                          Meta Description
                        </label>
                        <textarea
                          className="ti-form-input"
                          rows="3"
                          placeholder="This is a textarea placeholder"
                          value={input.meta_description}
                          name="meta_description"
                          onChange={(e) => handleChangeValue(e)}
                        ></textarea>
                      </div>
                      <div className="col-span-12 xxl:col-span-9 mt-3">
                        <label className="ti-form-label">Status</label>
                        <Select
                          className="product-searchs"
                          classNamePrefix="react-select"
                          name="status"
                          options={[
                            { value: 1, label: "Enable" },
                            { value: 0, label: "Disable" },
                          ]}
                          value={[
                            input.status === 1
                              ? { value: 1, label: "Enable" }
                              : { value: 0, label: "Disable" },
                          ]}
                          onChange={(val) =>
                            setInput(
                              (prv) => (prv = { ...input, status: val.value })
                            )
                          }
                          placeholder="Status"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="box-footer bg-transparent">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        className="py-2 px-3 ti-btn ti-btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default AddPreProjects;
