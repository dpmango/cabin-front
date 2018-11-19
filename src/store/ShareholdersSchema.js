export const corporatesSchema = {
  topRow: [
    {}, {},
    {
      colspan: 4,
      icon: "sh-person",
      name: "Corporate representative"
    },
    {
      icon: "sh-person",
      name: "Administrative Assistant",
      tooltip: "Let us know if you prefer us to forward the onboarding paperwork for the Corporate Representative to be completed by an Administrative Assistant. The Corporate Representative will only need to verify and sign-off the completed onboarding documents."
    }
  ],
  thead: [
    {
      icon: "sh-name",
      name: "Company name"
    },
    {
      icon: "sh-id",
      name: "Company registration #"
    },
    {
      icon: "sh-person",
      name: "Full name"
    },
    {
      icon: "sh-id",
      name: "Id"
    },
    {
      icon: "sh-phone",
      name: "Phone number"
    },
    {
      icon: "sh-email",
      name: "Email"
    },
    {
      icon: "sh-email",
      name: "Email"
    },
  ],
  tbody: [
    {
      type: "input",
      placeholder: "Company name",
      name: "company_name"
    },
    {
      type: "input",
      placeholder: "Company registration #",
      name: "uen"
    },
    {
      type: "input",
      placeholder: "Insert full name",
      name: "full_name"
    },
    {
      type: "input",
      placeholder: "ID",
      name: "id"
    },
    {
      type: "input",
      placeholder: "Phone number",
      name: "phone"
    },
    {
      type: "input",
      placeholder: "E-mail",
      name: "email"
    },
    {
      type: "input",
      placeholder: "E-mail",
      name: "rep_email"
    }
  ]
}


export const individualsShema = {
  thead: [
    {
      icon: "sh-name",
      name: "Full name"
    },
    {
      icon: "sh-id",
      name: "ID"
    },
    {
      icon: "sh-phone",
      name: "Phone number"
    },
    {
      icon: "sh-email",
      name: "Email"
    },
    {
      icon: "sh-person",
      name: "Singapore Citizen / PR"
    },
    {
      name: "Shareholder?"
    },
    {
      name: "Director?"
    }

  ],
  tbody: [
    {
      type: "input",
      placeholder: "Full name",
      name: "full_name"
    },
    {
      type: "input",
      placeholder: "Insert ID",
      name: "id_number"
    },
    {
      type: "input",
      placeholder: "Insert number",
      name: "phone_number"
    },
    {
      type: "input",
      placeholder: "Insert email",
      name: "email"
    },
    {
      type: "checkbox",
      name: "is_sg_citizen"
    },
    {
      type: "checkbox",
      name: "is_shareholder"
    },
    {
      type: "checkbox",
      name: "is_director"
    }
  ]
}
