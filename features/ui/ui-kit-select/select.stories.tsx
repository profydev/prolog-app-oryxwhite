// Select.stories.tsx

import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { UISelect, SelectProps } from "@features/ui";

export default {
  title: "UI/Select",
  component: UISelect,
} as Meta;

const Template: StoryFn<SelectProps> = (args) => <UISelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  onSelect: (value: string | undefined) => console.log("Selected:", value),
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  onSelect: (value: string | undefined) => console.log("Selected:", value),
  label: "Select an option:",
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  onSelect: (value: string | undefined) => console.log("Selected:", value),
  disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  onSelect: (value: string | undefined) => console.log("Selected:", value),
  icon: "/icons/customIcon.svg",
};

export const WithError = Template.bind({});
WithError.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  onSelect: (value: string | undefined) => console.log("Selected:", value),
  error: "An error occurred!",
};

export const WithHint = Template.bind({});
WithHint.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  onSelect: (value: string | undefined) => console.log("Selected:", value),
  hint: "Please select an option.",
};
