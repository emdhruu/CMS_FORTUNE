import React from "react";

//Svg icons of Dashboard

const Dashboardsvg = <i className="ri-home-8-line side-menu__icon"></i>;

const WidgetsSvg = <i className="ri-apps-2-line side-menu__icon"></i>;

const ComponentsSvg = <i className="ri-inbox-line side-menu__icon"></i>;

const PagesSvg = <i className="ri-book-open-line side-menu__icon"></i>;

export const MenuItems = [
  {
    id: 1,
    menutitle: "MAIN",
    Items: [
      {
        id: 2,
        icon: Dashboardsvg,
        path: `/cms`,
        title: "Dashboards",
        type: "link",
        active: false,
        selected: false,
      },

      {
        id: 15,
        icon: WidgetsSvg,
        title: "Blogs",
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            id: 101,
            icon: Dashboardsvg,
            path: `/cms/pages/blogs`,
            title: "Blogs",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 102,
            icon: Dashboardsvg,
            path: `/cms/pages/blogs/category`,
            title: "Categories",
            type: "link",
            active: false,
            selected: false,
          },
        ],
      },
      {
        id: 115,
        icon: WidgetsSvg,
        title: "Projects",
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            id: 201,
            icon: Dashboardsvg,
            path: `/cms/projects/list`,
            title: "Projects",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 202,
            icon: Dashboardsvg,
            path: `/cms/projects/configs`,
            title: "Project Configurations",
            type: "link",
            active: false,
            selected: false,
          },
        ],
      },
      {
        id: 333,
        icon: Dashboardsvg,
        path: `/cms/logs`,
        title: "Logs",
        type: "link",
        active: false,
        selected: false,
      },
    ],
  },
  {
    menutitle: "GENERAL",
    Items: [
      {
        id: 217,
        icon: ComponentsSvg,
        path: `/cms/pages/job_applicant`,
        type: "link",
        active: false,
        selected: false,
        title: "Job Applicants",
      },
      {
        id: 218,
        icon: ComponentsSvg,
        path: `/cms/pages/career`,
        type: "link",
        active: false,
        selected: false,
        title: "Career",
      },
    ],
  },
  {
    menutitle: "Webcontents",
    Items: [
      {
        id: 16,
        icon: ComponentsSvg,
        title: "General",
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            id: 17,
            path: `/cms/pages/store-setting`,
            type: "link",
            active: false,
            selected: false,
            title: "Store Setting",
          },
          {
            id: 18,
            path: `/cms/pages/testimonials`,
            type: "link",
            active: false,
            selected: false,
            title: "Testimonials",
          },
          {
            id: 19,
            path: `/cms/pages/enquiry`,
            type: "link",
            active: false,
            selected: false,
            title: "Enquiry",
          },
          {
            id: 20,
            path: `/cms/pages/fact&figure`,
            type: "link",
            active: false,
            selected: false,
            title: "Facts and Figures",
          },
          {
            id: 115,
            path: `/cms/general/social`,
            title: "Social Links",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 116,
            path: `/cms/general/team`,
            title: "Management",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 118,
            path: `/cms/general/awards`,
            title: "Awards",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 119,
            path: `/cms/general/assoc`,
            title: "Associates",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 23,
            path: `/cms/pages/buyers-guide`,
            title: "Buyers-Guide",
            type: "link",
            active: false,
            selected: false,
          },
        ],
      },
      {
        id: 86,
        icon: PagesSvg,
        title: "Pages",
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            id: 87,
            path: `/cms/pages/home`,
            title: "Home",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 90,
            path: `/cms/pages/about`,
            title: "About",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 93,

            path: `/cms/pages/blog`,
            title: "Blog",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 97,

            path: `/cms/pages/contact`,
            title: "Contact",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 101,
            path: `/cms/pages/web-career`,
            title: "Career",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 112,
            path: `/cms/pages/web-faq`,
            title: "FAQs",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 114,
            path: `/cms/pages/footer`,
            title: "Footer",
            type: "link",
            active: false,
            selected: false,
          },
        ],
      },
    ],
  },
];
export default MenuItems;
