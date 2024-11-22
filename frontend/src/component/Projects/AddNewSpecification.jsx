import React, { useEffect, useState } from "react";
import Filemanagermain from "../pagecomponent/fileManager/filemanagermain";

const AddSpecification = ({ openSetter, fileSetter }) => {
  const [data, setData] = useState({
    img: [],
    title: "",
    content:""
  });
  const [img, setImg] = useState([]);
  const [managerOpener, setManagerOpener] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (img.length) {
      setData((prevData) => ({
        ...prevData,
        img: img,
      }));
    }
  }, [img]);

  const handleSubmit = () => {
    fileSetter((prev) => [...prev, data]);
    openSetter((prev) => !prev);
  };

  return (
    data && (
      <div>
        {managerOpener ? (
          <Filemanagermain
            file={img}
            fileSetter={setImg}
            openSetter={setManagerOpener}
            ratio={1080 / 1080}
          />
        ) : (
          <>
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 xxl:col-span-8">
                <div className="box">
                  <div className="box-body space-y-5">
                    <div className="sm:grid grid-cols-12 sm:gap-6 space-y-5 sm:space-y-0">
                      <div className="col-span-12 xxl:col-span-9 mt-3">
                        <div className="box-header flex justify-between">
                          <h5>
                            Logo Image<span className="text-red-500">*</span>
                          </h5>
                          <span className="text-sm font-thin underline text-red-500">
                            1 Image allowed Only
                          </span>
                        </div>
                        <div className="box-body">
                          <div onClick={() => setManagerOpener(true)}>
                            <label className="block">
                              <span className="sr-only">Logo Image</span>
                              <button
                                type="button"
                                className="ti-btn rounded-md ti-btn-outline ti-btn-outline-primary"
                              >
                                Select <i className="ti ti-file-plus "></i>
                              </button>
                              <div className="grid grid-cols-12 gap-x-2">
                                {data.img.length
                                  ? data.img.map((pathFile, i) => (
                                      <img
                                        key={i}
                                        src={`${
                                          import.meta.env.VITE_CMS_URL
                                        }api/transform/${pathFile}`}
                                        className="col-span-4 h-32 rounded-t-sm"
                                      />
                                    ))
                                  : <span className="text-red-500">select image</span>}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <label className="ti-form-label">Title</label>
                        <input
                          type="text"
                          className="ti-form-input"
                          placeholder="Enter title"
                          value={data.title}
                          name="title"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                        <label className="ti-form-label">Content</label>
                        <textarea
                        rows={4}
                          type="text"
                          className="ti-form-input"
                          placeholder="Enter Content"
                          value={data.content}
                          name="content"
                          onChange={handleInputChange}
                        ></textarea>
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

export default AddSpecification;
