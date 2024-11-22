import React from "react";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { connect } from "react-redux";

const Sales = ({ local_varaiable }) => {
  return (
    <div>
      <PageHeader
        currentpage="Dashboard"
        activepage="Home"
        mainpage="Dashboard"
      />

      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-12 md:col-span-6 xxl:col-span-3">
          <div className="box overflow-hidden">
            <div className="box-body">
              <div className="flex">
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <div className="avatar p-2 rounded-sm bg-primary/10 dark:primary/10">
                    Dashboard
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

const mapStateToProps = (state) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, {})(Sales);
