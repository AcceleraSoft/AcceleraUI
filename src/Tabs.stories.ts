import type { Meta, StoryObj } from '@storybook/react';

import "./theme.css"
import Tabs from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    elements: [
      {  key: 'first', label: 'First', render: () => 'First tab!' },
      {  key: 'second', label: 'Second', render: () => 'Second tab!' },
      {  key: 'third', label: 'Third', render: () => 'Third tab!' },
    ]
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
