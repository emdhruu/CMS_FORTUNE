import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const JobApplicant = () => {
  const [contacts, setContacts] = useState();

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getallapplicant`)
      .then((res) => res.json())
      .then((data) => setContacts(data.data))
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    contacts && (
      <div>
        <PageHeader
          currentpage="Job Applications List"
          activepage="Pages"
          mainpage="Job Applications"
        />
        <div className="box">
          <div className="col-span-12 lg:col-span-8 p-2">
            <div className="relative sm:max-w-4xl w-1/2 float-end">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
                <i className="ti ti-search"></i>
              </div>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="p-2 ltr:pr-10 rtl:pl-10 ti-form-input"
                placeholder="Search By Name"
              />
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-body">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <div className="box xl:overflow-auto">
                  <div className="box-header">
                    <h5 className="box-title">Job Applications List</h5>
                  </div>
                  <div className="box-body">
                    <div className="overflow-auto table-bordered">
                      <table className="ti-custom-table ti-striped-table ti-custom-table-hover">
                        <thead>
                          <tr className="border-b">
                            <th className="w-7 p-4 ">#</th>
                            <th>Name</th>
                            <th className="w-12">Email</th>
                            <th>Phone no.</th>
                            <th>File</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts?.map((contact, i) => (
                            <JobTable
                              iter={i}
                              contacts={contact}
                              key={i}
                              fetchData={fetchData}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default JobApplicant;

const JobTable = ({ contacts, fetchData }) => {

  const downloadFileAtURL = (url) => {
    console.log(url);
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.target = '_blank';
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
  };

  return (
    contacts && (
      <tr className="border-b p-5">
        <td className="text-center py-9 border-r">{contacts.applicant_id}</td>
        <td className="py-9 border-r">{contacts.name.slice(0,30)+ "..."}</td>
        <td className="text-center py-9 p-2 border-r">{contacts.email}</td>
        <td className="text-center py-9 border-r w-1/12">
          {contacts.phone_no}
        </td>
        <td className="p-5 text-justify border-r"> <div className="hs-tooltip ti-main-tooltip">
            <button
            onClick={()=>{downloadFileAtURL(`${
              import.meta.env.VITE_CMS_URL
            }${contacts.resume}`)}}
              className="hs-tooltip-toggle w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
            >
              <i className="ti ti-file-download"></i>
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
              > Download
              </span>
            </button>
          </div></td>
        <td className="flex justify-center ">
          <div className="hs-tooltip ti-main-tooltip">
            <button
              data-hs-overlay={`#enquiry-compose${contacts.applicant_id}`}
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
                {" "}
                Edit
              </span>
            </button>
          </div>
          <Modal fetchData={fetchData} contacts={contacts} />
        </td>
      </tr>
    )
  );
};

const Modal = ({ contacts, fetchData }) => {
  const [input, setInput] = useState(contacts);

  const SubmitChangedData = (id) => {
    const newData = { ...input };
    if (JSON.stringify(newData) !== JSON.stringify(contacts)) {
      fetch(`${import.meta.env.VITE_CMS_URL}api/updateapplicant-status/${id}`, {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            toast.success("Enquiry Status Updated");
            fetchData();
          }
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err.message);
        });
    } else {
      toast.success("Data is not changed");
    }
  };

  const handleSubmit = () => {
    try {
      SubmitChangedData(input.applicant_id);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    input && (
      <div
        id={`enquiry-compose${input.applicant_id}`}
        className="hs-overlay hidden ti-modal"
      >
        <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out ">
          <div className="ti-modal-content">
            <div className="ti-modal-header">
              <h3 className="ti-modal-title"> Job-Applications Form </h3>
              <button
                type="button"
                className="hs-dropdown-toggle ti-modal-close-btn"
                data-hs-overlay={`#enquiry-compose${input.applicant_id}`}
              >
                <span className="sr-only">Close</span>
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="ti-modal-body">
              <div className="space-y-3">
                <div className="">
                  <label className="ti-form-label">Name</label>
                  <input
                    type="text"
                    className="ti-form-input"
                    placeholder="Name"
                    name="name"
                    value={input.name}
                    disabled
                  />
                </div>
                <div className="">
                  <label className="ti-form-label">Email</label>
                  <input
                    type="text"
                    className="ti-form-input"
                    placeholder="Email"
                    name="email"
                    value={input.email}
                    disabled
                  />
                </div>
                <div className="">
                  <label className="ti-form-label">Phone no.</label>
                  <input
                    type="text"
                    className="ti-form-input"
                    name="phone_no"
                    placeholder="Phone"
                    value={input.phone_no}
                    disabled
                  />
                </div>
                <div className="">
                  <label className="ti-form-label">Position</label>
                  <input
                    type="text"
                    className="ti-form-input"
                    placeholder="Position"
                    name="position"
                    value={input.position}
                    disabled
                  />
                </div>
                <div className="">
                  <label className="ti-form-label">City</label>
                  <input
                    type="text"
                    className="ti-form-input"
                    placeholder="City"
                    name="city"
                    value={input.city}
                    disabled
                  />
                </div>
                <div className="">
                  <label className="ti-form-label">Message</label>
                  <textarea
                    className="ti-form-input h-16"
                    rows="2"
                    value={input.message}
                    name="position"
                    disabled
                  ></textarea>
                </div>
                <div>
                  <label className="ti-form-label">Status</label>
                  <Select
                    classNamePrefix="react-select"
                    options={[
                      { value: 0, label: "Unread" },
                      { value: 1, label: "Read" },
                      { value: 2, label: "Accepted" },
                      { value: 3, label: "Rejected" },
                    ]}
                    value={[
                      input.applicant_status === 0
                        ? { value: 0, label: "Unread" }
                        : input.applicant_status === 1
                        ? { value: 1, label: "Read" }
                        : input.applicant_status === 2
                        ? { value: 2, label: "Accepted" }
                        : { value: 3, label: "Rejected" },
                    ]}
                    onChange={(val) =>
                      setInput(
                        (prv) =>
                          (prv = { ...input, applicant_status: val.value })
                      )
                    }
                    menuPlacement="top"
                    placeholder="Open this select menu"
                  />
                </div>
              </div>
            </div>
            <div className="ti-modal-footer">
              <button
                type="button"
                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
                data-hs-overlay={`#enquiry-compose${input.applicant_id}`}
              >
                Close
              </button>
              <button
                className="ti-btn ti-btn-primary "
                // to={``}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
