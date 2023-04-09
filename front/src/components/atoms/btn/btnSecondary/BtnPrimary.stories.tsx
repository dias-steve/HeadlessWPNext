import BtnSecondary from "./BtnSecondary"
import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
    title: "Components/atoms/btn/BtnSecondary",
    component:BtnSecondary 
}

export  const BtnPrimaryStory: ComponentStory<typeof BtnSecondary > = (args) => <BtnSecondary {...args}/>;