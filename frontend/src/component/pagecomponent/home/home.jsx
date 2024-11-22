import React, { useEffect, useState } from "react";
import Select from "react-select";
import SunEditor from "suneditor-react";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Filemanagermain from "../fileManager/filemanagermain";
const Home = () => {
  const [values, setValues] = useState({});
  const [sliderValues, setSliderValues] = useState([]);
  const [image, setImage] = useState("");
  const [managerOpener, setManagerOpener] = useState(false);

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallhome`)
      .then((res) => res.json())
      .then((data) => {
        let rawCover_url = JSON.parse(data.data[0].cover_url);
        setImage(rawCover_url);
        setValues(
          (prv) => (prv = { ...data.data[0], cover_url: rawCover_url })
        );
      })
      .then(
        fetch(`${import.meta.env.VITE_CMS_URL}api/getallslider/`)
          .then((res) => res.json())
          .then((data) => {
            setSliderValues(data.data);
          })
      )
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSliderInputChange = (e, itr) => {
    const { name, value } = e.target;
    const updatedArr = [...sliderValues];
    updatedArr[itr] = { ...updatedArr[itr], [name]: value };
    setSliderValues(updatedArr);
  };

  const SubmitFetcher = () => {
    const data = {
      ...values,
      cover_url: JSON.stringify(values.cover_url),
      slider: sliderValues,
    };
    fetch(`${import.meta.env.VITE_CMS_URL}api/updatebyidhome/1`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(toast.success("Home Pages updated Successfully"))
      .catch((err) => console.error(err.message));
  };

  const handleSubmitHome = () => {
    if (
      !(
        values.title &&
        values.slug &&
        values.meta_title &&  
        values.meta_desc &&
        values.breadcrumb_name &&
        values.description &&
        values.project_desc &&
        values.project_main_title &&
        values.project_small_title
      )
    ) {
      toast.error("Please enter all field");
      return;
    }
    try {
      SubmitFetcher();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = (iter) => {
    const updatedArr = [...sliderValues];
    updatedArr.splice(iter, 1);
    setSliderValues(updatedArr);
  };

  useEffect(() => {
    if (image) {
      setValues((prv) => (prv = { ...prv, cover_url: [...image] }));
    }
  }, [image]);

  const handleDeleteClick = (sliderId) => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidslider/${sliderId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchData();
        toast.success("Deleted Successfully");
      })

      .catch((err) => toast.error(err.message));
  };

  return (
    values &&
    sliderValues && (
      <div>
        {managerOpener ? (
          <Filemanagermain
            file={image}
            ratio={values.dimension}
            fileSetter={setImage}
            openSetter={setManagerOpener}
          />
        ) : (
          <>
            <PageHeader currentpage="Home" activepage="Pages" mainpage="Home" />
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 xxl:col-span-8">
                {/* title */}
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Title</h5>
                  </div>
                  <div className="box-body space-y-5">
                    <input
                      type="text"
                      id="input-labe1"
                      name="title"
                      value={values.title}
                      onChange={(e) => handleInputChange(e)}
                      className="ti-form-input"
                      placeholder="Home Title"
                    />
                  </div>
                </div>
                {/* cover url */}
                <div className="box">
                  <div className="box-header flex justify-between">
                    <h5 className="box-title"> Cover Url</h5>
                    <span className="text-sm font-thin underline text-red-500">
                      1 Image allowed Only
                    </span>
                  </div>
                  <div className="box-body">
                    <div onClick={() => setManagerOpener(true)}>
                      <label className="block">
                        <span className="sr-only">Cover Url</span>
                        <button
                          type="button"
                          oncl
                          className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary"
                        >
                          Change Image <i className="ti ti-file-plus "></i>
                        </button>
                        <div className="grid grid-cols-12 gap-x-2">
                          {values.cover_url && (
                            <img
                              src={`${
                                import.meta.env.VITE_CMS_URL
                              }api/transform/${values.cover_url}`}
                              className="col-span-4 h-32 rounded-t-sm"
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* cover type */}

                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Cover Type</h5>
                  </div>
                  <div className="box-body">
                    <Select
                      name="cover_type"
                      value={[
                        values.cover_type === 1
                          ? { value: 1, label: "Image" }
                          : { value: 0, label: "Video" },
                      ]}
                      onChange={(selVal) =>
                        setValues({ ...values, cover_type: selVal.value })
                      }
                      classNamePrefix="react-select"
                      options={[
                        { value: 1, label: "Image" },
                        { value: 0, label: "Video" },
                      ]}
                      placeholder="Open this select menu"
                    />
                  </div>
                </div>

                {/* Home About Editor */}
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Home About Content</h5>
                  </div>
                  <div className="box-body">
                    <button
                      type="button"
                      className="hs-dropdown-toggle ti-btn ti-btn-primary"
                      data-hs-overlay="#quil-editor"
                    >
                      Open Editor
                    </button>

                    <div
                      id="quil-editor"
                      className="hs-overlay ti-modal hidden"
                    >
                      <div className="ti-modal-box">
                        <div className="ti-modal-content">
                          <div className="ti-modal-header">
                            <h3 className="ti-modal-title">About Content</h3>
                            <button
                              type="button"
                              className="hs-dropdown-toggle ti-modal-clode-btn"
                              data-hs-overlay="#quil-editor"
                            >
                              <span className="sr-only">Close</span>
                              <svg
                                className="w-3.5 h-3.5"
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="ti-modal-body">
                            <SunEditor
                              setContents={values.home_about}
                              onChange={(e) =>
                                setValues(
                                  (prv) => (prv = { ...prv, home_about: e })
                                )
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
                                  table:
                                    "cellpadding|width|cellspacing|height|style",
                                  tr: "valign|style",
                                  td: "styleinsert|height|style",
                                  img: "title|alt|src|style",
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xxl:col-span-4">
              <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Project Main Title</h5>
                  </div>
                  <div className="box-body space-y-4">
                    <input
                      type="text"
                      id="input-label1"
                      name="project_main_title"
                      value={values.project_main_title}
                      onChange={(e) => handleInputChange(e)}
                      className="ti-form-input"
                      placeholder="Main Title"
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Project Small Title</h5>
                  </div>
                  <div className="box-body space-y-4">
                    <input
                      type="text"
                      id="input-label1"
                      name="project_small_title"
                      value={values.project_small_title}
                      onChange={(e) => handleInputChange(e)}
                      className="ti-form-input"
                      placeholder="small title"
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Project Description</h5>
                  </div>
                  <div className="box-body space-y-4">
                  <textarea
                      className="ti-form-input"
                      name="project_desc"
                      value={values.project_desc}
                      onChange={(e) => handleInputChange(e)}
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                {/* meta inputs */}
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Meta Title</h5>
                  </div>
                  <div className="box-body space-y-4">
                    <input
                      type="text"
                      id="input-label1"
                      name="meta_title"
                      value={values.meta_title}
                      onChange={(e) => handleInputChange(e)}
                      className="ti-form-input"
                      placeholder="meta title"
                    />
                  </div>
                </div>
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Meta Description</h5>
                  </div>
                  <div className="box-body space-y-4">
                    <textarea
                      className="ti-form-input"
                      name="meta_desc"
                      value={values.meta_desc}
                      onChange={(e) => handleInputChange(e)}
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                {/* breadcrumb_name */}
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Breadcrumb Name</h5>
                  </div>
                  <div className="box-body space-y-4">
                    <input
                      type="text"
                      name="breadcrumb_name"
                      value={values.breadcrumb_name}
                      onChange={(e) => handleInputChange(e)}
                      id="input-label1"
                      className="ti-form-input"
                      placeholder="breadcrum"
                    />
                  </div>
                </div>
                {/* slug */}
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Slug</h5>
                  </div>
                  <div className="box-body space-y-4">
                    <input
                      type="text"
                      name="slug"
                      value={values.slug}
                      onChange={(e) => handleInputChange(e)}
                      id="input-label1"
                      className="ti-form-input"
                      placeholder="slug"
                    />
                  </div>
                </div>
                {/* status */}
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Status</h5>
                  </div>
                  <div className="box-body">
                    <Select
                      name="status"
                      value={[
                        values.status === 1
                          ? { value: 1, label: "Enable" }
                          : { value: 0, label: "Disable" },
                      ]}
                      onChange={(selVal) =>
                        setValues({ ...values, status: selVal.value })
                      }
                      classNamePrefix="react-select"
                      options={[
                        { value: 1, label: "Enable" },
                        { value: 0, label: "Disable" },
                      ]}
                      placeholder="Open this select menu"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* slider */}
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="app-container">
                  <div className="box">
                    <div className="box-header flex justify-between">
                      <h5 className="box-title">Slider</h5>
                      <Link
                        to={`/cms/pages/slider`}
                        className="col-span-1 mx-3 ms-0 px-3 py-2 text-white rounded-md bg-blue-500"
                      >
                        Add +
                      </Link>
                    </div>
                    <div className="box-body">
                      <div className="table-bordered rounded-sm overflow-auto todo-table">
                        <table
                          id="delete-datatable"
                          className="ti-custom-table ti-custom-table-head max-w-screen-lg whitespace-nowrap"
                        >
                          {sliderValues.length > 1 && (
                            <thead className="bg-gray-100 dark:bg-black/20">
                              <tr>
                                <th className="dark:text-white/70">
                                  Background Image
                                </th>
                                <th className="dark:text-white/70">
                                  Slider Title
                                </th>
                                <th className="dark:text-white/70">
                                  Slider Description
                                </th>
                                <th className="dark:text-white/70">Action</th>
                              </tr>
                            </thead>
                          )}
                          {sliderValues.map((data, i) => {
                            return (
                              <SliderItem
                                iter={i}
                                key={data.slider_id}
                                data={data}
                                handleDelete={handleDeleteClick}
                                handleSliderInputChange={
                                  handleSliderInputChange
                                }
                              />
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12">
                <div className="box">
                  <div className="box-header">
                    {" "}
                    <h5 className="box-title">Description</h5>
                  </div>
                  <div className="box-body">
                    <SunEditor
                      setContents={values.description}
                      onChange={(e) =>
                        setValues((prv) => (prv = { ...prv, description: e }))
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
                          ["table", "horizontalRule", "link", "image", "video"],
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
                  <div className="box">
                    <div className="box-footer bg-transparent">
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={handleSubmitHome}
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
          </>
        )}
      </div>
    )
  );
};

function SliderItem({ data, handleDelete, i }) {
  return (
    <tr>
      <td>
        <img
          src={`${import.meta.env.VITE_CMS_URL}api/transform/${
            JSON.parse(data.slider_image)[0]
          }`}
          className="box-img-top h-full  rounded-sm"
          alt={data.title}
        />
      </td>
      <td>{data.title}</td>
      <td className="w-3/4">{data.description.slice(0, 70) + " ..."}</td>
      <td>
        <div className="hs-tooltip ti-main-tooltip">
          <Link
            to={`/cms/pages/slideredit/${data.slider_id}`}
            className="hs-tooltip-toggle w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
          >
            <i className="ti ti-pencil"></i>
            <span
              className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700 hidden"
              role="tooltip"
              data-popper-placement="top"
              style={{
                position: "fixed",
                inset: "auto auto 0px 0px",
                margin: "0px",
                transform: "translate(953px, -281px)",
              }}
            >
              Edit
            </span>
          </Link>
        </div>
        <div className="hs-tooltip ti-main-tooltip">
          <button
            variant=""
            className="hs-tooltip-toggle w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
            type="button"
            onClick={() => handleDelete(data.slider_id)}
          >
            <i className="ti ti-trash"></i>
            <span
              className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
              role="tooltip"
              data-popper-placement="top"
              style={{
                position: "fixed",
                inset: "auto auto 0px 0px",
                margin: "0px",
                transform: "translate(985px, -281px)",
              }}
            >
              Delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Home;

<>
  {/* //image */}
  {/* <label className="block">
    <span className="sr-only"> Image</span>
    <input
      type="file"
      name="bg_image"
      onChange={(e) => handleSliderInputChange(e, iter)}
      className="block w-full text-sm text-gray-500 dark:text-white/70 focus:outline-0 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary focus-visible:outline-none"
    />
    <img
      src={data.bg_image}
      className="box-img-top w-1/2 rounded-t-sm"
      alt={data.bg_image}
    />
  </label> */}
  {/* //title */}
  {/* <textarea
    draggable={false}
    className="ti-form-input"
    rows="1"
    name="title"
    value={data.title}
    onChange={(e) => handleSliderInputChange(e, iter)}
  ></textarea> */}
  {/* //description */}
  {/* <textarea
    className="ti-form-input"
    rows="3"
    name="desc"
    value={data.desc}
    onChange={(e) => handleSliderInputChange(e, iter)}
  ></textarea> */}
</>;
