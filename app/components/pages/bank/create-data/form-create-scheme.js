export const formCreateScheme = () => [
  {
    label: "Name",
    type: "Input",
    field: "name",
    value: "",
    width: "25%",
    required: true,
  },
  {
    label: "Source",
    type: "Input",
    field: "codes",
    value: "",
    width: "25%",
    required: true,
  },
  {
    label: "Image",
    type: "Image",
    field: "image",
    value: "",
    width: "100%",
    maxUpload: 3,
    required: false,
  }
];