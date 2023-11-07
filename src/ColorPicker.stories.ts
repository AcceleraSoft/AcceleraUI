
import type { Meta, StoryObj } from '@storybook/react';

import "./theme.css"
import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'Components/ColorPicker',
  tags: ['autodocs'],
  component: ColorPicker,
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

