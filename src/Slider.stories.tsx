
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from '@storybook/react';

import "./theme.css"
import Slider from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs();
      const onUpdate = (value: number) => {
        ctx.args.onUpdate?.(value);
        setArgs({ value });
      }
      return <Story args={{ ...ctx.args, onUpdate }} />
    }
  ]
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 0,
  },
};
