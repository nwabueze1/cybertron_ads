import { TextInputProps } from "@/components/TextInput";

export const textFields: TextInputProps[] = [
  {
    name: "name",
    label: "Name",
    isRequired: true,
    placeholder: "Enter your name",
  },
  {
    name: "phone_number",
    label: "phone number",
    isRequired: true,
    placeholder: "eg: 0903745635",
  },
  {
    name: "email",
    label: "Email",
    isRequired: true,
    placeholder: "eg: james@gmail.com",
  },
];
