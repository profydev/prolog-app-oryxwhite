import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { UICheckbox, CheckboxProps } from "@features/ui";

export default {
  title: "UI/Checkbox",
  component: UICheckbox,
  argTypes: {
    checked: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    indeterminate: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    label: {
      control: {
        type: "text",
      },
    },
    size: {
      control: {
        type: "radio",
        options: ["small", "medium"],
      },
      defaultValue: "small",
    },
  },
} as Meta;

const Template: StoryFn<CheckboxProps> = (args) => <UICheckbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: () => {},
  label: "Label",
  size: "small",
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  checked: true,
  size: "small",
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  size: "small",
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ...Default.args,
  indeterminate: true,
  size: "small",
};
