export const config = {
  block: {
    education: {
      id: "",
      fieldofstudy: "",
      degree: "",
      school: "",
      schoollocation: "",
      startDate: "",
      endDate: "",
      description: ""
    },
    work_history: {
      id: "",
      jobtitle: "",
      employer: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      workdetail: ""
    },
    contact: {
      id: "",
      first_name: "",
      last_name: "",
      profession: "",
      street_address: "",
      city: "",
      state_province: "",
      zipcode: "",
      phone: "",
      email_address: "",
      social_links: ""
    },
    skill: {
      id: "",
      name: null,
      value: 0
    },
    language: {
      id: "",
      name: "",
      value: 0
    }
  },
  section: {
    id: "",
    title: "",
    type: "",
    blocks: []
  },
  dialog: {
    type: "",
    title: "",
    body: "",
    action: ""
  },
  snippets: {
    effect_types: {
      FADE: "FADE",
      GROW: "GROW",
      SLIDE: "SLIDE",
      ZOOM: "ZOOM"
    },
    //TC stands for abbreviations of Toast Callout
    TC_types: {
      PRIMARY: "PRIMARY",
      SUCCESS: "SUCCESS",
      WARNING: "WARNING",
      DANGER: "DANGER"
    }
  }
};
export const dialog_types = {
  DELETE: "DELETE",
  SUBMIT: "SUBMIT",
  ACCEPT: "ACCEPT",
  WARN: "WARN",
  ADD: "ADD"
};
export const Materials = {
  degrees: [
    "High School Diploma",
    "GED",
    "Associate of Arts",
    "Associate of Science",
    "Associate of Applied Science",
    "BBA",
    "Master of Arts",
    "Master of Science",
    "MBA",
    "J.D.",
    "M.D.",
    "Ph.D.",
    "Other",
    "Some College (No Degree)"
  ]
};
export const block_types = {
  main: {
    Header: "HEADER",
    Professional_summary: "PROFESSIONAL_SUMMARY",
    Skills: "SKILLS",
    Education: "EDUCATION",
    Contact: "CONTACT",
    Work_History: "WORK_HISTORY"
  },
  additional: {
    language: "LANGUAGE",
    Accomplishments: "ACCOMPLISHMENTS",
    Affiliations: "AFFILIATIONS",
    Additional_Information: "ADDITIONAL_INFO",
    Software: "SOFTWARE",
    Certifications: "CERTIFICATIONS",
    Interests: "INTERESTS"
  }
};
export const section_types = {
  Header: "HEADER",
  Professional_summary: "PROFESSIONAL_SUMMARY",
  Skills: "SKILLS",
  Education: "EDUCATION",
  Contact: "CONTACT",
  Work_History: "WORK_HISTORY",
  language: "LANGUAGE",
  Accomplishments: "ACCOMPLISHMENTS",
  Affiliations: "AFFILIATIONS",
  Software: "SOFTWARE",
  Certifications: "CERTIFICATIONS",
  Interests: "INTERESTS",
  Custom: "CUSTOM"
};
export const SampleSectionButtons = [
  { icon: "flag", text: "Language", type: section_types.language },
  { icon: "desktop", text: "Software", type: section_types.Software },
  { icon: "heatmap", text: "Interests", type: section_types.Interests },
  {
    icon: "application",
    text: "Certifications",
    type: section_types.Certifications
  },
  { icon: "exchange", text: "Affiliations", type: section_types.Affiliations },
  {
    icon: "crown",
    text: "Accomplishments",
    type: section_types.Accomplishments
  },
  { icon: "add-to-artifact", text: "Custom", type: section_types.Custom }
];
