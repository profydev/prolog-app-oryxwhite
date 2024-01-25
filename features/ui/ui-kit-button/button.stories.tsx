// Import dependencies
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { UIButton, ButtonProps } from "./button";

// Meta information for Storybook
const meta: Meta = {
  title: "UI/Button",
  component: UIButton,
  argTypes: {
    children: { control: "text" },
    onClick: { action: "clicked" },
    as: { control: { type: "select", options: ["button", "a"] } },
    href: { control: "text" },
    disabled: { control: "boolean" },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large", "xlarge"],
      },
    },
    color: {
      control: {
        type: "select",
        options: [
          "primary",
          "secondary",
          "gray",
          "empty",
          "empty-gray",
          "error",
          "empty-error",
        ],
      },
    },
    icon: { control: "boolean" },
    iconSrc: { control: "text" },
    iconAlt: { control: "text" },
    iconPosition: {
      control: { type: "select", options: ["leading", "trailing", "only"] },
    },
  },
};

const Template: StoryFn<ButtonProps> = (args) => <UIButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default Button",
  size: "medium",
  color: "primary",
  as: "button",
};

export default meta;
