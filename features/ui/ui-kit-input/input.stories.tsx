// Import dependencies
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { UIInput, InputProps } from "./input";

const meta: Meta = {
  title: "UI/Input",
  component: UIInput,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    icon: { control: "text" },
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
  },
};

const Template: StoryFn<InputProps> = (args) => <UIInput {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: "Enter text here",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  placeholder: "Enter text here",
  label: "Label:",
};

export const WithHint = Template.bind({});
WithHint.args = {
  placeholder: "Enter text here",
  hint: "This is a hint.",
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: "Enter text here",
  error: true,
  errorMessage: "This field is required.",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  placeholder: "Enter text here",
  icon: "/icons/mailgray.svg",
};

export default meta;
