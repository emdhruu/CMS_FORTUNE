import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import React from "react";
import { Link } from "react-router-dom";
import CareerTable from "./careertable";

const Career = () => {
  return (
    <div>
      <PageHeader
        currentpage="Career Lists"
        activepage="Pages"
        mainpage="Career"
      />
      <div className="box">
        <div className="p-3">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-1 task-left rtl:space-x-reverse">
                <Link
                  to={`/cms/pages/career/addcareer`}
                  className="ti-btn ti-btn-primary"
                >
                  <i className="ri-add-line"></i>
                  Add New Career
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="relative sm:max-w-4xl w-full">
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
        </div>
      </div>
      <div className="box">
        <div className="box-body">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="box xl:overflow-auto">
                <div className="box-header">
                  <h5 className="box-title">Career List</h5>
                </div>
                <div className="box-body">
                  <div className="overflow-auto table-bordered">
                    <CareerTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;