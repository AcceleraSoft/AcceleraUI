
import type { Meta, StoryObj } from '@storybook/react';

import "./theme.css"
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  tags: ['autodocs'],
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'A TextField',
  },
};

export const WithError: Story = {
  args: {
    error: 'This is an error message.',
  }
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your text here ...',
  }
}

export const Password: Story = {
  args: {
    password: true,
  },
};

export const Email: Story = {
  args: {
    email: true,
  },
};

